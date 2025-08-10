// Layout principal de l'application
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Car, 
  MapPin, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  Bell,
  User
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Véhicules', href: '/vehicules', icon: Car },
    { name: 'Missions', href: '/missions', icon: MapPin },
    { name: 'Chauffeurs', href: '/chauffeurs', icon: Users },
    { name: 'Rapports', href: '/rapports', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-blue-900 text-white transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>
            🚗 IPSCO
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded hover:bg-blue-800"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="mt-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium hover:bg-blue-800 transition-colors ${
                  isActive ? 'bg-blue-800 border-r-2 border-white' : ''
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span className={!isSidebarOpen ? 'hidden' : ''}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Status API */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-green-600 rounded-lg p-2 text-xs text-center">
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></div>
              {isSidebarOpen && 'API FastAPI Active'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Gestion de Parc Automobile
            </h2>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
