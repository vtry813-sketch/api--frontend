import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Download, 
  Key, 
  Clock, 
  BarChart3,
  Copy,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import ApiService from '../services/api';

const DashboardPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [keyInfo, setKeyInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const savedKey = localStorage.getItem('yt_api_key');
      if (!savedKey) {
        setLoading(false);
        return;
      }

      setApiKey(savedKey);
      
      // Fetch key info
      const infoResponse = await ApiService.validateKey(savedKey);
      if (infoResponse.valid) {
        setKeyInfo(infoResponse.data);
      }

      // Fetch stats
      const statsResponse = await ApiService.getStats(savedKey);
      setStats(statsResponse.stats);
      
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const copyApiKey = () => {
    if (!apiKey) return;
    
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success('API key copied to clipboard!');
    
    setTimeout(() => setCopied(false), 2000);
  };

  const validateApiKey = async () => {
    try {
      const response = await ApiService.validateKey(apiKey);
      
      if (response.valid) {
        toast.success('API key is valid!');
        setKeyInfo(response.data);
      } else {
        toast.error('API key is invalid or expired');
      }
    } catch (error) {
      toast.error('Failed to validate API key');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div className="text-center max-w-2xl mx-auto space-y-8">
        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto" />
        <h2 className="text-3xl font-bold">No API Key Found</h2>
        <p className="text-dark-300">
          You need an API key to access the dashboard. Generate one to get started!
        </p>
        <a 
          href="/generate-key" 
          className="btn-primary inline-flex items-center"
        >
          Generate API Key
          <Key className="ml-2 w-5 h-5" />
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Developer Dashboard</h1>
          <p className="text-dark-300">Monitor your API usage and manage your account</p>
        </div>
        <button
          onClick={validateApiKey}
          className="btn-secondary inline-flex items-center"
        >
          Validate API Key
          <CheckCircle className="ml-2 w-5 h-5" />
        </button>
      </div>

      {/* API Key Display */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg font-semibold">Your API Key</h3>
          </div>
          <button
            onClick={copyApiKey}
            className="flex items-center space-x-2 text-sm btn-secondary py-2 px-4"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-dark-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          {apiKey}
        </div>
        <div className="mt-4 text-sm text-dark-300">
          <p className="flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Keep this key secure. Do not share it publicly.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm">Total Requests</p>
              <p className="text-3xl font-bold mt-2">
                {keyInfo?.totalRequests || 0}
              </p>
            </div>
            <Activity className="w-10 h-10 text-primary-500 opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm">Downloads Today</p>
              <p className="text-3xl font-bold mt-2">
                {stats?.totalDownloads || 0}
              </p>
            </div>
            <Download className="w-10 h-10 text-primary-500 opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm">Days Remaining</p>
              <p className="text-3xl font-bold mt-2">
                {keyInfo?.daysLeft || 0}
              </p>
            </div>
            <Clock className="w-10 h-10 text-primary-500 opacity-50" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm">Status</p>
              <p className="text-3xl font-bold mt-2">
                {keyInfo?.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <BarChart3 className="w-10 h-10 text-primary-500 opacity-50" />
          </div>
        </motion.div>
      </div>

      {/* Detailed Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="text-xl font-semibold mb-4">API Key Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-dark-700">
              <span className="text-dark-300">Name</span>
              <span className="font-medium">{keyInfo?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-700">
              <span className="text-dark-300">Email</span>
              <span className="font-medium">{keyInfo?.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-700">
              <span className="text-dark-300">Created</span>
              <span className="font-medium">
                {keyInfo?.createdAt ? new Date(keyInfo.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-700">
              <span className="text-dark-300">Expires</span>
              <span className="font-medium">
                {keyInfo?.expiresAt ? new Date(keyInfo.expiresAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-dark-300">Last Used</span>
              <span className="font-medium">
                {keyInfo?.lastUsed ? new Date(keyInfo.lastUsed).toLocaleString() : 'Never'}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h3 className="text-xl font-semibold mb-4">Usage Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-dark-700">
              <span className="text-dark-300">Average Response Time</span>
              <span className="font-medium">
                {stats?.averageResponseTime ? `${Math.round(stats.averageResponseTime)}ms` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-700">
              <span className="text-dark-300">Unique Videos</span>
              <span className="font-medium">{stats?.uniqueVideosCount || 0}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-700">
              <span className="text-dark-300">Success Rate</span>
              <span className="font-medium">
                {stats?.totalDownloads ? '100%' : 'N/A'}
              </span>
            </div>
            <div className="pt-4">
              <p className="text-dark-300 mb-2">Usage Tips:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Cache download URLs to reduce API calls</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Use search endpoint before downloading to verify video availability</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Monitor your usage to avoid rate limiting</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card"
      >
        <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/download" 
            className="btn-secondary flex flex-col items-center justify-center p-4 text-center"
          >
            <Download className="w-8 h-8 mb-2" />
            <span>Download Videos</span>
          </a>
          <a 
            href="/docs" 
            className="btn-secondary flex flex-col items-center justify-center p-4 text-center"
          >
            <Code className="w-8 h-8 mb-2" />
            <span>API Documentation</span>
          </a>
          <a 
            href="/generate-key" 
            className="btn-secondary flex flex-col items-center justify-center p-4 text-center"
          >
            <Key className="w-8 h-8 mb-2" />
            <span>New API Key</span>
          </a>
          <button 
            onClick={() => {
              localStorage.removeItem('yt_api_key');
              window.location.reload();
            }}
            className="btn-secondary flex flex-col items-center justify-center p-4 text-center"
          >
            <AlertCircle className="w-8 h-8 mb-2" />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
