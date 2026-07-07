// ==========================================
// AMBATUGROW ERP INVENTORY CLIENT-SIDE APP
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // 1. STATE STORE (Adhering to Schema)
    // ------------------------------------------
    const State = {
        isAuthenticated: false,
        currentUser: null,
        activeTab: 'dashboard',
        isDark: false,
        simActive: false,
        simInterval: null,
        currency: 'PHP',
        
        // Master Tables
        roles: [
            { role_id: 1, role_name: 'System Administrator', description: 'Full access to all systems' },
            { role_id: 2, role_name: 'Inventory Officer', description: 'Access to stock tracking and movements' }
        ],
        users: [
            { user_id: 1, username: 'admin', password: 'admin123', email: 'admin@ambatugrow.com', role_id: 1, name: 'System Admin' },
            { user_id: 2, username: 'officer', password: 'officer123', email: 'officer@ambatugrow.com', role_id: 2, name: 'Inventory Officer' }
        ],
        addresses: [
            { address_id: 1, street: 'CvSU Campus', city: 'Indang', province: 'Cavite', zipcode: '4122' },
            { address_id: 2, street: 'Dasma Highway', city: 'Dasmariñas', province: 'Cavite', zipcode: '4114' },
            { address_id: 3, street: 'Aguinaldo Highway', city: 'Silang', province: 'Cavite', zipcode: '4118' }
        ],
        units_of_measure: [
            { uom_id: 1, uom_code: 'kg', uom_name: 'Kilogram', description: 'Mass metric unit' },
            { uom_id: 2, uom_code: 'L', uom_name: 'Liter', description: 'Volume metric unit' },
            { uom_id: 3, uom_code: 'bag', uom_name: 'Bag', description: 'Pre-packaged bag' },
            { uom_id: 4, uom_code: 'pcs', uom_name: 'Pieces', description: 'Individual units' }
        ],
        currencies: [
            { currency_id: 1, currency_code: 'PHP', currency_name: 'Philippine Peso', exchange_rate: 1.0000 },
            { currency_id: 2, currency_code: 'USD', currency_name: 'US Dollar', exchange_rate: 56.4000 }
        ],
        categories: [
            { category_id: 1, category_name: 'Grains & Seeds', parent_category_id: null },
            { category_id: 2, category_name: 'Organic Fertilizers', parent_category_id: null },
            { category_id: 3, category_name: 'Tools & Protective Equipment', parent_category_id: null },
            { category_id: 4, category_name: 'Liquid Nutrients', parent_category_id: null }
        ],
        
        // Products Table (Expanded to 55 items)
        products: [
            { product_id: 1, sku: 'AGRI-SEED-042', name: 'Hybrid Rice Seeds', description: 'High-yield F1 hybrid seeds', category_id: 1, uom_id: 3, currency_id: 1, base_price: 1800.00, min_quantity_threshold: 15.00, max_quantity_threshold: 100.00, lead_time_days: 7, status: 'Active' },
            { product_id: 2, sku: 'AGRI-FERT-009', name: 'Premium Vermicast', description: '100% organic worm castings', category_id: 2, uom_id: 3, currency_id: 1, base_price: 650.00, min_quantity_threshold: 40.00, max_quantity_threshold: 200.00, lead_time_days: 5, status: 'Active' },
            { product_id: 3, sku: 'AGRI-PROD-001', name: 'Industrial Gloves', description: 'Heavy duty nitrile gloves', category_id: 3, uom_id: 4, currency_id: 1, base_price: 150.00, min_quantity_threshold: 100.00, max_quantity_threshold: 300.00, lead_time_days: 14, status: 'Active' },
            { product_id: 4, sku: 'AGRI-NUTRI-501', name: 'Growmax Liquid Foliar', description: 'Concentrated nitrogen foliar feed', category_id: 4, uom_id: 2, currency_id: 1, base_price: 450.00, min_quantity_threshold: 25.00, max_quantity_threshold: 150.00, lead_time_days: 10, status: 'Active' },
            { product_id: 5, sku: 'AGRI-SEED-101', name: 'Sweet Corn Seeds', description: 'Yellow sweet corn hybrid seeds', category_id: 1, uom_id: 1, currency_id: 1, base_price: 980.00, min_quantity_threshold: 10.00, max_quantity_threshold: 80.00, lead_time_days: 7, status: 'Active' },
            
            // Category 1 - Seeds
            { product_id: 6, sku: 'AGRI-SEED-102', name: 'Organic Tomato Seeds', description: 'Heirloom red tomato seeds', category_id: 1, uom_id: 4, currency_id: 1, base_price: 250.00, min_quantity_threshold: 20.00, max_quantity_threshold: 100.00, lead_time_days: 5, status: 'Active' },
            { product_id: 7, sku: 'AGRI-SEED-103', name: 'Red Onion Seeds', description: 'Short-day red onion seeds', category_id: 1, uom_id: 4, currency_id: 1, base_price: 320.00, min_quantity_threshold: 15.00, max_quantity_threshold: 80.00, lead_time_days: 8, status: 'Active' },
            { product_id: 8, sku: 'AGRI-SEED-104', name: 'Green Bell Pepper Seeds', description: 'California wonder green pepper', category_id: 1, uom_id: 4, currency_id: 1, base_price: 280.00, min_quantity_threshold: 12.00, max_quantity_threshold: 70.00, lead_time_days: 6, status: 'Active' },
            { product_id: 9, sku: 'AGRI-SEED-105', name: 'Organic Cucumber Seeds', description: 'Slicing cucumber organic seed pack', category_id: 1, uom_id: 4, currency_id: 1, base_price: 190.00, min_quantity_threshold: 30.00, max_quantity_threshold: 120.00, lead_time_days: 4, status: 'Active' },
            { product_id: 10, sku: 'AGRI-SEED-106', name: 'Sweet Lettuce Seeds', description: 'Looseleaf lettuce greens seeds', category_id: 1, uom_id: 4, currency_id: 1, base_price: 180.00, min_quantity_threshold: 25.00, max_quantity_threshold: 150.00, lead_time_days: 3, status: 'Active' },
            { product_id: 11, sku: 'AGRI-SEED-107', name: 'Cauliflower Seeds F1', description: 'Early white snowball cauliflower', category_id: 1, uom_id: 4, currency_id: 1, base_price: 450.00, min_quantity_threshold: 10.00, max_quantity_threshold: 60.00, lead_time_days: 9, status: 'Active' },
            { product_id: 12, sku: 'AGRI-SEED-108', name: 'Eggplant Long Purple', description: 'Traditional purple eggplant seeds', category_id: 1, uom_id: 4, currency_id: 1, base_price: 220.00, min_quantity_threshold: 15.00, max_quantity_threshold: 90.00, lead_time_days: 6, status: 'Active' },
            { product_id: 13, sku: 'AGRI-SEED-109', name: 'Carrots Kuroda Seeds', description: 'Sweet and tender carrot seeds', category_id: 1, uom_id: 1, currency_id: 1, base_price: 340.00, min_quantity_threshold: 20.00, max_quantity_threshold: 100.00, lead_time_days: 7, status: 'Active' },
            { product_id: 14, sku: 'AGRI-SEED-110', name: 'Okra Clemson Spineless', description: 'High productivity okra seeds', category_id: 1, uom_id: 4, currency_id: 1, base_price: 150.00, min_quantity_threshold: 30.00, max_quantity_threshold: 200.00, lead_time_days: 5, status: 'Active' },
            { product_id: 15, sku: 'AGRI-SEED-111', name: 'Yardlong Bean Seeds', description: 'Climbing string pole bean seeds', category_id: 1, uom_id: 4, currency_id: 1, base_price: 210.00, min_quantity_threshold: 18.00, max_quantity_threshold: 100.00, lead_time_days: 6, status: 'Active' },
            { product_id: 16, sku: 'AGRI-SEED-112', name: 'Bitter Gourd Seeds', description: 'Galaxy variety bitter melon', category_id: 1, uom_id: 4, currency_id: 1, base_price: 410.00, min_quantity_threshold: 8.00, max_quantity_threshold: 50.00, lead_time_days: 10, status: 'Active' },
            { product_id: 17, sku: 'AGRI-SEED-113', name: 'Cayenne Chili Seeds', description: 'Hot cayenne red chili pepper seeds', category_id: 1, uom_id: 4, currency_id: 1, base_price: 260.00, min_quantity_threshold: 12.00, max_quantity_threshold: 80.00, lead_time_days: 7, status: 'Active' },
            { product_id: 18, sku: 'AGRI-SEED-114', name: 'Spinach Bloomsdale', description: 'Savoy crinkled leaf spinach seeds', category_id: 1, uom_id: 4, currency_id: 1, base_price: 195.00, min_quantity_threshold: 22.00, max_quantity_threshold: 120.00, lead_time_days: 4, status: 'Active' },
 
            // Category 2 - Fertilizers
            { product_id: 19, sku: 'AGRI-FERT-010', name: 'Chicken Manure Pellets', description: 'Dehydrated chicken manure fertilizer', category_id: 2, uom_id: 3, currency_id: 1, base_price: 480.00, min_quantity_threshold: 30.00, max_quantity_threshold: 150.00, lead_time_days: 6, status: 'Active' },
            { product_id: 20, sku: 'AGRI-FERT-011', name: 'Organic Compost Mix', description: 'All-purpose nutrient rich organic compost', category_id: 2, uom_id: 3, currency_id: 1, base_price: 350.00, min_quantity_threshold: 50.00, max_quantity_threshold: 250.00, lead_time_days: 5, status: 'Active' },
            { product_id: 21, sku: 'AGRI-FERT-012', name: 'Premium Bat Guano', description: 'High nitrogen bat guano manure', category_id: 2, uom_id: 1, currency_id: 1, base_price: 1150.00, min_quantity_threshold: 15.00, max_quantity_threshold: 70.00, lead_time_days: 10, status: 'Active' },
            { product_id: 22, sku: 'AGRI-FERT-013', name: 'Steamed Bone Meal', description: 'Phosphorus rich root developer', category_id: 2, uom_id: 1, currency_id: 1, base_price: 780.00, min_quantity_threshold: 25.00, max_quantity_threshold: 120.00, lead_time_days: 8, status: 'Active' },
            { product_id: 23, sku: 'AGRI-FERT-014', name: 'Organic Blood Meal', description: 'Fast-acting nitrogen blood meal powder', category_id: 2, uom_id: 1, currency_id: 1, base_price: 890.00, min_quantity_threshold: 20.00, max_quantity_threshold: 100.00, lead_time_days: 9, status: 'Active' },
            { product_id: 24, sku: 'AGRI-FERT-015', name: 'Seaweed Extract Powder', description: 'Soluble cold-water kelp extract', category_id: 2, uom_id: 1, currency_id: 1, base_price: 1450.00, min_quantity_threshold: 10.00, max_quantity_threshold: 50.00, lead_time_days: 12, status: 'Active' },
            { product_id: 25, sku: 'AGRI-FERT-016', name: 'Fish Shavings Compost', description: 'Processed fish by-product compost', category_id: 2, uom_id: 3, currency_id: 1, base_price: 520.00, min_quantity_threshold: 30.00, max_quantity_threshold: 130.00, lead_time_days: 7, status: 'Active' },
            { product_id: 26, sku: 'AGRI-FERT-017', name: 'Neem Cake Powder', description: 'Organic soil conditioner and pest control', category_id: 2, uom_id: 1, currency_id: 1, base_price: 680.00, min_quantity_threshold: 15.00, max_quantity_threshold: 90.00, lead_time_days: 6, status: 'Active' },
            { product_id: 27, sku: 'AGRI-FERT-018', name: 'Agricultural Epsom Salt', description: 'Magnesium sulfate fertilizer crystals', category_id: 2, uom_id: 1, currency_id: 1, base_price: 290.00, min_quantity_threshold: 40.00, max_quantity_threshold: 180.00, lead_time_days: 5, status: 'Active' },
            { product_id: 28, sku: 'AGRI-FERT-019', name: 'Rock Phosphate Powder', description: 'Slow release phosphorus fertilizer', category_id: 2, uom_id: 1, currency_id: 1, base_price: 490.00, min_quantity_threshold: 35.00, max_quantity_threshold: 150.00, lead_time_days: 10, status: 'Active' },
            { product_id: 29, sku: 'AGRI-FERT-020', name: 'Humic Acid Powder', description: '90% soluble humic acid bio-stimulant', category_id: 2, uom_id: 1, currency_id: 1, base_price: 1250.00, min_quantity_threshold: 8.00, max_quantity_threshold: 40.00, lead_time_days: 8, status: 'Active' },
            { product_id: 30, sku: 'AGRI-FERT-021', name: 'Biochar Soil Amendment', description: 'Activated horticultural charcoal biochar', category_id: 2, uom_id: 3, currency_id: 1, base_price: 620.00, min_quantity_threshold: 20.00, max_quantity_threshold: 100.00, lead_time_days: 7, status: 'Active' },
 
            // Category 3 - Tools
            { product_id: 31, sku: 'AGRI-TOOL-201', name: 'Classic Bypass Pruner', description: 'Precision blades hand pruning shears', category_id: 3, uom_id: 4, currency_id: 1, base_price: 750.00, min_quantity_threshold: 15.00, max_quantity_threshold: 80.00, lead_time_days: 10, status: 'Active' },
            { product_id: 32, sku: 'AGRI-TOOL-202', name: 'Heavy Duty Hand Trowel', description: 'Ergonomic cast aluminum hand trowel', category_id: 3, uom_id: 4, currency_id: 1, base_price: 320.00, min_quantity_threshold: 20.00, max_quantity_threshold: 100.00, lead_time_days: 9, status: 'Active' },
            { product_id: 33, sku: 'AGRI-TOOL-203', name: 'Hand Weeding Spade', description: 'Serrated carbon steel weeding tool', category_id: 3, uom_id: 4, currency_id: 1, base_price: 280.00, min_quantity_threshold: 12.00, max_quantity_threshold: 60.00, lead_time_days: 8, status: 'Active' },
            { product_id: 34, sku: 'AGRI-TOOL-204', name: 'Stainless Hand Rake', description: '5-tine cultivator hand fork rake', category_id: 3, uom_id: 4, currency_id: 1, base_price: 350.00, min_quantity_threshold: 10.00, max_quantity_threshold: 50.00, lead_time_days: 11, status: 'Active' },
            { product_id: 35, sku: 'AGRI-TOOL-205', name: 'Premium Watering Can 5L', description: 'Green plastic watering can with rose head', category_id: 3, uom_id: 4, currency_id: 1, base_price: 490.00, min_quantity_threshold: 15.00, max_quantity_threshold: 90.00, lead_time_days: 7, status: 'Active' },
            { product_id: 36, sku: 'AGRI-TOOL-206', name: 'Knapsack Sprayer 16L', description: 'Manual backpack pressure tank sprayer', category_id: 3, uom_id: 4, currency_id: 1, base_price: 1850.00, min_quantity_threshold: 8.00, max_quantity_threshold: 40.00, lead_time_days: 14, status: 'Active' },
            { product_id: 37, sku: 'AGRI-TOOL-207', name: 'Fiberglass Handle Shovel', description: 'Round point digging spade shovel', category_id: 3, uom_id: 4, currency_id: 1, base_price: 950.00, min_quantity_threshold: 10.00, max_quantity_threshold: 50.00, lead_time_days: 10, status: 'Active' },
            { product_id: 38, sku: 'AGRI-TOOL-208', name: 'Soil pH Moisture Meter', description: '3-in-1 soil sensor probe tester', category_id: 3, uom_id: 4, currency_id: 1, base_price: 580.00, min_quantity_threshold: 25.00, max_quantity_threshold: 120.00, lead_time_days: 7, status: 'Active' },
            { product_id: 39, sku: 'AGRI-TOOL-209', name: 'Digging Fork Heavy Duty', description: '4-tine carbon steel garden fork', category_id: 3, uom_id: 4, currency_id: 1, base_price: 1100.00, min_quantity_threshold: 8.00, max_quantity_threshold: 45.00, lead_time_days: 12, status: 'Active' },
            { product_id: 40, sku: 'AGRI-TOOL-210', name: 'Grafting Tool Set', description: 'Agricultural tree grafting cutter set', category_id: 3, uom_id: 4, currency_id: 1, base_price: 1450.00, min_quantity_threshold: 5.00, max_quantity_threshold: 30.00, lead_time_days: 15, status: 'Active' },
            { product_id: 41, sku: 'AGRI-TOOL-211', name: 'Anti-Insect Netting 10m', description: 'Fine mesh protective crop insect net', category_id: 3, uom_id: 4, currency_id: 1, base_price: 680.00, min_quantity_threshold: 20.00, max_quantity_threshold: 100.00, lead_time_days: 6, status: 'Active' },
            { product_id: 42, sku: 'AGRI-TOOL-212', name: 'Seedling Starter Pots', description: 'Biodegradable peat starter pots 100pcs', category_id: 3, uom_id: 4, currency_id: 1, base_price: 390.00, min_quantity_threshold: 30.00, max_quantity_threshold: 150.00, lead_time_days: 5, status: 'Active' },
            { product_id: 43, sku: 'AGRI-TOOL-213', name: 'Heavy Duty Pruning Saw', description: 'Curved blade wood cutting hand saw', category_id: 3, uom_id: 4, currency_id: 1, base_price: 820.00, min_quantity_threshold: 12.00, max_quantity_threshold: 70.00, lead_time_days: 9, status: 'Active' },
 
            // Category 4 - Liquid Nutrients
            { product_id: 44, sku: 'AGRI-NUTRI-502', name: 'Cal-Mag Booster Liquid', description: 'Calcium and magnesium plant supplement', category_id: 4, uom_id: 2, currency_id: 1, base_price: 690.00, min_quantity_threshold: 15.00, max_quantity_threshold: 80.00, lead_time_days: 8, status: 'Active' },
            { product_id: 45, sku: 'AGRI-NUTRI-503', name: 'Fish Amino Acid FAA', description: 'Liquid fish waste amino foliar feed', category_id: 4, uom_id: 2, currency_id: 1, base_price: 520.00, min_quantity_threshold: 20.00, max_quantity_threshold: 100.00, lead_time_days: 6, status: 'Active' },
            { product_id: 46, sku: 'AGRI-NUTRI-504', name: 'Seaweed Liquid Concentrate', description: 'Cold processed organic liquid seaweed', category_id: 4, uom_id: 2, currency_id: 1, base_price: 850.00, min_quantity_threshold: 18.00, max_quantity_threshold: 90.00, lead_time_days: 7, status: 'Active' },
            { product_id: 47, sku: 'AGRI-NUTRI-505', name: 'Humic Acid Liquid', description: 'Concentrated liquid humates soil wash', category_id: 4, uom_id: 2, currency_id: 1, base_price: 720.00, min_quantity_threshold: 22.00, max_quantity_threshold: 110.00, lead_time_days: 9, status: 'Active' },
            { product_id: 48, sku: 'AGRI-NUTRI-506', name: 'Trace Elements Solution', description: 'Liquid chelated micro plant nutrients', category_id: 4, uom_id: 2, currency_id: 1, base_price: 920.00, min_quantity_threshold: 10.00, max_quantity_threshold: 50.00, lead_time_days: 11, status: 'Active' },
            { product_id: 49, sku: 'AGRI-NUTRI-507', name: 'Potassium Humate Liquid', description: 'Highly active potassium root stimulant', category_id: 4, uom_id: 2, currency_id: 1, base_price: 780.00, min_quantity_threshold: 15.00, max_quantity_threshold: 80.00, lead_time_days: 8, status: 'Active' },
            { product_id: 50, sku: 'AGRI-NUTRI-508', name: 'Organic Pest Repellent', description: 'Chili and garlic insect repellent spray', category_id: 4, uom_id: 2, currency_id: 1, base_price: 420.00, min_quantity_threshold: 30.00, max_quantity_threshold: 150.00, lead_time_days: 5, status: 'Active' },
            { product_id: 51, sku: 'AGRI-NUTRI-509', name: 'Rooting Hormone Solution', description: 'Concentrated rooting hormone stimulant', category_id: 4, uom_id: 2, currency_id: 1, base_price: 680.00, min_quantity_threshold: 12.00, max_quantity_threshold: 60.00, lead_time_days: 6, status: 'Active' },
            { product_id: 52, sku: 'AGRI-NUTRI-510', name: 'Hydroponics A&B Nutrient', description: 'Two-part hydroponics fertilizer set', category_id: 4, uom_id: 2, currency_id: 1, base_price: 1250.00, min_quantity_threshold: 10.00, max_quantity_threshold: 60.00, lead_time_days: 10, status: 'Active' },
            { product_id: 53, sku: 'AGRI-NUTRI-511', name: 'Cold Pressed Neem Oil 1L', description: '100% pure cold pressed neem foliar oil', category_id: 4, uom_id: 2, currency_id: 1, base_price: 890.00, min_quantity_threshold: 15.00, max_quantity_threshold: 90.00, lead_time_days: 7, status: 'Active' },
            { product_id: 54, sku: 'AGRI-NUTRI-512', name: 'Wood Vinegar Solution', description: 'Pyroligneous acid organic soil stimulant', category_id: 4, uom_id: 2, currency_id: 1, base_price: 360.00, min_quantity_threshold: 40.00, max_quantity_threshold: 200.00, lead_time_days: 5, status: 'Active' },
            { product_id: 55, sku: 'AGRI-NUTRI-513', name: 'Compost Tea Brew Pack', description: 'Aerated liquid compost tea concentrate', category_id: 4, uom_id: 2, currency_id: 1, base_price: 580.00, min_quantity_threshold: 20.00, max_quantity_threshold: 100.00, lead_time_days: 6, status: 'Active' }
        ],
        
        // Warehouses Table
        warehouses: [
            { warehouse_id: 1, name: 'Indang Hub (CvSU)', address_id: 1, capacity_sqm: 500.00 },
            { warehouse_id: 2, name: 'Dasma Warehouse', address_id: 2, capacity_sqm: 1200.00 },
            { warehouse_id: 3, name: 'Silang Node', address_id: 3, capacity_sqm: 800.00 }
        ],
        
        // Warehouse Zones Table
        warehouse_zones: [
            { zone_id: 1, warehouse_id: 1, zone_name: 'Zone A - Seeds Store', category: 'Dry Storage' },
            { zone_id: 2, warehouse_id: 1, zone_name: 'Zone B - Liquid Feed', category: 'Chemical Safety' },
            { zone_id: 3, warehouse_id: 2, zone_name: 'Main Hall - Pallet Area', category: 'Bulk Storage' },
            { zone_id: 4, warehouse_id: 3, zone_name: 'Rack Section - Cool Dry', category: 'Temperature Control' }
        ],
        
        // Inventory Locations Table
        inventory_locations: [
            { inventory_id: 1, product_id: 1, warehouse_id: 1, zone_id: 1, quantity: 18.00, expiration_date: '2026-12-31' },
            { inventory_id: 2, product_id: 2, warehouse_id: 2, zone_id: 3, quantity: 120.00, expiration_date: null },
            { inventory_id: 3, product_id: 3, warehouse_id: 2, zone_id: 3, quantity: 85.00, expiration_date: null },
            { inventory_id: 4, product_id: 4, warehouse_id: 1, zone_id: 2, quantity: 30.00, expiration_date: '2026-07-28' },
            { inventory_id: 5, product_id: 5, warehouse_id: 3, zone_id: 4, quantity: 8.00, expiration_date: '2026-10-15' },
            { inventory_id: 6, product_id: 6, warehouse_id: 1, zone_id: 1, quantity: 45.00, expiration_date: '2026-11-20' },
            { inventory_id: 7, product_id: 7, warehouse_id: 1, zone_id: 1, quantity: 30.00, expiration_date: '2026-10-05' },
            { inventory_id: 8, product_id: 8, warehouse_id: 1, zone_id: 1, quantity: 12.00, expiration_date: '2026-09-15' },
            { inventory_id: 9, product_id: 9, warehouse_id: 1, zone_id: 1, quantity: 65.00, expiration_date: '2026-12-01' },
            { inventory_id: 10, product_id: 10, warehouse_id: 1, zone_id: 1, quantity: 80.00, expiration_date: '2026-08-30' },
            { inventory_id: 11, product_id: 11, warehouse_id: 1, zone_id: 1, quantity: 22.00, expiration_date: '2026-10-10' },
            { inventory_id: 12, product_id: 12, warehouse_id: 1, zone_id: 1, quantity: 40.00, expiration_date: '2026-09-25' },
            { inventory_id: 13, product_id: 13, warehouse_id: 1, zone_id: 1, quantity: 55.00, expiration_date: '2026-11-30' },
            { inventory_id: 14, product_id: 14, warehouse_id: 1, zone_id: 1, quantity: 110.00, expiration_date: '2026-12-15' },
            { inventory_id: 15, product_id: 15, warehouse_id: 1, zone_id: 1, quantity: 65.00, expiration_date: '2026-10-22' },
            { inventory_id: 16, product_id: 16, warehouse_id: 1, zone_id: 1, quantity: 6.00, expiration_date: '2026-09-05' },
            { inventory_id: 17, product_id: 17, warehouse_id: 1, zone_id: 1, quantity: 45.00, expiration_date: '2026-11-18' },
            { inventory_id: 18, product_id: 18, warehouse_id: 1, zone_id: 1, quantity: 70.00, expiration_date: '2026-10-01' },
            { inventory_id: 19, product_id: 19, warehouse_id: 2, zone_id: 3, quantity: 95.00, expiration_date: null },
            { inventory_id: 20, product_id: 20, warehouse_id: 2, zone_id: 3, quantity: 180.00, expiration_date: null },
            { inventory_id: 21, product_id: 21, warehouse_id: 2, zone_id: 3, quantity: 35.00, expiration_date: null },
            { inventory_id: 22, product_id: 22, warehouse_id: 2, zone_id: 3, quantity: 60.00, expiration_date: null },
            { inventory_id: 23, product_id: 23, warehouse_id: 2, zone_id: 3, quantity: 80.00, expiration_date: null },
            { inventory_id: 24, product_id: 24, warehouse_id: 2, zone_id: 3, quantity: 25.00, expiration_date: null },
            { inventory_id: 25, product_id: 25, warehouse_id: 2, zone_id: 3, quantity: 90.00, expiration_date: null },
            { inventory_id: 26, product_id: 26, warehouse_id: 2, zone_id: 3, quantity: 40.00, expiration_date: null },
            { inventory_id: 27, product_id: 27, warehouse_id: 2, zone_id: 3, quantity: 110.00, expiration_date: null },
            { inventory_id: 28, product_id: 28, warehouse_id: 2, zone_id: 3, quantity: 65.00, expiration_date: null },
            { inventory_id: 29, product_id: 29, warehouse_id: 2, zone_id: 3, quantity: 18.00, expiration_date: null },
            { inventory_id: 30, product_id: 30, warehouse_id: 2, zone_id: 3, quantity: 75.00, expiration_date: null },
            { inventory_id: 31, product_id: 31, warehouse_id: 3, zone_id: 4, quantity: 35.00, expiration_date: null },
            { inventory_id: 32, product_id: 32, warehouse_id: 3, zone_id: 4, quantity: 50.00, expiration_date: null },
            { inventory_id: 33, product_id: 33, warehouse_id: 3, zone_id: 4, quantity: 28.00, expiration_date: null },
            { inventory_id: 34, product_id: 34, warehouse_id: 3, zone_id: 4, quantity: 22.00, expiration_date: null },
            { inventory_id: 35, product_id: 35, warehouse_id: 3, zone_id: 4, quantity: 40.00, expiration_date: null },
            { inventory_id: 36, product_id: 36, warehouse_id: 3, zone_id: 4, quantity: 15.00, expiration_date: null },
            { inventory_id: 37, product_id: 37, warehouse_id: 3, zone_id: 4, quantity: 30.00, expiration_date: null },
            { inventory_id: 38, product_id: 38, warehouse_id: 3, zone_id: 4, quantity: 65.00, expiration_date: null },
            { inventory_id: 39, product_id: 39, warehouse_id: 3, zone_id: 4, quantity: 20.00, expiration_date: null },
            { inventory_id: 40, product_id: 40, warehouse_id: 3, zone_id: 4, quantity: 12.00, expiration_date: null },
            { inventory_id: 41, product_id: 41, warehouse_id: 3, zone_id: 4, quantity: 45.00, expiration_date: null },
            { inventory_id: 42, product_id: 42, warehouse_id: 3, zone_id: 4, quantity: 80.00, expiration_date: null },
            { inventory_id: 43, product_id: 43, warehouse_id: 3, zone_id: 4, quantity: 32.00, expiration_date: null },
            { inventory_id: 44, product_id: 44, warehouse_id: 1, zone_id: 2, quantity: 40.00, expiration_date: '2026-11-10' },
            { inventory_id: 45, product_id: 45, warehouse_id: 1, zone_id: 2, quantity: 60.00, expiration_date: '2026-10-15' },
            { inventory_id: 46, product_id: 46, warehouse_id: 1, zone_id: 2, quantity: 45.00, expiration_date: '2027-01-20' },
            { inventory_id: 47, product_id: 47, warehouse_id: 1, zone_id: 2, quantity: 50.00, expiration_date: '2026-09-30' },
            { inventory_id: 48, product_id: 48, warehouse_id: 1, zone_id: 2, quantity: 30.00, expiration_date: '2026-12-15' },
            { inventory_id: 49, product_id: 49, warehouse_id: 1, zone_id: 2, quantity: 35.00, expiration_date: '2026-08-25' },
            { inventory_id: 50, product_id: 50, warehouse_id: 1, zone_id: 2, quantity: 90.00, expiration_date: '2026-09-10' },
            { inventory_id: 51, product_id: 51, warehouse_id: 1, zone_id: 2, quantity: 28.00, expiration_date: '2026-07-30' },
            { inventory_id: 52, product_id: 52, warehouse_id: 1, zone_id: 2, quantity: 15.00, expiration_date: '2027-03-01' },
            { inventory_id: 53, product_id: 53, warehouse_id: 1, zone_id: 2, quantity: 55.00, expiration_date: '2027-02-15' },
            { inventory_id: 54, product_id: 54, warehouse_id: 1, zone_id: 2, quantity: 90.00, expiration_date: '2027-04-10' },
            { inventory_id: 55, product_id: 55, warehouse_id: 1, zone_id: 2, quantity: 48.00, expiration_date: '2026-08-15' }
        ],
        
        // Stock Transactions Table
        stock_transactions: [
            { transaction_id: 1, product_id: 1, warehouse_id: 1, transaction_type: 'Stock-in', quantity: 20.00, transaction_date: '2026-07-06T10:00:00Z', notes: 'Initial setup seeds' },
            { transaction_id: 2, product_id: 2, warehouse_id: 2, transaction_type: 'Stock-in', quantity: 150.00, transaction_date: '2026-07-06T11:15:00Z', notes: 'Bulk vermicast receipt' },
            { transaction_id: 3, product_id: 4, warehouse_id: 1, transaction_type: 'Stock-in', quantity: 30.00, transaction_date: '2026-07-06T12:30:00Z', notes: 'Liquid nutrients restock' }
        ]
    };

    // ------------------------------------------
    // 2. CACHED DOM ELEMENTS & HELPERS
    // ------------------------------------------
    const DOM = {
        appContainer: document.getElementById('app-container'),
        loginGateway: document.getElementById('login-gateway'),
        loginForm: document.getElementById('login-form'),
        loginLoader: document.getElementById('login-loader'),
        erpShell: document.getElementById('erp-shell'),
        sidebarNav: document.getElementById('sidebar-nav'),
        headerViewTitle: document.getElementById('header-view-title'),
        mainWorkspace: document.getElementById('main-workspace'),
        consoleLogs: document.getElementById('console-logs'),
        themeToggle: document.getElementById('theme-toggle'),
        themeIcon: document.getElementById('theme-icon'),
        themeText: document.getElementById('theme-text'),
        globalSearch: document.getElementById('global-search'),
        toastContainer: document.getElementById('toast-container'),
        
        // Modal / Drawer wrappers
        btnTransferWizard: document.getElementById('btn-transfer-wizard'),
        modalTransferWizard: document.getElementById('modal-transfer-wizard'),
        transferForm: document.getElementById('transfer-form'),
        modalNewProduct: document.getElementById('modal-new-product'),
        productForm: document.getElementById('product-form'),
        drawerAdjustStock: document.getElementById('drawer-adjust-stock'),
        adjustForm: document.getElementById('adjust-form'),
        btnSubmitAdjust: document.getElementById('btn-submit-adjust'),
        btnSettings: document.getElementById('btn-settings'),
        modalCmdPalette: document.getElementById('modal-cmd-palette'),
        cmdInput: document.getElementById('cmd-input'),
        cmdResults: document.getElementById('cmd-results')
    };

    // Tracking workspace filters state (Next.js TrackingWorkspace match)
    let selectedSkus = [];
    let selectedCategoryFilter = 'All';
    let selectedStatusFilter = 'All';
    let selectedZoneFilter = null;

    // Helper: Formats currency
    const formatPHP = (val) => {
        const floatVal = parseFloat(val);
        if (State.currency === 'USD') {
            return '$' + (floatVal / 58.00).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return '₱' + floatVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Helper: Formats date
    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // Sidebar Widgets Stack Manager (Screenshot Match)
    const updateSidebarWidgets = () => {
        // 1. Low stock derivation
        const items = [];
        State.inventory_locations.forEach(loc => {
            const prod = State.products.find(p => p.product_id === loc.product_id);
            if (!prod) return;
            items.push({
                sku: prod.sku,
                stockQty: loc.quantity,
                minQty: prod.min_quantity_threshold,
                maxQty: prod.max_quantity_threshold,
                status: prod.status || 'Active'
            });
        });

        const lowStockItems = items.filter(i => i.status === 'Active' && i.stockQty <= i.minQty);
        const lowStockContainer = document.getElementById('sidebar-widget-low-stock');
        
        if (lowStockContainer) {
            if (lowStockItems.length > 0) {
                lowStockContainer.innerHTML = `
                    <section class="bg-[#FEF7D0] border border-yellow-300 rounded-3xl p-5 shadow-2xs">
                        <div class="flex items-start gap-3">
                            <div class="p-1 text-[#b45309]">
                                <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600 shrink-0"></i>
                            </div>
                            <div class="flex-1 min-w-0 text-slate-800">
                                <h4 class="font-extrabold text-sm text-amber-900 leading-tight">Low Stock Warning</h4>
                                <p class="text-[11px] font-bold text-amber-800 mt-1.5 leading-relaxed">
                                    <strong>${lowStockItems.length} items</strong> below minimum threshold. Action required for replenishment.
                                </p>
                                <button id="sidebar-btn-generate-requisition" class="mt-3 px-3 py-2 bg-amber-700/10 hover:bg-amber-700/20 text-amber-955 rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors border border-amber-600/20 cursor-pointer w-full text-center">
                                    Generate Requisition Order
                                </button>
                            </div>
                        </div>
                    </section>
                `;
                
                // Bind trigger
                document.getElementById('sidebar-btn-generate-requisition').addEventListener('click', () => {
                    let reqCount = 0;
                    State.inventory_locations.forEach(loc => {
                        const prod = State.products.find(p => p.product_id === loc.product_id);
                        if (prod && loc.quantity <= prod.min_quantity_threshold && prod.status === 'Active') {
                            const deficit = prod.max_quantity_threshold - loc.quantity;
                            if (deficit > 0) {
                                loc.quantity = prod.max_quantity_threshold;
                                
                                // Log Transaction
                                const newTxId = State.stock_transactions.length + 1;
                                State.stock_transactions.push({
                                    transaction_id: newTxId,
                                    product_id: prod.product_id,
                                    warehouse_id: loc.warehouse_id,
                                    zone_id: loc.zone_id,
                                    type: 'IN',
                                    quantity: deficit,
                                    timestamp: new Date().toISOString(),
                                    operator: 'System Scheduler',
                                    notes: `Automatic reorder requisition safety threshold replenishment.`
                                });
                                
                                addConsoleLog(`[Reorder SUCCESS] Replenished SKU ${prod.sku} with +${deficit.toFixed(0)} units to max threshold.`, 'success');
                                reqCount++;
                            }
                        }
                    });
                    
                    if (reqCount > 0) {
                        showToast(`Generated requisition. Replenished ${reqCount} low stock items.`, 'success');
                        playAlertSound('success');
                        updateSidebarWidgets();
                        if (State.activeTab === 'tracking') renderTracking();
                    }
                });
            } else {
                lowStockContainer.innerHTML = `
                    <section class="bg-[#e6f4ea]/40 border border-emerald-200/50 rounded-3xl p-5 shadow-2xs">
                        <div class="flex items-start gap-3">
                            <div class="p-1 text-[#137333]">
                                <i data-lucide="shield-check" class="w-5 h-5 text-emerald-600 shrink-0"></i>
                            </div>
                            <div class="flex-1 min-w-0 text-slate-800">
                                <h4 class="font-extrabold text-sm text-emerald-950 leading-tight font-outfit">All Stocks Secure</h4>
                                <p class="text-[11px] font-bold text-emerald-800 mt-1 leading-relaxed">No items are currently below safety thresholds.</p>
                            </div>
                        </div>
                    </section>
                `;
            }
        }

        // 2. Zone densities
        const zonesList = document.getElementById('sidebar-zones-list');
        if (zonesList) {
            zonesList.innerHTML = '';
            State.warehouse_zones.forEach(zone => {
                let zoneSum = 0;
                State.inventory_locations.forEach(loc => {
                    if (loc.zone_id === zone.zone_id) {
                        zoneSum += parseFloat(loc.quantity);
                    }
                });
                const zoneMax = zone.zone_id === 3 ? 500 : 150;
                const pct = Math.min(100, Math.round((zoneSum / zoneMax) * 100));
                
                let color = 'bg-[#2D6A24]'; // green
                if (zone.zone_id === 2) color = 'bg-[#34a853]'; // lighter green
                else if (zone.zone_id === 3) color = 'bg-[#fbbc05]'; // orange/yellow

                const wh = State.warehouses.find(w => w.warehouse_id === zone.warehouse_id);
                const whLetter = wh ? (wh.warehouse_id === 1 ? 'A' : wh.warehouse_id === 2 ? 'B' : 'C') : 'A';
                const cleanName = `Warehouse ${whLetter} - Zone ${zone.zone_id}`;

                const zoneCard = document.createElement('div');
                zoneCard.className = `p-2.5 rounded-2xl border border-transparent cursor-pointer transition-all hover:bg-slate-50 ${selectedZoneFilter === zone.zone_name ? 'bg-emerald-50/50 border-emerald-200' : ''}`;
                zoneCard.innerHTML = `
                    <div class="flex justify-between items-baseline mb-1">
                        <span class="text-xs font-bold text-slate-700">${cleanName}</span>
                        <span class="text-[11px] font-extrabold text-slate-900 tabular-nums">${zoneSum.toFixed(0)} items</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/10">
                        <div class="h-full rounded-full transition-all duration-300 ${color}" style="width: ${pct}%"></div>
                    </div>
                `;
                zoneCard.addEventListener('click', () => {
                    selectedZoneFilter = selectedZoneFilter === zone.zone_name ? null : zone.zone_name;
                    updateSidebarWidgets();
                    if (State.activeTab === 'tracking') renderTracking();
                });
                zonesList.appendChild(zoneCard);
            });
        }

        // 3. Recent logs
        const logsList = document.getElementById('sidebar-logs-list');
        if (logsList) {
            logsList.innerHTML = '';
            
            const sortedTxs = [...State.stock_transactions]
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 3);
                
            const getRelativeTime = (timestamp) => {
                if (!timestamp) return 'Just now';
                const diff = Date.now() - new Date(timestamp).getTime();
                const mins = Math.floor(diff / 60000);
                if (mins < 1) return 'Just now';
                if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
                const hours = Math.floor(mins / 60);
                if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                const days = Math.floor(hours / 24);
                return `${days} day${days > 1 ? 's' : ''} ago`;
            };

            sortedTxs.forEach(tx => {
                const prod = State.products.find(p => p.product_id === tx.product_id);
                
                let iconElement = '<i data-lucide="arrow-down" class="w-3.5 h-3.5"></i>';
                let iconBgClass = 'bg-[#e6f4ea] text-[#137333]'; // Stock-In green
                let messageTitle = `Stock-In +${tx.quantity.toFixed(0)}`;

                if (tx.type === 'OUT') {
                    iconElement = '<i data-lucide="arrow-up" class="w-3.5 h-3.5"></i>';
                    iconBgClass = 'bg-[#fef7e0] text-[#b06000]'; // Stock-Out orange
                    messageTitle = `Stock-Out -${tx.quantity.toFixed(0)}`;
                } else if (tx.notes && tx.notes.includes('relocation')) {
                    iconElement = '<i data-lucide="arrow-right-left" class="w-3.5 h-3.5"></i>';
                    iconBgClass = 'bg-[#e8f0fe] text-[#1a73e8]'; // Transfer blue
                    messageTitle = 'Relocated Batch';
                } else if (tx.notes && tx.notes.includes('Update')) {
                    iconElement = '<i data-lucide="edit-3" class="w-3.5 h-3.5"></i>';
                    iconBgClass = 'bg-[#e8f0fe] text-[#1a73e8]'; // Edit blue
                    messageTitle = 'Updated Details';
                }

                const logItem = document.createElement('div');
                logItem.className = 'flex gap-3 text-xs leading-relaxed';
                logItem.innerHTML = `
                    <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${iconBgClass}">
                        ${iconElement}
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="flex flex-col">
                            <span class="font-bold text-slate-800">${messageTitle}</span>
                            <span class="text-[10px] text-slate-400 font-semibold mt-0.5">
                                SKU: <button data-sku="${prod ? prod.sku : ''}" class="sidebar-btn-log-sku text-[#2d6a24] hover:underline font-bold bg-transparent border-none cursor-pointer p-0 font-mono">${prod ? prod.sku : 'N/A'}</button>
                            </span>
                            <span class="text-[9px] text-slate-400 font-semibold mt-0.5 font-sans">
                                ${getRelativeTime(tx.timestamp)} by ${tx.operator || 'Admin'}
                            </span>
                        </div>
                    </div>
                `;
                
                const btnSku = logItem.querySelector('.sidebar-btn-log-sku');
                if (btnSku) {
                    btnSku.addEventListener('click', () => {
                        const sku = btnSku.getAttribute('data-sku');
                        if (sku) {
                            if (State.activeTab !== 'tracking') {
                                DOM.sidebarNav.querySelector('[data-tab="tracking"]').click();
                            }
                            // Reset filters
                            selectedCategoryFilter = 'All';
                            selectedStatusFilter = 'All';
                            selectedZoneFilter = null;
                            DOM.globalSearch.value = sku;
                            DOM.globalSearch.dispatchEvent(new Event('input'));
                        }
                    });
                }

                logsList.appendChild(logItem);
            });
        }
        
        lucide.createIcons();
    };

    const addConsoleLog = (text, type = 'info') => {
        updateSidebarWidgets();
    };

    // Helper: Show toast notification
    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = 'bg-slate-950/95 backdrop-blur-md text-white rounded-2xl shadow-2xl p-4 flex items-center gap-3.5 border border-slate-800/80 animate-slide-in-right pointer-events-auto max-w-sm';
        
        let icon = 'info';
        let iconColor = 'text-slate-400 bg-slate-500/10 border-slate-500/20';
        let label = 'System Notification';
        
        if (type === 'success') {
            icon = 'check-circle';
            iconColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            label = 'Task Succeeded';
        } else if (type === 'error') {
            icon = 'x-circle';
            iconColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            label = 'Execution Error';
        } else if (type === 'warning') {
            icon = 'alert-triangle';
            iconColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            label = 'System Warning';
        }

        toast.innerHTML = `
            <div class="p-2 rounded-xl shrink-0 border ${iconColor}">
                <i data-lucide="${icon}" class="w-5 h-5"></i>
            </div>
            <div class="flex-grow min-w-0 pr-4">
                <span class="block text-[10px] font-black uppercase tracking-wider text-white">${label}</span>
                <span class="block text-[10px] font-bold text-slate-300 mt-0.5 leading-normal">${message}</span>
            </div>
        `;
        
        DOM.toastContainer.appendChild(toast);
        lucide.createIcons();

        // Remove toast after 4s
        setTimeout(() => {
            toast.classList.add('animate-scale-out');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    };

    // ------------------------------------------
    // 3. AUTHENTICATION / LOGIN ENGINE
    // ------------------------------------------
    const updateGatewayTime = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
        const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        
        const gTime = document.getElementById('gateway-time');
        const gDate = document.getElementById('gateway-date');
        if (gTime) gTime.textContent = timeStr;
        if (gDate) gDate.textContent = dateStr;
    };
    
    updateGatewayTime();
    setInterval(updateGatewayTime, 1000);

    DOM.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const usernameInput = document.getElementById('username').value.trim();
        const passwordInput = document.getElementById('password').value.trim();
        
        // Find user
        const matchedUser = State.users.find(u => 
            (u.email === usernameInput || u.username === usernameInput) && 
            u.password === passwordInput
        );
        
        if (!matchedUser) {
            showToast('Access Denied: Invalid credentials.', 'error');
            return;
        }
        
        State.currentUser = matchedUser;
        
        // Show Full Screen Loader
        DOM.loginLoader.classList.remove('hidden');
        
        const loaderConsole = document.getElementById('loader-console-logs');
        const loaderProgress = document.getElementById('load-progress-bar');
        const loaderTitle = document.getElementById('load-status-title');
        const loaderPercent = document.getElementById('load-status-percent');
        
        loaderConsole.innerHTML = '';
        loaderProgress.style.width = '0%';
        loaderPercent.textContent = '0%';
        
        const addLoaderLog = (text, type = 'info') => {
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            const logLine = document.createElement('div');
            logLine.className = type === 'success' ? 'text-emerald-400 font-bold animate-pulse' : 'text-slate-400';
            logLine.textContent = `[${time}] ${text}`;
            loaderConsole.appendChild(logLine);
            loaderConsole.scrollTop = loaderConsole.scrollHeight;
        };

        const loadSteps = [
            { delay: 400, pct: 25, title: 'ACCESS_REQUEST_INITIALIZED', msg: `ACCESS_GATEWAY_REQUEST: Initiating handshake for ${matchedUser.username}...`, node: 1, line: 1 },
            { delay: 900, pct: 50, title: 'TUNNEL_CONNECTION_SECURE', msg: 'SECURE_TUNNEL: Routing connection via Indang-Hub... Connected.', node: 3, line: 3 },
            { delay: 1400, pct: 75, title: 'DATABASE_NODE_MOUNTED', msg: 'SQLITE_MOUNT: Syncing categories and products master directories...', node: 4, line: 4 },
            { delay: 1900, pct: 95, title: 'VAULT_AUTHORIZATION_VERIFIED', msg: `CREDENTIALS_AUDIT: Key token for employee ${matchedUser.username.toUpperCase()} verified.`, node: 2, line: 2 },
            { delay: 2400, pct: 100, title: 'ESTABLISHING_SESSION', msg: 'VAULT_LOADER: Handshake complete. Mounting dashboard workspace.', node: null, line: null }
        ];

        addLoaderLog('ACCESS_GATEWAY_REQUEST: Connecting to Secure Terminal Node IP: 192.168.1.42...', 'info');

        loadSteps.forEach(step => {
            setTimeout(() => {
                // Update Progress bar & labels
                loaderProgress.style.width = `${step.pct}%`;
                loaderPercent.textContent = `${step.pct}%`;
                loaderTitle.textContent = step.title;
                
                // Append hacker log
                addLoaderLog(step.msg, step.pct === 100 ? 'success' : 'info');
                
                // Highlight satellite nodes if applicable
                if (step.node) {
                    const node = document.getElementById(`node-sat-${step.node}`);
                    if (node) {
                        node.classList.remove('bg-slate-900', 'border-slate-700');
                        node.classList.add('bg-emerald-500/20', 'border-emerald-400', 'text-emerald-400', 'shadow-[0_0_15px_rgba(16,185,129,0.4)]');
                        const icon = node.querySelector('i');
                        if (icon) icon.className = 'w-4 h-4 text-emerald-400';
                        
                        const line = document.getElementById(`line-sat-${step.line}`);
                        if (line) {
                            line.setAttribute('stroke', '#10b981');
                        }
                    }
                }

                // Final step transition
                if (step.pct === 100) {
                    setTimeout(() => {
                        DOM.loginLoader.classList.add('hidden');
                        DOM.loginGateway.classList.add('animate-scale-out');
                        addConsoleLog('Connecting to Secure Terminal Node IP: 192.168.1.42...', 'info');

                        setTimeout(() => {
                            DOM.loginGateway.classList.add('hidden');
                            DOM.erpShell.classList.remove('hidden');
                            State.isAuthenticated = true;
                            
                            // Dynamic sidebar profile update
                            const sideUser = document.getElementById('sidebar-username');
                            const sideRole = document.getElementById('sidebar-role');
                            if (sideUser) sideUser.textContent = State.currentUser.name;
                            if (sideRole) sideRole.textContent = State.currentUser.role_id === 1 ? 'Administrator' : 'Inventory Officer';
                            
                            // Initialize modules layout
                            renderWorkspace();
                            showToast(`Welcome back, ${State.currentUser.name}.`, 'success');
                        }, 500);
                    }, 500);
                }
            }, step.delay);
        });
    });

    // Sidebar Logs "View All" Button Listener
    const btnSidebarViewAll = document.getElementById('sidebar-btn-view-all-logs');
    if (btnSidebarViewAll) {
        btnSidebarViewAll.addEventListener('click', () => {
            const ledgerBtn = DOM.sidebarNav.querySelector('button[data-tab="ledger"]');
            if (ledgerBtn) ledgerBtn.click();
        });
    }

    // ------------------------------------------
    // 4. RENDERING VIEWS & TAB SWITCHING
    // ------------------------------------------
    
    // TAB SELECTORS
    DOM.sidebarNav.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active states from all nav buttons
        DOM.sidebarNav.querySelectorAll('button').forEach(item => {
            item.className = 'w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-full transition-all text-left text-slate-600 hover:bg-slate-200 hover:text-slate-800';
        });
        
        // Set active class
        btn.className = 'w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-full transition-all text-left bg-[#2D6A24] text-white';
        
        // Change state and rerender
        State.activeTab = targetTab;
        DOM.headerViewTitle.textContent = btn.querySelector('span').textContent;
        renderWorkspace();
    });

    // DYNAMIC VIEWS GENERATORS
    const renderWorkspace = () => {
        if (!State.isAuthenticated) return;
        updateSidebarWidgets();
        
        if (State.activeTab === 'dashboard') {
            renderDashboard();
        } else if (State.activeTab === 'tracking') {
            renderTracking();
        } else if (State.activeTab === 'ledger') {
            renderLedger();
        } else if (State.activeTab === 'zones') {
            renderZones();
        } else if (State.activeTab === 'reports') {
            renderReports();
        }
        
        lucide.createIcons();
    };

    // VIEW 1: DASHBOARD
    const renderDashboard = () => {
        // Calculations
        const totalItemsCount = State.inventory_locations.length;
        const totalProducts = State.products.length;
        
        // Sum total stock value
        let totalValue = 0;
        State.inventory_locations.forEach(loc => {
            const prod = State.products.find(p => p.product_id === loc.product_id);
            if (prod) {
                totalValue += loc.quantity * prod.base_price;
            }
        });

        // Sum low stock alert counts
        let lowStockCount = 0;
        State.inventory_locations.forEach(loc => {
            const prod = State.products.find(p => p.product_id === loc.product_id);
            if (prod && loc.quantity <= prod.min_quantity_threshold) {
                lowStockCount++;
            }
        });

        // Sum expiring batches counts
        let expiringCount = 0;
        const thirtyDaysLimit = new Date();
        thirtyDaysLimit.setDate(thirtyDaysLimit.getDate() + 30);
        State.inventory_locations.forEach(loc => {
            if (loc.expiration_date) {
                const exp = new Date(loc.expiration_date);
                if (exp <= thirtyDaysLimit) {
                    expiringCount++;
                }
            }
        });

        DOM.mainWorkspace.innerHTML = `
            <div class="space-y-6 animate-slide-up-fade">
                <!-- Dashboard Welcome Banner -->
                <div class="bg-[#2D6A24] text-white p-6 rounded-3xl shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="space-y-1.5 z-10">
                        <h2 class="text-xl font-black font-outfit">Inventory Vault Node Active</h2>
                        <p class="text-xs text-emerald-100 font-semibold max-w-lg leading-relaxed">Coordination terminal for regional storage hubs. Review live stock levels, execute secure stock transfers, and audit the immutable ledger below.</p>
                    </div>
                    ${State.currentUser.role_id === 1 ? `
                    <div class="z-10 shrink-0">
                        <button id="btn-quick-add" class="py-2 px-4 bg-white hover:bg-slate-50 text-[#2D6A24] rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all cursor-pointer">
                            <i data-lucide="plus-circle" class="w-4 h-4"></i>
                            <span>Register New Item</span>
                        </button>
                    </div>
                    ` : ''}
                </div>

                <!-- Bento grid metrics -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <!-- Total Value Card -->
                    <div class="card-surface p-5 flex flex-col justify-between h-36">
                        <div class="flex justify-between items-start">
                            <div class="p-2.5 rounded-xl bg-emerald-500/10 text-[#2D6A24] border border-[#2D6A24]/10">
                                <i data-lucide="wallet" class="w-5 h-5"></i>
                            </div>
                            <span class="text-[9px] font-bold text-slate-400 uppercase">Valuation</span>
                        </div>
                        <div>
                            <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Vault Value</span>
                            <span class="block text-2xl font-black text-slate-800 tracking-tight mt-1 font-outfit">${formatPHP(totalValue)}</span>
                        </div>
                    </div>

                    <!-- Low Stock warnings -->
                    <div class="card-surface p-5 flex flex-col justify-between h-36">
                        <div class="flex justify-between items-start">
                            <div class="p-2.5 rounded-xl ${lowStockCount > 0 ? 'bg-amber-500/10 text-amber-600 border-amber-500/10' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10'} border">
                                <i data-lucide="alert-triangle" class="w-5 h-5"></i>
                            </div>
                            <span class="text-[9px] font-bold text-slate-400 uppercase">Alerts</span>
                        </div>
                        <div>
                            <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Low Stock Warnings</span>
                            <span class="block text-2xl font-black ${lowStockCount > 0 ? 'text-amber-600' : 'text-slate-800'} tracking-tight mt-1 font-outfit">${lowStockCount} items</span>
                        </div>
                    </div>

                    <!-- Expiring batches -->
                    <div class="card-surface p-5 flex flex-col justify-between h-36">
                        <div class="flex justify-between items-start">
                            <div class="p-2.5 rounded-xl ${expiringCount > 0 ? 'bg-rose-500/10 text-rose-600 border-rose-500/10' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/10'} border">
                                <i data-lucide="calendar" class="w-5 h-5"></i>
                            </div>
                            <span class="text-[9px] font-bold text-slate-400 uppercase">FEFO</span>
                        </div>
                        <div>
                            <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Expiring Batches</span>
                            <span class="block text-2xl font-black ${expiringCount > 0 ? 'text-rose-600' : 'text-slate-800'} tracking-tight mt-1 font-outfit">${expiringCount} batches</span>
                        </div>
                    </div>

                    <!-- Warehouse Sum -->
                    <div class="card-surface p-5 flex flex-col justify-between h-36">
                        <div class="flex justify-between items-start">
                            <div class="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/10">
                                <i data-lucide="warehouse" class="w-5 h-5"></i>
                            </div>
                            <span class="text-[9px] font-bold text-slate-400 uppercase">Capacity</span>
                        </div>
                        <div>
                            <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Active Warehouses</span>
                            <span class="block text-2xl font-black text-slate-800 tracking-tight mt-1 font-outfit">${State.warehouses.length} Nodes</span>
                        </div>
                    </div>
                </div>

                <!-- Split section: Zone Occupancy & Recent movements -->
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <!-- Stock Value by Category Chart -->
                    <div class="card-surface p-5 lg:col-span-1 flex flex-col justify-between space-y-4">
                        <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <span class="text-[10px] font-black uppercase tracking-wider text-slate-600">Value by Category</span>
                            <i data-lucide="pie-chart" class="w-4 h-4 text-slate-400"></i>
                        </div>
                        <div class="flex-1 flex items-center justify-center p-2 relative h-48">
                            <canvas id="dashboard-category-chart"></canvas>
                        </div>
                    </div>

                    <!-- Zone Occupancy Meter -->
                    <div class="card-surface p-5 lg:col-span-1 flex flex-col justify-between space-y-4">
                        <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <span class="text-[10px] font-black uppercase tracking-wider text-slate-600">Zone Occupancy</span>
                            <i data-lucide="activity" class="w-4 h-4 text-slate-400"></i>
                        </div>
                        <div class="space-y-4 font-outfit" id="dashboard-zone-meters">
                            <!-- Dynamic Meters added here -->
                        </div>
                    </div>

                    <!-- Recent movements logs list -->
                    <div class="card-surface p-5 lg:col-span-2 flex flex-col justify-between space-y-4">
                        <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <span class="text-[10px] font-black uppercase tracking-wider text-slate-600">Recent Movements Ledger</span>
                            <button id="btn-dashboard-to-ledger" class="text-[9px] font-black uppercase text-[#2D6A24] hover:text-[#23531B] cursor-pointer">View Entire Ledger</button>
                        </div>
                        <div class="overflow-x-auto min-h-0">
                            <table class="w-full text-left text-xs">
                                <thead>
                                    <tr class="border-b border-slate-100 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                        <th class="py-2.5">Date</th>
                                        <th class="py-2.5">Product</th>
                                        <th class="py-2.5">Warehouse</th>
                                        <th class="py-2.5">Type</th>
                                        <th class="py-2.5 text-right">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody id="dashboard-recent-txs">
                                    <!-- Dynamic rows -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Render Zone occupancy meters
        const metersContainer = document.getElementById('dashboard-zone-meters');
        State.warehouse_zones.forEach(zone => {
            const wh = State.warehouses.find(w => w.warehouse_id === zone.warehouse_id);
            // Calculate total quantities in this zone
            let zoneSum = 0;
            State.inventory_locations.forEach(loc => {
                if (loc.zone_id === zone.zone_id) {
                    zoneSum += parseFloat(loc.quantity);
                }
            });
            
            // Assume dummy zone capacity is 150 for CV/dry storage, 400 for bulk
            const zoneMax = zone.zone_id === 3 ? 500 : 150;
            const pct = Math.min(100, Math.round((zoneSum / zoneMax) * 100));

            const meter = document.createElement('div');
            meter.className = 'space-y-1';
            meter.innerHTML = `
                <div class="flex justify-between items-center text-[10px] font-bold text-slate-700">
                    <span class="truncate max-w-[120px]">${wh ? wh.name.split(' ')[0] : 'Unknown'} - ${zone.zone_name}</span>
                    <span class="font-mono text-slate-500">${pct}%</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                    <div class="bg-[#2D6A24] h-full rounded-full transition-all duration-500" style="width: ${pct}%"></div>
                </div>
            `;
            metersContainer.appendChild(meter);
        });

        // Render recent transactions rows
        const txTbody = document.getElementById('dashboard-recent-txs');
        const recentTx = [...State.stock_transactions].sort((a,b) => new Date(b.transaction_date) - new Date(a.transaction_date)).slice(0, 4);
        
        recentTx.forEach(tx => {
            const prod = State.products.find(p => p.product_id === tx.product_id);
            const wh = State.warehouses.find(w => w.warehouse_id === tx.warehouse_id);
            const badgeClass = tx.transaction_type === 'Stock-in' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                             tx.transaction_type === 'Stock-out' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                             'bg-amber-50 text-amber-700 border border-amber-200';

            const row = document.createElement('tr');
            row.className = 'border-b border-slate-100/50 hover:bg-slate-50/50';
            row.innerHTML = `
                <td class="py-2.5 font-mono text-[10px] text-slate-400">${new Date(tx.transaction_date).toLocaleTimeString('en-US', { hour12: false })}</td>
                <td class="py-2.5 font-bold text-slate-700 truncate max-w-[120px]">${prod ? prod.name : 'Unknown'}</td>
                <td class="py-2.5 text-slate-500 truncate max-w-[100px]">${wh ? wh.name : 'Unknown'}</td>
                <td class="py-2.5">
                    <span class="px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider ${badgeClass}">${tx.transaction_type}</span>
                </td>
                <td class="py-2.5 text-right font-bold text-slate-700 font-mono">${tx.quantity.toFixed(1)}</td>
            `;
            txTbody.appendChild(row);
        });

        // Render Category Valuation Chart
        const catCanvas = document.getElementById('dashboard-category-chart');
        if (catCanvas) {
            const categoryData = {};
            State.categories.forEach(c => {
                categoryData[c.category_name] = 0;
            });

            State.inventory_locations.forEach(loc => {
                const prod = State.products.find(p => p.product_id === loc.product_id);
                if (prod) {
                    const cat = State.categories.find(c => c.category_id === prod.category_id);
                    if (cat) {
                        let val = loc.quantity * prod.base_price;
                        if (State.currency === 'USD') {
                            val = val / 58.00;
                        }
                        categoryData[cat.category_name] += val;
                    }
                }
            });

            new Chart(catCanvas, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(categoryData),
                    datasets: [{
                        data: Object.values(categoryData),
                        backgroundColor: ['#2d6a24', '#85c87a', '#1e3a1e', '#059669'],
                        borderWidth: 1,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                boxWidth: 6,
                                font: { size: 8, weight: 'bold' }
                            }
                        }
                    }
                }
            });
        }

        // Set listeners for dynamic buttons inside
        const btnQuickAdd = document.getElementById('btn-quick-add');
        if (btnQuickAdd) {
            btnQuickAdd.addEventListener('click', () => {
                openNewProductModal();
            });
        }
        document.getElementById('btn-dashboard-to-ledger').addEventListener('click', () => {
            const btn = DOM.sidebarNav.querySelector('button[data-tab="ledger"]');
            if (btn) btn.click();
        });
    };

    // VIEW 2: STOCK TRACKING
    const renderTracking = () => {
        // Build category options list
        let catOptionsHTML = '<option value="All">All Categories</option>';
        State.categories.forEach(c => {
            const selected = selectedCategoryFilter === c.category_name ? 'selected' : '';
            catOptionsHTML += `<option value="${c.category_name}" ${selected}>${c.category_name}</option>`;
        });

        // Filter and get items
        const items = [];
        State.inventory_locations.forEach(loc => {
            const prod = State.products.find(p => p.product_id === loc.product_id);
            if (!prod) return;
            const wh = State.warehouses.find(w => w.warehouse_id === loc.warehouse_id);
            const zone = State.warehouse_zones.find(z => z.zone_id === loc.zone_id);
            const cat = State.categories.find(c => c.category_id === prod.category_id);
            const uom = State.units_of_measure.find(u => u.uom_id === prod.uom_id);

            items.push({
                inventory_id: loc.inventory_id,
                product_id: prod.product_id,
                sku: prod.sku,
                name: prod.name,
                description: prod.description || 'No description provided.',
                category: cat ? cat.category_name : 'Uncategorized',
                stockQty: loc.quantity,
                uom: uom ? uom.uom_code : 'units',
                status: prod.status || 'Active',
                zone_id: loc.zone_id,
                zone: zone ? zone.zone_name : 'Unknown Zone',
                minQty: prod.min_quantity_threshold,
                maxQty: prod.max_quantity_threshold,
                basePrice: prod.base_price
            });
        });

        // Apply filters
        const searchQuery = DOM.globalSearch.value.toLowerCase();
        const filteredItems = items.filter(item => {
            const matchesSearch = 
                item.sku.toLowerCase().includes(searchQuery) ||
                item.name.toLowerCase().includes(searchQuery) ||
                item.description.toLowerCase().includes(searchQuery) ||
                item.category.toLowerCase().includes(searchQuery) ||
                item.zone.toLowerCase().includes(searchQuery);

            const matchesCategory = selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;
            const matchesStatus = selectedStatusFilter === 'All' || item.status === selectedStatusFilter;
            const matchesZone = !selectedZoneFilter || item.zone === selectedZoneFilter;

            return matchesSearch && matchesCategory && matchesStatus && matchesZone;
        });

        const isAllSelected = filteredItems.length > 0 && filteredItems.every(i => selectedSkus.includes(i.sku));

        // Derive Low Stock items
        const lowStockItems = items.filter(i => i.status === 'Active' && i.stockQty <= i.minQty);

        // Derive Recent logs
        const getRelativeTime = (timestamp) => {
            if (!timestamp) return 'Just now';
            const diff = Date.now() - new Date(timestamp).getTime();
            const mins = Math.floor(diff / 60000);
            if (mins < 1) return 'Just now';
            if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
            const hours = Math.floor(mins / 60);
            if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            const days = Math.floor(hours / 24);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        };

        const sortedTxs = [...State.stock_transactions]
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 3);

        const getShelfNo = (zoneId) => {
            const mapping = { 1: 'A-101', 2: 'B-205', 3: 'A-102', 4: 'C-301' };
            return mapping[zoneId] || `S-${100 + zoneId}`;
        };

        const getCapitalizedUom = (code) => {
            if (!code) return 'Units';
            const c = code.toLowerCase();
            if (c.includes('bag')) return 'Bags';
            if (c.includes('sack')) return 'Sacks';
            if (c.includes('unit')) return 'Units';
            if (c.includes('kg')) return 'kg';
            return code.charAt(0).toUpperCase() + code.slice(1);
        };

        // Render main wrapper full-width
        DOM.mainWorkspace.innerHTML = `
            <div class="flex flex-col min-h-0 space-y-6 animate-slide-up-fade">
                
                <!-- Zone Filter Indicator Banner -->
                ${selectedZoneFilter ? `
                <div class="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2 flex items-center justify-between text-xs text-emerald-800 font-bold shrink-0">
                    <span>Active Zone Filter: <strong>${selectedZoneFilter}</strong></span>
                    <button id="btn-clear-zone-filter" class="text-emerald-700 hover:text-red-700 font-extrabold cursor-pointer bg-transparent border-none">
                        Clear Filter &times;
                    </button>
                </div>
                ` : ''}

                <!-- Filter and Top Actions Header (Screenshot Match) -->
                <div class="bg-white border border-slate-200 p-5 rounded-3xl flex items-center justify-between gap-4 shrink-0 shadow-2xs">
                    <!-- Left Side: Add Button -->
                    ${State.currentUser.role_id === 1 ? `
                    <button id="btn-add-product" class="flex items-center gap-1.5 px-4 py-2.5 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer border-none font-outfit">
                        <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                        <span>Add New Inventory Item</span>
                    </button>
                    ` : `<div></div>`}

                    <!-- Right Side: Category and Status Dropdowns -->
                    <div class="flex items-center gap-4">
                        <div class="flex flex-col gap-1">
                            <span class="text-[9px] font-black text-slate-400 uppercase tracking-wider">Category</span>
                            <select id="filter-category" class="px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D6A24] cursor-pointer min-w-[140px]">
                                ${catOptionsHTML}
                            </select>
                        </div>

                        <div class="flex flex-col gap-1">
                            <span class="text-[9px] font-black text-slate-400 uppercase tracking-wider">Status</span>
                            <select id="filter-status" class="px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D6A24] cursor-pointer min-w-[140px]">
                                <option value="All" ${selectedStatusFilter === 'All' ? 'selected' : ''}>All Statuses</option>
                                <option value="Active" ${selectedStatusFilter === 'Active' ? 'selected' : ''}>Active</option>
                                <option value="Obsolete" ${selectedStatusFilter === 'Obsolete' ? 'selected' : ''}>Obsolete</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Bulk Action Panel -->
                ${selectedSkus.length > 0 ? `
                <div class="bg-emerald-950 text-white rounded-2xl px-5 py-3 flex items-center justify-between text-xs shadow-md border border-emerald-900 animate-slide-up-fade shrink-0">
                    <span class="font-bold font-outfit">${selectedSkus.length} items selected</span>
                    <div class="flex items-center gap-3">
                        <button id="btn-bulk-active" class="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg text-[9px] uppercase tracking-wider cursor-pointer transition-all border-none">Set Active</button>
                        <button id="btn-bulk-obsolete" class="px-3 py-1.5 bg-amber-800 hover:bg-amber-700 text-white font-bold rounded-lg text-[9px] uppercase tracking-wider cursor-pointer transition-all border-none">Set Obsolete</button>
                        ${State.currentUser.role_id === 1 ? `
                        <button id="btn-bulk-delete" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-[9px] uppercase tracking-wider cursor-pointer transition-all border-none">Delete</button>
                        ` : ''}
                        <button id="btn-bulk-cancel" class="text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer bg-transparent border-none">Cancel</button>
                    </div>
                </div>
                ` : ''}

                <!-- Master Inventory Tracking Card -->
                <div class="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col flex-1">
                    <!-- Table Title Header -->
                    <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                        <h3 class="font-black text-sm text-slate-800 font-outfit">Master Inventory Tracking</h3>
                        <button id="btn-export-csv" class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#2D6A24] hover:text-[#23531B] transition-colors cursor-pointer bg-transparent border-none">
                            <span>Export CSV</span>
                            <i data-lucide="download" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>

                    <!-- Table Scroll Wrapper -->
                    <div class="overflow-auto flex-1 max-h-[500px]">
                        <table class="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest select-none">
                                    <th class="p-4 w-12 text-center">
                                        <input type="checkbox" id="check-all-skus" ${isAllSelected ? 'checked' : ''} class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer w-4 h-4" />
                                    </th>
                                    <th class="p-4">SKU</th>
                                    <th class="p-4">Item Name</th>
                                    <th class="p-4">Description</th>
                                    <th class="p-4">Category</th>
                                    <th class="p-4">Shelf No.</th>
                                    <th class="p-4 text-right">Stock Qty</th>
                                    <th class="p-4">UoM</th>
                                    <th class="p-4 text-center">Status</th>
                                    <th class="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="stock-tbody" class="divide-y divide-slate-100 text-slate-600">
                                <!-- Rows injected dynamically -->
                            </tbody>
                        </table>
                    </div>

                    <!-- Total counts footer -->
                    <div class="bg-slate-50 border-t border-slate-100 px-6 py-3.5 flex items-center justify-between text-[10px] text-slate-500 font-black select-none shrink-0">
                        <span>Showing ${filteredItems.length} of ${items.length} items</span>
                        <div class="flex gap-4">
                            <span>Active: ${items.filter(i => i.status === 'Active').length}</span>
                            <span>Obsolete: ${items.filter(i => i.status === 'Obsolete').length}</span>
                        </div>
                    </div>
                </div>

            </div>
        `;

        // Render dynamic table rows
        const tbody = document.getElementById('stock-tbody');
        if (filteredItems.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="10" class="p-8 text-center text-slate-400 font-bold text-xs">No inventory items found</td>
                </tr>
            `;
        } else {
            filteredItems.forEach(item => {
                const isSelected = selectedSkus.includes(item.sku);
                const isLowStock = item.status === 'Active' && item.stockQty <= item.minQty;
                const isOverstocked = item.status === 'Active' && item.maxQty && item.stockQty > item.maxQty;
                
                let badgeHTML = '';
                if (item.status === 'Active') {
                    badgeHTML = `<span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#e6f4ea] text-[#137333]">Active</span>`;
                } else {
                    badgeHTML = `<span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1f3f4] text-[#3c4043]">Obsolete</span>`;
                }

                let rowBgClass = isSelected ? 'bg-emerald-50/20' : 'hover:bg-slate-50/50';
                if (searchQuery && item.sku.toLowerCase() === searchQuery.trim()) {
                    rowBgClass = 'bg-emerald-500/10 ring-2 ring-emerald-500/20';
                }

                const tr = document.createElement('tr');
                tr.className = `transition-colors ${rowBgClass}`;
                tr.innerHTML = `
                    <td class="p-4 text-center">
                        <input type="checkbox" data-sku="${item.sku}" class="check-sku rounded border-slate-300 text-[#2D6A24] focus:ring-[#2D6A24] cursor-pointer w-4 h-4" ${isSelected ? 'checked' : ''} />
                    </td>
                    <td class="p-4 font-mono font-bold text-slate-800">${item.sku}</td>
                    <td class="p-4 font-bold text-slate-700">${item.name}</td>
                    <td class="p-4 text-slate-400 font-normal max-w-xs truncate" title="${item.description}">${item.description}</td>
                    <td class="p-4 text-slate-500 font-semibold">${item.category}</td>
                    <td class="p-4 font-mono text-slate-600 font-bold">${getShelfNo(item.zone_id)}</td>
                    <td class="p-4 text-right font-black tabular-nums">
                        <div class="flex items-center justify-end gap-1.5">
                            ${isLowStock ? `
                            <span title="Below safety minimum threshold">
                                <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-red-500 fill-red-100"></i>
                            </span>
                            ` : ''}
                            ${isOverstocked ? `
                            <span title="Exceeds maximum threshold limit (Overstocked)">
                                <i data-lucide="alert-octagon" class="w-3.5 h-3.5 text-rose-500 fill-rose-100"></i>
                            </span>
                            ` : ''}
                            <span class="${item.stockQty === 0 ? 'text-red-500 font-black' : 'text-slate-800'}">${parseFloat(item.stockQty).toFixed(0)}</span>
                        </div>
                    </td>
                    <td class="p-4 text-slate-400 font-black text-[10px]">${getCapitalizedUom(item.uom)}</td>
                    <td class="p-4 text-center">${badgeHTML}</td>
                    <td class="p-4 text-center font-bold text-[11px] select-none whitespace-nowrap">
                        <div class="flex items-center justify-center gap-3">
                            <button data-sku="${item.sku}" class="btn-action-edit text-slate-500 hover:text-slate-800 hover:underline cursor-pointer bg-transparent border-none">Edit</button>
                            ${item.status === 'Active' ? `
                            <button data-sku="${item.sku}" class="btn-action-archive text-amber-700 hover:text-amber-900 hover:underline cursor-pointer bg-transparent border-none">Archive</button>
                            ` : `
                            ${State.currentUser.role_id === 1 ? `
                            <button data-sku="${item.sku}" class="btn-action-delete text-red-600 hover:text-red-800 hover:underline cursor-pointer bg-transparent border-none">Delete</button>
                            ` : `<span class="text-slate-300">Locked</span>`}
                            `}
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Initialize icons inside the table
        lucide.createIcons();

        // EVENT LISTENERS & TRIGGERS
        
        // Clear Zone filter banner
        const btnClearZone = document.getElementById('btn-clear-zone-filter');
        if (btnClearZone) {
            btnClearZone.addEventListener('click', () => {
                selectedZoneFilter = null;
                renderTracking();
            });
        }

        // Category Filter dropdown
        const fCat = document.getElementById('filter-category');
        fCat.addEventListener('change', (e) => {
            selectedCategoryFilter = e.target.value;
            renderTracking();
        });

        // Status Filter dropdown
        const fStatus = document.getElementById('filter-status');
        fStatus.addEventListener('change', (e) => {
            selectedStatusFilter = e.target.value;
            renderTracking();
        });

        // Add Button
        const btnAdd = document.getElementById('btn-add-product');
        if (btnAdd) {
            btnAdd.addEventListener('click', () => openNewProductModal());
        }

        // Export CSV
        document.getElementById('btn-export-csv').addEventListener('click', () => {
            const headers = ['SKU', 'Item Name', 'Description', 'Category', 'Stock Qty', 'UoM', 'Status', 'Zone'];
            const rows = filteredItems.map(i => [
                i.sku, i.name, i.description, i.category, i.stockQty.toFixed(0), i.uom, i.status, i.zone
            ]);
            const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `master_inventory_${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast('CSV ledger exported successfully.', 'success');
            addConsoleLog('Cryptographic ledger signature generated. CSV manifest downloaded.', 'success');
        });

        // Checkbox single toggles
        tbody.querySelectorAll('.check-sku').forEach(box => {
            box.addEventListener('change', (e) => {
                const sku = box.getAttribute('data-sku');
                if (e.target.checked) {
                    if (!selectedSkus.includes(sku)) selectedSkus.push(sku);
                } else {
                    selectedSkus = selectedSkus.filter(s => s !== sku);
                }
                renderTracking();
            });
        });

        // Checkbox select all toggle
        const checkAll = document.getElementById('check-all-skus');
        if (checkAll) {
            checkAll.addEventListener('change', (e) => {
                if (e.target.checked) {
                    selectedSkus = filteredItems.map(i => i.sku);
                } else {
                    selectedSkus = [];
                }
                renderTracking();
            });
        }

        // Action links handlers: Edit
        tbody.querySelectorAll('.btn-action-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const sku = btn.getAttribute('data-sku');
                const prod = State.products.find(p => p.sku === sku);
                if (prod) openEditProductModal(prod.product_id);
            });
        });

        // Action links handlers: Archive
        tbody.querySelectorAll('.btn-action-archive').forEach(btn => {
            btn.addEventListener('click', () => {
                const sku = btn.getAttribute('data-sku');
                const prod = State.products.find(p => p.sku === sku);
                if (prod) {
                    prod.status = 'Obsolete';
                    showToast(`SKU ${sku} archived (Obsolete).`, 'success');
                    addConsoleLog(`[Catalog ARCHIVE] SKU ${sku} status set to OBSOLETE.`, 'warning');
                    renderTracking();
                }
            });
        });

        // Action links handlers: Delete
        tbody.querySelectorAll('.btn-action-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const sku = btn.getAttribute('data-sku');
                const prod = State.products.find(p => p.sku === sku);
                if (prod) {
                    openDeleteProductModal(prod.product_id);
                }
            });
        });

        // Bulk action event listeners
        const btnBulkActive = document.getElementById('btn-bulk-active');
        if (btnBulkActive) {
            btnBulkActive.addEventListener('click', () => {
                selectedSkus.forEach(sku => {
                    const prod = State.products.find(p => p.sku === sku);
                    if (prod) prod.status = 'Active';
                });
                showToast(`${selectedSkus.length} items set to Active.`, 'success');
                addConsoleLog(`[Bulk Action] ${selectedSkus.length} SKU status updated to ACTIVE.`, 'success');
                selectedSkus = [];
                renderTracking();
            });
        }

        const btnBulkObsolete = document.getElementById('btn-bulk-obsolete');
        if (btnBulkObsolete) {
            btnBulkObsolete.addEventListener('click', () => {
                selectedSkus.forEach(sku => {
                    const prod = State.products.find(p => p.sku === sku);
                    if (prod) prod.status = 'Obsolete';
                });
                showToast(`${selectedSkus.length} items archived (Obsolete).`, 'success');
                addConsoleLog(`[Bulk Action] ${selectedSkus.length} SKU status updated to OBSOLETE.`, 'warning');
                selectedSkus = [];
                renderTracking();
            });
        }

        const btnBulkDelete = document.getElementById('btn-bulk-delete');
        if (btnBulkDelete) {
            btnBulkDelete.addEventListener('click', () => {
                if (confirm(`Are you sure you want to permanently discontinue these ${selectedSkus.length} products? This will purge all matching warehouse inventory.`)) {
                    selectedSkus.forEach(sku => {
                        const prod = State.products.find(p => p.sku === sku);
                        if (prod) {
                            State.products = State.products.filter(p => p.product_id !== prod.product_id);
                            State.inventory_locations = State.inventory_locations.filter(loc => loc.product_id !== prod.product_id);
                            addConsoleLog(`[Catalog DELETE] SKU ${sku} discontinued. Inventory purged.`, 'warning');
                        }
                    });
                    showToast(`${selectedSkus.length} products discontinued successfully.`, 'success');
                    selectedSkus = [];
                    renderTracking();
                }
            });
        }

        const btnBulkCancel = document.getElementById('btn-bulk-cancel');
        if (btnBulkCancel) {
            btnBulkCancel.addEventListener('click', () => {
                selectedSkus = [];
                renderTracking();
            });
        }
    };

    // VIEW 3: LEDGER TRANSACTION HISTORY
    const renderLedger = () => {
        DOM.mainWorkspace.innerHTML = `
            <div class="space-y-6 animate-slide-up-fade">
                <!-- Audit disclaimer banner -->
                <div class="bg-white border border-slate-200 p-4 rounded-3xl flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-emerald-500/10 rounded-xl text-[#2D6A24]">
                            <i data-lucide="shield-check" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h4 class="text-xs font-black text-slate-800">Immutable Cryptographic Ledger</h4>
                            <p class="text-[10px] text-slate-400 font-semibold leading-relaxed">All stock ins, outs, and zone relocation transfers are securely written to this history log. These details cannot be altered.</p>
                        </div>
                    </div>
                    ${State.currentUser.role_id === 1 ? `
                    <button id="btn-export-ledger" class="py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-600 rounded-xl border border-slate-200 text-[10px] font-bold shadow-2xs flex items-center gap-1 transition-all cursor-pointer">
                        <i data-lucide="download" class="w-3.5 h-3.5"></i>
                        <span>Export CSV</span>
                    </button>
                    ` : ''}
                </div>

                <!-- Ledger Audit Logs table -->
                <div class="card-surface p-5">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs">
                            <thead>
                                <tr class="border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th class="py-3">Log ID</th>
                                    <th class="py-3">Timestamp</th>
                                    <th class="py-3">Product Name</th>
                                    <th class="py-3">Warehouse</th>
                                    <th class="py-3">Movement Type</th>
                                    <th class="py-3 text-right">Quantity</th>
                                    <th class="py-3">Remarks / Verification</th>
                                </tr>
                            </thead>
                            <tbody id="ledger-tbody">
                                <!-- Dynamic rows -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        const tbody = document.getElementById('ledger-tbody');
        tbody.innerHTML = '';

        // Order transactions by descending date
        const sortedTx = [...State.stock_transactions].sort((a,b) => new Date(b.transaction_date) - new Date(a.transaction_date));

        sortedTx.forEach(tx => {
            const prod = State.products.find(p => p.product_id === tx.product_id);
            const wh = State.warehouses.find(w => w.warehouse_id === tx.warehouse_id);
            const uom = prod ? State.units_of_measure.find(u => u.uom_id === prod.uom_id) : null;
            
            const badgeClass = tx.transaction_type === 'Stock-in' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                             tx.transaction_type === 'Stock-out' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                             'bg-amber-50 text-amber-700 border-amber-200';

            const row = document.createElement('tr');
            row.className = 'border-b border-slate-100 hover:bg-slate-50/80';
            row.innerHTML = `
                <td class="py-3.5 font-mono font-bold text-slate-400">TX-#${String(tx.transaction_id).padStart(4, '0')}</td>
                <td class="py-3.5 font-mono text-[10px] text-slate-500">${new Date(tx.transaction_date).toLocaleString('en-US')}</td>
                <td class="py-3.5 font-bold text-slate-800">
                    <span class="block">${prod ? prod.name : 'Unknown Product'}</span>
                    <span class="block font-mono text-[9px] text-slate-400">${prod ? prod.sku : ''}</span>
                </td>
                <td class="py-3.5 text-slate-600 font-semibold">${wh ? wh.name : 'Unknown Hub'}</td>
                <td class="py-3.5">
                    <span class="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border ${badgeClass}">${tx.transaction_type}</span>
                </td>
                <td class="py-3.5 text-right font-black font-mono text-slate-800">${parseFloat(tx.quantity).toFixed(2)} ${uom ? uom.uom_code : ''}</td>
                <td class="py-3.5 text-slate-400 font-bold max-w-xs truncate">${tx.notes || 'Routine update.'}</td>
            `;
            tbody.appendChild(row);
        });

        const btnExportLedger = document.getElementById('btn-export-ledger');
        if (btnExportLedger) {
            btnExportLedger.addEventListener('click', () => {
                const headers = ["Log ID", "Timestamp", "Product SKU", "Product Name", "Warehouse", "Type", "Quantity", "UOM", "Notes"];
                const rows = State.stock_transactions.map(tx => {
                    const prod = State.products.find(p => p.product_id === tx.product_id);
                    const wh = State.warehouses.find(w => w.warehouse_id === tx.warehouse_id);
                    const uom = prod ? State.units_of_measure.find(u => u.uom_id === prod.uom_id) : null;
                    return [
                        tx.transaction_id,
                        tx.transaction_date,
                        prod ? prod.sku : 'N/A',
                        prod ? prod.name : 'Unknown',
                        wh ? wh.name : 'Unknown',
                        tx.transaction_type,
                        tx.quantity,
                        uom ? uom.uom_code : '',
                        tx.notes || ''
                    ];
                });
                
                const csvString = [headers, ...rows]
                    .map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
                    .join("\n");
                
                const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.setAttribute("href", url);
                link.setAttribute("download", `ambatugrow_ledger_export_${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                showToast('CSV export processing... File downloaded successfully.', 'success');
                addConsoleLog('Cryptographic ledger signature generated. CSV manifest downloaded.', 'success');
            });
        }
    };

    // VIEW 4: WAREHOUSES & ZONES
    const renderZones = () => {
        DOM.mainWorkspace.innerHTML = `
            <div class="space-y-6 animate-slide-up-fade">
                <!-- Summary bar -->
                <div class="bg-white border border-slate-200 p-4 rounded-3xl flex justify-between items-center gap-4">
                    <div class="flex items-center gap-2">
                        <i data-lucide="warehouse" class="w-5 h-5 text-[#2D6A24]"></i>
                        <span class="text-xs font-black text-slate-800">Cavite Regional Distribution Network Map</span>
                    </div>
                </div>

                <!-- Warehouses Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="warehouses-grid">
                    <!-- Dynamic Warehouses Card Injected -->
                </div>
            </div>
        `;

        const whGrid = document.getElementById('warehouses-grid');
        
        State.warehouses.forEach(wh => {
            const addr = State.addresses.find(a => a.address_id === wh.address_id);
            const whZones = State.warehouse_zones.filter(z => z.warehouse_id === wh.warehouse_id);
            
            // Calculate total items stored
            let totalQty = 0;
            State.inventory_locations.forEach(loc => {
                if (loc.warehouse_id === wh.warehouse_id) {
                    totalQty += parseFloat(loc.quantity);
                }
            });

            // Calculate total unique items SKU
            const uniqueSKUs = new Set(
                State.inventory_locations
                    .filter(loc => loc.warehouse_id === wh.warehouse_id)
                    .map(loc => loc.product_id)
            ).size;

            const card = document.createElement('div');
            card.className = 'card-surface p-6 flex flex-col justify-between space-y-4';
            card.innerHTML = `
                <div class="space-y-2">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-base font-black text-slate-800 font-outfit">${wh.name}</h3>
                            <span class="block text-[9px] font-bold text-slate-400 uppercase mt-0.5">${addr ? `${addr.street}, ${addr.city}` : 'No address record'}</span>
                        </div>
                        <span class="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-black uppercase tracking-wider border border-slate-200">${wh.capacity_sqm.toFixed(0)} sqm</span>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                        <div>
                            <span class="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Total Stored Qty</span>
                            <span class="block text-base font-black text-slate-700 mt-0.5 font-mono">${totalQty.toFixed(1)} units</span>
                        </div>
                        <div>
                            <span class="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Unique SKUs</span>
                            <span class="block text-base font-black text-slate-700 mt-0.5 font-mono">${uniqueSKUs} Batches</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-3 pt-3">
                    <span class="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Allocated Zones</span>
                    <div class="space-y-2.5" id="zones-list-${wh.warehouse_id}">
                        <!-- Zones injected dynamically -->
                    </div>
                </div>
            `;
            whGrid.appendChild(card);

            // Inject zone occupancy subbars
            const zonesList = document.getElementById(`zones-list-${wh.warehouse_id}`);
            
            whZones.forEach(zone => {
                let zoneSum = 0;
                State.inventory_locations.forEach(loc => {
                    if (loc.zone_id === zone.zone_id) {
                        zoneSum += parseFloat(loc.quantity);
                    }
                });

                const zoneMax = zone.zone_id === 3 ? 500 : 150;
                const pct = Math.min(100, Math.round((zoneSum / zoneMax) * 100));

                const zoneItem = document.createElement('div');
                zoneItem.className = 'p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-2xl space-y-1.5 cursor-pointer transition-all';
                zoneItem.innerHTML = `
                    <div class="flex justify-between items-center text-[10px] font-bold text-slate-700">
                        <span class="font-bold text-slate-800">${zone.zone_name}</span>
                        <span class="font-mono">${zoneSum.toFixed(1)} / ${zoneMax} (${pct}%)</span>
                    </div>
                    <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-[#2D6A24] h-full rounded-full transition-all duration-300" style="width: ${pct}%"></div>
                    </div>
                    <span class="block text-[8px] font-bold text-slate-400 uppercase">Category: ${zone.category}</span>
                `;
                zoneItem.addEventListener('click', () => {
                    selectedZoneFilter = zone.zone_name;
                    selectedCategoryFilter = 'All';
                    selectedStatusFilter = 'All';
                    DOM.sidebarNav.querySelector('[data-tab="tracking"]').click();
                });
                zonesList.appendChild(zoneItem);
            });
        });
    };

    // VIEW 5: REPORTS & ALERTS
    const renderReports = () => {
        // Calculations
        const lowStock = [];
        State.inventory_locations.forEach(loc => {
            const prod = State.products.find(p => p.product_id === loc.product_id);
            if (prod && loc.quantity <= prod.min_quantity_threshold) {
                const wh = State.warehouses.find(w => w.warehouse_id === loc.warehouse_id);
                lowStock.push({
                    inventory_id: loc.inventory_id,
                    product_id: prod.product_id,
                    sku: prod.sku,
                    name: prod.name,
                    qty: loc.quantity,
                    min: prod.min_quantity_threshold,
                    max: prod.max_quantity_threshold || 150.00,
                    whName: wh ? wh.name.split(' ')[0] : 'Unknown'
                });
            }
        });

        const expiringSoon = [];
        const thirtyDaysLimit = new Date();
        thirtyDaysLimit.setDate(thirtyDaysLimit.getDate() + 45); // Check 45 days for reports
        State.inventory_locations.forEach(loc => {
            if (loc.expiration_date) {
                const exp = new Date(loc.expiration_date);
                if (exp <= thirtyDaysLimit) {
                    const prod = State.products.find(p => p.product_id === loc.product_id);
                    const wh = State.warehouses.find(w => w.warehouse_id === loc.warehouse_id);
                    expiringSoon.push({
                        sku: prod ? prod.sku : 'N/A',
                        name: prod ? prod.name : 'Unknown',
                        exp: loc.expiration_date,
                        whName: wh ? wh.name.split(' ')[0] : 'Unknown',
                        qty: loc.quantity
                    });
                }
            }
        });

        DOM.mainWorkspace.innerHTML = `
            <div class="space-y-6 animate-slide-up-fade">
                <!-- Zone Occupancy Chart Panel -->
                <div class="card-surface p-5 space-y-4">
                    <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                        <span class="text-[10px] font-black uppercase tracking-wider text-slate-600">Warehouse Zone Occupancy Rates</span>
                        <i data-lucide="bar-chart-3" class="w-4 h-4 text-[#2D6A24]"></i>
                    </div>
                    <div class="h-64 relative">
                        <canvas id="reports-occupancy-chart"></canvas>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Low Stock Alerts Panel -->
                    <div class="card-surface p-5 space-y-4">
                        <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <span class="text-[10px] font-black uppercase tracking-wider text-slate-700">Low Stock Trigger Reports</span>
                            <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500"></i>
                        </div>
                        <div class="space-y-3" id="reports-low-stock-list">
                            <!-- Injected -->
                        </div>
                    </div>

                    <!-- Expiring Batches FEFO Panel -->
                    <div class="card-surface p-5 space-y-4">
                        <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <span class="text-[10px] font-black uppercase tracking-wider text-slate-700">FEFO Expiration Timeline</span>
                            <i data-lucide="calendar" class="w-4 h-4 text-rose-500"></i>
                        </div>
                        <div class="space-y-3" id="reports-expiration-list">
                            <!-- Injected -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Render low stocks
        const lsContainer = document.getElementById('reports-low-stock-list');
        if (lowStock.length === 0) {
            lsContainer.innerHTML = `<div class="p-4 text-center text-xs text-slate-400 font-bold">All product quantities satisfy min limits.</div>`;
        } else {
            lowStock.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex justify-between items-center';
                itemDiv.innerHTML = `
                    <div class="space-y-1">
                        <h4 class="text-xs font-black text-slate-800">${item.name}</h4>
                        <span class="block text-[8px] font-bold text-slate-400 uppercase">SKU: ${item.sku} | Location: ${item.whName}</span>
                        <!-- Reorder Button -->
                        <button data-inventory-id="${item.inventory_id}" class="btn-generate-po px-2.5 py-1 mt-1 bg-[#2D6A24] text-white hover:bg-[#23531B] rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                            <i data-lucide="file-plus" class="w-3 h-3"></i>
                            <span>Generate PO</span>
                        </button>
                    </div>
                    <div class="text-right">
                        <span class="block text-xs font-black text-rose-600 font-mono">${item.qty.toFixed(1)} left</span>
                        <span class="block text-[8px] font-bold text-slate-400 uppercase">Threshold: ${item.min.toFixed(0)}</span>
                    </div>
                `;
                lsContainer.appendChild(itemDiv);
            });
        }

        // Render expirations
        const expContainer = document.getElementById('reports-expiration-list');
        if (expiringSoon.length === 0) {
            expContainer.innerHTML = `<div class="p-4 text-center text-xs text-slate-400 font-bold">No batches expire in the next 45 days.</div>`;
        } else {
            expiringSoon.forEach(item => {
                const isExpired = new Date(item.exp) < new Date();
                const textClass = isExpired ? 'text-rose-600 font-black' : 'text-amber-600 font-black';
                const label = isExpired ? 'Expired' : 'Expires Soon';
                const bgClass = isExpired ? 'bg-rose-500/5 border-rose-500/20' : 'bg-amber-500/5 border-amber-500/20';

                const itemDiv = document.createElement('div');
                itemDiv.className = `p-3.5 border rounded-2xl flex justify-between items-center ${bgClass}`;
                itemDiv.innerHTML = `
                    <div class="space-y-1">
                        <h4 class="text-xs font-black text-slate-800">${item.name} (${item.qty.toFixed(0)} bags)</h4>
                        <span class="block text-[8px] font-bold text-slate-400 uppercase">SKU: ${item.sku} | Location: ${item.whName}</span>
                    </div>
                    <div class="text-right">
                        <span class="block text-xs ${textClass} font-mono">${formatDate(item.exp)}</span>
                        <span class="block text-[8px] font-black uppercase tracking-wider text-rose-600">${label}</span>
                    </div>
                `;
                expContainer.appendChild(itemDiv);
            });
        }

        // Render Occupancy Bar Chart
        const barCanvas = document.getElementById('reports-occupancy-chart');
        if (barCanvas) {
            const labels = [];
            const occupancies = [];
            const limits = [];
            
            State.warehouses.forEach(wh => {
                const whZones = State.warehouse_zones.filter(z => z.warehouse_id === wh.warehouse_id);
                whZones.forEach(zone => {
                    let zoneSum = 0;
                    State.inventory_locations.forEach(loc => {
                        if (loc.zone_id === zone.zone_id) {
                            zoneSum += parseFloat(loc.quantity);
                        }
                    });
                    
                    const zoneMax = zone.zone_id === 3 ? 500 : 150;
                    labels.push(`${wh.name.split(' ')[0]} - ${zone.zone_name}`);
                    occupancies.push(parseFloat(zoneSum.toFixed(1)));
                    limits.push(zoneMax);
                });
            });

            new Chart(barCanvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Current Quantity',
                            data: occupancies,
                            backgroundColor: 'rgba(45, 106, 36, 0.85)',
                            borderColor: '#2d6a24',
                            borderWidth: 1,
                            borderRadius: 6
                        },
                        {
                            label: 'Max Capacity Limit',
                            data: limits,
                            backgroundColor: 'rgba(226, 232, 240, 0.5)',
                            borderColor: '#cbd5e1',
                            borderWidth: 1,
                            borderRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(0, 0, 0, 0.05)' },
                            ticks: { font: { size: 9, weight: 'bold' } }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { font: { size: 9, weight: 'bold' } }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                boxWidth: 10,
                                font: { size: 9, weight: 'bold' }
                            }
                        }
                    }
                }
            });

            // Re-bind PO buttons
            lsContainer.querySelectorAll('.btn-generate-po').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const invId = parseInt(btn.getAttribute('data-inventory-id'));
                    openPurchaseOrderModal(invId);
                });
            });
            lucide.createIcons();
        }
    };

    // ------------------------------------------
    // 5. DIALOGS & OVERLAYS ACTIONS
    // ------------------------------------------
    
    // Global Close Button binder for Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.closest('.fixed').classList.add('hidden');
        });
    });

    // Global Close Button binder for Drawers
    document.querySelectorAll('.close-drawer').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const drawerDiv = btn.closest('.fixed').querySelector('.animate-slide-in');
            drawerDiv.className = 'bg-white h-full w-full max-w-sm border-l border-slate-200 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out';
            drawerDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                btn.closest('.fixed').classList.add('hidden');
            }, 300);
        });
    });

    // WIZARD: STOCK TRANSFER WIZARD
    const openTransferWizard = () => {
        DOM.modalTransferWizard.classList.remove('hidden');
        
        // Populate Product select
        const pSel = document.getElementById('transfer-product-id');
        pSel.innerHTML = '';
        State.products.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.product_id;
            opt.textContent = `${p.name} (${p.sku})`;
            pSel.appendChild(opt);
        });

        // Populate Source & Destination selects
        const sLoc = document.getElementById('transfer-source-location');
        const dLoc = document.getElementById('transfer-dest-location');
        sLoc.innerHTML = '';
        dLoc.innerHTML = '';

        State.warehouse_zones.forEach(z => {
            const wh = State.warehouses.find(w => w.warehouse_id === z.warehouse_id);
            const label = `${wh ? wh.name.split(' ')[0] : 'Node'} - ${z.zone_name}`;
            
            const optS = document.createElement('option');
            optS.value = z.zone_id;
            optS.textContent = label;
            sLoc.appendChild(optS);

            const optD = document.createElement('option');
            optD.value = z.zone_id;
            optD.textContent = label;
            dLoc.appendChild(optD);
        });

        // Trigger change callback on product select to filter source location
        const updateSourceLimits = () => {
            const pId = parseInt(pSel.value);
            const zId = parseInt(sLoc.value);
            
            // Check inventory location records for current quantity
            const loc = State.inventory_locations.find(l => l.product_id === pId && l.zone_id === zId);
            const currentQty = loc ? parseFloat(loc.quantity) : 0;
            
            // Render limit indicator in form
            const qtyInput = document.getElementById('transfer-qty');
            qtyInput.max = currentQty;
            qtyInput.placeholder = `Max: ${currentQty.toFixed(1)}`;
        };

        const updateFefoRecommendation = () => {
            const pId = parseInt(pSel.value);
            const batches = State.inventory_locations.filter(l => l.product_id === pId && parseFloat(l.quantity) > 0 && l.expiration_date);
            
            const fefoBox = document.getElementById('transfer-fefo-recommendation');
            const fefoText = document.getElementById('transfer-fefo-text');
            
            if (batches.length > 0) {
                // Sort by expiration date ascending (FEFO)
                batches.sort((a, b) => new Date(a.expiration_date) - new Date(b.expiration_date));
                const oldest = batches[0];
                
                const wh = State.warehouses.find(w => w.warehouse_id === oldest.warehouse_id);
                const zone = State.warehouse_zones.find(z => z.zone_id === oldest.zone_id);
                
                const locLabel = `${wh ? wh.name.split(' ')[0] : 'Node'} - ${zone ? zone.zone_name : 'Zone'}`;
                
                fefoText.textContent = `FEFO Auto-Suggest: Oldest batch expires on ${formatDate(oldest.expiration_date)}. Relocate from: ${locLabel} (Qty: ${parseFloat(oldest.quantity).toFixed(0)} units).`;
                fefoBox.classList.remove('hidden');
                
                // Auto pre-select recommended source location
                sLoc.value = oldest.zone_id;
                updateSourceLimits();
            } else {
                fefoBox.classList.add('hidden');
            }
        };

        pSel.addEventListener('change', () => {
            updateFefoRecommendation();
            updateSourceLimits();
        });
        sLoc.addEventListener('change', updateSourceLimits);
        
        // Initial runs
        updateFefoRecommendation();
        updateSourceLimits();
        lucide.createIcons();
    };

    DOM.btnTransferWizard.addEventListener('click', openTransferWizard);

    DOM.transferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const prodId = parseInt(document.getElementById('transfer-product-id').value);
        const srcZoneId = parseInt(document.getElementById('transfer-source-location').value);
        const destZoneId = parseInt(document.getElementById('transfer-dest-location').value);
        const qty = parseFloat(document.getElementById('transfer-qty').value);
        const operator = document.getElementById('transfer-operator').value;
        const notes = document.getElementById('transfer-notes').value;

        if (srcZoneId === destZoneId) {
            showToast('Source and Destination zones cannot be identical.', 'error');
            return;
        }

        // Verify source has quantity
        const srcLoc = State.inventory_locations.find(l => l.product_id === prodId && l.zone_id === srcZoneId);
        if (!srcLoc || parseFloat(srcLoc.quantity) < qty) {
            showToast('Insufficient quantity at source zone location.', 'error');
            return;
        }

        const prod = State.products.find(p => p.product_id === prodId);
        const srcZone = State.warehouse_zones.find(z => z.zone_id === srcZoneId);
        const destZone = State.warehouse_zones.find(z => z.zone_id === destZoneId);
        const destWh = State.warehouses.find(w => w.warehouse_id === destZone.warehouse_id);

        // Deduct source
        srcLoc.quantity -= qty;
        
        // Add or Create destination
        let destLoc = State.inventory_locations.find(l => l.product_id === prodId && l.zone_id === destZoneId);
        if (destLoc) {
            destLoc.quantity += qty;
        } else {
            const newId = State.inventory_locations.length + 1;
            destLoc = {
                inventory_id: newId,
                product_id: prodId,
                warehouse_id: destZone.warehouse_id,
                zone_id: destZoneId,
                quantity: qty,
                expiration_date: srcLoc.expiration_date // Inherit expiration batch date
            };
            State.inventory_locations.push(destLoc);
        }

        // Log transaction
        const newTxId = State.stock_transactions.length + 1;
        State.stock_transactions.push({
            transaction_id: newTxId,
            product_id: prodId,
            warehouse_id: destZone.warehouse_id,
            transaction_type: 'Transfer',
            quantity: qty,
            transaction_date: new Date().toISOString(),
            notes: `Relocated ${qty} units from ${srcZone.zone_name} to ${destZone.zone_name}. Operator: ${operator}. Remarks: ${notes}`
        });

        // Close and Refresh
        DOM.modalTransferWizard.classList.add('hidden');
        renderWorkspace();
        showToast(`Stock transfer of ${qty.toFixed(1)} units executed successfully.`, 'success');
        addConsoleLog(`[Transfer SUCCESS] Relocated ${qty} units of ${prod.sku}. Transaction signed.`, 'success');
    });

    // FORM: REGISTER NEW PRODUCT
    const openNewProductModal = () => {
        DOM.modalNewProduct.classList.remove('hidden');

        // Categories
        const catSel = document.getElementById('prod-category');
        catSel.innerHTML = '';
        State.categories.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.category_id;
            opt.textContent = c.category_name;
            catSel.appendChild(opt);
        });

        // UOM
        const uomSel = document.getElementById('prod-uom');
        uomSel.innerHTML = '';
        State.units_of_measure.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.uom_id;
            opt.textContent = u.uom_code;
            uomSel.appendChild(opt);
        });

        // Currency
        const curSel = document.getElementById('prod-currency');
        curSel.innerHTML = '';
        State.currencies.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.currency_id;
            opt.textContent = c.currency_code;
            curSel.appendChild(opt);
        });

        // Initial target zone allocation
        const zoneSel = document.getElementById('prod-init-zone');
        zoneSel.innerHTML = '';
        State.warehouse_zones.forEach(z => {
            const wh = State.warehouses.find(w => w.warehouse_id === z.warehouse_id);
            const opt = document.createElement('option');
            opt.value = z.zone_id;
            opt.textContent = `${wh ? wh.name.split(' ')[0] : 'Node'} - ${z.zone_name}`;
            zoneSel.appendChild(opt);
        });
    };

    DOM.productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sku = document.getElementById('prod-sku').value;
        const name = document.getElementById('prod-name').value;
        const desc = document.getElementById('prod-desc').value;
        const categoryId = parseInt(document.getElementById('prod-category').value);
        const uomId = parseInt(document.getElementById('prod-uom').value);
        const currencyId = parseInt(document.getElementById('prod-currency').value);
        const basePrice = parseFloat(document.getElementById('prod-price').value);
        const minQty = parseFloat(document.getElementById('prod-threshold').value);
        const maxQty = parseFloat(document.getElementById('prod-max-threshold').value);
        const leadTime = parseInt(document.getElementById('prod-lead-time').value);
        
        const initZoneId = parseInt(document.getElementById('prod-init-zone').value);
        const initQty = parseFloat(document.getElementById('prod-init-qty').value);
        const expDate = document.getElementById('prod-init-expiration').value || null;

        // Check if SKU exists
        if (State.products.some(p => p.sku === sku)) {
            showToast('SKU identifier already exists in system directories.', 'error');
            return;
        }

        // Insert Product
        const newProdId = State.products.length + 1;
        const newProduct = {
            product_id: newProdId,
            sku: sku,
            name: name,
            description: desc,
            category_id: categoryId,
            uom_id: uomId,
            currency_id: currencyId,
            base_price: basePrice,
            min_quantity_threshold: minQty,
            max_quantity_threshold: maxQty,
            lead_time_days: leadTime,
            status: 'Active'
        };
        State.products.push(newProduct);

        // Allocate initial inventory if quantity > 0
        const initZone = State.warehouse_zones.find(z => z.zone_id === initZoneId);
        
        if (initQty > 0) {
            const newLocId = State.inventory_locations.length + 1;
            State.inventory_locations.push({
                inventory_id: newLocId,
                product_id: newProdId,
                warehouse_id: initZone.warehouse_id,
                zone_id: initZoneId,
                quantity: initQty,
                expiration_date: expDate
            });

            // Log Transaction
            const newTxId = State.stock_transactions.length + 1;
            State.stock_transactions.push({
                transaction_id: newTxId,
                product_id: newProdId,
                warehouse_id: initZone.warehouse_id,
                transaction_type: 'Stock-in',
                quantity: initQty,
                transaction_date: new Date().toISOString(),
                notes: `Initial stock adjustment setup on product registration.`
            });
        }

        DOM.modalNewProduct.classList.add('hidden');
        renderWorkspace();
        showToast(`Product ${name} successfully registered.`, 'success');
        addConsoleLog(`[Product REGISTERED] ${sku} - ${name} added to master file.`, 'success');
    });

    // EDIT PRODUCT DETAILS HANDLERS
    const openEditProductModal = (prodId) => {
        const prod = State.products.find(p => p.product_id === prodId);
        if (!prod) return;

        // Populate Edit modal inputs
        document.getElementById('edit-prod-id').value = prod.product_id;
        document.getElementById('edit-prod-name').value = prod.name;
        document.getElementById('edit-prod-sku').value = prod.sku;
        document.getElementById('edit-prod-price').value = prod.base_price;
        document.getElementById('edit-prod-leadtime').value = prod.lead_time_days || 7;
        document.getElementById('edit-prod-min').value = prod.min_quantity_threshold;
        document.getElementById('edit-prod-max').value = prod.max_quantity_threshold || 150.00;

        // Populate categories
        const catSel = document.getElementById('edit-prod-category');
        catSel.innerHTML = '';
        State.categories.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.category_id;
            opt.textContent = c.category_name;
            if (c.category_id === prod.category_id) {
                opt.selected = true;
            }
            catSel.appendChild(opt);
        });

        document.getElementById('modal-edit-product').classList.remove('hidden');
    };

    const editForm = document.getElementById('edit-product-form');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const prodId = parseInt(document.getElementById('edit-prod-id').value);
            const name = document.getElementById('edit-prod-name').value;
            const sku = document.getElementById('edit-prod-sku').value;
            const price = parseFloat(document.getElementById('edit-prod-price').value);
            const leadTime = parseInt(document.getElementById('edit-prod-leadtime').value);
            const minQty = parseFloat(document.getElementById('edit-prod-min').value);
            const maxQty = parseFloat(document.getElementById('edit-prod-max').value);
            const categoryId = parseInt(document.getElementById('edit-prod-category').value);

            const prod = State.products.find(p => p.product_id === prodId);
            if (!prod) return;

            // Check if SKU is used by another product
            if (State.products.some(p => p.sku === sku && p.product_id !== prodId)) {
                showToast('SKU identifier is already assigned to another catalog item.', 'error');
                return;
            }

            // Apply updates
            prod.name = name;
            prod.sku = sku;
            prod.base_price = price;
            prod.lead_time_days = leadTime;
            prod.min_quantity_threshold = minQty;
            prod.max_quantity_threshold = maxQty;
            prod.category_id = categoryId;

            document.getElementById('modal-edit-product').classList.add('hidden');
            renderWorkspace();
            showToast(`Product ${name} updated successfully.`, 'success');
            addConsoleLog(`[Catalog UPDATE] SKU ${sku} properties modified.`, 'info');
        });
    }

    // DELETE PRODUCT DETAILS HANDLERS
    const openDeleteProductModal = (prodId) => {
        const prod = State.products.find(p => p.product_id === prodId);
        if (!prod) return;

        document.getElementById('delete-prod-id').value = prod.product_id;
        document.getElementById('delete-prod-display-name').textContent = prod.name;
        document.getElementById('delete-prod-display-sku').textContent = prod.sku;

        document.getElementById('modal-delete-product').classList.remove('hidden');
    };

    const confirmDeleteBtn = document.getElementById('btn-confirm-delete');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            const prodId = parseInt(document.getElementById('delete-prod-id').value);
            const prodIndex = State.products.findIndex(p => p.product_id === prodId);
            if (prodIndex === -1) return;

            const prod = State.products[prodIndex];
            
            // Delete product
            State.products.splice(prodIndex, 1);

            // Cascade delete inventory location allocations
            State.inventory_locations = State.inventory_locations.filter(l => l.product_id !== prodId);

            document.getElementById('modal-delete-product').classList.add('hidden');
            renderWorkspace();
            showToast(`Product ${prod.name} discontinued and removed.`, 'success');
            addConsoleLog(`[Catalog DELETE] SKU ${prod.sku} discontinued. Inventory purged.`, 'warning');
        });
    }

    // PROCUREMENT PURCHASE ORDER (PO) GENERATOR
    let activePO = null;
    const openPurchaseOrderModal = (invId) => {
        const loc = State.inventory_locations.find(l => l.inventory_id === invId);
        if (!loc) return;

        const prod = State.products.find(p => p.product_id === loc.product_id);
        if (!prod) return;

        const maxThreshold = prod.max_quantity_threshold || 150.00;
        const deficitQty = Math.max(0, maxThreshold - parseFloat(loc.quantity));
        const estimatedCost = deficitQty * prod.base_price;

        const poNo = `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`;

        // Populate PO Modal HTML fields
        document.getElementById('po-invoice-no').textContent = poNo;
        document.getElementById('po-date').textContent = `Date: ${new Date().toISOString().split('T')[0]}`;
        document.getElementById('po-item-name').textContent = prod.name;
        document.getElementById('po-item-sku').textContent = `SKU: ${prod.sku}`;
        
        const uom = State.units_of_measure.find(u => u.uom_id === prod.uom_id);
        const uomLabel = uom ? uom.uom_code : 'units';
        document.getElementById('po-item-qty').textContent = `${deficitQty.toFixed(1)} ${uomLabel}`;
        
        document.getElementById('po-unit-price').textContent = formatPHP(prod.base_price);
        document.getElementById('po-total-price').textContent = formatPHP(estimatedCost);

        // Store active PO context
        activePO = {
            inventory_id: invId,
            product_id: prod.product_id,
            warehouse_id: loc.warehouse_id,
            qty: deficitQty,
            sku: prod.sku,
            name: prod.name,
            poNo: poNo
        };

        // Open Modal
        document.getElementById('modal-purchase-order').classList.remove('hidden');
        lucide.createIcons();
    };

    const btnDispatchPO = document.getElementById('btn-dispatch-po');
    if (btnDispatchPO) {
        btnDispatchPO.addEventListener('click', () => {
            if (!activePO) return;

            // Start delivery simulation
            btnDispatchPO.disabled = true;
            btnDispatchPO.innerHTML = `<i data-lucide="loader" class="w-3.5 h-3.5 animate-spin inline-block"></i> <span>Transmitting PO...</span>`;
            lucide.createIcons();

            showToast(`Purchase Order ${activePO.poNo} approved. Transmitting to supplier...`, 'success');
            addConsoleLog(`[PO DISPATCHED] Order ${activePO.poNo} sent. Delivery transit initiated.`, 'info');

            setTimeout(() => {
                // Execute simulated Stock-in receipt
                const loc = State.inventory_locations.find(l => l.inventory_id === activePO.inventory_id);
                if (loc) {
                    loc.quantity += activePO.qty;
                    
                    // Log Transaction
                    const newTxId = State.stock_transactions.length + 1;
                    State.stock_transactions.push({
                        transaction_id: newTxId,
                        product_id: activePO.product_id,
                        warehouse_id: activePO.warehouse_id,
                        transaction_type: 'Stock-in',
                        quantity: activePO.qty,
                        transaction_date: new Date().toISOString(),
                        notes: `Procurement fulfillment delivery receipt via PO ${activePO.poNo}.`
                    });
                }

                // Reset button status and close modal
                btnDispatchPO.disabled = false;
                btnDispatchPO.innerHTML = `<i data-lucide="send" class="w-3.5 h-3.5"></i> <span>Approve & Dispatch PO</span>`;
                lucide.createIcons();

                document.getElementById('modal-purchase-order').classList.add('hidden');
                renderWorkspace();
                showToast(`PO ${activePO.poNo} fulfilled! ${activePO.qty.toFixed(1)} units delivered to warehouse.`, 'success');
                addConsoleLog(`[Fulfillment SUCCESS] Received ${activePO.qty.toFixed(1)} units of ${activePO.sku}. Stock levels optimized.`, 'success');
                
                activePO = null;
            }, 3000); // 3 seconds delay
        });
    }

    // DRAWER: ADJUST STOCK DRAWER
    const openAdjustStockDrawer = (invId) => {
        // Toggle drawer hidden classes
        DOM.drawerAdjustStock.classList.remove('hidden');
        const dBody = DOM.drawerAdjustStock.querySelector('.bg-white');
        setTimeout(() => {
            dBody.style.transform = 'translateX(0)';
        }, 50);
    };

    const openAdjustDrawer = (invId) => {
        const loc = State.inventory_locations.find(l => l.inventory_id === parseInt(invId));
        if (!loc) return;

        const prod = State.products.find(p => p.product_id === loc.product_id);
        const wh = State.warehouses.find(w => w.warehouse_id === loc.warehouse_id);
        const zone = State.warehouse_zones.find(z => z.zone_id === loc.zone_id);
        const uom = prod ? State.units_of_measure.find(u => u.uom_id === prod.uom_id) : null;

        // Set inputs
        document.getElementById('adjust-inventory-id').value = invId;
        document.getElementById('adjust-info-sku').textContent = `SKU: ${prod ? prod.sku : 'N/A'}`;
        document.getElementById('adjust-info-name').textContent = prod ? prod.name : 'Unknown Product';
        document.getElementById('adjust-info-location').textContent = `${wh ? wh.name : 'Hub'} - ${zone ? zone.zone_name : 'Zone'}`;
        document.getElementById('adjust-info-uom').textContent = uom ? uom.uom_code : '';
        document.getElementById('adjust-qty').value = '';
        document.getElementById('adjust-notes').value = '';

        // Reset radio defaults
        document.getElementById('action-in').checked = true;

        const checkFefoWarning = () => {
            const isOut = document.getElementById('action-out').checked;
            const fefoWarnBox = document.getElementById('adjust-fefo-warning');
            const fefoWarnText = document.getElementById('adjust-fefo-warning-text');
            
            if (isOut) {
                // Find other locations for this product
                const otherBatches = State.inventory_locations.filter(l => 
                    l.product_id === loc.product_id && 
                    l.inventory_id !== loc.inventory_id && 
                    parseFloat(l.quantity) > 0 && 
                    l.expiration_date
                );

                if (otherBatches.length > 0 && loc.expiration_date) {
                    otherBatches.sort((a, b) => new Date(a.expiration_date) - new Date(b.expiration_date));
                    const oldest = otherBatches[0];
                    
                    if (new Date(oldest.expiration_date) < new Date(loc.expiration_date)) {
                        const whOld = State.warehouses.find(w => w.warehouse_id === oldest.warehouse_id);
                        const zoneOld = State.warehouse_zones.find(z => z.zone_id === oldest.zone_id);
                        const locLabel = `${whOld ? whOld.name.split(' ')[0] : 'Node'} - ${zoneOld ? zoneOld.zone_name : 'Zone'}`;
                        
                        fefoWarnText.textContent = `FEFO Warning: Another batch of this product expires earlier on ${formatDate(oldest.expiration_date)} in ${locLabel} (Qty: ${parseFloat(oldest.quantity).toFixed(0)} units). Consider issuing from that location first to minimize waste.`;
                        fefoWarnBox.classList.remove('hidden');
                        lucide.createIcons();
                        return;
                    }
                }
            }
            fefoWarnBox.classList.add('hidden');
        };

        // Add change listeners
        document.getElementById('action-in').addEventListener('change', checkFefoWarning);
        document.getElementById('action-out').addEventListener('change', checkFefoWarning);
        
        // Initial run
        checkFefoWarning();

        openAdjustStockDrawer(invId);
    };

    DOM.btnSubmitAdjust.addEventListener('click', (e) => {
        e.preventDefault();
        const invId = parseInt(document.getElementById('adjust-inventory-id').value);
        const qty = parseFloat(document.getElementById('adjust-qty').value);
        const action = document.querySelector('input[name="adjust-action"]:checked').value;
        const operator = document.getElementById('adjust-operator').value;
        const notes = document.getElementById('adjust-notes').value;

        if (!qty || qty <= 0) {
            showToast('Enter a valid quantity amount.', 'error');
            return;
        }

        const loc = State.inventory_locations.find(l => l.inventory_id === invId);
        if (!loc) return;

        const prod = State.products.find(p => p.product_id === loc.product_id);
        const typeLabel = action === 'in' ? 'Stock-in' : 'Stock-out';

        if (action === 'out' && parseFloat(loc.quantity) < qty) {
            showToast('Insufficient quantities available to execute stock-out.', 'error');
            return;
        }

        // Adjust qty
        if (action === 'in') {
            if (prod && prod.max_quantity_threshold && (loc.quantity + qty) > prod.max_quantity_threshold) {
                showToast(`Threshold Alert: Exceeds maximum catalog capacity of ${prod.max_quantity_threshold.toFixed(0)} units!`, 'info');
                addConsoleLog(`[Capacity Warning] SKU ${prod.sku} quantity (${(loc.quantity + qty).toFixed(1)}) exceeds maximum threshold limit.`, 'warning');
            }
            loc.quantity += qty;
        } else {
            loc.quantity -= qty;
        }

        // Log transaction
        const newTxId = State.stock_transactions.length + 1;
        State.stock_transactions.push({
            transaction_id: newTxId,
            product_id: loc.product_id,
            warehouse_id: loc.warehouse_id,
            transaction_type: typeLabel,
            quantity: qty,
            transaction_date: new Date().toISOString(),
            notes: `Manual adjustment by operator ${operator}. Reason: ${notes}`
        });

        // Close Drawer slide animation
        const dBody = DOM.drawerAdjustStock.querySelector('.bg-white');
        dBody.style.transform = 'translateX(100%)';
        setTimeout(() => {
            DOM.drawerAdjustStock.classList.add('hidden');
            renderWorkspace();
            showToast(`Manual stock adjustment applied successfully.`, 'success');
            addConsoleLog(`[Adjust SUCCESS] ${typeLabel} of ${qty.toFixed(1)} units on SKU ${prod.sku}.`, 'success');
        }, 300);
    });

    // SETTINGS PANEL & OTHER TRIGGER FALLBACKS
    DOM.btnSettings.addEventListener('click', () => {
        document.getElementById('modal-settings').classList.remove('hidden');
    });

    const btnPHP = document.getElementById('btn-currency-php');
    const btnUSD = document.getElementById('btn-currency-usd');

    const updateCurrencyUI = () => {
        if (State.currency === 'PHP') {
            btnPHP.className = 'py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer bg-slate-50 text-slate-800';
            btnUSD.className = 'py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer bg-white text-slate-500 hover:bg-slate-55';
        } else {
            btnUSD.className = 'py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer bg-slate-50 text-slate-800';
            btnPHP.className = 'py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer bg-white text-slate-500 hover:bg-slate-55';
        }
    };

    if (btnPHP && btnUSD) {
        btnPHP.addEventListener('click', () => {
            if (State.currency === 'PHP') return;
            State.currency = 'PHP';
            updateCurrencyUI();
            renderWorkspace();
            showToast('Global currency set to Philippine Peso (PHP).', 'success');
            addConsoleLog('[System Settings] Currency changed to PHP (₱). Valuation records recalculated.', 'info');
        });

        btnUSD.addEventListener('click', () => {
            if (State.currency === 'USD') return;
            State.currency = 'USD';
            updateCurrencyUI();
            renderWorkspace();
            showToast('Global currency set to United States Dollar (USD).', 'success');
            addConsoleLog('[System Settings] Currency changed to USD ($). Valuation records recalculated.', 'info');
        });
    }

    // ------------------------------------------
    // 6. THEME TOGGLER (Light/Dark Modes)
    // ------------------------------------------
    DOM.themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        State.isDark = !State.isDark;
        
        if (State.isDark) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
            DOM.themeText.textContent = 'Dark Mode';
            DOM.themeIcon.setAttribute('data-lucide', 'moon');
            showToast('Terminal theme set to Tonal Forest Dark Mode.', 'success');
            addConsoleLog('UI theme changed to high-contrast Dark mode.', 'info');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
            DOM.themeText.textContent = 'Light Mode';
            DOM.themeIcon.setAttribute('data-lucide', 'sun');
            showToast('Terminal theme set to Forest Light Mode.', 'success');
            addConsoleLog('UI theme changed to standard Light mode.', 'info');
        }
        lucide.createIcons();
    });

    // ------------------------------------------
    // 7. COMMAND PALETTE SEARCH ENGINE
    // ------------------------------------------
    const openCommandPalette = () => {
        DOM.modalCmdPalette.classList.remove('hidden');
        DOM.cmdInput.value = '';
        DOM.cmdInput.focus();
        renderCmdResults('');
    };

    const renderCmdResults = (query) => {
        DOM.cmdResults.innerHTML = '';
        
        const commands = [
            { title: 'Go to Dashboard', desc: 'Jump to the main Launchpad View', action: () => DOM.sidebarNav.querySelector('[data-tab="dashboard"]').click() },
            { title: 'Go to Inventory Tracking', desc: 'Jump to detailed batch tables', action: () => DOM.sidebarNav.querySelector('[data-tab="tracking"]').click() },
            { title: 'Go to Stock Transactions', desc: 'View audit transaction movement log', action: () => DOM.sidebarNav.querySelector('[data-tab="ledger"]').click() },
            { title: 'Go to Warehouse Location Tracking', desc: 'Audit distribution node volumes', action: () => DOM.sidebarNav.querySelector('[data-tab="zones"]').click() },
            { title: 'Go to Inventory Reporting and Alerts', desc: 'View FEFO lists and stock outages', action: () => DOM.sidebarNav.querySelector('[data-tab="reports"]').click() },
            { title: 'Open Transfer Wizard', desc: 'Dispatch relocation batch', action: () => openTransferWizard() },
            { title: 'Register New Product', desc: 'Insert SKU records to catalog', action: () => openNewProductModal() },
            { title: 'Toggle System Theme', desc: 'Swap between Light and Dark modes', action: () => DOM.themeToggle.click() }
        ];

        // Dynamic Product SKU search options
        State.products.forEach(p => {
            commands.push({
                title: `Locate SKU: ${p.sku}`,
                desc: `Audit quantities and locations for ${p.name}`,
                action: () => {
                    // Navigate to tracking
                    DOM.sidebarNav.querySelector('[data-tab="tracking"]').click();
                    
                    // Reset dropdown filters
                    selectedCategoryFilter = 'All';
                    selectedStatusFilter = 'All';
                    selectedZoneFilter = null;
                    
                    // Input SKU into global search
                    DOM.globalSearch.value = p.sku;
                    
                    // Trigger input event to run filterStocks
                    DOM.globalSearch.dispatchEvent(new Event('input'));
                    
                    // Apply highlighting pulse on the row
                    setTimeout(() => {
                        const tbody = document.getElementById('stock-tbody');
                        if (tbody) {
                            const rows = tbody.querySelectorAll('tr');
                            rows.forEach(row => {
                                const skuCell = row.querySelector('td');
                                if (skuCell && skuCell.textContent.trim().toLowerCase() === p.sku.toLowerCase()) {
                                    row.classList.add('bg-emerald-500/10', 'ring-2', 'ring-emerald-500/20', 'transition-all', 'duration-300');
                                    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    
                                    setTimeout(() => {
                                        row.classList.remove('bg-emerald-500/10', 'ring-2', 'ring-emerald-500/20');
                                    }, 2500);
                                }
                            });
                        }
                    }, 200);
                }
            });
        });

        const filtered = commands.filter(c => 
            c.title.toLowerCase().includes(query.toLowerCase()) || 
            c.desc.toLowerCase().includes(query.toLowerCase())
        );

        if (filtered.length === 0) {
            DOM.cmdResults.innerHTML = `<div class="p-4 text-center text-xs text-slate-400 font-bold">No commands matched "${query}".</div>`;
            return;
        }

        filtered.forEach(cmd => {
            const item = document.createElement('div');
            item.className = 'p-3 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-2xl cursor-pointer transition-all flex items-center justify-between';
            item.innerHTML = `
                <div>
                    <h4 class="text-xs font-black text-slate-700">${cmd.title}</h4>
                    <span class="text-[9px] font-bold text-slate-400">${cmd.desc}</span>
                </div>
                <i data-lucide="corner-down-left" class="w-3.5 h-3.5 text-slate-300"></i>
            `;
            item.addEventListener('click', () => {
                DOM.modalCmdPalette.classList.add('hidden');
                cmd.action();
            });
            DOM.cmdResults.appendChild(item);
        });
        lucide.createIcons();
    };

    // Hotkey hooks
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openCommandPalette();
        }
        if (e.key === 'Escape') {
            DOM.modalCmdPalette.classList.add('hidden');
            DOM.modalTransferWizard.classList.add('hidden');
            DOM.modalNewProduct.classList.add('hidden');
            document.getElementById('modal-settings').classList.add('hidden');
            document.getElementById('modal-edit-product').classList.add('hidden');
            document.getElementById('modal-delete-product').classList.add('hidden');
            document.getElementById('modal-purchase-order').classList.add('hidden');
            
            // Close drawer
            const dBody = DOM.drawerAdjustStock.querySelector('.bg-white');
            if (dBody) dBody.style.transform = 'translateX(100%)';
            setTimeout(() => {
                DOM.drawerAdjustStock.classList.add('hidden');
            }, 300);
        }
    });

    DOM.cmdInput.addEventListener('input', (e) => {
        renderCmdResults(e.target.value);
    });

    // Bind search shortcut click
    DOM.globalSearch.addEventListener('click', openCommandPalette);

    // Bind locked department clicks
    document.querySelectorAll('.btn-locked-dept').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const dept = btn.getAttribute('data-dept');
            showToast(`Access Restricted: ${dept} module is locked.`, 'error');
            addConsoleLog(`[Security Block] Unauthorized attempt to access ${dept} module.`, 'error');
        });
    });

    // COLLAPSIBLE SIDEBAR TRANSITION LISTENERS
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        // Expand on hover
        sidebarContainer.addEventListener('mouseenter', () => {
            sidebarContainer.classList.add('expanded');
        });

        // Collapse on hover leave
        sidebarContainer.addEventListener('mouseleave', () => {
            sidebarContainer.classList.remove('expanded');
        });

        // Collapse when clicking outside on the main body
        document.addEventListener('click', (e) => {
            if (!sidebarContainer.contains(e.target)) {
                sidebarContainer.classList.remove('expanded');
            }
        });
    }

    // (Simulation engine removed as per user request)
});
