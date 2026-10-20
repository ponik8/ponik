import { useState } from 'react';
import { orders as initialOrders, statusLabels, statusColors } from '../data/mockData';
import { User } from '../types';
import { MapPin, Phone, Clock, Navigation, CheckCircle, Package, AlertCircle } from 'lucide-react';

interface CourierPageProps {
  user: User;
}

export default function CourierPage({ user }: CourierPageProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  
  // Filter orders assigned to this courier
  const myOrders = initialOrders.filter(o => o.courierId === user.id);
  const activeOrders = myOrders.filter(o => ['assembling', 'ready', 'delivering'].includes(o.status));
  const completedOrders = myOrders.filter(o => o.status === 'delivered');

  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>(
    Object.fromEntries(myOrders.map(o => [o.id, o.status]))
  );

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrderStatuses(prev => ({ ...prev, [orderId]: newStatus }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Мои доставки</h1>
        <p className="text-slate-500 mt-1">Управление вашими активными доставками</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-orange-600">{activeOrders.length}</div>
          <div className="text-sm text-slate-500">Активных</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-green-600">{completedOrders.length}</div>
          <div className="text-sm text-slate-500">Доставлено</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-blue-600">
            {completedOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()} ₽
          </div>
          <div className="text-sm text-slate-500">Заработано</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'active' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          Активные ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          История ({completedOrders.length})
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {(activeTab === 'active' ? activeOrders : completedOrders).map(order => {
          const currentStatus = orderStatuses[order.id] || order.status;
          return (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-slate-800">{order.number}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[currentStatus]}`}>
                      {statusLabels[currentStatus]}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-slate-800">{order.total} ₽</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={16} className="text-slate-400" />
                    <span className="text-sm">{order.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone size={16} className="text-slate-400" />
                    <span className="text-sm">{order.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-sm">Доставить до: {order.estimatedDelivery || '30 мин'}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                  <div className="text-xs text-slate-400 uppercase font-medium mb-2">Состав:</div>
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm py-1">
                      <span className="text-slate-700">{item.name} ×{item.quantity}</span>
                      <span className="text-slate-500">{item.price * item.quantity} ₽</span>
                    </div>
                  ))}
                </div>

                {activeTab === 'active' && (
                  <div className="flex gap-2">
                    {currentStatus === 'ready' && (
                      <button
                        onClick={() => updateStatus(order.id, 'delivering')}
                        className="flex-1 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Navigation size={16} />
                        Выехать на доставку
                      </button>
                    )}
                    {currentStatus === 'delivering' && (
                      <button
                        onClick={() => updateStatus(order.id, 'delivered')}
                        className="flex-1 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={16} />
                        Доставлено
                      </button>
                    )}
                    {currentStatus === 'assembling' && (
                      <div className="flex-1 py-2.5 bg-slate-100 text-slate-500 font-medium rounded-lg flex items-center justify-center gap-2">
                        <Package size={16} />
                        Ожидание сборки...
                      </div>
                    )}
                    <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                      <Phone size={16} />
                    </button>
                    <button className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                      <Navigation size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {(activeTab === 'active' ? activeOrders : completedOrders).length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-600">Нет заказов</h3>
            <p className="text-slate-400 mt-1">
              {activeTab === 'active' ? 'У вас пока нет активных доставок' : 'История доставок пуста'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
