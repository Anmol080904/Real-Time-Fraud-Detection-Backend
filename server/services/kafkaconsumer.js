const { Kafka } = require('kafkajs');
const { callMLService } = require('./mlservice');

const kafka = new Kafka({
  clientId: 'fraud-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'fraud-group' });

const startConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'transactions', fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const tx = JSON.parse(message.value.toString());
        await callMLService(tx); // Call ML microservice with transaction
      },
    });
  } catch (error) {
    console.error('Kafka Consumer Error:', error);
  } finally {
    await consumer.disconnect();
  }
};

module.exports = { startConsumer };
