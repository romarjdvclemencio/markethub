import { products } from './products';

export const users = [
  { id: 1, name: 'Juan dela Cruz', email: 'juan@email.com', phone: '+63 912 345 6789', role: 'buyer', status: 'active', joined: '2024-01-15', orders: 12, totalSpent: 3420.50, location: 'Manila', avatar: 'J' },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', phone: '+63 917 234 5678', role: 'buyer', status: 'active', joined: '2024-02-03', orders: 8, totalSpent: 1890.00, location: 'Cebu', avatar: 'M' },
  { id: 3, name: 'Carlo Reyes', email: 'carlo@email.com', phone: '+63 918 345 6789', role: 'seller', status: 'active', joined: '2023-11-20', orders: 0, totalSpent: 0, location: 'Davao', avatar: 'C' },
  { id: 4, name: 'Ana Lim', email: 'ana@email.com', phone: '+63 919 456 7890', role: 'buyer', status: 'inactive', joined: '2024-03-10', orders: 3, totalSpent: 450.75, location: 'Quezon City', avatar: 'A' },
  { id: 5, name: 'Ben Torres', email: 'ben@email.com', phone: '+63 920 567 8901', role: 'seller', status: 'active', joined: '2023-09-05', orders: 0, totalSpent: 0, location: 'Makati', avatar: 'B' },
  { id: 6, name: 'Sofia Garcia', email: 'sofia@email.com', phone: '+63 921 678 9012', role: 'buyer', status: 'active', joined: '2024-04-22', orders: 21, totalSpent: 6780.00, location: 'Taguig', avatar: 'S' },
  { id: 7, name: 'Diego Mendoza', email: 'diego@email.com', phone: '+63 922 789 0123', role: 'buyer', status: 'active', joined: '2024-05-01', orders: 5, totalSpent: 1230.25, location: 'Pasig', avatar: 'D' },
  { id: 8, name: 'Lea Villanueva', email: 'lea@email.com', phone: '+63 923 890 1234', role: 'seller', status: 'suspended', joined: '2023-12-14', orders: 0, totalSpent: 0, location: 'Cebu', avatar: 'L' },
  { id: 9, name: 'Mark Aquino', email: 'mark@email.com', phone: '+63 924 901 2345', role: 'buyer', status: 'active', joined: '2024-06-18', orders: 2, totalSpent: 320.00, location: 'Manila', avatar: 'M' },
  { id: 10, name: 'Nina Cruz', email: 'nina@email.com', phone: '+63 925 012 3456', role: 'buyer', status: 'active', joined: '2024-07-02', orders: 17, totalSpent: 4950.80, location: 'Davao', avatar: 'N' },
];

export const orders = [
  { id: 'ORD-001', customer: 'Juan dela Cruz', customerId: 1, product: 'Wireless Bluetooth Earbuds Pro', productId: 1, quantity: 2, total: 59.98, status: 'delivered', date: '2024-07-01', payment: 'GCash', address: 'Manila' },
  { id: 'ORD-002', customer: 'Maria Santos', customerId: 2, product: 'Women\'s Floral Summer Dress', productId: 7, quantity: 1, total: 15.99, status: 'shipped', date: '2024-07-02', payment: 'COD', address: 'Cebu' },
  { id: 'ORD-003', customer: 'Sofia Garcia', customerId: 6, product: 'Running Shoes Ultra Boost', productId: 4, quantity: 1, total: 45.00, status: 'processing', date: '2024-07-03', payment: 'Visa', address: 'Taguig' },
  { id: 'ORD-004', customer: 'Diego Mendoza', customerId: 7, product: 'Portable Power Bank 20000mAh', productId: 10, quantity: 3, total: 68.97, status: 'delivered', date: '2024-07-03', payment: 'GCash', address: 'Pasig' },
  { id: 'ORD-005', customer: 'Nina Cruz', customerId: 10, product: 'Vitamin C Serum 20%', productId: 5, quantity: 2, total: 17.98, status: 'delivered', date: '2024-07-04', payment: 'COD', address: 'Davao' },
  { id: 'ORD-006', customer: 'Ana Lim', customerId: 4, product: 'Smart LED Desk Lamp', productId: 3, quantity: 1, total: 18.99, status: 'cancelled', date: '2024-07-04', payment: 'Bank', address: 'Quezon City' },
  { id: 'ORD-007', customer: 'Mark Aquino', customerId: 9, product: 'Kids LEGO Building Set 500pcs', productId: 12, quantity: 1, total: 24.99, status: 'shipped', date: '2024-07-05', payment: 'Visa', address: 'Manila' },
  { id: 'ORD-008', customer: 'Juan dela Cruz', customerId: 1, product: 'Mechanical Gaming Keyboard RGB', productId: 6, quantity: 1, total: 39.99, status: 'processing', date: '2024-07-05', payment: 'GCash', address: 'Manila' },
  { id: 'ORD-009', customer: 'Sofia Garcia', customerId: 6, product: 'Non-Stick Cookware Set 5pcs', productId: 8, quantity: 2, total: 70.00, status: 'delivered', date: '2024-07-06', payment: 'COD', address: 'Taguig' },
  { id: 'ORD-010', customer: 'Nina Cruz', customerId: 10, product: 'Yoga Mat Anti-Slip 6mm', productId: 9, quantity: 1, total: 11.50, status: 'shipped', date: '2024-07-06', payment: 'GCash', address: 'Davao' },
  { id: 'ORD-011', customer: 'Maria Santos', customerId: 2, product: 'Face Wash Foaming Cleanser', productId: 11, quantity: 3, total: 20.97, status: 'delivered', date: '2024-07-07', payment: 'Visa', address: 'Cebu' },
  { id: 'ORD-012', customer: 'Diego Mendoza', customerId: 7, product: 'Men\'s Slim Fit Polo Shirt', productId: 2, quantity: 2, total: 25.00, status: 'processing', date: '2024-07-07', payment: 'COD', address: 'Pasig' },
];

