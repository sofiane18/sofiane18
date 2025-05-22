export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  store: string;
  storeId: string;
  location: string;
  image: string;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  provider: string;
  providerId: string;
  location: string;
  image: string;
  duration: string;
};

export type Store = {
  id: string;
  name: string;
  description: string;
  rating: number;
  location: string;
  address: string;
  phone: string;
  image: string;
  categories: string[];
};

export type Order = {
  id: string;
  itemId: string;
  itemName: string;
  itemPrice: number;
  itemType: 'product' | 'service';
  storeName: string;
  storeLocation: string;
  date: string;
  status: 'Pickup Pending' | 'Completed';
  confirmationCode: string;
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  'Brake Systems',
  'Engine Parts',
  'Filters',
  'Lighting',
  'Oil & Fluids',
  'Suspension',
  'Tires & Wheels',
  'Electronic Systems',
];

// Service Categories
export const SERVICE_CATEGORIES = [
  'General Maintenance',
  'Repairs',
  'Diagnostics',
  'Cleaning',
  'Tire Services',
  'Oil Change',
  'Battery Services',
  'AC Services',
];

// Mock Products
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Premium Brake Pads',
    category: 'Brake Systems',
    description: 'High-quality ceramic brake pads for improved stopping power and reduced noise. Compatible with most sedan models.',
    price: 4500,
    rating: 4.7,
    store: 'AutoParts Algiers',
    storeId: 's1',
    location: 'Algiers',
    image: 'https://images.pexels.com/photos/3806252/pexels-photo-3806252.jpeg',
  },
  {
    id: 'p2',
    name: 'Synthetic Engine Oil',
    category: 'Oil & Fluids',
    description: 'Full synthetic 5W-30 engine oil for superior engine protection and performance in all weather conditions.',
    price: 2800,
    rating: 4.9,
    store: 'LubriTech',
    storeId: 's2',
    location: 'Oran',
    image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg',
  },
  {
    id: 'p3',
    name: 'Air Filter',
    category: 'Filters',
    description: 'High-flow air filter for increased engine efficiency and better fuel economy.',
    price: 1200,
    rating: 4.5,
    store: 'FilterPro Blida',
    storeId: 's3',
    location: 'Blida',
    image: 'https://images.pexels.com/photos/8844392/pexels-photo-8844392.jpeg',
  },
  {
    id: 'p4',
    name: 'LED Headlights',
    category: 'Lighting',
    description: 'Bright LED headlight set with long lifespan and improved visibility for night driving.',
    price: 5600,
    rating: 4.6,
    store: 'AutoParts Algiers',
    storeId: 's1',
    location: 'Algiers',
    image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
  },
  {
    id: 'p5',
    name: 'Shock Absorbers',
    category: 'Suspension',
    description: 'Heavy-duty shock absorbers for a smoother ride on rough roads.',
    price: 6200,
    rating: 4.4,
    store: 'SuspensionMaster',
    storeId: 's4',
    location: 'Constantine',
    image: 'https://images.pexels.com/photos/3807081/pexels-photo-3807081.jpeg',
  },
  {
    id: 'p6',
    name: 'All-Season Tires',
    category: 'Tires & Wheels',
    description: 'Premium all-season tires with excellent grip on both wet and dry surfaces.',
    price: 8500,
    rating: 4.8,
    store: 'TirePro Annaba',
    storeId: 's5',
    location: 'Annaba',
    image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg',
  },
  {
    id: 'p7',
    name: 'Car Battery',
    category: 'Electronic Systems',
    description: 'Maintenance-free 60Ah battery with 3-year warranty for reliable starting power.',
    price: 7800,
    rating: 4.7,
    store: 'ElectroCar',
    storeId: 's6',
    location: 'Sétif',
    image: 'https://images.pexels.com/photos/1119023/pexels-photo-1119023.jpeg',
  },
  {
    id: 'p8',
    name: 'Spark Plugs Set',
    category: 'Engine Parts',
    description: 'Set of 4 high-performance iridium spark plugs for improved ignition and fuel efficiency.',
    price: 3200,
    rating: 4.6,
    store: 'AutoParts Algiers',
    storeId: 's1',
    location: 'Algiers',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
  },
];

