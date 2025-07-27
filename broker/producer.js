const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'fraud-detector',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const sendMessage = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic:'test-topic',
    messages: [{ value: JSON.stringify(message) }],
  });
};

module.exports = { sendMessage };
