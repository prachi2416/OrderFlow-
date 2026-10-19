export const overviewMetrics = [
  { title: 'Total Revenue', value: 9960000.89, icon: 'IndianRupee', trend: '+12.5%', type: 'currency' },
  { title: 'Total Orders', value: 1254, icon: 'ShoppingCart', trend: '+8.2%', type: 'number' },
  { title: 'Confirmed Orders', value: 1180, icon: 'CheckCircle2', trend: '+10.1%', type: 'number', color: 'text-emerald-500' },
  { title: 'Failed Orders', value: 74, icon: 'XCircle', trend: '-2.4%', type: 'number', color: 'text-red-500' },
];

export const recentOrders = [
  { id: 'ORD-847291', customer: 'Alice Johnson', email: 'alice@example.com', amount: 33040.00, date: 'Oct 19, 2026', status: 'completed' },
  { id: 'ORD-928374', customer: 'Bob Smith', email: 'bob@example.com', amount: 17120.00, date: 'Oct 19, 2026', status: 'processing' },
  { id: 'ORD-102938', customer: 'Charlie Davis', email: 'charlie@example.com', amount: 83640.00, date: 'Oct 18, 2026', status: 'failed' },
  { id: 'ORD-564738', customer: 'Diana Evans', email: 'diana@example.com', amount: 7199.00, date: 'Oct 18, 2026', status: 'completed' },
  { id: 'ORD-883921', customer: 'Ethan Frank', email: 'ethan@example.com', amount: 47920.00, date: 'Oct 17, 2026', status: 'completed' },
  { id: 'ORD-993922', customer: 'Fiona Gallagher', email: 'fiona@example.com', amount: 10399.00, date: 'Oct 16, 2026', status: 'processing' },
  { id: 'ORD-113923', customer: 'George Harris', email: 'george@example.com', amount: 71920.00, date: 'Oct 16, 2026', status: 'completed' },
];

export const inventory = [
  { id: 'PROD-1', name: 'Sony WH-1000XM5', sku: 'SNY-WH5-BLK', stock: 145, reserved: 12, status: 'in_stock', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=200' },
  { id: 'PROD-2', name: 'Keychron Q1 Pro', sku: 'KCH-Q1P-WHT', stock: 12, reserved: 5, status: 'low_stock', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=200' },
  { id: 'PROD-3', name: 'Minimalist Desk Lamp', sku: 'LMP-MIN-SLV', stock: 0, reserved: 0, status: 'out_of_stock', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=200' },
  { id: 'PROD-4', name: 'Ergonomic Office Chair', sku: 'CHR-ERG-BLK', stock: 54, reserved: 8, status: 'in_stock', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=200' },
];

export const dltMessages = [
  { id: 'EVT-99281', topic: 'order-processing', orderId: 'ORD-102938', type: 'OrderCreated', error: 'Database timeout connection', retries: 3, timestamp: '10 mins ago', status: 'pending' },
  { id: 'EVT-99282', topic: 'payment-validation', orderId: 'ORD-102940', type: 'PaymentProcessed', error: 'Invalid gateway response', retries: 5, timestamp: '1 hour ago', status: 'pending' },
  { id: 'EVT-99283', topic: 'inventory-update', orderId: 'ORD-102941', type: 'StockReserved', error: 'Optimistic lock exception', retries: 1, timestamp: '2 hours ago', status: 'pending' },
];

export const paymentFailures = [
  { id: 'PAY-112', orderId: 'ORD-102938', reason: 'Insufficient Funds', amount: 83640.00, date: 'Oct 18, 2026', status: 'failed' },
  { id: 'PAY-113', orderId: 'ORD-102940', reason: 'Card Expired', amount: 9600.00, date: 'Oct 18, 2026', status: 'failed' },
];

export const revenueData = [
  { name: 'Mon', revenue: 320000 },
  { name: 'Tue', revenue: 240000 },
  { name: 'Wed', revenue: 160000 },
  { name: 'Thu', revenue: 222400 },
  { name: 'Fri', revenue: 151200 },
  { name: 'Sat', revenue: 191200 },
  { name: 'Sun', revenue: 279200 },
];

export const orderStatusData = [
  { name: 'Completed', value: 400 },
  { name: 'Processing', value: 300 },
  { name: 'Failed', value: 300 },
  { name: 'Returned', value: 200 },
];