export const sellers = [
  { id: 1, name: 'TechZone Official', owner: 'Carlo Reyes', email: 'techzone@email.com', location: 'Manila', products: 45, sales: 15200, revenue: 455208.00, rating: 4.8, status: 'active', joined: '2023-11-20' },
  { id: 2, name: 'StyleHub PH', owner: 'Ben Torres', email: 'stylehub@email.com', location: 'Makati', products: 120, sales: 4300, revenue: 53750.00, rating: 4.5, status: 'active', joined: '2023-09-05' },
  { id: 3, name: 'HomePlus Store', owner: 'Lea Villanueva', email: 'homeplus@email.com', location: 'Cebu', products: 67, sales: 8900, revenue: 168911.00, rating: 4.6, status: 'suspended', joined: '2023-12-14' },
  { id: 4, name: 'SportsPro PH', owner: 'Jess Navarro', email: 'sportspro@email.com', location: 'Manila', products: 89, sales: 22000, revenue: 990000.00, rating: 4.9, status: 'active', joined: '2023-08-01' },
  { id: 5, name: 'GlowSkin Beauty', owner: 'Rosa Tan', email: 'glowskin@email.com', location: 'Quezon City', products: 34, sales: 31000, revenue: 278690.00, rating: 4.7, status: 'active', joined: '2023-07-15' },
  { id: 6, name: 'GamingGear PH', owner: 'Nico Bautista', email: 'gaminggear@email.com', location: 'Manila', products: 55, sales: 9800, revenue: 391902.00, rating: 4.8, status: 'active', joined: '2023-10-10' },
];

export const events = [
  { id: 1, name: 'Mid-Year Mega Sale', type: 'sale', startDate: '2024-07-10', endDate: '2024-07-12', discount: '70%', status: 'upcoming', participants: 120, description: 'Biggest sale of the year with up to 70% off on all categories.' },
  { id: 2, name: 'Flash Deal Friday', type: 'flash', startDate: '2024-07-05', endDate: '2024-07-05', discount: '50%', status: 'active', participants: 45, description: 'Weekly flash deals every Friday from 12PM to 6PM.' },
  { id: 3, name: 'Back to School', type: 'campaign', startDate: '2024-06-15', endDate: '2024-07-01', discount: '30%', status: 'ended', participants: 88, description: 'Special discounts on school supplies, gadgets, and fashion.' },
  { id: 4, name: 'Free Shipping Day', type: 'promo', startDate: '2024-07-08', endDate: '2024-07-08', discount: 'Free Ship', status: 'upcoming', participants: 200, description: 'All orders ship free regardless of amount for one day only.' },
  { id: 5, name: 'Beauty Week', type: 'campaign', startDate: '2024-07-15', endDate: '2024-07-21', discount: '40%', status: 'upcoming', participants: 33, description: 'Dedicated week for beauty and skincare products with exclusive bundles.' },
  { id: 6, name: 'Tech Fest', type: 'sale', startDate: '2024-06-01', endDate: '2024-06-07', discount: '60%', status: 'ended', participants: 77, description: 'Annual technology festival featuring the best deals on gadgets.' },
];

export const monthlySales = [
  { month: 'Jan', sales: 42000, orders: 320 },
  { month: 'Feb', sales: 38000, orders: 290 },
  { month: 'Mar', sales: 55000, orders: 410 },
  { month: 'Apr', sales: 61000, orders: 480 },
  { month: 'May', sales: 49000, orders: 370 },
  { month: 'Jun', sales: 72000, orders: 550 },
  { month: 'Jul', sales: 68000, orders: 510 },
];

export const categoryStats = [
  { name: 'Electronics', sales: 52000, percentage: 28 },
  { name: 'Fashion', sales: 31000, percentage: 17 },
  { name: 'Home & Living', sales: 27000, percentage: 15 },
  { name: 'Sports', sales: 22000, percentage: 12 },
  { name: 'Beauty', sales: 19000, percentage: 10 },
  { name: 'Others', sales: 34000, percentage: 18 },
];

export { products };
