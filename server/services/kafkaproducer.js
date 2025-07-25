const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'fraud-app',
  brokers: ['localhost:9092'], // Replace with actual broker
});

const producer = kafka.producer();

const sendToKafka = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

module.exports = { sendToKafka };
