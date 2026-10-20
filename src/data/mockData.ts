import { User, Order, Product } from '../types';

export const users: User[] = [
  { id: '1', name: 'Иванов Алексей', role: 'manager', phone: '+7 (900) 123-45-67', email: 'ivanov@delovkus.ru' },
  { id: '2', name: 'Петров Сергей', role: 'courier', phone: '+7 (900) 234-56-78', email: 'petrov@delovkus.ru' },
  { id: '3', name: 'Козлова Мария', role: 'courier', phone: '+7 (900) 345-67-89', email: 'kozlova@delovkus.ru' },
  { id: '4', name: 'Сидоров Дмитрий', role: 'warehouse', phone: '+7 (900) 456-78-90', email: 'sidorov@delovkus.ru' },
  { id: '5', name: 'Николаева Анна', role: 'warehouse', phone: '+7 (900) 567-89-01', email: 'nikolaeva@delovkus.ru' },
  { id: '6', name: 'Волков Андрей', role: 'courier', phone: '+7 (900) 678-90-12', email: 'volkov@delovkus.ru' },
];

export const orders: Order[] = [
  {
    id: '1', number: 'ДВ-001', customer: 'Смирнов Виктор', phone: '+7 (911) 111-22-33',
    address: 'ул. Ленина, д. 15, кв. 42',
    items: [
      { id: 'i1', name: 'Пицца Маргарита', quantity: 2, price: 590 },
      { id: 'i2', name: 'Кола 1л', quantity: 2, price: 120 },
    ],
    status: 'new', total: 1420, createdAt: '2024-01-15 10:30',
  },
  {
    id: '2', number: 'ДВ-002', customer: 'Кузнецова Елена', phone: '+7 (911) 222-33-44',
    address: 'пр. Мира, д. 28, кв. 7',
    items: [
      { id: 'i3', name: 'Бургер Классик', quantity: 1, price: 450 },
      { id: 'i4', name: 'Картофель фри', quantity: 1, price: 180 },
      { id: 'i5', name: 'Молочный коктейль', quantity: 2, price: 250 },
    ],
    status: 'processing', total: 1130, createdAt: '2024-01-15 10:45',
  },
  {
    id: '3', number: 'ДВ-003', customer: 'Попов Дмитрий', phone: '+7 (911) 333-44-55',
    address: 'ул. Садовая, д. 5, кв. 101',
    items: [
      { id: 'i6', name: 'Суши-сет Филадельфия', quantity: 1, price: 890 },
      { id: 'i7', name: 'Ролл Калифорния', quantity: 2, price: 520 },
    ],
    status: 'assembling', total: 1930, courier: 'Петров Сергей', courierId: '2', createdAt: '2024-01-15 09:15',
    estimatedDelivery: '2024-01-15 11:30',
  },
  {
    id: '4', number: 'ДВ-004', customer: 'Васильева Ольга', phone: '+7 (911) 444-55-66',
    address: 'ул. Пушкина, д. 10, кв. 55',
    items: [
      { id: 'i8', name: 'Цезарь с курицей', quantity: 1, price: 380 },
      { id: 'i9', name: 'Томатный суп', quantity: 1, price: 290 },
    ],
    status: 'ready', total: 670, courier: 'Козлова Мария', courierId: '3', createdAt: '2024-01-15 09:00',
    estimatedDelivery: '2024-01-15 11:00',
  },
  {
    id: '5', number: 'ДВ-005', customer: 'Морозов Игорь', phone: '+7 (911) 555-66-77',
    address: 'ул. Гагарина, д. 22, кв. 18',
    items: [
      { id: 'i10', name: 'Стейк Рибай', quantity: 1, price: 1890 },
      { id: 'i11', name: 'Бокал красного вина', quantity: 2, price: 450 },
      { id: 'i12', name: 'Тирамису', quantity: 1, price: 390 },
    ],
    status: 'delivering', total: 3180, courier: 'Волков Андрей', courierId: '6', createdAt: '2024-01-15 08:30',
    estimatedDelivery: '2024-01-15 10:45',
  },
  {
    id: '6', number: 'ДВ-006', customer: 'Лебедева Наталья', phone: '+7 (911) 666-77-88',
    address: 'ул. Чехова, д. 8, кв. 33',
    items: [
      { id: 'i13', name: 'Паста Карбонара', quantity: 2, price: 420 },
    ],
    status: 'delivered', total: 840, courier: 'Петров Сергей', courierId: '2', createdAt: '2024-01-15 08:00',
    estimatedDelivery: '2024-01-15 10:00',
  },
  {
    id: '7', number: 'ДВ-007', customer: 'Новиков Артём', phone: '+7 (911) 777-88-99',
    address: 'ул. Советская, д. 45, кв. 12',
    items: [
      { id: 'i14', name: 'Шашлык из свинины', quantity: 3, price: 650 },
      { id: 'i15', name: 'Лаваш', quantity: 3, price: 50 },
      { id: 'i16', name: 'Соус барбекю', quantity: 2, price: 80 },
    ],
    status: 'new', total: 2260, createdAt: '2024-01-15 11:00',
  },
  {
    id: '8', number: 'ДВ-008', customer: 'Федорова Ирина', phone: '+7 (911) 888-99-00',
    address: 'пр. Победы, д. 3, кв. 89',
    items: [
      { id: 'i17', name: 'Торт Наполеон', quantity: 1, price: 780 },
      { id: 'i18', name: 'Чай зелёный', quantity: 2, price: 150 },
    ],
    status: 'processing', total: 1080, createdAt: '2024-01-15 11:15',
  },
];

