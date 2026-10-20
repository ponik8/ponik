import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { users } from '../data/mockData';
import { Truck, Shield, Package, ClipboardList } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const roleInfo: Record<UserRole, { label: string; icon: React.ReactNode; color: string }> = {
  manager: { label: 'Менеджер', icon: <ClipboardList size={24} />, color: 'from-blue-500 to-blue-700' },
  courier: { label: 'Курьер', icon: <Truck size={24} />, color: 'from-orange-500 to-orange-700' },
  warehouse: { label: 'Кладовщик', icon: <Package size={24} />, color: 'from-green-500 to-green-700' },
  admin: { label: 'Администратор', icon: <Shield size={24} />, color: 'from-purple-500 to-purple-700' },
};

export default function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = selectedRole ? users.filter(u => u.role === selectedRole) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
            <Truck size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">ДелоВкус</h1>
          <p className="text-blue-200 text-lg">Система управления доставкой</p>
        </div>

        {!selectedRole ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Выберите роль</h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(roleInfo).map(([role, info]) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role as UserRole)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${info.color} text-white font-medium hover:scale-105 transition-all duration-200 shadow-lg`}
                >
                  {info.icon}
                  <span>{info.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <button
              onClick={() => { setSelectedRole(null); setSelectedUser(null); }}
              className="text-blue-200 hover:text-white mb-4 flex items-center gap-1 text-sm"
            >
              ← Назад к выбору роли
            </button>
            <h2 className="text-xl font-semibold text-white mb-4">
              Выберите пользователя ({roleInfo[selectedRole].label})
            </h2>
            <div className="space-y-2">
              {filteredUsers.map(user => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    selectedUser?.id === user.id
                      ? 'bg-white/20 border border-white/40'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleInfo[user.role].color} flex items-center justify-center text-white font-bold`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-blue-200 text-sm">{user.phone}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {selectedUser && (
              <button
                onClick={() => onLogin(selectedUser)}
                className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow-lg"
              >
                Войти как {selectedUser.name}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
