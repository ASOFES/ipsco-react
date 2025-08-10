// Application principale IPSCO React
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Vehicules from './components/Vehicules';
import Missions from './components/Missions';
import './App.css';

const Chauffeurs: React.FC = () => (
  <div className="text-center py-12">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Chauffeurs</h1>
    <p className="text-gray-600">Module des chauffeurs en cours de développement...</p>
  </div>
);

const Rapports: React.FC = () => (
  <div className="text-center py-12">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Rapports</h1>
    <p className="text-gray-600">Module des rapports en cours de développement...</p>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vehicules" element={<Vehicules />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/chauffeurs" element={<Chauffeurs />} />
          <Route path="/rapports" element={<Rapports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