export const products: Product[] = [
  { id: 'p1', name: 'Пицца Маргарита', category: 'Пицца', price: 590, stock: 25, minStock: 10, unit: 'шт' },
  { id: 'p2', name: 'Пицца Пепперони', category: 'Пицца', price: 650, stock: 18, minStock: 10, unit: 'шт' },
  { id: 'p3', name: 'Бургер Классик', category: 'Бургеры', price: 450, stock: 30, minStock: 15, unit: 'шт' },
  { id: 'p4', name: 'Бургер Чиз', category: 'Бургеры', price: 490, stock: 22, minStock: 15, unit: 'шт' },
  { id: 'p5', name: 'Кола 1л', category: 'Напитки', price: 120, stock: 100, minStock: 50, unit: 'шт' },
  { id: 'p6', name: 'Сок апельсиновый 0.5л', category: 'Напитки', price: 95, stock: 80, minStock: 40, unit: 'шт' },
  { id: 'p7', name: 'Суши-сет Филадельфия', category: 'Суши', price: 890, stock: 12, minStock: 5, unit: 'шт' },
  { id: 'p8', name: 'Ролл Калифорния', category: 'Суши', price: 520, stock: 15, minStock: 8, unit: 'шт' },
  { id: 'p9', name: 'Цезарь с курицей', category: 'Салаты', price: 380, stock: 20, minStock: 10, unit: 'шт' },
  { id: 'p10', name: 'Паста Карбонара', category: 'Паста', price: 420, stock: 18, minStock: 8, unit: 'шт' },
  { id: 'p11', name: 'Торт Наполеон', category: 'Десерты', price: 780, stock: 5, minStock: 3, unit: 'шт' },
  { id: 'p12', name: 'Тирамису', category: 'Десерты', price: 390, stock: 8, minStock: 5, unit: 'шт' },
  { id: 'p13', name: 'Шашлык из свинины', category: 'Гриль', price: 650, stock: 3, minStock: 10, unit: 'порц' },
  { id: 'p14', name: 'Стейк Рибай', category: 'Гриль', price: 1890, stock: 7, minStock: 3, unit: 'шт' },
  { id: 'p15', name: 'Картофель фри', category: 'Гарниры', price: 180, stock: 40, minStock: 20, unit: 'порц' },
  { id: 'p16', name: 'Молочный коктейль', category: 'Напитки', price: 250, stock: 35, minStock: 15, unit: 'шт' },
];

export const statusLabels: Record<string, string> = {
  new: 'Новый',
  processing: 'В обработке',
  assembling: 'Сборка',
  ready: 'Готов к выдаче',
  delivering: 'В доставке',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

export const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  processing: 'bg-yellow-100 text-yellow-800',
  assembling: 'bg-purple-100 text-purple-800',
  ready: 'bg-green-100 text-green-800',
  delivering: 'bg-orange-100 text-orange-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};
