const { Kafka } = require("kafkajs");
const { analyzeTransaction } = require("../controllers/fraudDetectionController");

const kafka = new Kafka({
  clientId: "fraud-detector",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "fraud-analysis-group" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "transactions", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await analyzeTransaction(message);
    },
  });

  console.log("🧠 Kafka fraud detection consumer running...");
};

module.exports = runConsumer;
