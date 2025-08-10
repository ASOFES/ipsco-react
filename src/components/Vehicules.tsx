// Page des véhicules
import React, { useState, useEffect } from 'react';
import { Search, Plus, Car, Settings, MapPin, AlertCircle } from 'lucide-react';
import { apiService, Vehicule } from '../services/api';

const VehiculeCard: React.FC<{ vehicule: Vehicule }> = ({ vehicule }) => {
  const getStatusColor = (statut: string) => {
    switch (statut.toLowerCase()) {
      case 'actif': return 'bg-green-100 text-green-800 border-green-200';
      case 'en mission': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut.toLowerCase()) {
      case 'actif': return <Car size={16} />;
      case 'en mission': return <MapPin size={16} />;
      case 'maintenance': return <AlertCircle size={16} />;
      default: return <Car size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {vehicule.immatriculation}
          </h3>
          <p className="text-gray-600">
            {vehicule.marque} {vehicule.modele}
          </p>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Settings size={18} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Couleur:</span>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                 style={{ backgroundColor: vehicule.couleur.toLowerCase() }}></div>
            <span className="text-gray-900 capitalize">{vehicule.couleur}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">Statut:</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(vehicule.statut)}`}>
            {getStatusIcon(vehicule.statut)}
            <span className="ml-1 capitalize">{vehicule.statut}</span>
          </span>
        </div>
      </div>

      <div className="mt-6 flex space-x-2">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
          Voir Détails
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
          Modifier
        </button>
      </div>
    </div>
  );
};

const Vehicules: React.FC = () => {
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVehicules = async () => {
      try {
        const data = await apiService.getVehicules();
        setVehicules(data.vehicules || []);
        setLoading(false);
      } catch (error) {
        console.error('Erreur de chargement des véhicules:', error);
        setLoading(false);
      }
    };

    fetchVehicules();
  }, []);

  const filteredVehicules = vehicules.filter(vehicule =>
    vehicule.immatriculation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicule.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicule.modele.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Chargement des véhicules...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Véhicules</h1>
          <p className="text-gray-600 mt-1">
            Gestion de votre parc automobile ({vehicules.length} véhicules)
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus size={20} className="mr-2" />
          Ajouter un véhicule
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher par immatriculation, marque ou modèle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Véhicules Actifs</p>
              <p className="text-2xl font-bold text-green-600">
                {vehicules.filter(v => v.statut.toLowerCase() === 'actif').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Car className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Mission</p>
              <p className="text-2xl font-bold text-blue-600">
                {vehicules.filter(v => v.statut.toLowerCase() === 'en mission').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <MapPin className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Maintenance</p>
              <p className="text-2xl font-bold text-red-600">
                {vehicules.filter(v => v.statut.toLowerCase() === 'maintenance').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Liste des véhicules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicules.length > 0 ? (
          filteredVehicules.map((vehicule) => (
            <VehiculeCard key={vehicule.id} vehicule={vehicule} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Car className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Aucun véhicule trouvé' : 'Aucun véhicule'}
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? 'Essayez une autre recherche'
                : 'Commencez par ajouter votre premier véhicule'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicules;
