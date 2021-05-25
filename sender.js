const amqp = require('amqplib/callback_api')

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
        var msg = 'Hello World'

        channel.assertQueue(QUEUE)
        // Step 4: Send Message to Queue
        channel.sendToQueue(QUEUE, Buffer.from(msg))
        console.log(`Message Sent: ${msg}`);
    })
})