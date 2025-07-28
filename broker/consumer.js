const { Kafka } = require('kafkajs');
const { detectFraud } = require('../broker/fraudDetectionService');

const kafka = new Kafka({
  clientId: 'fraud-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'fraud-group' });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      detectFraud(data); // handle with your AI model
    },
  });
};

module.exports = { consumeMessages };
