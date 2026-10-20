import { useState } from 'react';
import { User } from './types';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import CourierPage from './pages/CourierPage';
import WarehousePage from './pages/WarehousePage';
import AssemblyPage from './pages/AssemblyPage';
import EmployeesPage from './pages/EmployeesPage';
import { Menu, X } from 'lucide-react';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('дашборд');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('дашборд');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'дашборд':
        return <Dashboard user={user} onNavigate={handleNavigate} />;
      case 'заказы':
        return <OrdersPage onNavigate={handleNavigate} />;
      case 'мои-доставки':
        return <CourierPage user={user} />;
      case 'склад':
        return <WarehousePage />;
      case 'сборка-заказов':
        return <AssemblyPage />;
      case 'сотрудники':
        return <EmployeesPage />;
      case 'настройки':
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Настройки</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <p className="text-slate-500">Раздел настроек находится в разработке</p>
            </div>
          </div>
        );
      default:
        return <Dashboard user={user} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar - desktop */}
      <div className="hidden lg:block">
        <Sidebar
          user={user}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      </div>

      {/* Sidebar - mobile */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar
          user={user}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">ДВ</span>
            </div>
            <span className="font-bold text-slate-800">ДелоВкус</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
