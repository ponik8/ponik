import { useState } from 'react';
import { products as initialProducts } from '../data/mockData';
import { Product } from '../types';
import { Search, Package, AlertTriangle, TrendingDown, Plus, Minus, Edit } from 'lucide-react';

export default function WarehousePage() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editQuantity, setEditQuantity] = useState(0);

  const categories = [...new Set(productsList.map(p => p.category))];

  const filteredProducts = productsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = productsList.filter(p => p.stock <= p.minStock);

  const updateStock = (productId: string, delta: number) => {
    setProductsList(prev => prev.map(p => 
      p.id === productId ? { ...p, stock: Math.max(0, p.stock + delta) } : p
    ));
  };

  const saveEdit = () => {
    if (editingProduct) {
      setProductsList(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...p, stock: editQuantity } : p
      ));
      setEditingProduct(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Склад</h1>
        <p className="text-slate-500 mt-1">Управление товарами и остатками</p>
      </div>

      {/* Alerts */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={20} className="text-amber-600" />
            <span className="font-medium text-amber-800">Товары с низким остатком</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStockProducts.map(p => (
              <span key={p.id} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                {p.name} ({p.stock} {p.unit})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{productsList.length}</div>
              <div className="text-sm text-slate-500">Всего позиций</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{lowStockProducts.length}</div>
              <div className="text-sm text-slate-500">Низкий остаток</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingDown size={20} className="text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{categories.length}</div>
              <div className="text-sm text-slate-500">Категорий</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск товара..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все категории</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Товар</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Категория</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Цена</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Остаток</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Мин.</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProducts.map(product => (
                <tr key={product.id} className={`hover:bg-slate-50 transition-colors ${product.stock <= product.minStock ? 'bg-red-50/50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{product.name}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">{product.category}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{product.price} ₽</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${product.stock <= product.minStock ? 'text-red-600' : 'text-slate-800'}`}>
                        {product.stock}
                      </span>
                      <span className="text-xs text-slate-400">{product.unit}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{product.minStock} {product.unit}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => updateStock(product.id, -1)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Уменьшить"
                      >
                        <Minus size={14} />
                      </button>
                      <button
                        onClick={() => updateStock(product.id, 1)}
                        className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Увеличить"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => { setEditingProduct(product); setEditQuantity(product.stock); }}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setEditingProduct(null)}>
          <div className="bg-white rounded-2xl max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Редактировать остаток</h2>
            <div className="mb-2 text-sm text-slate-500">{editingProduct.name}</div>
            <div className="mb-4">
              <label className="text-sm font-medium text-slate-700 mb-1 block">Количество ({editingProduct.unit})</label>
              <input
                type="number"
                value={editQuantity}
                onChange={e => setEditQuantity(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={0}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
