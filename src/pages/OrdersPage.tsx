import { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { orders as initialOrders, statusLabels, statusColors, users } from '../data/mockData';
import { Search, Filter, Eye, Edit, UserPlus, MapPin, Phone } from '../components/Icons';

interface OrdersPageProps {
  onNavigate: (page: string) => void;
}

export default function OrdersPage({ onNavigate }: OrdersPageProps) {
  const [ordersList, setOrdersList] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const couriers = users.filter(u => u.role === 'courier');

  const filteredOrders = ordersList.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.number.toLowerCase().includes(search.toLowerCase()) ||
      order.address.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const assignCourier = (orderId: string, courierId: string) => {
    const courier = couriers.find(c => c.id === courierId);
    if (courier) {
      setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, courier: courier.name, courierId: courier.id, status: 'assembling' } : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, courier: courier.name, courierId: courier.id, status: 'assembling' } : null);
      }
    }
    setShowAssignModal(false);
  };

  const getNextStatus = (status: OrderStatus): OrderStatus | null => {
    const flow: Record<string, OrderStatus> = {
      'new': 'processing',
      'processing': 'assembling',
      'assembling': 'ready',
      'ready': 'delivering',
      'delivering': 'delivered',
    };
    return flow[status] || null;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Заказы</h1>
          <p className="text-slate-500 mt-1">Управление заказами и их статусами</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по клиенту, номеру, адресу..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все статусы</option>
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Номер</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Клиент</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase hidden md:table-cell">Адрес</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Сумма</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Статус</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell">Курьер</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-medium text-slate-800">{order.number}</span>
                    <div className="text-xs text-slate-400">{order.createdAt}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{order.customer}</div>
                    <div className="text-xs text-slate-400">{order.phone}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="text-sm text-slate-600 max-w-[200px] truncate">{order.address}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{order.total} ₽</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-sm text-slate-600">{order.courier || '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Просмотр"
                      >
                        <Eye size={16} />
                      </button>
                      {order.status === 'new' && (
                        <button
                          onClick={() => { setSelectedOrder(order); setShowAssignModal(true); }}
                          className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Назначить курьера"
                        >
                          <UserPlus size={16} />
                        </button>
                      )}
                      {getNextStatus(order.status) && (
                        <button
                          onClick={() => updateOrderStatus(order.id, getNextStatus(order.status)!)}
                          className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Следующий статус"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && !showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">Заказ {selectedOrder.number}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedOrder.status]}`}>
                  {statusLabels[selectedOrder.status]}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-400 uppercase font-medium">Клиент</div>
                  <div className="font-medium text-slate-800">{selectedOrder.customer}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-medium">Телефон</div>
                  <div className="font-medium text-slate-800">{selectedOrder.phone}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-medium flex items-center gap-1">
                  <MapPin size={12} /> Адрес доставки
                </div>
                <div className="font-medium text-slate-800">{selectedOrder.address}</div>
              </div>
              {selectedOrder.courier && (
                <div>
                  <div className="text-xs text-slate-400 uppercase font-medium flex items-center gap-1">
                    <Phone size={12} /> Курьер
                  </div>
                  <div className="font-medium text-slate-800">{selectedOrder.courier}</div>
                </div>
              )}
              <div>
                <div className="text-xs text-slate-400 uppercase font-medium mb-2">Состав заказа</div>
                <div className="space-y-2">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-50">
                      <div>
                        <span className="text-slate-800">{item.name}</span>
                        <span className="text-slate-400 ml-2">×{item.quantity}</span>
                      </div>
                      <span className="font-medium text-slate-800">{item.price * item.quantity} ₽</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 mt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-800">Итого:</span>
                  <span className="font-bold text-lg text-slate-800">{selectedOrder.total} ₽</span>
                </div>
              </div>
              {getNextStatus(selectedOrder.status) && (
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, getNextStatus(selectedOrder.status)!)}
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Перевести в: {statusLabels[getNextStatus(selectedOrder.status)!]}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Assign Courier Modal */}
      {showAssignModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAssignModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Назначить курьера</h2>
              <p className="text-sm text-slate-500 mt-1">Заказ {selectedOrder.number}</p>
            </div>
            <div className="p-6 space-y-2">
              {couriers.map(courier => (
                <button
                  key={courier.id}
                  onClick={() => assignCourier(selectedOrder.id, courier.id)}
                  className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white font-bold">
                      {courier.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{courier.name}</div>
                      <div className="text-sm text-slate-500">{courier.phone}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
