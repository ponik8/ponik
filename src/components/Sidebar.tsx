import React from 'react';
import { User } from '../types';
import { 
  LayoutDashboard, ClipboardList, Truck, Package, 
  Users, LogOut, Warehouse, Settings
} from './Icons';

interface SidebarProps {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const menuItems: Record<string, { label: string; icon: React.ReactNode; roles: string[] }[]> = {
  main: [
    { label: 'Дашборд', icon: <LayoutDashboard size={20} />, roles: ['manager', 'warehouse', 'courier', 'admin'] },
  ],
  orders: [
    { label: 'Заказы', icon: <ClipboardList size={20} />, roles: ['manager', 'warehouse'] },
    { label: 'Мои доставки', icon: <Truck size={20} />, roles: ['courier'] },
  ],
  warehouse: [
    { label: 'Склад', icon: <Warehouse size={20} />, roles: ['warehouse', 'manager'] },
    { label: 'Сборка заказов', icon: <Package size={20} />, roles: ['warehouse'] },
  ],
  management: [
    { label: 'Сотрудники', icon: <Users size={20} />, roles: ['manager', 'admin'] },
    { label: 'Настройки', icon: <Settings size={20} />, roles: ['admin'] },
  ],
};

export default function Sidebar({ user, currentPage, onNavigate, onLogout }: SidebarProps) {
  const roleLabels: Record<string, string> = {
    manager: 'Менеджер',
    courier: 'Курьер',
    warehouse: 'Кладовщик',
    admin: 'Администратор',
  };

  const allItems = Object.values(menuItems).flat().filter(item => item.roles.includes(user.role));

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
            <Truck size={22} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">ДелоВкус</h1>
            <p className="text-xs text-slate-400">Управление доставкой</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-sm font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user.name}</div>
            <div className="text-xs text-slate-400">{roleLabels[user.role]}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {allItems.map(item => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label.toLowerCase().replace(/\s+/g, '-'))}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              currentPage === item.label.toLowerCase().replace(/\s+/g, '-')
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-150"
        >
          <LogOut size={20} />
          Выйти
        </button>
      </div>
    </aside>
  );
}
