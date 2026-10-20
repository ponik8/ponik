import { useState } from 'react';
import { orders as initialOrders, statusLabels, statusColors } from '../data/mockData';
import { Package, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function AssemblyPage() {
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>(
    Object.fromEntries(initialOrders.map(o => [o.id, o.status]))
  );

  const ordersToAssemble = initialOrders.filter(o => {
    const status = orderStatuses[o.id];
    return ['processing', 'assembling'].includes(status);
  });

  const readyOrders = initialOrders.filter(o => {
    const status = orderStatuses[o.id];
    return status === 'ready';
  });

  const markAssembled = (orderId: string) => {
    setOrderStatuses(prev => ({ ...prev, [orderId]: 'ready' }));
  };

  const startAssembly = (orderId: string) => {
    setOrderStatuses(prev => ({ ...prev, [orderId]: 'assembling' }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Сборка заказов</h1>
        <p className="text-slate-500 mt-1">Сборка и комплектация заказов для доставки</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-yellow-600">{ordersToAssemble.filter(o => orderStatuses[o.id] === 'processing').length}</div>
          <div className="text-sm text-slate-500">Ожидают сборки</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-purple-600">{ordersToAssemble.filter(o => orderStatuses[o.id] === 'assembling').length}</div>
          <div className="text-sm text-slate-500">В процессе сборки</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <div className="text-3xl font-bold text-green-600">{readyOrders.length}</div>
          <div className="text-sm text-slate-500">Готовы к выдаче</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* In Progress */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Clock size={20} className="text-yellow-600" />
            В работе
          </h2>
          <div className="space-y-3">
            {ordersToAssemble.map(order => {
              const status = orderStatuses[order.id];
              return (
                <div key={order.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
                  status === 'assembling' ? 'border-purple-300' : 'border-slate-100'
                }`}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{order.number}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
                          {statusLabels[status]}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-slate-600">{order.total} ₽</span>
                    </div>
                    
                    <div className="text-sm text-slate-500 mb-3">
                      <div>👤 {order.customer}</div>
                      <div>📍 {order.address}</div>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3 mb-3">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm py-1">
                          <span className="text-slate-700">{item.name} ×{item.quantity}</span>
                          <span className="text-slate-500">{item.price * item.quantity} ₽</span>
                        </div>
                      ))}
                    </div>

                    {status === 'processing' && (
                      <button
                        onClick={() => startAssembly(order.id)}
                        className="w-full py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Package size={16} />
                        Начать сборку
                      </button>
                    )}
                    {status === 'assembling' && (
                      <button
                        onClick={() => markAssembled(order.id)}
                        className="w-full py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={16} />
                        Сборка завершена
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {ordersToAssemble.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 text-center">
                <AlertCircle size={40} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">Нет заказов в работе</p>
              </div>
            )}
          </div>
        </div>

        {/* Ready */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            Готовы к выдаче
          </h2>
          <div className="space-y-3">
            {readyOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-green-200 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{order.number}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-600">{order.total} ₽</span>
                  </div>
                  
                  <div className="text-sm text-slate-500 mb-2">
                    <div>👤 {order.customer}</div>
                    <div>📍 {order.address}</div>
                    {order.courier && <div>🚗 {order.courier}</div>}
                  </div>

                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xs text-green-600 font-medium mb-1">✓ Собрано:</div>
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm py-0.5">
                        <span className="text-green-800">{item.name} ×{item.quantity}</span>
                        <span className="text-green-600">✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {readyOrders.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 text-center">
                <AlertCircle size={40} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">Нет готовых заказов</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
