// Service API pour communiquer avec FastAPI
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types TypeScript
export interface Vehicule {
  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  couleur: string;
  statut: string;
}

export interface Mission {
  id: number;
  vehicule: string;
  chauffeur: string;
  destination: string;
  date: string;
  statut: string;
  distance_km: number;
}

export interface DashboardStats {
  vehicules_total: number;
  vehicules_actifs: number;
  vehicules_maintenance: number;
  missions_aujourd_hui: number;
  missions_terminées: number;
  missions_en_cours: number;
  chauffeurs_actifs: number;
  kilometrage_total: number;
  carburant_consommé: string;
}

// API Calls
export const apiService = {
  // Dashboard
  async getDashboard() {
    const response = await api.get('/demo/dashboard');
    return response.data;
  },

  async getStats() {
    const response = await api.get('/stats');
    return response.data;
  },

  // Véhicules
  async getVehicules() {
    const response = await api.get('/demo/vehicules');
    return response.data;
  },

  // Missions
  async getMissions() {
    const response = await api.get('/demo/missions');
    return response.data;
  },

  // Health check
  async getHealth() {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;
