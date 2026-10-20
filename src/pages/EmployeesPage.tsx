import { useState } from 'react';
import { users as initialUsers } from '../data/mockData';
import { User, UserRole } from '../types';
import { Search, Phone, Mail, Plus, Edit, Trash2, UserCheck } from 'lucide-react';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', phone: '', email: '', role: 'courier' as UserRole });

  const roleLabels: Record<string, string> = {
    manager: 'Менеджер',
    courier: 'Курьер',
    warehouse: 'Кладовщик',
    admin: 'Администратор',
  };

  const roleColors: Record<string, string> = {
    manager: 'bg-blue-100 text-blue-800',
    courier: 'bg-orange-100 text-orange-800',
    warehouse: 'bg-green-100 text-green-800',
    admin: 'bg-purple-100 text-purple-800',
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.phone.includes(search) || emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || emp.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.phone) {
      const emp: User = {
        id: String(Date.now()),
        name: newEmployee.name,
        phone: newEmployee.phone,
        email: newEmployee.email,
        role: newEmployee.role,
      };
      setEmployees(prev => [...prev, emp]);
      setNewEmployee({ name: '', phone: '', email: '', role: 'courier' });
      setShowAddModal(false);
    }
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Сотрудники</h1>
          <p className="text-slate-500 mt-1">Управление персоналом</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Добавить
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(roleLabels).map(([role, label]) => {
          const count = employees.filter(e => e.role === role).length;
          return (
            <div key={role} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${roleColors[role]}`}>
                  <UserCheck size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{count}</div>
                  <div className="text-sm text-slate-500">{label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск сотрудника..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все роли</option>
            {Object.entries(roleLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map(emp => (
          <div key={emp.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  emp.role === 'manager' ? 'bg-gradient-to-br from-blue-500 to-blue-700' :
                  emp.role === 'courier' ? 'bg-gradient-to-br from-orange-500 to-orange-700' :
                  emp.role === 'warehouse' ? 'bg-gradient-to-br from-green-500 to-green-700' :
                  'bg-gradient-to-br from-purple-500 to-purple-700'
                }`}>
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{emp.name}</div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[emp.role]}`}>
                    {roleLabels[emp.role]}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => deleteEmployee(emp.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Phone size={14} className="text-slate-400" />
                {emp.phone}
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail size={14} className="text-slate-400" />
                {emp.email}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Добавить сотрудника</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">ФИО</label>
                <input
                  type="text"
                  value={newEmployee.name}
                  onChange={e => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Телефон</label>
                <input
                  type="text"
                  value={newEmployee.phone}
                  onChange={e => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+7 (900) 000-00-00"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
                <input
                  type="text"
                  value={newEmployee.email}
                  onChange={e => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Роль</label>
                <select
                  value={newEmployee.role}
                  onChange={e => setNewEmployee(prev => ({ ...prev, role: e.target.value as UserRole }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(roleLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={addEmployee}
                className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
