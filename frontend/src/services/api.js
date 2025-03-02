import axios from 'axios';
import API_CONFIG, { getApiUrl } from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dashboard API calls
export const dashboardService = {
  getPlacementData: () => 
    apiClient.get(API_CONFIG.ENDPOINTS.DASHBOARD.GET_PLACEMENT_DATA),
  
  getCompanyData: () => 
    apiClient.get(API_CONFIG.ENDPOINTS.DASHBOARD.GET_COMPANY_DATA),
  
  addPlacementData: (data) => 
    apiClient.post(API_CONFIG.ENDPOINTS.DASHBOARD.ADD_PLACEMENT_DATA, data),
  
  addCompanyData: (data) => 
    apiClient.post(API_CONFIG.ENDPOINTS.DASHBOARD.ADD_COMPANY_DATA, data),
  
  deletePlacementData: (params) => 
    apiClient.delete(API_CONFIG.ENDPOINTS.DASHBOARD.DELETE_PLACEMENT_DATA, { params }),
  
  deleteCompanyData: (params) => 
    apiClient.delete(API_CONFIG.ENDPOINTS.DASHBOARD.DELETE_COMPANY_DATA, { params })
};

// Add interceptors for handling tokens, errors, etc.
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient; 