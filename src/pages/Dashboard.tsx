import { Order, User } from '../types';
import { orders } from '../data/mockData';
import { statusLabels, statusColors } from '../data/mockData';
import { 
  ShoppingCart, Truck, CheckCircle, DollarSign, 
  Package, Users, TrendingUp, Clock
} from '../components/Icons';

interface DashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export default function Dashboard({ user, onNavigate }: DashboardProps) {
  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length;
  const deliveredToday = orders.filter(o => o.status === 'delivered').length;
  const revenue = orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0);
  const pendingAssembly = orders.filter(o => ['new', 'processing'].includes(o.status)).length;
  const availableCouriers = 3;

  const stats = [
    { label: 'Всего заказов', value: totalOrders, icon: <ShoppingCart size={24} />, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Активных', value: activeOrders, icon: <Clock size={24} />, color: 'from-yellow-500 to-orange-500', change: '+5%' },
    { label: 'Доставлено', value: deliveredToday, icon: <CheckCircle size={24} />, color: 'from-green-500 to-emerald-600', change: '+18%' },
    { label: 'Выручка', value: `${revenue.toLocaleString()} ₽`, icon: <DollarSign size={24} />, color: 'from-purple-500 to-purple-600', change: '+8%' },
    { label: 'Ожидают сборки', value: pendingAssembly, icon: <Package size={24} />, color: 'from-pink-500 to-rose-500', change: '-3%' },
    { label: 'Курьеры', value: availableCouriers, icon: <Users size={24} />, color: 'from-cyan-500 to-teal-500', change: '0%' },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Добро пожаловать, {user.name.split(' ')[0]}!</h1>
        <p className="text-slate-500 mt-1">Обзор текущего состояния доставки</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                <TrendingUp size={14} />
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Последние заказы</h2>
            <button 
              onClick={() => onNavigate('заказы')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Все заказы →
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentOrders.map(order => (
              <div key={order.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-800">{order.number}</div>
                    <div className="text-sm text-slate-500">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                    <div className="text-sm font-medium text-slate-700 mt-1">{order.total} ₽</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">Активность курьеров</h2>
          </div>
          <div className="p-4 space-y-3">
            {[
              { name: 'Петров Сергей', status: 'В доставке', orders: 3, color: 'bg-orange-500' },
              { name: 'Козлова Мария', status: 'Ожидает заказ', orders: 0, color: 'bg-green-500' },
              { name: 'Волков Андрей', status: 'В доставке', orders: 2, color: 'bg-orange-500' },
            ].map(courier => (
              <div key={courier.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-sm font-bold">
                  {courier.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-800 text-sm">{courier.name}</div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${courier.color}`}></div>
                    <span className="text-xs text-slate-500">{courier.status}</span>
                  </div>
                </div>
                <div className="text-sm text-slate-600">
                  {courier.orders > 0 ? `${courier.orders} заказов` : 'Свободен'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
