// ==========================================
// AMBATUGROW ERP INVENTORY CLIENT-SIDE APP
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // 1. STATE STORE (Adhering to Schema)
    // ------------------------------------------
    const State = window.AppState ? Object.assign({
        isAuthenticated: false,
        currentUser: null,
        activeTab: 'dashboard',
        isDark: false,
        simActive: false,
        simInterval: null,
        currency: 'PHP'
    }, window.AppState) : {
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
            { role_id: 2, role_name: 'Inventory Officer', description: 'Access to stock tracking and movements' },
            { role_id: 3, role_name: 'Procurement Officer', description: 'Access to purchase orders and suppliers' },
            { role_id: 4, role_name: 'Logistics Coordinator', description: 'Access to shipping manifests and zones' },
            { role_id: 5, role_name: 'Sales Manager', description: 'Access to sales orders and customers' },
            { role_id: 6, role_name: 'Finance Accountant', description: 'Access to pricing audit and ledger reporting' }
        ],
        users: [
            { user_id: 1, username: 'admin', password: 'admin123', email: 'admin@ambatugrow.com', role_id: 1, name: 'System Admin' },
            { user_id: 2, username: 'officer', password: 'officer123', email: 'officer@ambatugrow.com', role_id: 2, name: 'Inventory Officer' },
            { user_id: 3, username: 'procurement', password: 'procure123', email: 'procurement@ambatugrow.com', role_id: 3, name: 'Procurement Officer' },
            { user_id: 4, username: 'logistics', password: 'logistics123', email: 'logistics@ambatugrow.com', role_id: 4, name: 'Logistics Coordinator' },
            { user_id: 5, username: 'sales', password: 'sales123', email: 'sales@ambatugrow.com', role_id: 5, name: 'Sales Manager' },
            { user_id: 6, username: 'finance', password: 'finance123', email: 'finance@ambatugrow.com', role_id: 6, name: 'Finance Accountant' }
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
            { warehouse_id: 1, name: 'Indang Hub (CvSU)', address_id: 1, capacity_sqm: 5000.00 },
            { warehouse_id: 2, name: 'Dasma Warehouse', address_id: 2, capacity_sqm: 12000.00 },
            { warehouse_id: 3, name: 'Silang Node', address_id: 3, capacity_sqm: 8000.00 }
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

    // Sync state with database
    async function refreshStateFromServer() {
        try {
            const res = await fetch('/api/state');
            const data = await res.json();
            
            State.roles = data.roles;
            State.users = data.users;
            State.addresses = data.addresses;
            State.units_of_measure = data.units_of_measure;
            State.currencies = data.currencies;
            State.categories = data.categories;
            State.products = data.products;
            State.warehouses = data.warehouses;
            State.warehouse_zones = data.warehouse_zones;
            State.inventory_locations = data.inventory_locations;
            State.stock_transactions = data.stock_transactions;
            
            renderActiveTab();
        } catch (err) {
            console.error('Failed to sync with WMS database:', err);
        }
    }

    // Tracking workspace filters state (Next.js TrackingWorkspace match)
    State.selectedSkus = [];
    State.selectedCategoryFilter = 'All';
    State.selectedStatusFilter = 'All';
    State.selectedZoneFilter = null;

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
                document.getElementById('sidebar-btn-generate-requisition').addEventListener('click', async () => {
                    const lowStockItems = [];
                    State.inventory_locations.forEach(loc => {
                        const prod = State.products.find(p => p.product_id === loc.product_id);
                        if (prod && loc.quantity <= prod.min_quantity_threshold && prod.status === 'Active') {
                            const deficit = prod.max_quantity_threshold - loc.quantity;
                            if (deficit > 0) {
                                lowStockItems.push({
                                    inventory_id: loc.inventory_id,
                                    deficit: deficit,
                                    sku: prod.sku
                                });
                            }
                        }
                    });

                    if (lowStockItems.length === 0) return;

                    const btn = document.getElementById('sidebar-btn-generate-requisition');
                    btn.disabled = true;
                    btn.textContent = 'REORDERING...';

                    try {
                        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                        
                        await Promise.all(lowStockItems.map(item => 
                            fetch('/api/adjustments', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-CSRF-TOKEN': token
                                },
                                body: JSON.stringify({
                                    inventory_id: item.inventory_id,
                                    action: 'in',
                                    quantity: item.deficit
                                })
                            }).then(res => {
                                if (!res.ok) throw new Error(`Failed to reorder SKU ${item.sku}`);
                                return res.json();
                            })
                        ));

                        await refreshStateFromServer();
                        showToast(`Generated requisition. Replenished ${lowStockItems.length} low stock items.`, 'success');
                        playAlertSound('success');
                        
                        lowStockItems.forEach(item => {
                            addConsoleLog(`[Reorder SUCCESS] Replenished SKU ${item.sku} with +${item.deficit.toFixed(0)} units to max threshold.`, 'success');
                        });
                    } catch (err) {
                        showToast(err.message, 'error');
                    } finally {
                        btn.disabled = false;
                        btn.textContent = 'Generate Requisition Order';
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
                const zoneMax = zone.zone_id === 3 ? 5000 : 1500;
                const pct = Math.min(100, Math.round((zoneSum / zoneMax) * 100));
                
                let color = 'bg-[#2D6A24]'; // green
                if (zone.zone_id === 2) color = 'bg-[#34a853]'; // lighter green
                else if (zone.zone_id === 3) color = 'bg-[#fbbc05]'; // orange/yellow

                const wh = State.warehouses.find(w => w.warehouse_id === zone.warehouse_id);
                const whLetter = wh ? (wh.warehouse_id === 1 ? 'A' : wh.warehouse_id === 2 ? 'B' : 'C') : 'A';
                const cleanName = `Warehouse ${whLetter} - Zone ${zone.zone_id}`;

                const zoneCard = document.createElement('div');
                zoneCard.className = `p-2.5 rounded-2xl border border-transparent cursor-pointer transition-all hover:bg-slate-50 \${State.selectedZoneFilter === zone.zone_name ? 'bg-emerald-50/50 border-emerald-200' : ''}`;
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
                    State.selectedZoneFilter = State.selectedZoneFilter === zone.zone_name ? null : zone.zone_name;
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
                .slice(0, 10);
                
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
                let messageTitle = `Stock-In +${parseFloat(tx.quantity).toFixed(0)}`;

                if (tx.type === 'OUT') {
                    iconElement = '<i data-lucide="arrow-up" class="w-3.5 h-3.5"></i>';
                    iconBgClass = 'bg-[#fef7e0] text-[#b06000]'; // Stock-Out orange
                    messageTitle = `Stock-Out -${parseFloat(tx.quantity).toFixed(0)}`;
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
                            State.selectedCategoryFilter = 'All';
                            State.selectedStatusFilter = 'All';
                            State.selectedZoneFilter = null;
                            DOM.globalSearch.value = sku;
                            DOM.globalSearch.dispatchEvent(new Event('input'));
                        }
                    });
                }

                logsList.appendChild(logItem);
            });
        }

        // 4. Climate Storage Health Widget
        const climateWidget = document.getElementById('sidebar-widget-climate-health');
        if (climateWidget) {
            const now = new Date();
            const hour = now.getHours();
            
            let temp = 27.5;
            let humidity = 78;
            let status = 'Optimal';
            let statusClass = 'text-emerald-700 bg-emerald-50/50 border-emerald-200';
            let alertHTML = '';

            if (hour >= 8 && hour <= 16) {
                temp = Math.round(30 + Math.sin(hour) * 2);
                humidity = Math.round(68 - Math.sin(hour) * 4);
            } else {
                temp = Math.round(25 + Math.cos(hour) * 1.5);
                humidity = Math.round(82 + Math.cos(hour) * 3);
            }

            if (humidity > 80) {
                status = 'Warning: High Humidity';
                statusClass = 'text-amber-700 bg-amber-50/50 border-amber-200 animate-pulse';
                alertHTML = `
                    <div class="mt-2.5 p-2.5 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-[10px] text-amber-800 font-bold flex gap-1.5 items-start leading-normal">
                        <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5 animate-bounce"></i>
                        <span>High moisture threat in Indang Zone A (Seeds Store). Activate ventilation blowers immediately.</span>
                    </div>
                `;
            }

            climateWidget.innerHTML = `
                <div class="flex items-center gap-2 text-slate-800 shrink-0 pt-2 border-t border-slate-100">
                    <i data-lucide="cloud-sun" class="w-4 h-4 text-[#2D6A24] shrink-0"></i>
                    <h4 class="font-extrabold text-sm font-outfit">Storage Climate Monitor</h4>
                </div>
                <div class="p-4 bg-slate-50 border border-slate-200/60 rounded-3xl space-y-3 shadow-2xs select-none">
                    <div class="flex justify-between items-center text-xs">
                        <div class="space-y-0.5">
                            <span class="block text-[8px] font-black text-slate-400 uppercase tracking-wider">Cavite Indang Node</span>
                            <span class="block text-sm font-black text-slate-800 font-outfit">${temp}°C</span>
                        </div>
                        <div class="text-right">
                            <span class="block text-[8px] font-black text-slate-400 uppercase tracking-wider">Storage Humidity</span>
                            <span class="block text-sm font-black text-slate-700 font-mono">${humidity}% RH</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between py-1.5 px-3 rounded-xl border text-[9px] font-bold ${statusClass}">
                        <span>System Status: ${status}</span>
                        <i data-lucide="${humidity > 80 ? 'wind' : 'check-circle'}" class="w-3.5 h-3.5"></i>
                    </div>
                    ${alertHTML}
                </div>
            `;
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
                            
                            const roleObj = State.roles.find(r => r.role_id === State.currentUser.role_id);
                            if (sideRole) sideRole.textContent = roleObj ? roleObj.role_name : 'Staff';
                            
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
        if (typeof window.renderDashboard === 'function') {
            window.renderDashboard(State, DOM, formatPHP, lucide, openNewProductModal);
        } else {
            console.error('window.renderDashboard is not defined');
        }
    };

    // VIEW 2: STOCK TRACKING
    const renderTracking = () => {
        if (typeof window.renderTracking === 'function') {
            window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
        } else {
            console.error('window.renderTracking is not defined');
        }
    };

    // VIEW 3: LEDGER TRANSACTION HISTORY
    const renderLedger = () => {
        if (typeof window.renderLedger === 'function') {
            window.renderLedger(State, DOM, showToast, addConsoleLog);
        } else {
            console.error('window.renderLedger is not defined');
        }
    };

    // VIEW 4: WAREHOUSES & ZONES
    const renderZones = () => {
        if (typeof window.renderZones === 'function') {
            window.renderZones(State, DOM);
        } else {
            console.error('window.renderZones is not defined');
        }
    };

    // VIEW 5: REPORTS & ALERTS
    const renderReports = () => {
        if (typeof window.renderReports === 'function') {
            window.renderReports(State, DOM, formatDate, openPurchaseOrderModal, lucide);
        } else {
            console.error('window.renderReports is not defined');
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

    DOM.transferForm.addEventListener('submit', async (e) => {
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

        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch('/api/transfers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token
                },
                body: JSON.stringify({
                    product_id: prodId,
                    source_zone_id: srcZoneId,
                    dest_zone_id: destZoneId,
                    quantity: qty,
                    operator: operator,
                    notes: notes
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Server error occurred.');
            }

            await refreshStateFromServer();
            DOM.modalTransferWizard.classList.add('hidden');
            renderWorkspace();
            showToast(`Stock transfer of ${qty.toFixed(1)} units executed successfully.`, 'success');
            addConsoleLog(`[Transfer SUCCESS] Relocated ${qty} units of ${prod.sku}. Transaction signed.`, 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
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

    DOM.productForm.addEventListener('submit', async (e) => {
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

        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token
                },
                body: JSON.stringify({
                    sku: sku,
                    name: name,
                    description: desc,
                    category_id: categoryId,
                    uom_id: uomId,
                    currency_id: currencyId,
                    base_price: basePrice,
                    min_quantity_threshold: minQty,
                    lead_time_days: leadTime,
                    init_zone_id: initZoneId,
                    init_qty: initQty,
                    init_expiration: expDate
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Server error occurred.');
            }

            await refreshStateFromServer();
            DOM.modalNewProduct.classList.add('hidden');
            renderWorkspace();
            showToast(`Product ${name} successfully registered.`, 'success');
            addConsoleLog(`[Product REGISTERED] ${sku} - ${name} added to database.`, 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
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
        editForm.addEventListener('submit', async (e) => {
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

            try {
                const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                const res = await fetch(`/api/products/${prodId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': token
                    },
                    body: JSON.stringify({
                        name: name,
                        sku: sku,
                        base_price: price,
                        lead_time_days: leadTime,
                        min_quantity_threshold: minQty,
                        max_quantity_threshold: maxQty,
                        category_id: categoryId
                    })
                });

                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.error || 'Server error occurred.');
                }

                await refreshStateFromServer();
                document.getElementById('modal-edit-product').classList.add('hidden');
                renderWorkspace();
                showToast(`Product ${name} updated successfully.`, 'success');
                addConsoleLog(`[Catalog UPDATE] SKU ${sku} properties modified in database.`, 'info');
            } catch (err) {
                showToast(err.message, 'error');
            }
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
        confirmDeleteBtn.addEventListener('click', async () => {
            const prodId = parseInt(document.getElementById('delete-prod-id').value);
            const prod = State.products.find(p => p.product_id === prodId);
            if (!prod) return;

            try {
                const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                const res = await fetch(`/api/products/${prodId}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': token
                    }
                });

                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.error || 'Server error occurred.');
                }

                await refreshStateFromServer();
                document.getElementById('modal-delete-product').classList.add('hidden');
                renderWorkspace();
                showToast(`Product ${prod.name} discontinued and removed.`, 'success');
                addConsoleLog(`[Catalog DELETE] SKU ${prod.sku} discontinued from database.`, 'warning');
            } catch (err) {
                showToast(err.message, 'error');
            }
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

            setTimeout(async () => {
                try {
                    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                    const res = await fetch('/api/adjustments', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': token
                        },
                        body: JSON.stringify({
                            inventory_id: activePO.inventory_id,
                            action: 'in',
                            quantity: activePO.qty
                        })
                    });

                    if (!res.ok) {
                        const errData = await res.json();
                        throw new Error(errData.error || 'Server error occurred during PO dispatch.');
                    }

                    await refreshStateFromServer();
                    showToast(`PO ${activePO.poNo} fulfilled! ${activePO.qty.toFixed(1)} units delivered to warehouse.`, 'success');
                    addConsoleLog(`[Fulfillment SUCCESS] Received ${activePO.qty.toFixed(1)} units of ${activePO.sku}. Stock levels optimized.`, 'success');
                } catch (err) {
                    showToast(err.message, 'error');
                } finally {
                    // Reset button status and close modal
                    btnDispatchPO.disabled = false;
                    btnDispatchPO.innerHTML = `<i data-lucide="send" class="w-3.5 h-3.5"></i> <span>Approve & Dispatch PO</span>`;
                    lucide.createIcons();

                    document.getElementById('modal-purchase-order').classList.add('hidden');
                    activePO = null;
                }
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

    DOM.btnSubmitAdjust.addEventListener('click', async (e) => {
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

        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const res = await fetch('/api/adjustments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token
                },
                body: JSON.stringify({
                    inventory_id: invId,
                    action: action,
                    quantity: qty,
                    operator: operator,
                    notes: notes
                })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Server error occurred.');
            }

            await refreshStateFromServer();

            // Close Drawer slide animation
            const dBody = DOM.drawerAdjustStock.querySelector('.bg-white');
            dBody.style.transform = 'translateX(100%)';
            setTimeout(() => {
                DOM.drawerAdjustStock.classList.add('hidden');
                renderWorkspace();
                showToast(`Manual stock adjustment applied successfully.`, 'success');
                addConsoleLog(`[Adjust SUCCESS] ${typeLabel} of ${qty.toFixed(1)} units on SKU ${prod.sku}.`, 'success');
            }, 300);
        } catch (err) {
            showToast(err.message, 'error');
        }
    });

    // SETTINGS PANEL & OTHER TRIGGER FALLBACKS
    DOM.btnSettings.addEventListener('click', () => {
        document.getElementById('modal-settings').classList.remove('hidden');
    });

    const runNodesPingHealthCheck = async () => {
        const list = document.getElementById('nodes-status-list');
        if (!list) return;

        list.innerHTML = `
            <div class="p-6 text-center text-xs text-slate-400 font-bold flex flex-col items-center gap-2">
                <i data-lucide="refresh-cw" class="w-5 h-5 text-emerald-600 animate-spin shrink-0"></i>
                <span>Pinging secure nodes...</span>
            </div>
        `;
        lucide.createIcons();

        await new Promise(resolve => setTimeout(resolve, 800));

        const nodes = [
            { name: 'Database Mount Node', ip: 'CV-192.168.1.10', icon: 'database' },
            { name: 'Vault Authorization Node', ip: 'CV-192.168.1.11', icon: 'key-round' },
            { name: 'Indang Routing Hub', ip: 'CV-192.168.1.12', icon: 'network' },
            { name: 'ERP Master Server Node', ip: 'CV-192.168.1.13', icon: 'server' }
        ];

        list.innerHTML = '';
        nodes.forEach(node => {
            const ping = Math.floor(12 + Math.random() * 25);
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'p-3.5 bg-slate-50 border border-slate-200/60 rounded-2xl flex justify-between items-center text-xs';
            nodeDiv.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-[#2D6A24]/10 text-[#2D6A24] flex items-center justify-center font-bold">
                        <i data-lucide="${node.icon}" class="w-4 h-4"></i>
                    </div>
                    <div>
                        <h4 class="font-extrabold text-slate-800 leading-tight font-outfit">${node.name}</h4>
                        <span class="block text-[8px] font-bold text-slate-400 uppercase mt-0.5">${node.ip}</span>
                    </div>
                </div>
                <div class="text-right">
                    <span class="block text-[10px] font-black text-emerald-600 font-mono">${ping} ms</span>
                    <span class="block text-[8px] font-black text-[#2D6A24] uppercase mt-0.5">Operational</span>
                </div>
            `;
            list.appendChild(nodeDiv);
        });
        lucide.createIcons();
    };

    const btnNodesStatus = document.getElementById('btn-nodes-status');
    if (btnNodesStatus) {
        btnNodesStatus.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('modal-nodes-status').classList.remove('hidden');
            runNodesPingHealthCheck();
        });
    }

    const btnRefreshNodes = document.getElementById('btn-refresh-nodes');
    if (btnRefreshNodes) {
        btnRefreshNodes.addEventListener('click', (e) => {
            e.preventDefault();
            runNodesPingHealthCheck();
        });
    }

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Reset auth state
            State.isAuthenticated = false;
            State.currentUser = null;

            // Clear login form inputs
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';

            // Hide main interface, show login gateway
            DOM.erpShell.classList.add('hidden');
            DOM.loginGateway.classList.remove('hidden', 'animate-scale-out');

            // Reset login loader values just in case
            DOM.loginLoader.classList.add('hidden');
            const loaderProgress = document.getElementById('load-progress-bar');
            const loaderPercent = document.getElementById('load-status-percent');
            const loaderTitle = document.getElementById('load-status-title');
            if (loaderProgress) loaderProgress.style.width = '0%';
            if (loaderPercent) loaderPercent.textContent = '0%';
            if (loaderTitle) loaderTitle.textContent = 'ACCESS_REQUEST';

            // Reset satellite nodes status
            document.querySelectorAll('.sat-node').forEach(node => {
                node.className = 'sat-node absolute w-8 h-8 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center transition-all duration-300';
                const icon = node.querySelector('i');
                if (icon) {
                    const iconName = node.id === 'node-sat-1' ? 'database' :
                                     node.id === 'node-sat-2' ? 'key-round' :
                                     node.id === 'node-sat-3' ? 'network' : 'server';
                    icon.className = `w-4 h-4 text-slate-500`;
                    icon.setAttribute('data-lucide', iconName);
                }
            });
            document.querySelectorAll('line[id^="line-sat-"]').forEach(line => {
                line.setAttribute('stroke', 'rgba(148, 163, 184, 0.15)');
            });
            lucide.createIcons();

            showToast('Logged out of terminal session.', 'success');
            addConsoleLog('[Security Log] Current employee session closed. Gateway locked.', 'warning');
        });
    }

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
                    State.selectedCategoryFilter = 'All';
                    State.selectedStatusFilter = 'All';
                    State.selectedZoneFilter = null;
                    
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
            document.getElementById('modal-nodes-status').classList.add('hidden');
            
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
