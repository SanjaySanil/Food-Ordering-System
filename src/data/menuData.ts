import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Beverages
  {
    id: 'juice-musambi',
    name: 'Musambi Juice',
    category: 'Beverages',
    description: 'Fresh sweet lime juice',
    variants: [{ id: 'regular', name: 'Regular', price: 70 }]
  },
  {
    id: 'juice-orange',
    name: 'Orange Juice',
    category: 'Beverages',
    description: 'Fresh orange juice',
    variants: [{ id: 'regular', name: 'Regular', price: 70 }]
  },
  {
    id: 'juice-apple',
    name: 'Apple Juice',
    category: 'Beverages',
    description: 'Fresh apple juice',
    variants: [{ id: 'regular', name: 'Regular', price: 70 }]
  },
  {
    id: 'juice-chicku',
    name: 'Chicku Juice',
    category: 'Beverages',
    description: 'Fresh sapota juice',
    variants: [{ id: 'regular', name: 'Regular', price: 70 }]
  },
  {
    id: 'juice-kakerri',
    name: 'Kakerri Juice',
    category: 'Beverages',
    description: 'Fresh cucumber juice',
    variants: [{ id: 'regular', name: 'Regular', price: 60 }]
  },
  {
    id: 'juice-pineapple',
    name: 'Pineapple Juice',
    category: 'Beverages',
    description: 'Fresh pineapple juice',
    variants: [{ id: 'regular', name: 'Regular', price: 50 }]
  },
  {
    id: 'juice-grape',
    name: 'Grape Juice',
    category: 'Beverages',
    description: 'Fresh grape juice',
    variants: [{ id: 'regular', name: 'Regular', price: 70 }]
  },
  {
    id: 'juice-lime-fresh',
    name: 'Lime Fresh',
    category: 'Beverages',
    description: 'Fresh lime water',
    variants: [{ id: 'regular', name: 'Regular', price: 30 }]
  },
  {
    id: 'juice-mint-lime',
    name: 'Mint Lime',
    category: 'Beverages',
    description: 'Refreshing mint lime water',
    variants: [{ id: 'regular', name: 'Regular', price: 40 }]
  },
  {
    id: 'juice-ginger-lime',
    name: 'Ginger Lime',
    category: 'Beverages',
    description: 'Spicy ginger lime water',
    variants: [{ id: 'regular', name: 'Regular', price: 40 }]
  },
  {
    id: 'juice-grape-lime',
    name: 'Grape Lime',
    category: 'Beverages',
    description: 'Grape flavored lime water',
    variants: [{ id: 'regular', name: 'Regular', price: 40 }]
  },
  {
    id: 'juice-pineapple-lime',
    name: 'Pineapple Lime',
    category: 'Beverages',
    description: 'Pineapple flavored lime water',
    variants: [{ id: 'regular', name: 'Regular', price: 40 }]
  },

  // Bread Items
  {
    id: 'porotta',
    name: 'Porotta',
    category: 'Bread',
    description: 'Flaky layered bread',
    variants: [{ id: 'piece', name: 'Per Piece', price: 12 }]
  },
  {
    id: 'chapathi',
    name: 'Chapathi',
    category: 'Bread',
    description: 'Soft wheat bread',
    variants: [{ id: 'piece', name: 'Per Piece', price: 12 }]
  },
  {
    id: 'atta-porotta',
    name: 'Atta Porotta',
    category: 'Bread',
    description: 'Whole wheat porotta',
    variants: [{ id: 'piece', name: 'Per Piece', price: 16 }]
  },

  // Rice Items
  {
    id: 'ghee-rice',
    name: 'Ghee Rice',
    category: 'Rice',
    description: 'Fragrant rice cooked in ghee',
    variants: [
      { id: 'full', name: 'Full', price: 70 },
      { id: 'half', name: 'Half', price: 40 }
    ]
  },
  {
    id: 'mandi-rice',
    name: 'Mandi Rice',
    category: 'Rice',
    description: 'Traditional Arabic spiced rice',
    variants: [
      { id: 'full', name: 'Full', price: 330 },
      { id: 'half', name: 'Half', price: 180 },
      { id: 'quarter', name: 'Quarter', price: 90 }
    ]
  },
  {
    id: 'fried-rice-chicken',
    name: 'Fried Rice - Chicken',
    category: 'Rice',
    description: 'Wok-fried rice with chicken',
    variants: [{ id: 'full', name: 'Full', price: 160 }]
  },
  {
    id: 'fried-rice-egg',
    name: 'Fried Rice - Egg',
    category: 'Rice',
    description: 'Wok-fried rice with egg',
    variants: [{ id: 'full', name: 'Full', price: 140 }]
  },
  {
    id: 'fried-rice-veg',
    name: 'Fried Rice - Veg',
    category: 'Rice',
    description: 'Wok-fried rice with vegetables',
    variants: [{ id: 'full', name: 'Full', price: 120 }]
  },
  {
    id: 'fried-rice-mixed',
    name: 'Fried Rice - Mixed',
    category: 'Rice',
    description: 'Wok-fried rice with mixed ingredients',
    variants: [{ id: 'full', name: 'Full', price: 180 }]
  },
  {
    id: 'biriyani-full',
    name: 'Biriyani',
    category: 'Rice',
    description: 'Traditional aromatic rice dish',
    variants: [
      { id: 'full', name: 'Full', price: 140 },
      { id: 'half', name: 'Half', price: 100 },
      { id: 'rice-only', name: 'Rice Only', price: 80 }
    ]
  },

  // Alfaham Items
  {
    id: 'alfaham-mandi',
    name: 'Alfaham Mandi',
    category: 'Alfaham',
    description: 'Traditional Mandi style grilled chicken',
    variants: [
      { id: 'full', name: 'Full', price: 750 },
      { id: 'half', name: 'Half', price: 380 },
      { id: 'quarter', name: 'Quarter', price: 200 }
    ]
  },
  {
    id: 'alfaham-normal',
    name: 'Alfaham Normal',
    category: 'Alfaham',
    description: 'Classic grilled chicken',
    variants: [
      { id: 'full', name: 'Full', price: 480 },
      { id: 'half', name: 'Half', price: 240 },
      { id: 'quarter', name: 'Quarter', price: 120 }
    ]
  },
  {
    id: 'alfaham-peri-peri',
    name: 'Alfaham Peri-Peri',
    category: 'Alfaham',
    description: 'Spicy peri-peri grilled chicken',
    variants: [
      { id: 'full', name: 'Full', price: 510 },
      { id: 'half', name: 'Half', price: 260 },
      { id: 'quarter', name: 'Quarter', price: 130 }
    ]
  },
  {
    id: 'alfaham-spicy',
    name: 'Alfaham Spicy',
    category: 'Alfaham',
    description: 'Extra spicy grilled chicken',
    variants: [
      { id: 'full', name: 'Full', price: 510 },
      { id: 'half', name: 'Half', price: 260 },
      { id: 'quarter', name: 'Quarter', price: 130 }
    ]
  },
  {
    id: 'dragon-chicken',
    name: 'Dragon Chicken',
    category: 'Alfaham',
    description: 'Special dragon style chicken',
    variants: [
      { id: 'full', name: 'Full', price: 720 },
      { id: 'half', name: 'Half', price: 360 },
      { id: 'quarter', name: 'Quarter', price: 180 }
    ]
  },

  // Curries
  {
    id: 'chicken-curry',
    name: 'Chicken Curry',
    category: 'Curries',
    description: 'Traditional chicken curry',
    variants: [{ id: 'full', name: 'Full', price: 80 }]
  },
  {
    id: 'beef-curry',
    name: 'Beef Curry',
    category: 'Curries',
    description: 'Spicy beef curry',
    variants: [{ id: 'full', name: 'Full', price: 120 }]
  },
  {
    id: 'beef-fry',
    name: 'Beef Fry',
    category: 'Curries',
    description: 'Dry beef fry',
    variants: [{ id: 'full', name: 'Full', price: 130 }]
  },
  {
    id: 'veg-kuruma',
    name: 'Veg Kuruma',
    category: 'Curries',
    description: 'Mixed vegetable curry',
    variants: [{ id: 'full', name: 'Full', price: 60 }]
  },
  {
    id: 'fish-curry',
    name: 'Fish Curry',
    category: 'Curries',
    description: 'Traditional fish curry',
    variants: [{ id: 'full', name: 'Full', price: 80 }]
  },
  {
    id: 'tomato-fry',
    name: 'Tomato Fry',
    category: 'Curries',
    description: 'Spicy tomato stir fry',
    variants: [{ id: 'full', name: 'Full', price: 80 }]
  },

  // Soups
  {
    id: 'chicken-soup',
    name: 'Chicken Soup',
    category: 'Soups',
    description: 'Hot chicken soup',
    variants: [{ id: 'bowl', name: 'Bowl', price: 100 }]
  },
  {
    id: 'mutton-soup',
    name: 'Mutton Soup',
    category: 'Soups',
    description: 'Rich mutton soup',
    variants: [{ id: 'bowl', name: 'Bowl', price: 140 }]
  },
  {
    id: 'mushroom-soup',
    name: 'Mushroom Soup',
    category: 'Soups',
    description: 'Creamy mushroom soup',
    variants: [{ id: 'bowl', name: 'Bowl', price: 100 }]
  },
  {
    id: 'veg-soup',
    name: 'Veg Soup',
    category: 'Soups',
    description: 'Mixed vegetable soup',
    variants: [{ id: 'bowl', name: 'Bowl', price: 70 }]
  },

  // Main Courses
  {
    id: 'chicken-kondattam',
    name: 'Chicken Kondattam',
    category: 'Main Course',
    description: 'Special chicken preparation',
    variants: [
      { id: 'full', name: 'Full', price: 650 },
      { id: 'half', name: 'Half', price: 340 },
      { id: 'quarter', name: 'Quarter', price: 190 }
    ]
  },
  {
    id: 'chilli-chicken',
    name: 'Chilli Chicken',
    category: 'Main Course',
    description: 'Spicy Indo-Chinese chicken',
    variants: [
      { id: 'full', name: 'Full', price: 650 },
      { id: 'half', name: 'Half', price: 340 },
      { id: 'quarter', name: 'Quarter', price: 190 }
    ]
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    category: 'Main Course',
    description: 'Creamy butter chicken',
    variants: [
      { id: 'full', name: 'Full', price: 700 },
      { id: 'half', name: 'Half', price: 360 },
      { id: 'quarter', name: 'Quarter', price: 200 }
    ]
  },
  {
    id: 'pepper-chicken',
    name: 'Pepper Chicken',
    category: 'Main Course',
    description: 'Black pepper chicken',
    variants: [
      { id: 'full', name: 'Full', price: 720 },
      { id: 'half', name: 'Half', price: 370 },
      { id: 'quarter', name: 'Quarter', price: 200 }
    ]
  },
  {
    id: 'chicken-65',
    name: 'Chicken 65',
    category: 'Main Course',
    description: 'Popular spicy chicken appetizer',
    variants: [
      { id: 'full', name: 'Full', price: 480 },
      { id: 'half', name: 'Half', price: 290 },
      { id: 'quarter', name: 'Quarter', price: 130 }
    ]
  },
  {
    id: 'chicken-chilli-dry',
    name: 'Chicken Chilli (Dry)',
    category: 'Main Course',
    description: 'Dry chilli chicken',
    variants: [
      { id: 'full', name: 'Full', price: 550 },
      { id: 'half', name: 'Half', price: 290 },
      { id: 'quarter', name: 'Quarter', price: 160 }
    ]
  },
  {
    id: 'beef-kondattam',
    name: 'Beef Kondattam',
    category: 'Main Course',
    description: 'Special beef preparation',
    variants: [
      { id: 'full', name: 'Full', price: 720 },
      { id: 'half', name: 'Half', price: 380 },
      { id: 'quarter', name: 'Quarter', price: 160 }
    ]
  },
  {
    id: 'beef-masala',
    name: 'Beef Masala',
    category: 'Main Course',
    description: 'Spicy beef masala',
    variants: [
      { id: 'full', name: 'Full', price: 650 },
      { id: 'half', name: 'Half', price: 340 },
      { id: 'quarter', name: 'Quarter', price: 190 }
    ]
  },
  {
    id: 'beef-chilli',
    name: 'Beef Chilli',
    category: 'Main Course',
    description: 'Spicy beef chilli',
    variants: [
      { id: 'full', name: 'Full', price: 650 },
      { id: 'half', name: 'Half', price: 340 },
      { id: 'quarter', name: 'Quarter', price: 160 }
    ]
  },
  {
    id: 'beef-chilli-bdf',
    name: 'Beef Chilli B.D.F',
    category: 'Main Course',
    description: 'Special beef chilli preparation',
    variants: [
      { id: 'full', name: 'Full', price: 560 },
      { id: 'half', name: 'Half', price: 290 },
      { id: 'quarter', name: 'Quarter', price: 150 }
    ]
  },

  // Vegetables
  {
    id: 'gopi-manchuri',
    name: 'Gopi Manchuri',
    category: 'Vegetables',
    description: 'Cauliflower manchurian',
    variants: [
      { id: 'full', name: 'Full', price: 480 },
      { id: 'half', name: 'Half', price: 250 }
    ]
  },
  {
    id: 'gobi-chilli',
    name: 'Gobi Chilli',
    category: 'Vegetables',
    description: 'Spicy cauliflower',
    variants: [
      { id: 'full', name: 'Full', price: 560 },
      { id: 'half', name: 'Half', price: 290 }
    ]
  },
  {
    id: 'gopi-65',
    name: 'Gopi 65',
    category: 'Vegetables',
    description: 'Cauliflower 65 style',
    variants: [
      { id: 'full', name: 'Full', price: 400 },
      { id: 'half', name: 'Half', price: 220 }
    ]
  },
  {
    id: 'green-salad',
    name: 'Green Salad',
    category: 'Vegetables',
    description: 'Fresh green salad',
    variants: [{ id: 'plate', name: 'Plate', price: 100 }]
  },

  // Broast
  {
    id: 'broast',
    name: 'Broast',
    category: 'Broast',
    description: 'Crispy fried chicken',
    variants: [
      { id: 'full-10', name: 'Full (10 pcs)', price: 500 },
      { id: 'half-5', name: 'Half (5 pcs)', price: 260 },
      { id: 'quarter-3', name: 'Quarter (3 pcs)', price: 190 }
    ]
  }
];

export const categories = [
  'Beverages',
  'Bread',
  'Rice',
  'Alfaham',
  'Curries',
  'Soups',
  'Main Course',
  'Vegetables',
  'Broast'
];