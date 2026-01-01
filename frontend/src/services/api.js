import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api-1wr2.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

class ApiService {
  // Generate new API key
  static async generateApiKey(name, email) {
    try {
      const response = await api.post('/keys/generate', { name, email });
      
      if (response.data.success) {
        // Save to localStorage
        localStorage.setItem('yt_api_key', response.data.data.key);
        localStorage.setItem('yt_api_key_info', JSON.stringify(response.data.data));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Validate API key
  static async validateKey(apiKey) {
    try {
      const response = await api.get('/keys/validate', {
        headers: { 'x-api-key': apiKey }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Search videos
  static async searchVideos(query, apiKey) {
    try {
      const response = await api.get('/search', {
        params: { query },
        headers: { 'x-api-key': apiKey }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Download video
  static async downloadVideo(videoId, apiKey) {
    try {
      const response = await api.get(`/download/${videoId}`, {
        headers: { 'x-api-key': apiKey }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get stats
  static async getStats(apiKey, period = 'day') {
    try {
      const response = await api.get('/stats', {
        params: { period },
        headers: { 'x-api-key': apiKey }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get key info
  static async getKeyInfo(apiKey) {
    try {
      const response = await api.get('/key/info', {
        headers: { 'x-api-key': apiKey }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Test API connection
  static async testConnection(apiKey) {
    try {
      const response = await api.get('/test', {
        headers: { 'x-api-key': apiKey }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  static handleError(error) {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data.error || 'Server error',
        details: error.response.data.message,
        status: error.response.status
      };
    } else if (error.request) {
      // No response received
      return {
        message: 'Network error',
        details: 'Please check your internet connection',
        status: 0
      };
    } else {
      // Request setup error
      return {
        message: 'Request error',
        details: error.message,
        status: -1
      };
    }
  }
}

export default ApiService;
