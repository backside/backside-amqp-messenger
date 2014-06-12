var amqplib = require("amqplib")

function AMQPMessenger(connectionString, opts) {
  connectionString = connectionString || process.env.RABBITMQ_URL || "amqp://localhost:5672"
  var self = this
  var opts = opts || {}
  this.exchangeName = opts.exchangeName || process.env.RABBITMQ_EXCHANGE || "backside"
  this.ch = amqplib.connect(connectionString).then(function(conn) {
    return conn.createChannel()
  }).then(function(ch) {
    ch.assertExchange(self.exchangeName, "topic")
    return ch
  })
}

AMQPMessenger.prototype.transformPath = function(key) {
  if (key.charAt(0) === '/') {
    key = key.substr(1)
  }
  return key.replace(/\//g, ".")
}

AMQPMessenger.prototype.formatMessage = function(key, message) {
  var msg = {
    key: key,
    message: message
  }
  return new Buffer(JSON.stringify(msg))
}

AMQPMessenger.prototype.updateKey = function(key, message, cb) {
  cb = cb || function() {}
  var self = this
  var write = this.ch.then(function(ch) {
    return ch.publish("backside", self.transformPath(key), self.formatMessage(key, message))
  })
  write.then(function() {
    cb()
  }, function(err) {
    return cb(err)
  })
}

module.exports = AMQPMessenger
