const http =require("http")
const detectFraud = (transaction) => {
  console.log("Received Transaction:", transaction);

  // Dummy fraud check logic
  if (transaction.amount > 100000) {
    console.log("🚨 Potential Fraud Detected!");
  } else {
    console.log("✅ Transaction OK");
  }
};

module.exports = { detectFraud };

