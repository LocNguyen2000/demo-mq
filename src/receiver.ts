var amqp = require('amqplib/callback_api');

// Step 1: Create Connection
amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError){
        throw connError
    }

    connection.createChannel((channelError, channel) =>{
        if(channelError){
            throw channelError
        }
        // Step 3: Assert Queue
        const QUEUE = "Hello"

        channel.assertQueue(QUEUE)
        // Step 4: Consume Message from Queue
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE);
        channel.consume(QUEUE, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });

    })
})