// Mock Services
export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Standard Car Wash',
    category: 'Cleaning',
    description: 'Complete exterior wash, tire cleaning, and interior vacuuming to keep your car looking its best.',
    price: 1500,
    rating: 4.5,
    provider: 'SparkleWash',
    providerId: 's7',
    location: 'Algiers',
    image: 'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg',
    duration: '30 minutes',
  },
  {
    id: 's2',
    name: 'Oil Change Service',
    category: 'Oil Change',
    description: 'Professional oil change service including new oil filter and disposal of old oil.',
    price: 3500,
    rating: 4.8,
    provider: 'QuickService Garage',
    providerId: 's8',
    location: 'Oran',
    image: 'https://images.pexels.com/photos/3807248/pexels-photo-3807248.jpeg',
    duration: '45 minutes',
  },
  {
    id: 's3',
    name: 'Tire Rotation',
    category: 'Tire Services',
    description: 'Professional tire rotation service to ensure even tire wear and extend tire life.',
    price: 2000,
    rating: 4.6,
    provider: 'TirePro Annaba',
    providerId: 's5',
    location: 'Annaba',
    image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg',
    duration: '40 minutes',
  },
  {
    id: 's4',
    name: 'Engine Diagnostics',
    category: 'Diagnostics',
    description: 'Comprehensive engine diagnostic scan to identify and troubleshoot issues.',
    price: 2500,
    rating: 4.9,
    provider: 'DiagTech Auto',
    providerId: 's9',
    location: 'Constantine',
    image: 'https://images.pexels.com/photos/3642618/pexels-photo-3642618.jpeg',
    duration: '60 minutes',
  },
  {
    id: 's5',
    name: 'Brake System Check',
    category: 'Diagnostics',
    description: 'Complete brake system inspection including pads, rotors, and fluid level check.',
    price: 1800,
    rating: 4.7,
    provider: 'BrakeMaster',
    providerId: 's10',
    location: 'Blida',
    image: 'https://images.pexels.com/photos/3814310/pexels-photo-3814310.jpeg',
    duration: '50 minutes',
  },
  {
    id: 's6',
    name: 'AC System Service',
    category: 'AC Services',
    description: 'Air conditioning system check and recharge for optimal cooling performance.',
    price: 4200,
    rating: 4.5,
    provider: 'CoolAir Services',
    providerId: 's11',
    location: 'Sétif',
    image: 'https://images.pexels.com/photos/2784824/pexels-photo-2784824.jpeg',
    duration: '75 minutes',
  },
  {
    id: 's7',
    name: 'Battery Replacement',
    category: 'Battery Services',
    description: 'Professional battery replacement service including disposal of old battery.',
    price: 8500,
    rating: 4.8,
    provider: 'ElectroCar',
    providerId: 's6',
    location: 'Sétif',
    image: 'https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg',
    duration: '30 minutes',
  },
  {
    id: 's8',
    name: 'Full Vehicle Inspection',
    category: 'General Maintenance',
    description: 'Comprehensive vehicle inspection covering all major systems for safety and reliability.',
    price: 5000,
    rating: 4.9,
    provider: 'QuickService Garage',
    providerId: 's8',
    location: 'Oran',
    image: 'https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg',
    duration: '90 minutes',
  },
];

// Mock Stores
export const STORES: Store[] = [
  {
    id: 's1',
    name: 'AutoParts Algiers',
    description: 'A comprehensive auto parts store carrying everything from brake parts to engine components.',
    rating: 4.7,
    location: 'Algiers',
    address: '123 Didouche Mourad, Algiers',
    phone: '+213 21 234 567',
    image: 'https://images.pexels.com/photos/2659941/pexels-photo-2659941.jpeg',
    categories: ['Brake Systems', 'Engine Parts', 'Lighting', 'Filters'],
  },
  {
    id: 's2',
    name: 'LubriTech',
    description: 'Specialists in automotive oils, lubricants, and fluids for all vehicle types.',
    rating: 4.9,
    location: 'Oran',
    address: '45 Boulevard Millinium, Oran',
    phone: '+213 41 345 678',
    image: 'https://images.pexels.com/photos/4436362/pexels-photo-4436362.jpeg',
    categories: ['Oil & Fluids'],
  },
  {
    id: 's3',
    name: 'FilterPro Blida',
    description: 'Expert provider of high-quality filters for all automotive applications.',
    rating: 4.5,
    location: 'Blida',
    address: '78 Rue de la Liberté, Blida',
    phone: '+213 25 456 789',
    image: 'https://images.pexels.com/photos/15764332/pexels-photo-15764332/free-photo-of-workshop-with-shelves-full-of-details.jpeg',
    categories: ['Filters', 'Engine Parts'],
  },
  {
    id: 's4',
    name: 'SuspensionMaster',
    description: 'Specializing in suspension components and services for a smoother ride.',
    rating: 4.4,
    location: 'Constantine',
    address: '32 Avenue Ben Badis, Constantine',
    phone: '+213 31 567 890',
    image: 'https://images.pexels.com/photos/6767702/pexels-photo-6767702.jpeg',
    categories: ['Suspension', 'Tires & Wheels'],
  },
  {
    id: 's5',
    name: 'TirePro Annaba',
    description: 'Premier tire shop with a wide selection of tires and wheel-related services.',
    rating: 4.8,
    location: 'Annaba',
    address: '15 Boulevard du Révolution, Annaba',
    phone: '+213 38 678 901',
    image: 'https://images.pexels.com/photos/5639837/pexels-photo-5639837.jpeg',
    categories: ['Tires & Wheels', 'Tire Services'],
  },
  {
    id: 's6',
    name: 'ElectroCar',
    description: 'Specialists in automotive electrical systems and batteries.',
    rating: 4.7,
    location: 'Sétif',
    address: '67 Rue des Frères Saadane, Sétif',
    phone: '+213 36 789 012',
    image: 'https://images.pexels.com/photos/3847366/pexels-photo-3847366.jpeg',
    categories: ['Electronic Systems', 'Battery Services'],
  },
];

// Find item by ID
export const findProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(product => product.id === id);
};

export const findServiceById = (id: string): Service | undefined => {
  return SERVICES.find(service => service.id === id);
};

export const findStoreById = (id: string): Store | undefined => {
  return STORES.find(store => store.id === id);
};

// Generate AI Recommendations based on user input
export const generateRecommendations = (vehicleInfo: string, pastPurchases: string): (Product | Service)[] => {
  // This is a mock function - in a real app, this would call an AI service
  // For mock purposes, we'll return a random selection of products and services
  const allItems = [...PRODUCTS, ...SERVICES];
  const shuffled = [...allItems].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

// Generate a random confirmation code (6 characters, alphanumeric)
export const generateConfirmationCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};