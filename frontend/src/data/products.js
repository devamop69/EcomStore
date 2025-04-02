export const products = [
  // Gaming Consoles
  {
    _id: '1',
    name: 'PlayStation 5',
    category: 'console',
    price: 49999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">PlayStation 5</text></svg>',
    description: 'Next-gen gaming console with 4K graphics, ray tracing, and ultra-high-speed SSD.',
    stockCount: 5
  },
  {
    _id: '2',
    name: 'Xbox Series X',
    category: 'console',
    price: 49999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">Xbox Series X</text></svg>',
    description: 'Most powerful Xbox ever with 4K gaming at up to 120 FPS.',
    stockCount: 7
  },
  {
    _id: '3',
    name: 'Nintendo Switch OLED',
    category: 'console',
    price: 34999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">Nintendo Switch OLED</text></svg>',
    description: '7-inch OLED screen with enhanced audio and wider adjustable stand.',
    stockCount: 10
  },

  // Monitors
  {
    _id: '4',
    name: 'ASUS ROG Swift 27" 360Hz',
    category: 'monitor',
    price: 69999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">ASUS ROG Swift</text></svg>',
    description: '360Hz refresh rate, 1ms response time, G-SYNC for competitive gaming.',
    stockCount: 4
  },
  {
    _id: '5',
    name: 'LG 34" UltraGear Curved',
    category: 'monitor',
    price: 89999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">LG UltraGear</text></svg>',
    description: '34-inch curved ultrawide with 1ms response time and 160Hz refresh rate.',
    stockCount: 6
  },
  {
    _id: '6',
    name: 'Samsung Odyssey G7 32"',
    category: 'monitor',
    price: 79999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">Samsung Odyssey G7</text></svg>',
    description: 'QLED curved gaming monitor with 240Hz refresh rate and HDR600.',
    stockCount: 8
  },

  // Keyboards
  {
    _id: '7',
    name: 'Razer Huntsman Elite',
    category: 'keyboard',
    price: 19999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">Razer Huntsman Elite</text></svg>',
    description: 'Optical switches with dedicated media controls and RGB wrist rest.',
    stockCount: 15
  },
  {
    _id: '8',
    name: 'Logitech G Pro X',
    category: 'keyboard',
    price: 14999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">Logitech G Pro X</text></svg>',
    description: 'Tournament-proven tenkeyless design with swappable switches.',
    stockCount: 12
  },
  {
    _id: '9',
    name: 'Corsair K100 RGB',
    category: 'keyboard',
    price: 22999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">Corsair K100 RGB</text></svg>',
    description: 'Premium mechanical gaming keyboard with optical-mechanical switches.',
    stockCount: 9
  },

  // Mice
  {
    _id: '10',
    name: 'Logitech G Pro X Superlight',
    category: 'mouse',
    price: 14999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">G Pro X Superlight</text></svg>',
    description: 'Ultra-lightweight wireless gaming mouse weighing less than 63 grams.',
    stockCount: 20
  },
  {
    _id: '11',
    name: 'Razer DeathAdder V3 Pro',
    category: 'mouse',
    price: 14999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">DeathAdder V3 Pro</text></svg>',
    description: 'Ergonomic esports mouse with Focus Pro 30K optical sensor.',
    stockCount: 18
  },
  {
    _id: '12',
    name: 'SteelSeries Prime Wireless',
    category: 'mouse',
    price: 12999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">Prime Wireless</text></svg>',
    description: 'Competitive wireless gaming mouse with magnetic optical switches.',
    stockCount: 14
  },

  // Gaming Headsets
  {
    _id: '13',
    name: 'SteelSeries Arctis Pro',
    category: 'headset',
    price: 24999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">Arctis Pro</text></svg>',
    description: 'Hi-Res capable gaming headset with dedicated DAC.',
    stockCount: 11
  },
  {
    _id: '14',
    name: 'HyperX Cloud Alpha',
    category: 'headset',
    price: 9999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">Cloud Alpha</text></svg>',
    description: 'Dual chamber drivers for better sound and less distortion.',
    stockCount: 16
  },
  {
    _id: '15',
    name: 'Razer BlackShark V2 Pro',
    category: 'headset',
    price: 17999,
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em">BlackShark V2 Pro</text></svg>',
    description: 'THX Spatial Audio with TriForce titanium drivers.',
    stockCount: 13
  }
];
