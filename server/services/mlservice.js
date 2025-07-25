const axios = require('axios');

const callMLService = async (transaction) => {
  try {
    const response = await axios.post('http://localhost:8000/predict', transaction); // Replace with actual URL
    const { fraudScore, flagged } = response.data;

    // You can now save this result in DB or return it
    return { fraudScore, flagged };
  } catch (error) {
    console.error('ML Service Error:', error.message);
    return { fraudScore: 0, flagged: false };
  }
};

module.exports = { callMLService };
