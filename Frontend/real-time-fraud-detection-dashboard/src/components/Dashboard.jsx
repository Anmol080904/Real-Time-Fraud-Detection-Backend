import React, { useState, useEffect } from 'react';
import { AlertTriangle, DollarSign, Shield, Plus, LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';
import { api } from './apiService';
import StatCard from './StatCard';
import TransactionModal from './TransactionModal';
import TransactionTable from './TransactionTable';
import FraudAlertsTable from './FraudAlertsTable';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [loading, setLoading] = useState({ transactions: true, alerts: true });
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadTransactions();
    if (user?.role === 'admin') {
      loadFraudAlerts();
    }
  }, [user]);

  const loadTransactions = async () => {
    try {
      setLoading(prev => ({ ...prev, transactions: true }));
      const response = await api.getUserTransactions();
      setTransactions(response.data || response || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(prev => ({ ...prev, transactions: false }));
    }
  };

  const loadFraudAlerts = async () => {
    try {
      setLoading(prev => ({ ...prev, alerts: true }));
      const response = await api.getFraudAlerts();
      setFraudAlerts(response.data || response || []);
    } catch (error) {
      console.error('Error loading fraud alerts:', error);
      setFraudAlerts([]);
    } finally {
      setLoading(prev => ({ ...prev, alerts: false }));
    }
  };

  const handleCreateTransaction = async (transactionData) => {
    try {
      const response = await api.createTransaction(transactionData);
      await loadTransactions(); // Reload transactions
      return response;
    } catch