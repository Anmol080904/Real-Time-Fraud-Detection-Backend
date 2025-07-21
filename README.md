# 💸 Real-Time Fraud Detection System

An AI-powered real-time fraud detection platform for financial transactions built using the **MERN Stack** and **Machine Learning**. The system monitors transactions, assigns fraud scores using ML, and allows real-time admin interventions via WebSockets or Kafka.

---

## 🧠 Project Overview

### ✨ Key Features

- 🧾 **Transaction Dashboard**: Monitor all incoming transactions.
- 🔄 **Real-Time Streaming**: Uses Kafka or WebSockets to stream transactions.
- 🧠 **AI-Based Scoring**: Detects fraudulent activity using ML models (Isolation Forest or Neural Network).
- ❌ **Block/Allow Control**: Admin can take immediate action.
- 📊 **Analytics Dashboard**: View historical fraud patterns and scores.

---

## 🏗️ Tech Stack

### 🔹 Frontend
- React.js
- Axios
- Recharts
- MUI or TailwindCSS

### 🔹 Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Kafka

### 🔹 AI Microservice
- FASTApi
- Scikit-learn / TensorFlow
- Flask-CORS
- Kafka-python or Flask-SocketIO
