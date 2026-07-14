<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Roles
        DB::table('roles')->insert([
            ['role_id' => 1, 'role_name' => 'System Administrator', 'description' => 'Full access to all systems', 'created_at' => now(), 'updated_at' => now()],
            ['role_id' => 2, 'role_name' => 'Inventory Officer', 'description' => 'Access to stock tracking and movements', 'created_at' => now(), 'updated_at' => now()],
            ['role_id' => 3, 'role_name' => 'Procurement Officer', 'description' => 'Access to purchase orders and suppliers', 'created_at' => now(), 'updated_at' => now()],
            ['role_id' => 4, 'role_name' => 'Logistics Coordinator', 'description' => 'Access to shipping manifests and zones', 'created_at' => now(), 'updated_at' => now()],
            ['role_id' => 5, 'role_name' => 'Sales Manager', 'description' => 'Access to sales orders and customers', 'created_at' => now(), 'updated_at' => now()],
            ['role_id' => 6, 'role_name' => 'Finance Accountant', 'description' => 'Access to pricing audit and ledger reporting', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 2. Addresses
        DB::table('addresses')->insert([
            ['address_id' => 1, 'street' => 'CvSU Campus', 'city' => 'Indang', 'province' => 'Cavite', 'zipcode' => '4122', 'country' => 'Philippines', 'created_at' => now(), 'updated_at' => now()],
            ['address_id' => 2, 'street' => 'Dasma Highway', 'city' => 'Dasmariñas', 'province' => 'Cavite', 'zipcode' => '4114', 'country' => 'Philippines', 'created_at' => now(), 'updated_at' => now()],
            ['address_id' => 3, 'street' => 'Aguinaldo Highway', 'city' => 'Silang', 'province' => 'Cavite', 'zipcode' => '4118', 'country' => 'Philippines', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 3. Units of Measure
        DB::table('units_of_measure')->insert([
            ['uom_id' => 1, 'uom_code' => 'kg', 'uom_name' => 'Kilogram', 'description' => 'Mass metric unit', 'created_at' => now(), 'updated_at' => now()],
            ['uom_id' => 2, 'uom_code' => 'L', 'uom_name' => 'Liter', 'description' => 'Volume metric unit', 'created_at' => now(), 'updated_at' => now()],
            ['uom_id' => 3, 'uom_code' => 'bag', 'uom_name' => 'Bag', 'description' => 'Pre-packaged bag', 'created_at' => now(), 'updated_at' => now()],
            ['uom_id' => 4, 'uom_code' => 'pcs', 'uom_name' => 'Pieces', 'description' => 'Individual units', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 4. Currencies
        DB::table('currencies')->insert([
            ['currency_id' => 1, 'currency_code' => 'PHP', 'currency_name' => 'Philippine Peso', 'exchange_rate' => 1.0000, 'created_at' => now(), 'updated_at' => now()],
            ['currency_id' => 2, 'currency_code' => 'USD', 'currency_name' => 'US Dollar', 'exchange_rate' => 56.4000, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 5. Users
        DB::table('users')->insert([
            ['user_id' => 1, 'username' => 'admin', 'password_hash' => '$2y$12$V.oR6681l1fC3mEkpatyy.rhB3eesmbAqeSjqsdfqxTK9bjQTN0eO', 'email' => 'admin@ambatugrow.com', 'role_id' => 1, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 2, 'username' => 'officer', 'password_hash' => '$2y$12$V.oR6681l1fC3mEkpatyy.rhB3eesmbAqeSjqsdfqxTK9bjQTN0eO', 'email' => 'officer@ambatugrow.com', 'role_id' => 2, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 3, 'username' => 'procurement', 'password_hash' => '$2y$12$V.oR6681l1fC3mEkpatyy.rhB3eesmbAqeSjqsdfqxTK9bjQTN0eO', 'email' => 'procurement@ambatugrow.com', 'role_id' => 3, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 4, 'username' => 'logistics', 'password_hash' => '$2y$12$V.oR6681l1fC3mEkpatyy.rhB3eesmbAqeSjqsdfqxTK9bjQTN0eO', 'email' => 'logistics@ambatugrow.com', 'role_id' => 4, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 5, 'username' => 'sales', 'password_hash' => '$2y$12$V.oR6681l1fC3mEkpatyy.rhB3eesmbAqeSjqsdfqxTK9bjQTN0eO', 'email' => 'sales@ambatugrow.com', 'role_id' => 5, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 6, 'username' => 'finance', 'password_hash' => '$2y$12$V.oR6681l1fC3mEkpatyy.rhB3eesmbAqeSjqsdfqxTK9bjQTN0eO', 'email' => 'finance@ambatugrow.com', 'role_id' => 6, 'status' => 'Active', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 6. Categories
        DB::table('categories')->insert([
            ['category_id' => 1, 'category_name' => 'Grains & Seeds', 'parent_category_id' => null, 'created_at' => now(), 'updated_at' => now()],
            ['category_id' => 2, 'category_name' => 'Organic Fertilizers', 'parent_category_id' => null, 'created_at' => now(), 'updated_at' => now()],
            ['category_id' => 3, 'category_name' => 'Tools & Protective Equipment', 'parent_category_id' => null, 'created_at' => now(), 'updated_at' => now()],
            ['category_id' => 4, 'category_name' => 'Liquid Nutrients', 'parent_category_id' => null, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // 7. Products (Expanded to 80 products)
        $products = [
            [1, 'AGRI-SEED-042', 'Hybrid Rice Seeds', 'High-yield F1 hybrid seeds', 1, 3, 1, 1800.00, 15.00, 7],
            [2, 'AGRI-FERT-009', 'Premium Vermicast', '100% organic worm castings', 2, 3, 1, 650.00, 40.00, 5],
            [3, 'AGRI-PROD-001', 'Industrial Gloves', 'Heavy duty nitrile gloves', 3, 4, 1, 150.00, 100.00, 14],
            [4, 'AGRI-NUTRI-501', 'Growmax Liquid Foliar', 'Concentrated nitrogen foliar feed', 4, 2, 1, 450.00, 25.00, 10],
            [5, 'AGRI-SEED-101', 'Sweet Corn Seeds', 'Yellow sweet corn hybrid seeds', 1, 1, 1, 980.00, 10.00, 7],
            [6, 'AGRI-SEED-102', 'Organic Tomato Seeds', 'Heirloom red tomato seeds', 1, 4, 1, 250.00, 20.00, 5],
            [7, 'AGRI-SEED-103', 'Red Onion Seeds', 'Short-day red onion seeds', 1, 4, 1, 320.00, 15.00, 8],
            [8, 'AGRI-SEED-104', 'Green Bell Pepper Seeds', 'California wonder green pepper', 1, 4, 1, 280.00, 12.00, 6],
            [9, 'AGRI-SEED-105', 'Organic Cucumber Seeds', 'Slicing cucumber organic seed pack', 1, 4, 1, 190.00, 30.00, 4],
            [10, 'AGRI-SEED-106', 'Sweet Lettuce Seeds', 'Looseleaf lettuce greens seeds', 1, 4, 1, 180.00, 25.00, 3],
            [11, 'AGRI-SEED-107', 'Cauliflower Seeds F1', 'Early white snowball cauliflower', 1, 4, 1, 450.00, 10.00, 9],
            [12, 'AGRI-SEED-108', 'Eggplant Long Purple', 'Traditional purple eggplant seeds', 1, 4, 1, 220.00, 15.00, 6],
            [13, 'AGRI-SEED-109', 'Carrots Kuroda Seeds', 'Sweet and tender carrot seeds', 1, 1, 1, 340.00, 20.00, 7],
            [14, 'AGRI-SEED-110', 'Okra Clemson Spineless', 'High productivity okra seeds', 1, 4, 1, 150.00, 30.00, 5],
            [15, 'AGRI-SEED-111', 'Yardlong Bean Seeds', 'Climbing string pole bean seeds', 1, 4, 1, 210.00, 18.00, 6],
            [16, 'AGRI-SEED-112', 'Bitter Gourd Seeds', 'Galaxy variety bitter melon', 1, 4, 1, 410.00, 8.00, 10],
            [17, 'AGRI-SEED-113', 'Cayenne Chili Seeds', 'Hot cayenne red chili pepper seeds', 1, 4, 1, 260.00, 12.00, 7],
            [18, 'AGRI-SEED-114', 'Spinach Bloomsdale', 'Savoy crinkled leaf spinach seeds', 1, 4, 1, 195.00, 22.00, 4],
            [19, 'AGRI-FERT-010', 'Chicken Manure Pellets', 'Dehydrated chicken manure fertilizer', 2, 3, 1, 480.00, 30.00, 6],
            [20, 'AGRI-FERT-011', 'Organic Compost Mix', 'All-purpose nutrient rich organic compost', 2, 3, 1, 350.00, 50.00, 5],
            [21, 'AGRI-FERT-012', 'Premium Bat Guano', 'High nitrogen bat guano manure', 2, 1, 1, 1150.00, 15.00, 10],
            [22, 'AGRI-FERT-013', 'Steamed Bone Meal', 'Phosphorus rich root developer', 2, 1, 1, 780.00, 25.00, 8],
            [23, 'AGRI-FERT-014', 'Organic Blood Meal', 'Fast-acting nitrogen blood meal powder', 2, 1, 1, 890.00, 20.00, 9],
            [24, 'AGRI-FERT-015', 'Seaweed Extract Powder', 'Soluble cold-water kelp extract', 2, 1, 1, 1450.00, 10.00, 12],
            [25, 'AGRI-FERT-016', 'Fish Shavings Compost', 'Processed fish by-product compost', 2, 3, 1, 520.00, 30.00, 7],
            [26, 'AGRI-FERT-017', 'Neem Cake Powder', 'Organic soil conditioner and pest control', 2, 1, 1, 680.00, 15.00, 6],
            [27, 'AGRI-FERT-018', 'Agricultural Epsom Salt', 'Magnesium sulfate fertilizer crystals', 2, 1, 1, 290.00, 40.00, 5],
            [28, 'AGRI-FERT-019', 'Rock Phosphate Powder', 'Slow release phosphorus fertilizer', 2, 1, 1, 490.00, 35.00, 10],
            [29, 'AGRI-FERT-020', 'Humic Acid Powder', '90% soluble humic acid bio-stimulant', 2, 1, 1, 1250.00, 8.00, 8],
            [30, 'AGRI-FERT-021', 'Biochar Soil Amendment', 'Activated horticultural charcoal biochar', 2, 3, 1, 620.00, 20.00, 7],
            [31, 'AGRI-TOOL-201', 'Classic Bypass Pruner', 'Precision blades hand pruning shears', 3, 4, 1, 750.00, 15.00, 10],
            [32, 'AGRI-TOOL-202', 'Heavy Duty Hand Trowel', 'Ergonomic cast aluminum hand trowel', 3, 4, 1, 320.00, 20.00, 9],
            [33, 'AGRI-TOOL-203', 'Hand Weeding Spade', 'Serrated carbon steel weeding tool', 3, 4, 1, 280.00, 12.00, 8],
            [34, 'AGRI-TOOL-204', 'Stainless Hand Rake', '5-tine cultivator hand fork rake', 3, 4, 1, 350.00, 10.00, 11],
            [35, 'AGRI-TOOL-205', 'Premium Watering Can 5L', 'Green plastic watering can with rose head', 3, 4, 1, 490.00, 15.00, 7],
            [36, 'AGRI-TOOL-206', 'Knapsack Sprayer 16L', 'Manual backpack pressure tank sprayer', 3, 4, 1, 1850.00, 8.00, 14],
            [37, 'AGRI-TOOL-207', 'Fiberglass Handle Shovel', 'Round point digging spade shovel', 3, 4, 1, 950.00, 10.00, 10],
            [38, 'AGRI-TOOL-208', 'Soil pH Moisture Meter', '3-in-1 soil sensor probe tester', 3, 4, 1, 580.00, 25.00, 7],
            [39, 'AGRI-TOOL-209', 'Digging Fork Heavy Duty', '4-tine carbon steel garden fork', 3, 4, 1, 1100.00, 8.00, 12],
            [40, 'AGRI-TOOL-210', 'Grafting Tool Set', 'Agricultural tree grafting cutter set', 3, 4, 1, 1450.00, 5.00, 15],
            [41, 'AGRI-TOOL-211', 'Anti-Insect Netting 10m', 'Fine mesh protective crop insect net', 3, 4, 1, 680.00, 20.00, 6],
            [42, 'AGRI-TOOL-212', 'Seedling Starter Pots', 'Biodegradable peat starter pots 100pcs', 3, 4, 1, 390.00, 30.00, 5],
            [43, 'AGRI-TOOL-213', 'Heavy Duty Pruning Saw', 'Curved blade wood cutting hand saw', 3, 4, 1, 820.00, 12.00, 9],
            [44, 'AGRI-NUTRI-502', 'Cal-Mag Booster Liquid', 'Calcium and magnesium plant supplement', 4, 2, 1, 690.00, 15.00, 8],
            [45, 'AGRI-NUTRI-503', 'Fish Amino Acid FAA', 'Liquid fish waste amino foliar feed', 4, 2, 1, 520.00, 20.00, 6],
            [46, 'AGRI-NUTRI-504', 'Seaweed Liquid Concentrate', 'Cold processed organic liquid seaweed', 4, 2, 1, 850.00, 18.00, 7],
            [47, 'AGRI-NUTRI-505', 'Humic Acid Liquid', 'Concentrated liquid humates soil wash', 4, 2, 1, 720.00, 22.00, 9],
            [48, 'AGRI-NUTRI-506', 'Trace Elements Solution', 'Liquid chelated micro plant nutrients', 4, 2, 1, 920.00, 10.00, 11],
            [49, 'AGRI-NUTRI-507', 'Potassium Humate Liquid', 'Highly active potassium root stimulant', 4, 2, 1, 780.00, 15.00, 8],
            [50, 'AGRI-NUTRI-508', 'Organic Pest Repellent', 'Chili and garlic insect repellent spray', 4, 2, 1, 420.00, 30.00, 5],
            [51, 'AGRI-NUTRI-509', 'Rooting Hormone Solution', 'Concentrated rooting hormone stimulant', 4, 2, 1, 680.00, 12.00, 6],
            [52, 'AGRI-NUTRI-510', 'Hydroponics A&B Nutrient', 'Two-part hydroponics fertilizer set', 4, 2, 1, 1250.00, 10.00, 10],
            [53, 'AGRI-NUTRI-511', 'Cold Pressed Neem Oil 1L', '100% pure cold pressed neem foliar oil', 4, 2, 1, 890.00, 15.00, 7],
            [54, 'AGRI-NUTRI-512', 'Wood Vinegar Solution', 'Pyroligneous acid organic soil stimulant', 4, 2, 1, 360.00, 40.00, 5],
            [55, 'AGRI-NUTRI-513', 'Compost Tea Brew Pack', 'Aerated liquid compost tea concentrate', 4, 2, 1, 580.00, 20.00, 6],
            
            // New additions (56 to 80)
            [56, 'AGRI-SEED-115', 'Hybrid Sweet Potato Pack', 'Disease resistant root crop sweet potato seeds', 1, 4, 1, 350.00, 15.00, 6],
            [57, 'AGRI-SEED-116', 'Yellow Ginger Rhizomes', 'Select ginger seeds rhizomes bundle', 1, 1, 1, 480.00, 20.00, 7],
            [58, 'AGRI-SEED-117', 'Sweet Watermelon Seeds', 'Sugar baby variety watermelon seeds', 1, 4, 1, 290.00, 10.00, 5],
            [59, 'AGRI-SEED-118', 'Native Peanuts Seed Pack', 'Organic raw peanut seeds for planting', 1, 1, 1, 180.00, 25.00, 8],
            [60, 'AGRI-SEED-119', 'Giant Pumpkin Seeds F1', 'High-yield F1 big pumpkin seeds pack', 1, 4, 1, 390.00, 12.00, 6],
            [61, 'AGRI-FERT-022', 'Slow-Release Osmocote', 'Granular multi-nutrient slow release feed', 2, 1, 1, 1380.00, 12.00, 9],
            [62, 'AGRI-FERT-023', 'Mycorrhizal Fungi Powder', 'Root inoculant mycorrhizae powder pack', 2, 1, 1, 950.00, 15.00, 10],
            [63, 'AGRI-FERT-024', 'Organic Azomite Minerals', 'Micronized Azomite natural mineral dust', 2, 3, 1, 850.00, 20.00, 7],
            [64, 'AGRI-FERT-025', 'Granular Kelp Meal', 'Organic cold-water kelp meal fertilizer', 2, 3, 1, 1100.00, 18.00, 6],
            [65, 'AGRI-FERT-026', 'Alfalfa Meal Organic Feed', 'High organic matter alfalfa soil amendment', 2, 3, 1, 640.00, 25.00, 5],
            [66, 'AGRI-TOOL-214', 'Heavy Duty Garden Hoe', 'Forged carbon steel garden hoe tool', 3, 4, 1, 480.00, 15.00, 7],
            [67, 'AGRI-TOOL-215', 'Adjustable Lawn Rake', 'Expandable metal leaf rake tool', 3, 4, 1, 550.00, 10.00, 8],
            [68, 'AGRI-TOOL-216', 'Bypass Lopper 30-Inch', 'Heavy-duty long arm branch pruning cutter', 3, 4, 1, 1680.00, 8.00, 12],
            [69, 'AGRI-TOOL-217', 'Precision Seed Sower', 'Handheld seed planter spacing dial tool', 3, 4, 1, 290.00, 20.00, 5],
            [70, 'AGRI-TOOL-218', 'Heavy Duty Wheelbarrow', 'Poly tray deep wheelbarrow 100L capacity', 3, 4, 1, 3850.00, 5.00, 14],
            [71, 'AGRI-NUTRI-514', 'Iron Chelate Solution', 'Liquid iron correction foliar feed', 4, 2, 1, 750.00, 15.00, 7],
            [72, 'AGRI-NUTRI-515', 'Organic Humus Extract', 'Concentrated organic carbon liquid conditioner', 4, 2, 1, 620.00, 20.00, 6],
            [73, 'AGRI-NUTRI-516', 'Liquid Bone Meal Rooter', 'Soluble organic phosphorus root feed', 4, 2, 1, 850.00, 18.00, 8],
            [74, 'AGRI-NUTRI-517', 'Super-Bloom Orchid Spray', 'High potassium flowering spray nutrient', 4, 2, 1, 480.00, 25.00, 5],
            [75, 'AGRI-NUTRI-518', 'Citrus Fruit Booster Liquid', 'Targeted micronutrient foliar spray for trees', 4, 2, 1, 950.00, 12.00, 9],
            [76, 'AGRI-NUTRI-519', 'Horticultural Soap Spray', 'Organic insecticidal soap spray bottle', 4, 2, 1, 380.00, 30.00, 6],
            [77, 'AGRI-NUTRI-520', 'Liquid Boron Solution', 'Chelated boron micro nutrient soil wash', 4, 2, 1, 690.00, 10.00, 7],
            [78, 'AGRI-NUTRI-521', 'Kelp-Fish Emulsion Mix', 'Fish and kelp blended organic plant food', 4, 2, 1, 1150.00, 15.00, 10],
            [79, 'AGRI-NUTRI-522', 'Silica Booster Liquid', 'Plant cell wall strengthening silica feed', 4, 2, 1, 980.00, 8.00, 8],
            [80, 'AGRI-NUTRI-523', 'Compost Booster Activator', 'Biologically active compost starter liquid', 4, 2, 1, 450.00, 20.00, 5]
        ];

        foreach ($products as $p) {
            DB::table('products')->insert([
                'product_id' => $p[0],
                'sku' => $p[1],
                'name' => $p[2],
                'description' => $p[3],
                'category_id' => $p[4],
                'uom_id' => $p[5],
                'currency_id' => $p[6],
                'base_price' => $p[7],
                'min_quantity_threshold' => $p[8],
                'lead_time_days' => $p[9],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        // 8. Warehouses
        DB::table('warehouses')->insert([
            ['warehouse_id' => 1, 'name' => 'Indang Hub (CvSU)', 'address_id' => 1, 'capacity_sqm' => 5000.00, 'created_at' => now(), 'updated_at' => now()],
            ['warehouse_id' => 2, 'name' => 'Dasma Warehouse', 'address_id' => 2, 'capacity_sqm' => 12000.00, 'created_at' => now(), 'updated_at' => now()],
            ['warehouse_id' => 3, 'name' => 'Silang Node', 'address_id' => 3, 'capacity_sqm' => 8000.00, 'created_at' => now(), 'updated_at' => now()]
        ]);

        // 9. Warehouse Zones
        DB::table('warehouse_zones')->insert([
            ['zone_id' => 1, 'warehouse_id' => 1, 'zone_name' => 'Zone A - Seeds Store', 'category' => 'Dry Storage', 'created_at' => now(), 'updated_at' => now()],
            ['zone_id' => 2, 'warehouse_id' => 1, 'zone_name' => 'Zone B - Liquid Feed', 'category' => 'Chemical Safety', 'created_at' => now(), 'updated_at' => now()],
            ['zone_id' => 3, 'warehouse_id' => 2, 'zone_name' => 'Main Hall - Pallet Area', 'category' => 'Bulk Storage', 'created_at' => now(), 'updated_at' => now()],
            ['zone_id' => 4, 'warehouse_id' => 3, 'zone_name' => 'Rack Section - Cool Dry', 'category' => 'Temperature Control', 'created_at' => now(), 'updated_at' => now()]
        ]);

        // 10. Inventory Locations (Mapped for all 80 products)
        $locations = [
            [1, 1, 1, 1, 18.00, '2026-12-31'],
            [2, 2, 2, 3, 120.00, null],
            [3, 3, 2, 3, 85.00, null],
            [4, 4, 1, 2, 30.00, '2026-07-28'],
            [5, 5, 3, 4, 8.00, '2026-10-15'],
            [6, 6, 1, 1, 45.00, '2026-11-20'],
            [7, 7, 1, 1, 30.00, '2026-10-05'],
            [8, 8, 1, 1, 12.00, '2026-09-15'],
            [9, 9, 1, 1, 65.00, '2026-12-01'],
            [10, 10, 1, 1, 80.00, '2026-08-30'],
            [11, 11, 1, 1, 22.00, '2026-10-10'],
            [12, 12, 1, 1, 40.00, '2026-09-25'],
            [13, 13, 1, 1, 55.00, '2026-11-30'],
            [14, 14, 1, 1, 110.00, '2026-12-15'],
            [15, 15, 1, 1, 65.00, '2026-10-22'],
            [16, 16, 1, 1, 6.00, '2026-09-05'],
            [17, 17, 1, 1, 45.00, '2026-11-18'],
            [18, 18, 1, 1, 70.00, '2026-10-01'],
            [19, 19, 2, 3, 95.00, null],
            [20, 20, 2, 3, 180.00, null],
            [21, 21, 2, 3, 35.00, null],
            [22, 22, 2, 3, 60.00, null],
            [23, 23, 2, 3, 80.00, null],
            [24, 24, 2, 3, 25.00, null],
            [25, 25, 2, 3, 90.00, null],
            [26, 26, 2, 3, 40.00, null],
            [27, 27, 2, 3, 110.00, null],
            [28, 28, 2, 3, 65.00, null],
            [29, 29, 2, 3, 18.00, null],
            [30, 30, 2, 3, 75.00, null],
            [31, 31, 3, 4, 35.00, null],
            [32, 32, 3, 4, 50.00, null],
            [33, 33, 3, 4, 28.00, null],
            [34, 34, 3, 4, 22.00, null],
            [35, 35, 3, 4, 40.00, null],
            [36, 36, 3, 4, 15.00, null],
            [37, 37, 3, 4, 30.00, null],
            [38, 38, 3, 4, 65.00, null],
            [39, 39, 3, 4, 20.00, null],
            [40, 40, 3, 4, 12.00, null],
            [41, 41, 3, 4, 45.00, null],
            [42, 42, 3, 4, 80.00, null],
            [43, 43, 3, 4, 32.00, null],
            [44, 44, 1, 2, 40.00, '2026-11-10'],
            [45, 45, 1, 2, 60.00, '2026-10-15'],
            [46, 46, 1, 2, 45.00, '2027-01-20'],
            [47, 47, 1, 2, 50.00, '2026-09-30'],
            [48, 48, 1, 2, 30.00, '2026-12-15'],
            [49, 49, 1, 2, 35.00, '2026-08-25'],
            [50, 50, 1, 2, 90.00, '2026-09-10'],
            [51, 51, 1, 2, 28.00, '2026-07-30'],
            [52, 52, 1, 2, 15.00, '2027-03-01'],
            [53, 53, 1, 2, 55.00, '2027-02-15'],
            [54, 54, 1, 2, 90.00, '2027-04-10'],
            [55, 55, 1, 2, 48.00, '2026-08-15'],
            
            // New agricultural locations (56 to 80)
            [56, 56, 1, 1, 12.00, '2026-11-10'],
            [57, 57, 1, 1, 22.00, '2026-10-12'],
            [58, 58, 1, 1, 8.00, '2026-09-18'],
            [59, 59, 1, 1, 30.00, '2026-12-15'],
            [60, 60, 1, 1, 15.00, '2026-11-05'],
            [61, 61, 2, 3, 10.00, null],
            [62, 62, 2, 3, 18.00, null],
            [63, 63, 2, 3, 25.00, null],
            [64, 64, 2, 3, 14.00, null],
            [65, 65, 2, 3, 40.00, null],
            [66, 66, 3, 4, 18.00, null],
            [67, 67, 3, 4, 12.00, null],
            [68, 68, 3, 4, 6.00, null],
            [69, 69, 3, 4, 25.00, null],
            [70, 70, 3, 4, 4.00, null],
            [71, 71, 1, 2, 20.00, '2026-12-05'],
            [72, 72, 1, 2, 24.00, '2026-11-30'],
            [73, 73, 1, 2, 15.00, '2027-02-18'],
            [74, 74, 1, 2, 30.00, '2026-10-10'],
            [75, 75, 1, 2, 10.00, '2026-09-25'],
            [76, 76, 1, 2, 35.00, '2026-12-15'],
            [77, 77, 1, 2, 8.00, '2026-08-30'],
            [78, 78, 1, 2, 18.00, '2027-01-10'],
            [79, 79, 1, 2, 7.00, '2026-10-05'],
            [80, 80, 1, 2, 25.00, '2026-09-12']
        ];

        foreach ($locations as $l) {
            DB::table('inventory_locations')->insert([
                'inventory_id' => $l[0],
                'product_id' => $l[1],
                'warehouse_id' => $l[2],
                'zone_id' => $l[3],
                'quantity' => $l[4],
                'expiration_date' => $l[5],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        // 11. Stock Transactions (50 transactions representing a rich history)
        $transactions = [];
        
        // Seed 50 realistic transactions spanning past weeks
        for ($i = 1; $i <= 50; $i++) {
            $pId = ($i % 80) + 1; // Products 1 to 80
            $wId = ($pId % 3) + 1; // Warehouses 1 to 3
            
            // Types
            $type = 'Stock-in';
            if ($i % 3 == 0) $type = 'Stock-out';
            if ($i % 7 == 0) $type = 'Transfer';
            
            // Quantity
            $qty = ($i * 3.5) % 150 + 5;
            
            // Generate simulated date in the last 15 days
            $daysAgo = 15 - (($i * 7) % 15);
            $hoursAgo = ($i * 9) % 24;
            $minsAgo = ($i * 13) % 60;
            $date = date('Y-m-d H:i:s', strtotime("-$daysAgo days -$hoursAgo hours -$minsAgo minutes"));
            
            $transactions[] = [
                'transaction_id' => $i,
                'product_id' => $pId,
                'warehouse_id' => $wId,
                'transaction_type' => $type,
                'quantity' => round($qty, 1),
                'transaction_date' => $date,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }
        
        DB::table('stock_transactions')->insert($transactions);
    }
}
