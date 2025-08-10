// Module Missions complet
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Plus, Search, Filter, CheckCircle, AlertCircle, PlayCircle, PauseCircle, Eye, Edit, Trash2 } from 'lucide-react';

interface Mission {
  id: number;
  destination: string;
  lieu_depart: string;
  date_souhaitee: string;
  heure_depart: string;
  heure_retour: string;
  vehicule: any;
  chauffeur: any;
  demandeur: any;
  statut: string;
  distance_parcourue: number;
  observations: string;
}

const MissionCard: React.FC<{ mission: Mission; onStatusChange: (id: number, status: string) => void }> = ({ 
  mission, 
  onStatusChange 
}) => {
  const getStatusColor = (statut: string) => {
    switch (statut.toLowerCase()) {
      case 'terminee': return 'bg-green-100 text-green-800 border-green-200';
      case 'en_cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planifiee': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'en_attente': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'annulee': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut.toLowerCase()) {
      case 'terminee': return <CheckCircle size={16} />;
      case 'en_cours': return <PlayCircle size={16} />;
      case 'planifiee': return <Clock size={16} />;
      case 'en_attente': return <PauseCircle size={16} />;
      case 'annulee': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* En-tête */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="text-blue-500 mr-2" size={20} />
            {mission.destination}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Depuis: {mission.lieu_depart}
          </p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(mission.statut)}`}>
          {getStatusIcon(mission.statut)}
          <span className="ml-1 capitalize">{mission.statut.replace('_', ' ')}</span>
        </span>
      </div>

      {/* Détails */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-2" />
          <span>{mission.date_souhaitee} | {mission.heure_depart} - {mission.heure_retour}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-2" />
          <span>{mission.distance_parcourue} km parcourus</span>
        </div>
      </div>

      {/* Assignations */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">Véhicule:</span>
          <span className="text-gray-900 font-medium">
            {mission.vehicule ? `${mission.vehicule.immatriculation} (${mission.vehicule.marque})` : 'Non assigné'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">Chauffeur:</span>
          <span className="text-gray-900 font-medium">
            {mission.chauffeur ? mission.chauffeur.nom : 'Non assigné'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">Demandeur:</span>
          <span className="text-gray-900 font-medium">
            {mission.demandeur.nom} ({mission.demandeur.departement})
          </span>
        </div>
      </div>

      {/* Observations */}
      {mission.observations && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700 italic">"{mission.observations}"</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center">
          <Eye size={16} className="mr-1" />
          Détails
        </button>
        <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
          <Edit size={16} />
        </button>
        <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const Missions: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        // Simulation API call
        const response = await fetch('http://localhost:8000/api/missions/');
        const data = await response.json();
        setMissions(data.missions || []);
        
        // Fetch stats
        const statsResponse = await fetch('http://localhost:8000/api/missions/stats/dashboard');
        const statsData = await statsResponse.json();
        setStats(statsData);
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur de chargement des missions:', error);
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  const handleStatusChange = (id: number, newStatus: string) => {
    setMissions(missions.map(mission => 
      mission.id === id ? { ...mission, statut: newStatus } : mission
    ));
  };

  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.lieu_depart.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (mission.chauffeur && mission.chauffeur.nom.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || mission.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Chargement des missions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Missions</h1>
          <p className="text-gray-600 mt-1">
            Gestion des missions de transport ({missions.length} missions)
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus size={20} className="mr-2" />
          Nouvelle Mission
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Missions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total_missions || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <MapPin className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aujourd'hui</p>
              <p className="text-2xl font-bold text-green-600">{stats.missions_aujourd_hui || 0}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Clock className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Cours</p>
              <p className="text-2xl font-bold text-blue-600">{stats.missions_actives || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <PlayCircle className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux Completion</p>
              <p className="text-2xl font-bold text-purple-600">{stats.taux_completion || 0}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par destination, chauffeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="planifiee">Planifiée</option>
              <option value="en_cours">En cours</option>
              <option value="terminee">Terminée</option>
              <option value="annulee">Annulée</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des missions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMissions.length > 0 ? (
          filteredMissions.map((mission) => (
            <MissionCard 
              key={mission.id} 
              mission={mission} 
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter ? 'Aucune mission trouvée' : 'Aucune mission'}
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter
                ? 'Essayez de modifier vos filtres'
                : 'Commencez par créer votre première mission'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Missions;
