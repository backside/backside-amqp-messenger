backside-amqp-messenger
=========

Implements the messenger API using amqp.

# Configuration
```JavaScript
new AMQPMessenger("amqp://localhost:5672", [opts])
```
with optional options array
```JavaScript
{
  exchangeName: "backside" // the name of the exchange
}
```
# Configuration via environemt variables
```
RABBITMQ_URL=amqp://localhost:5672
RABBITMQ_EXCHANGE=backside # name of the exchange to use
```
