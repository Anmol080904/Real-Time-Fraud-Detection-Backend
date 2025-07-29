const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'fraud-app',
  brokers: ['localhost:9092'], // Replace with actual broker
});

const producer = kafka.producer();

const sendToKafka = async (topic, message) => {
  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  } catch (error) {
    console.error('Kafka Producer Error:', error);
  } finally {
    await producer.disconnect();
  }
};

module.exports = { sendToKafka };
