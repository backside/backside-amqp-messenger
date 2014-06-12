
var assert = require("assert")
var AMQPMessenger = require("../lib/AMQPMessenger")
describe("AMQP Messenger", function() {
  describe("transform path", function() {
    it("should be able to transform paths", function() {
      var messenger = new AMQPMessenger()
      assert.equal(messenger.transformPath("/foo/bar/baz"), "foo.bar.baz")
    })
  })
})
