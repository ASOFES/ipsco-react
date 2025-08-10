// Dashboard principal
import React, { useState, useEffect } from 'react';
import { Car, MapPin, Users, AlertTriangle, TrendingUp, Fuel } from 'lucide-react';
import { apiService } from '../services/api';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, trend }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-1 flex items-center">
            <TrendingUp size={16} className="mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [apiStatus, setApiStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboard, stats] = await Promise.all([
          apiService.getDashboard(),
          apiService.getStats()
        ]);
        
        setDashboardData(dashboard);
        setApiStatus(stats);
        setLoading(false);
      } catch (error) {
        console.error('Erreur de chargement:', error);
        setLoading(false);
      }
    };

    fetchData();
    // Actualiser toutes les 30 secondes
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Chargement du tableau de bord...</span>
      </div>
    );
  }

  const dashboard = dashboardData?.dashboard || {};
  const alertes = dashboardData?.alertes || [];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">Tableau de Bord IPSCO</h1>
        <p className="text-blue-100 mt-2">
          Gestion intelligente de votre parc automobile
        </p>
        <div className="mt-4 flex items-center text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            API Status: {apiStatus?.system_status || 'Active'}
          </div>
          <div className="ml-6">
            Mode: {dashboardData?.mode || 'Démonstration'}
          </div>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Véhicules Total"
          value={dashboard.vehicules_total || 0}
          icon={<Car size={24} className="text-white" />}
          color="bg-blue-500"
          trend="+2 ce mois"
        />
        <StatsCard
          title="Missions Aujourd'hui"
          value={dashboard.missions_aujourd_hui || 0}
          icon={<MapPin size={24} className="text-white" />}
          color="bg-green-500"
          trend="+15%"
        />
        <StatsCard
          title="Chauffeurs Actifs"
          value={dashboard.chauffeurs_actifs || 0}
          icon={<Users size={24} className="text-white" />}
          color="bg-purple-500"
        />
        <StatsCard
          title="Kilométrage Total"
          value={`${dashboard.kilometrage_total || 0} km`}
          icon={<TrendingUp size={24} className="text-white" />}
          color="bg-orange-500"
          trend="+8% ce mois"
        />
      </div>

      {/* Graphiques et alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Répartition des véhicules */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            État des Véhicules
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Véhicules Actifs</span>
              </div>
              <span className="font-semibold">{dashboard.vehicules_actifs || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-gray-700">En Mission</span>
              </div>
              <span className="font-semibold">{dashboard.missions_en_cours || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-gray-700">En Maintenance</span>
              </div>
              <span className="font-semibold">{dashboard.vehicules_maintenance || 0}</span>
            </div>
          </div>

          {/* Consommation carburant */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Fuel className="text-blue-500 mr-2" size={20} />
                <span className="text-gray-700 font-medium">Carburant Consommé</span>
              </div>
              <span className="text-xl font-bold text-blue-600">
                {dashboard.carburant_consommé || '0L'}
              </span>
            </div>
          </div>
        </div>

        {/* Alertes */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="text-orange-500 mr-2" size={20} />
            Alertes
          </h3>
          <div className="space-y-3">
            {alertes.length > 0 ? (
              alertes.map((alerte: string, index: number) => (
                <div key={index} className="flex items-start p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertTriangle className="text-orange-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-sm text-orange-800">{alerte}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  ✅
                </div>
                Aucune alerte
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
            <Car className="text-blue-600 mr-3" size={20} />
            <span className="text-blue-800 font-medium">Ajouter un Véhicule</span>
          </button>
          <button className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
            <MapPin className="text-green-600 mr-3" size={20} />
            <span className="text-green-800 font-medium">Nouvelle Mission</span>
          </button>
          <button className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
            <Users className="text-purple-600 mr-3" size={20} />
            <span className="text-purple-800 font-medium">Gérer Chauffeurs</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
