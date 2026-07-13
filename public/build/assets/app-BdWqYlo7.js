document.addEventListener("DOMContentLoaded",()=>{const e=window.AppState?Object.assign({isAuthenticated:!1,currentUser:null,activeTab:"dashboard",isDark:!1,simActive:!1,simInterval:null,currency:"PHP"},window.AppState):{isAuthenticated:!1,currentUser:null,activeTab:"dashboard",isDark:!1,simActive:!1,simInterval:null,currency:"PHP",roles:[{role_id:1,role_name:"System Administrator",description:"Full access to all systems"},{role_id:2,role_name:"Inventory Officer",description:"Access to stock tracking and movements"}],users:[{user_id:1,username:"admin",password:"admin123",email:"admin@ambatugrow.com",role_id:1,name:"System Admin"},{user_id:2,username:"officer",password:"officer123",email:"officer@ambatugrow.com",role_id:2,name:"Inventory Officer"}],addresses:[{address_id:1,street:"CvSU Campus",city:"Indang",province:"Cavite",zipcode:"4122"},{address_id:2,street:"Dasma Highway",city:"Dasmariñas",province:"Cavite",zipcode:"4114"},{address_id:3,street:"Aguinaldo Highway",city:"Silang",province:"Cavite",zipcode:"4118"}],units_of_measure:[{uom_id:1,uom_code:"kg",uom_name:"Kilogram",description:"Mass metric unit"},{uom_id:2,uom_code:"L",uom_name:"Liter",description:"Volume metric unit"},{uom_id:3,uom_code:"bag",uom_name:"Bag",description:"Pre-packaged bag"},{uom_id:4,uom_code:"pcs",uom_name:"Pieces",description:"Individual units"}],currencies:[{currency_id:1,currency_code:"PHP",currency_name:"Philippine Peso",exchange_rate:1},{currency_id:2,currency_code:"USD",currency_name:"US Dollar",exchange_rate:56.4}],categories:[{category_id:1,category_name:"Grains & Seeds",parent_category_id:null},{category_id:2,category_name:"Organic Fertilizers",parent_category_id:null},{category_id:3,category_name:"Tools & Protective Equipment",parent_category_id:null},{category_id:4,category_name:"Liquid Nutrients",parent_category_id:null}],products:[{product_id:1,sku:"AGRI-SEED-042",name:"Hybrid Rice Seeds",description:"High-yield F1 hybrid seeds",category_id:1,uom_id:3,currency_id:1,base_price:1800,min_quantity_threshold:15,max_quantity_threshold:100,lead_time_days:7,status:"Active"},{product_id:2,sku:"AGRI-FERT-009",name:"Premium Vermicast",description:"100% organic worm castings",category_id:2,uom_id:3,currency_id:1,base_price:650,min_quantity_threshold:40,max_quantity_threshold:200,lead_time_days:5,status:"Active"},{product_id:3,sku:"AGRI-PROD-001",name:"Industrial Gloves",description:"Heavy duty nitrile gloves",category_id:3,uom_id:4,currency_id:1,base_price:150,min_quantity_threshold:100,max_quantity_threshold:300,lead_time_days:14,status:"Active"},{product_id:4,sku:"AGRI-NUTRI-501",name:"Growmax Liquid Foliar",description:"Concentrated nitrogen foliar feed",category_id:4,uom_id:2,currency_id:1,base_price:450,min_quantity_threshold:25,max_quantity_threshold:150,lead_time_days:10,status:"Active"},{product_id:5,sku:"AGRI-SEED-101",name:"Sweet Corn Seeds",description:"Yellow sweet corn hybrid seeds",category_id:1,uom_id:1,currency_id:1,base_price:980,min_quantity_threshold:10,max_quantity_threshold:80,lead_time_days:7,status:"Active"},{product_id:6,sku:"AGRI-SEED-102",name:"Organic Tomato Seeds",description:"Heirloom red tomato seeds",category_id:1,uom_id:4,currency_id:1,base_price:250,min_quantity_threshold:20,max_quantity_threshold:100,lead_time_days:5,status:"Active"},{product_id:7,sku:"AGRI-SEED-103",name:"Red Onion Seeds",description:"Short-day red onion seeds",category_id:1,uom_id:4,currency_id:1,base_price:320,min_quantity_threshold:15,max_quantity_threshold:80,lead_time_days:8,status:"Active"},{product_id:8,sku:"AGRI-SEED-104",name:"Green Bell Pepper Seeds",description:"California wonder green pepper",category_id:1,uom_id:4,currency_id:1,base_price:280,min_quantity_threshold:12,max_quantity_threshold:70,lead_time_days:6,status:"Active"},{product_id:9,sku:"AGRI-SEED-105",name:"Organic Cucumber Seeds",description:"Slicing cucumber organic seed pack",category_id:1,uom_id:4,currency_id:1,base_price:190,min_quantity_threshold:30,max_quantity_threshold:120,lead_time_days:4,status:"Active"},{product_id:10,sku:"AGRI-SEED-106",name:"Sweet Lettuce Seeds",description:"Looseleaf lettuce greens seeds",category_id:1,uom_id:4,currency_id:1,base_price:180,min_quantity_threshold:25,max_quantity_threshold:150,lead_time_days:3,status:"Active"},{product_id:11,sku:"AGRI-SEED-107",name:"Cauliflower Seeds F1",description:"Early white snowball cauliflower",category_id:1,uom_id:4,currency_id:1,base_price:450,min_quantity_threshold:10,max_quantity_threshold:60,lead_time_days:9,status:"Active"},{product_id:12,sku:"AGRI-SEED-108",name:"Eggplant Long Purple",description:"Traditional purple eggplant seeds",category_id:1,uom_id:4,currency_id:1,base_price:220,min_quantity_threshold:15,max_quantity_threshold:90,lead_time_days:6,status:"Active"},{product_id:13,sku:"AGRI-SEED-109",name:"Carrots Kuroda Seeds",description:"Sweet and tender carrot seeds",category_id:1,uom_id:1,currency_id:1,base_price:340,min_quantity_threshold:20,max_quantity_threshold:100,lead_time_days:7,status:"Active"},{product_id:14,sku:"AGRI-SEED-110",name:"Okra Clemson Spineless",description:"High productivity okra seeds",category_id:1,uom_id:4,currency_id:1,base_price:150,min_quantity_threshold:30,max_quantity_threshold:200,lead_time_days:5,status:"Active"},{product_id:15,sku:"AGRI-SEED-111",name:"Yardlong Bean Seeds",description:"Climbing string pole bean seeds",category_id:1,uom_id:4,currency_id:1,base_price:210,min_quantity_threshold:18,max_quantity_threshold:100,lead_time_days:6,status:"Active"},{product_id:16,sku:"AGRI-SEED-112",name:"Bitter Gourd Seeds",description:"Galaxy variety bitter melon",category_id:1,uom_id:4,currency_id:1,base_price:410,min_quantity_threshold:8,max_quantity_threshold:50,lead_time_days:10,status:"Active"},{product_id:17,sku:"AGRI-SEED-113",name:"Cayenne Chili Seeds",description:"Hot cayenne red chili pepper seeds",category_id:1,uom_id:4,currency_id:1,base_price:260,min_quantity_threshold:12,max_quantity_threshold:80,lead_time_days:7,status:"Active"},{product_id:18,sku:"AGRI-SEED-114",name:"Spinach Bloomsdale",description:"Savoy crinkled leaf spinach seeds",category_id:1,uom_id:4,currency_id:1,base_price:195,min_quantity_threshold:22,max_quantity_threshold:120,lead_time_days:4,status:"Active"},{product_id:19,sku:"AGRI-FERT-010",name:"Chicken Manure Pellets",description:"Dehydrated chicken manure fertilizer",category_id:2,uom_id:3,currency_id:1,base_price:480,min_quantity_threshold:30,max_quantity_threshold:150,lead_time_days:6,status:"Active"},{product_id:20,sku:"AGRI-FERT-011",name:"Organic Compost Mix",description:"All-purpose nutrient rich organic compost",category_id:2,uom_id:3,currency_id:1,base_price:350,min_quantity_threshold:50,max_quantity_threshold:250,lead_time_days:5,status:"Active"},{product_id:21,sku:"AGRI-FERT-012",name:"Premium Bat Guano",description:"High nitrogen bat guano manure",category_id:2,uom_id:1,currency_id:1,base_price:1150,min_quantity_threshold:15,max_quantity_threshold:70,lead_time_days:10,status:"Active"},{product_id:22,sku:"AGRI-FERT-013",name:"Steamed Bone Meal",description:"Phosphorus rich root developer",category_id:2,uom_id:1,currency_id:1,base_price:780,min_quantity_threshold:25,max_quantity_threshold:120,lead_time_days:8,status:"Active"},{product_id:23,sku:"AGRI-FERT-014",name:"Organic Blood Meal",description:"Fast-acting nitrogen blood meal powder",category_id:2,uom_id:1,currency_id:1,base_price:890,min_quantity_threshold:20,max_quantity_threshold:100,lead_time_days:9,status:"Active"},{product_id:24,sku:"AGRI-FERT-015",name:"Seaweed Extract Powder",description:"Soluble cold-water kelp extract",category_id:2,uom_id:1,currency_id:1,base_price:1450,min_quantity_threshold:10,max_quantity_threshold:50,lead_time_days:12,status:"Active"},{product_id:25,sku:"AGRI-FERT-016",name:"Fish Shavings Compost",description:"Processed fish by-product compost",category_id:2,uom_id:3,currency_id:1,base_price:520,min_quantity_threshold:30,max_quantity_threshold:130,lead_time_days:7,status:"Active"},{product_id:26,sku:"AGRI-FERT-017",name:"Neem Cake Powder",description:"Organic soil conditioner and pest control",category_id:2,uom_id:1,currency_id:1,base_price:680,min_quantity_threshold:15,max_quantity_threshold:90,lead_time_days:6,status:"Active"},{product_id:27,sku:"AGRI-FERT-018",name:"Agricultural Epsom Salt",description:"Magnesium sulfate fertilizer crystals",category_id:2,uom_id:1,currency_id:1,base_price:290,min_quantity_threshold:40,max_quantity_threshold:180,lead_time_days:5,status:"Active"},{product_id:28,sku:"AGRI-FERT-019",name:"Rock Phosphate Powder",description:"Slow release phosphorus fertilizer",category_id:2,uom_id:1,currency_id:1,base_price:490,min_quantity_threshold:35,max_quantity_threshold:150,lead_time_days:10,status:"Active"},{product_id:29,sku:"AGRI-FERT-020",name:"Humic Acid Powder",description:"90% soluble humic acid bio-stimulant",category_id:2,uom_id:1,currency_id:1,base_price:1250,min_quantity_threshold:8,max_quantity_threshold:40,lead_time_days:8,status:"Active"},{product_id:30,sku:"AGRI-FERT-021",name:"Biochar Soil Amendment",description:"Activated horticultural charcoal biochar",category_id:2,uom_id:3,currency_id:1,base_price:620,min_quantity_threshold:20,max_quantity_threshold:100,lead_time_days:7,status:"Active"},{product_id:31,sku:"AGRI-TOOL-201",name:"Classic Bypass Pruner",description:"Precision blades hand pruning shears",category_id:3,uom_id:4,currency_id:1,base_price:750,min_quantity_threshold:15,max_quantity_threshold:80,lead_time_days:10,status:"Active"},{product_id:32,sku:"AGRI-TOOL-202",name:"Heavy Duty Hand Trowel",description:"Ergonomic cast aluminum hand trowel",category_id:3,uom_id:4,currency_id:1,base_price:320,min_quantity_threshold:20,max_quantity_threshold:100,lead_time_days:9,status:"Active"},{product_id:33,sku:"AGRI-TOOL-203",name:"Hand Weeding Spade",description:"Serrated carbon steel weeding tool",category_id:3,uom_id:4,currency_id:1,base_price:280,min_quantity_threshold:12,max_quantity_threshold:60,lead_time_days:8,status:"Active"},{product_id:34,sku:"AGRI-TOOL-204",name:"Stainless Hand Rake",description:"5-tine cultivator hand fork rake",category_id:3,uom_id:4,currency_id:1,base_price:350,min_quantity_threshold:10,max_quantity_threshold:50,lead_time_days:11,status:"Active"},{product_id:35,sku:"AGRI-TOOL-205",name:"Premium Watering Can 5L",description:"Green plastic watering can with rose head",category_id:3,uom_id:4,currency_id:1,base_price:490,min_quantity_threshold:15,max_quantity_threshold:90,lead_time_days:7,status:"Active"},{product_id:36,sku:"AGRI-TOOL-206",name:"Knapsack Sprayer 16L",description:"Manual backpack pressure tank sprayer",category_id:3,uom_id:4,currency_id:1,base_price:1850,min_quantity_threshold:8,max_quantity_threshold:40,lead_time_days:14,status:"Active"},{product_id:37,sku:"AGRI-TOOL-207",name:"Fiberglass Handle Shovel",description:"Round point digging spade shovel",category_id:3,uom_id:4,currency_id:1,base_price:950,min_quantity_threshold:10,max_quantity_threshold:50,lead_time_days:10,status:"Active"},{product_id:38,sku:"AGRI-TOOL-208",name:"Soil pH Moisture Meter",description:"3-in-1 soil sensor probe tester",category_id:3,uom_id:4,currency_id:1,base_price:580,min_quantity_threshold:25,max_quantity_threshold:120,lead_time_days:7,status:"Active"},{product_id:39,sku:"AGRI-TOOL-209",name:"Digging Fork Heavy Duty",description:"4-tine carbon steel garden fork",category_id:3,uom_id:4,currency_id:1,base_price:1100,min_quantity_threshold:8,max_quantity_threshold:45,lead_time_days:12,status:"Active"},{product_id:40,sku:"AGRI-TOOL-210",name:"Grafting Tool Set",description:"Agricultural tree grafting cutter set",category_id:3,uom_id:4,currency_id:1,base_price:1450,min_quantity_threshold:5,max_quantity_threshold:30,lead_time_days:15,status:"Active"},{product_id:41,sku:"AGRI-TOOL-211",name:"Anti-Insect Netting 10m",description:"Fine mesh protective crop insect net",category_id:3,uom_id:4,currency_id:1,base_price:680,min_quantity_threshold:20,max_quantity_threshold:100,lead_time_days:6,status:"Active"},{product_id:42,sku:"AGRI-TOOL-212",name:"Seedling Starter Pots",description:"Biodegradable peat starter pots 100pcs",category_id:3,uom_id:4,currency_id:1,base_price:390,min_quantity_threshold:30,max_quantity_threshold:150,lead_time_days:5,status:"Active"},{product_id:43,sku:"AGRI-TOOL-213",name:"Heavy Duty Pruning Saw",description:"Curved blade wood cutting hand saw",category_id:3,uom_id:4,currency_id:1,base_price:820,min_quantity_threshold:12,max_quantity_threshold:70,lead_time_days:9,status:"Active"},{product_id:44,sku:"AGRI-NUTRI-502",name:"Cal-Mag Booster Liquid",description:"Calcium and magnesium plant supplement",category_id:4,uom_id:2,currency_id:1,base_price:690,min_quantity_threshold:15,max_quantity_threshold:80,lead_time_days:8,status:"Active"},{product_id:45,sku:"AGRI-NUTRI-503",name:"Fish Amino Acid FAA",description:"Liquid fish waste amino foliar feed",category_id:4,uom_id:2,currency_id:1,base_price:520,min_quantity_threshold:20,max_quantity_threshold:100,lead_time_days:6,status:"Active"},{product_id:46,sku:"AGRI-NUTRI-504",name:"Seaweed Liquid Concentrate",description:"Cold processed organic liquid seaweed",category_id:4,uom_id:2,currency_id:1,base_price:850,min_quantity_threshold:18,max_quantity_threshold:90,lead_time_days:7,status:"Active"},{product_id:47,sku:"AGRI-NUTRI-505",name:"Humic Acid Liquid",description:"Concentrated liquid humates soil wash",category_id:4,uom_id:2,currency_id:1,base_price:720,min_quantity_threshold:22,max_quantity_threshold:110,lead_time_days:9,status:"Active"},{product_id:48,sku:"AGRI-NUTRI-506",name:"Trace Elements Solution",description:"Liquid chelated micro plant nutrients",category_id:4,uom_id:2,currency_id:1,base_price:920,min_quantity_threshold:10,max_quantity_threshold:50,lead_time_days:11,status:"Active"},{product_id:49,sku:"AGRI-NUTRI-507",name:"Potassium Humate Liquid",description:"Highly active potassium root stimulant",category_id:4,uom_id:2,currency_id:1,base_price:780,min_quantity_threshold:15,max_quantity_threshold:80,lead_time_days:8,status:"Active"},{product_id:50,sku:"AGRI-NUTRI-508",name:"Organic Pest Repellent",description:"Chili and garlic insect repellent spray",category_id:4,uom_id:2,currency_id:1,base_price:420,min_quantity_threshold:30,max_quantity_threshold:150,lead_time_days:5,status:"Active"},{product_id:51,sku:"AGRI-NUTRI-509",name:"Rooting Hormone Solution",description:"Concentrated rooting hormone stimulant",category_id:4,uom_id:2,currency_id:1,base_price:680,min_quantity_threshold:12,max_quantity_threshold:60,lead_time_days:6,status:"Active"},{product_id:52,sku:"AGRI-NUTRI-510",name:"Hydroponics A&B Nutrient",description:"Two-part hydroponics fertilizer set",category_id:4,uom_id:2,currency_id:1,base_price:1250,min_quantity_threshold:10,max_quantity_threshold:60,lead_time_days:10,status:"Active"},{product_id:53,sku:"AGRI-NUTRI-511",name:"Cold Pressed Neem Oil 1L",description:"100% pure cold pressed neem foliar oil",category_id:4,uom_id:2,currency_id:1,base_price:890,min_quantity_threshold:15,max_quantity_threshold:90,lead_time_days:7,status:"Active"},{product_id:54,sku:"AGRI-NUTRI-512",name:"Wood Vinegar Solution",description:"Pyroligneous acid organic soil stimulant",category_id:4,uom_id:2,currency_id:1,base_price:360,min_quantity_threshold:40,max_quantity_threshold:200,lead_time_days:5,status:"Active"},{product_id:55,sku:"AGRI-NUTRI-513",name:"Compost Tea Brew Pack",description:"Aerated liquid compost tea concentrate",category_id:4,uom_id:2,currency_id:1,base_price:580,min_quantity_threshold:20,max_quantity_threshold:100,lead_time_days:6,status:"Active"}],warehouses:[{warehouse_id:1,name:"Indang Hub (CvSU)",address_id:1,capacity_sqm:5e3},{warehouse_id:2,name:"Dasma Warehouse",address_id:2,capacity_sqm:12e3},{warehouse_id:3,name:"Silang Node",address_id:3,capacity_sqm:8e3}],warehouse_zones:[{zone_id:1,warehouse_id:1,zone_name:"Zone A - Seeds Store",category:"Dry Storage"},{zone_id:2,warehouse_id:1,zone_name:"Zone B - Liquid Feed",category:"Chemical Safety"},{zone_id:3,warehouse_id:2,zone_name:"Main Hall - Pallet Area",category:"Bulk Storage"},{zone_id:4,warehouse_id:3,zone_name:"Rack Section - Cool Dry",category:"Temperature Control"}],inventory_locations:[{inventory_id:1,product_id:1,warehouse_id:1,zone_id:1,quantity:18,expiration_date:"2026-12-31"},{inventory_id:2,product_id:2,warehouse_id:2,zone_id:3,quantity:120,expiration_date:null},{inventory_id:3,product_id:3,warehouse_id:2,zone_id:3,quantity:85,expiration_date:null},{inventory_id:4,product_id:4,warehouse_id:1,zone_id:2,quantity:30,expiration_date:"2026-07-28"},{inventory_id:5,product_id:5,warehouse_id:3,zone_id:4,quantity:8,expiration_date:"2026-10-15"},{inventory_id:6,product_id:6,warehouse_id:1,zone_id:1,quantity:45,expiration_date:"2026-11-20"},{inventory_id:7,product_id:7,warehouse_id:1,zone_id:1,quantity:30,expiration_date:"2026-10-05"},{inventory_id:8,product_id:8,warehouse_id:1,zone_id:1,quantity:12,expiration_date:"2026-09-15"},{inventory_id:9,product_id:9,warehouse_id:1,zone_id:1,quantity:65,expiration_date:"2026-12-01"},{inventory_id:10,product_id:10,warehouse_id:1,zone_id:1,quantity:80,expiration_date:"2026-08-30"},{inventory_id:11,product_id:11,warehouse_id:1,zone_id:1,quantity:22,expiration_date:"2026-10-10"},{inventory_id:12,product_id:12,warehouse_id:1,zone_id:1,quantity:40,expiration_date:"2026-09-25"},{inventory_id:13,product_id:13,warehouse_id:1,zone_id:1,quantity:55,expiration_date:"2026-11-30"},{inventory_id:14,product_id:14,warehouse_id:1,zone_id:1,quantity:110,expiration_date:"2026-12-15"},{inventory_id:15,product_id:15,warehouse_id:1,zone_id:1,quantity:65,expiration_date:"2026-10-22"},{inventory_id:16,product_id:16,warehouse_id:1,zone_id:1,quantity:6,expiration_date:"2026-09-05"},{inventory_id:17,product_id:17,warehouse_id:1,zone_id:1,quantity:45,expiration_date:"2026-11-18"},{inventory_id:18,product_id:18,warehouse_id:1,zone_id:1,quantity:70,expiration_date:"2026-10-01"},{inventory_id:19,product_id:19,warehouse_id:2,zone_id:3,quantity:95,expiration_date:null},{inventory_id:20,product_id:20,warehouse_id:2,zone_id:3,quantity:180,expiration_date:null},{inventory_id:21,product_id:21,warehouse_id:2,zone_id:3,quantity:35,expiration_date:null},{inventory_id:22,product_id:22,warehouse_id:2,zone_id:3,quantity:60,expiration_date:null},{inventory_id:23,product_id:23,warehouse_id:2,zone_id:3,quantity:80,expiration_date:null},{inventory_id:24,product_id:24,warehouse_id:2,zone_id:3,quantity:25,expiration_date:null},{inventory_id:25,product_id:25,warehouse_id:2,zone_id:3,quantity:90,expiration_date:null},{inventory_id:26,product_id:26,warehouse_id:2,zone_id:3,quantity:40,expiration_date:null},{inventory_id:27,product_id:27,warehouse_id:2,zone_id:3,quantity:110,expiration_date:null},{inventory_id:28,product_id:28,warehouse_id:2,zone_id:3,quantity:65,expiration_date:null},{inventory_id:29,product_id:29,warehouse_id:2,zone_id:3,quantity:18,expiration_date:null},{inventory_id:30,product_id:30,warehouse_id:2,zone_id:3,quantity:75,expiration_date:null},{inventory_id:31,product_id:31,warehouse_id:3,zone_id:4,quantity:35,expiration_date:null},{inventory_id:32,product_id:32,warehouse_id:3,zone_id:4,quantity:50,expiration_date:null},{inventory_id:33,product_id:33,warehouse_id:3,zone_id:4,quantity:28,expiration_date:null},{inventory_id:34,product_id:34,warehouse_id:3,zone_id:4,quantity:22,expiration_date:null},{inventory_id:35,product_id:35,warehouse_id:3,zone_id:4,quantity:40,expiration_date:null},{inventory_id:36,product_id:36,warehouse_id:3,zone_id:4,quantity:15,expiration_date:null},{inventory_id:37,product_id:37,warehouse_id:3,zone_id:4,quantity:30,expiration_date:null},{inventory_id:38,product_id:38,warehouse_id:3,zone_id:4,quantity:65,expiration_date:null},{inventory_id:39,product_id:39,warehouse_id:3,zone_id:4,quantity:20,expiration_date:null},{inventory_id:40,product_id:40,warehouse_id:3,zone_id:4,quantity:12,expiration_date:null},{inventory_id:41,product_id:41,warehouse_id:3,zone_id:4,quantity:45,expiration_date:null},{inventory_id:42,product_id:42,warehouse_id:3,zone_id:4,quantity:80,expiration_date:null},{inventory_id:43,product_id:43,warehouse_id:3,zone_id:4,quantity:32,expiration_date:null},{inventory_id:44,product_id:44,warehouse_id:1,zone_id:2,quantity:40,expiration_date:"2026-11-10"},{inventory_id:45,product_id:45,warehouse_id:1,zone_id:2,quantity:60,expiration_date:"2026-10-15"},{inventory_id:46,product_id:46,warehouse_id:1,zone_id:2,quantity:45,expiration_date:"2027-01-20"},{inventory_id:47,product_id:47,warehouse_id:1,zone_id:2,quantity:50,expiration_date:"2026-09-30"},{inventory_id:48,product_id:48,warehouse_id:1,zone_id:2,quantity:30,expiration_date:"2026-12-15"},{inventory_id:49,product_id:49,warehouse_id:1,zone_id:2,quantity:35,expiration_date:"2026-08-25"},{inventory_id:50,product_id:50,warehouse_id:1,zone_id:2,quantity:90,expiration_date:"2026-09-10"},{inventory_id:51,product_id:51,warehouse_id:1,zone_id:2,quantity:28,expiration_date:"2026-07-30"},{inventory_id:52,product_id:52,warehouse_id:1,zone_id:2,quantity:15,expiration_date:"2027-03-01"},{inventory_id:53,product_id:53,warehouse_id:1,zone_id:2,quantity:55,expiration_date:"2027-02-15"},{inventory_id:54,product_id:54,warehouse_id:1,zone_id:2,quantity:90,expiration_date:"2027-04-10"},{inventory_id:55,product_id:55,warehouse_id:1,zone_id:2,quantity:48,expiration_date:"2026-08-15"}],stock_transactions:[{transaction_id:1,product_id:1,warehouse_id:1,transaction_type:"Stock-in",quantity:20,transaction_date:"2026-07-06T10:00:00Z",notes:"Initial setup seeds"},{transaction_id:2,product_id:2,warehouse_id:2,transaction_type:"Stock-in",quantity:150,transaction_date:"2026-07-06T11:15:00Z",notes:"Bulk vermicast receipt"},{transaction_id:3,product_id:4,warehouse_id:1,transaction_type:"Stock-in",quantity:30,transaction_date:"2026-07-06T12:30:00Z",notes:"Liquid nutrients restock"}]},_={appContainer:document.getElementById("app-container"),loginGateway:document.getElementById("login-gateway"),loginForm:document.getElementById("login-form"),loginLoader:document.getElementById("login-loader"),erpShell:document.getElementById("erp-shell"),sidebarNav:document.getElementById("sidebar-nav"),headerViewTitle:document.getElementById("header-view-title"),mainWorkspace:document.getElementById("main-workspace"),consoleLogs:document.getElementById("console-logs"),themeToggle:document.getElementById("theme-toggle"),themeIcon:document.getElementById("theme-icon"),themeText:document.getElementById("theme-text"),globalSearch:document.getElementById("global-search"),toastContainer:document.getElementById("toast-container"),btnTransferWizard:document.getElementById("btn-transfer-wizard"),modalTransferWizard:document.getElementById("modal-transfer-wizard"),transferForm:document.getElementById("transfer-form"),modalNewProduct:document.getElementById("modal-new-product"),productForm:document.getElementById("product-form"),drawerAdjustStock:document.getElementById("drawer-adjust-stock"),adjustForm:document.getElementById("adjust-form"),btnSubmitAdjust:document.getElementById("btn-submit-adjust"),btnSettings:document.getElementById("btn-settings"),modalCmdPalette:document.getElementById("modal-cmd-palette"),cmdInput:document.getElementById("cmd-input"),cmdResults:document.getElementById("cmd-results")};async function R(){try{const a=await(await fetch("/api/state")).json();e.roles=a.roles,e.users=a.users,e.addresses=a.addresses,e.units_of_measure=a.units_of_measure,e.currencies=a.currencies,e.categories=a.categories,e.products=a.products,e.warehouses=a.warehouses,e.warehouse_zones=a.warehouse_zones,e.inventory_locations=a.inventory_locations,e.stock_transactions=a.stock_transactions,renderActiveTab()}catch(i){console.error("Failed to sync with WMS database:",i)}}let v=[],B="All",C="All",L=null;const U=i=>{const a=parseFloat(i);return e.currency==="USD"?"$"+(a/58).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"₱"+a.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})},M=i=>i?new Date(i).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"N/A",N=()=>{const i=[];e.inventory_locations.forEach(p=>{const n=e.products.find(d=>d.product_id===p.product_id);n&&i.push({sku:n.sku,stockQty:p.quantity,minQty:n.min_quantity_threshold,maxQty:n.max_quantity_threshold,status:n.status||"Active"})});const a=i.filter(p=>p.status==="Active"&&p.stockQty<=p.minQty),r=document.getElementById("sidebar-widget-low-stock");r&&(a.length>0?(r.innerHTML=`
                    <section class="bg-[#FEF7D0] border border-yellow-300 rounded-3xl p-5 shadow-2xs">
                        <div class="flex items-start gap-3">
                            <div class="p-1 text-[#b45309]">
                                <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600 shrink-0"></i>
                            </div>
                            <div class="flex-1 min-w-0 text-slate-800">
                                <h4 class="font-extrabold text-sm text-amber-900 leading-tight">Low Stock Warning</h4>
                                <p class="text-[11px] font-bold text-amber-800 mt-1.5 leading-relaxed">
                                    <strong>${a.length} items</strong> below minimum threshold. Action required for replenishment.
                                </p>
                                <button id="sidebar-btn-generate-requisition" class="mt-3 px-3 py-2 bg-amber-700/10 hover:bg-amber-700/20 text-amber-955 rounded-xl text-[9px] font-black uppercase tracking-wider transition-colors border border-amber-600/20 cursor-pointer w-full text-center">
                                    Generate Requisition Order
                                </button>
                            </div>
                        </div>
                    </section>
                `,document.getElementById("sidebar-btn-generate-requisition").addEventListener("click",()=>{let p=0;e.inventory_locations.forEach(n=>{const d=e.products.find(l=>l.product_id===n.product_id);if(d&&n.quantity<=d.min_quantity_threshold&&d.status==="Active"){const l=d.max_quantity_threshold-n.quantity;if(l>0){n.quantity=d.max_quantity_threshold;const t=e.stock_transactions.length+1;e.stock_transactions.push({transaction_id:t,product_id:d.product_id,warehouse_id:n.warehouse_id,zone_id:n.zone_id,type:"IN",quantity:l,timestamp:new Date().toISOString(),operator:"System Scheduler",notes:"Automatic reorder requisition safety threshold replenishment."}),w(`[Reorder SUCCESS] Replenished SKU ${d.sku} with +${l.toFixed(0)} units to max threshold.`,"success"),p++}}}),p>0&&(b(`Generated requisition. Replenished ${p} low stock items.`,"success"),playAlertSound("success"),N(),e.activeTab==="tracking"&&q())})):r.innerHTML=`
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
                `);const s=document.getElementById("sidebar-zones-list");s&&(s.innerHTML="",e.warehouse_zones.forEach(p=>{let n=0;e.inventory_locations.forEach(x=>{x.zone_id===p.zone_id&&(n+=parseFloat(x.quantity))});const d=p.zone_id===3?5e3:1500,l=Math.min(100,Math.round(n/d*100));let t="bg-[#2D6A24]";p.zone_id===2?t="bg-[#34a853]":p.zone_id===3&&(t="bg-[#fbbc05]");const o=e.warehouses.find(x=>x.warehouse_id===p.warehouse_id),g=`Warehouse ${o?o.warehouse_id===1?"A":o.warehouse_id===2?"B":"C":"A"} - Zone ${p.zone_id}`,y=document.createElement("div");y.className=`p-2.5 rounded-2xl border border-transparent cursor-pointer transition-all hover:bg-slate-50 ${L===p.zone_name?"bg-emerald-50/50 border-emerald-200":""}`,y.innerHTML=`
                    <div class="flex justify-between items-baseline mb-1">
                        <span class="text-xs font-bold text-slate-700">${g}</span>
                        <span class="text-[11px] font-extrabold text-slate-900 tabular-nums">${n.toFixed(0)} items</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/10">
                        <div class="h-full rounded-full transition-all duration-300 ${t}" style="width: ${l}%"></div>
                    </div>
                `,y.addEventListener("click",()=>{L=L===p.zone_name?null:p.zone_name,N(),e.activeTab==="tracking"&&q()}),s.appendChild(y)}));const u=document.getElementById("sidebar-logs-list");if(u){u.innerHTML="";const p=[...e.stock_transactions].sort((d,l)=>new Date(l.timestamp)-new Date(d.timestamp)).slice(0,3),n=d=>{if(!d)return"Just now";const l=Date.now()-new Date(d).getTime(),t=Math.floor(l/6e4);if(t<1)return"Just now";if(t<60)return`${t} min${t>1?"s":""} ago`;const o=Math.floor(t/60);if(o<24)return`${o} hour${o>1?"s":""} ago`;const m=Math.floor(o/24);return`${m} day${m>1?"s":""} ago`};p.forEach(d=>{const l=e.products.find(x=>x.product_id===d.product_id);let t='<i data-lucide="arrow-down" class="w-3.5 h-3.5"></i>',o="bg-[#e6f4ea] text-[#137333]",m=`Stock-In +${d.quantity.toFixed(0)}`;d.type==="OUT"?(t='<i data-lucide="arrow-up" class="w-3.5 h-3.5"></i>',o="bg-[#fef7e0] text-[#b06000]",m=`Stock-Out -${d.quantity.toFixed(0)}`):d.notes&&d.notes.includes("relocation")?(t='<i data-lucide="arrow-right-left" class="w-3.5 h-3.5"></i>',o="bg-[#e8f0fe] text-[#1a73e8]",m="Relocated Batch"):d.notes&&d.notes.includes("Update")&&(t='<i data-lucide="edit-3" class="w-3.5 h-3.5"></i>',o="bg-[#e8f0fe] text-[#1a73e8]",m="Updated Details");const g=document.createElement("div");g.className="flex gap-3 text-xs leading-relaxed",g.innerHTML=`
                    <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${o}">
                        ${t}
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="flex flex-col">
                            <span class="font-bold text-slate-800">${m}</span>
                            <span class="text-[10px] text-slate-400 font-semibold mt-0.5">
                                SKU: <button data-sku="${l?l.sku:""}" class="sidebar-btn-log-sku text-[#2d6a24] hover:underline font-bold bg-transparent border-none cursor-pointer p-0 font-mono">${l?l.sku:"N/A"}</button>
                            </span>
                            <span class="text-[9px] text-slate-400 font-semibold mt-0.5 font-sans">
                                ${n(d.timestamp)} by ${d.operator||"Admin"}
                            </span>
                        </div>
                    </div>
                `;const y=g.querySelector(".sidebar-btn-log-sku");y&&y.addEventListener("click",()=>{const x=y.getAttribute("data-sku");x&&(e.activeTab!=="tracking"&&_.sidebarNav.querySelector('[data-tab="tracking"]').click(),B="All",C="All",L=null,_.globalSearch.value=x,_.globalSearch.dispatchEvent(new Event("input")))}),u.appendChild(g)})}lucide.createIcons()},w=(i,a="info")=>{N()},b=(i,a="success")=>{const r=document.createElement("div");r.className="bg-slate-950/95 backdrop-blur-md text-white rounded-2xl shadow-2xl p-4 flex items-center gap-3.5 border border-slate-800/80 animate-slide-in-right pointer-events-auto max-w-sm";let s="info",u="text-slate-400 bg-slate-500/10 border-slate-500/20",p="System Notification";a==="success"?(s="check-circle",u="text-emerald-400 bg-emerald-500/10 border-emerald-500/20",p="Task Succeeded"):a==="error"?(s="x-circle",u="text-rose-400 bg-rose-500/10 border-rose-500/20",p="Execution Error"):a==="warning"&&(s="alert-triangle",u="text-amber-400 bg-amber-500/10 border-amber-500/20",p="System Warning"),r.innerHTML=`
            <div class="p-2 rounded-xl shrink-0 border ${u}">
                <i data-lucide="${s}" class="w-5 h-5"></i>
            </div>
            <div class="flex-grow min-w-0 pr-4">
                <span class="block text-[10px] font-black uppercase tracking-wider text-white">${p}</span>
                <span class="block text-[10px] font-bold text-slate-300 mt-0.5 leading-normal">${i}</span>
            </div>
        `,_.toastContainer.appendChild(r),lucide.createIcons(),setTimeout(()=>{r.classList.add("animate-scale-out"),setTimeout(()=>r.remove(),500)},4e3)},j=()=>{const i=new Date,a=i.toLocaleTimeString("en-US",{hour12:!1}),r=i.toLocaleDateString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"}),s=document.getElementById("gateway-time"),u=document.getElementById("gateway-date");s&&(s.textContent=a),u&&(u.textContent=r)};j(),setInterval(j,1e3),_.loginForm.addEventListener("submit",i=>{i.preventDefault();const a=document.getElementById("username").value.trim(),r=document.getElementById("password").value.trim(),s=e.users.find(o=>(o.email===a||o.username===a)&&o.password===r);if(!s){b("Access Denied: Invalid credentials.","error");return}e.currentUser=s,_.loginLoader.classList.remove("hidden");const u=document.getElementById("loader-console-logs"),p=document.getElementById("load-progress-bar"),n=document.getElementById("load-status-title"),d=document.getElementById("load-status-percent");u.innerHTML="",p.style.width="0%",d.textContent="0%";const l=(o,m="info")=>{const g=new Date().toLocaleTimeString("en-US",{hour12:!1}),y=document.createElement("div");y.className=m==="success"?"text-emerald-400 font-bold animate-pulse":"text-slate-400",y.textContent=`[${g}] ${o}`,u.appendChild(y),u.scrollTop=u.scrollHeight},t=[{delay:400,pct:25,title:"ACCESS_REQUEST_INITIALIZED",msg:`ACCESS_GATEWAY_REQUEST: Initiating handshake for ${s.username}...`,node:1,line:1},{delay:900,pct:50,title:"TUNNEL_CONNECTION_SECURE",msg:"SECURE_TUNNEL: Routing connection via Indang-Hub... Connected.",node:3,line:3},{delay:1400,pct:75,title:"DATABASE_NODE_MOUNTED",msg:"SQLITE_MOUNT: Syncing categories and products master directories...",node:4,line:4},{delay:1900,pct:95,title:"VAULT_AUTHORIZATION_VERIFIED",msg:`CREDENTIALS_AUDIT: Key token for employee ${s.username.toUpperCase()} verified.`,node:2,line:2},{delay:2400,pct:100,title:"ESTABLISHING_SESSION",msg:"VAULT_LOADER: Handshake complete. Mounting dashboard workspace.",node:null,line:null}];l("ACCESS_GATEWAY_REQUEST: Connecting to Secure Terminal Node IP: 192.168.1.42...","info"),t.forEach(o=>{setTimeout(()=>{if(p.style.width=`${o.pct}%`,d.textContent=`${o.pct}%`,n.textContent=o.title,l(o.msg,o.pct===100?"success":"info"),o.node){const m=document.getElementById(`node-sat-${o.node}`);if(m){m.classList.remove("bg-slate-900","border-slate-700"),m.classList.add("bg-emerald-500/20","border-emerald-400","text-emerald-400","shadow-[0_0_15px_rgba(16,185,129,0.4)]");const g=m.querySelector("i");g&&(g.className="w-4 h-4 text-emerald-400");const y=document.getElementById(`line-sat-${o.line}`);y&&y.setAttribute("stroke","#10b981")}}o.pct===100&&setTimeout(()=>{_.loginLoader.classList.add("hidden"),_.loginGateway.classList.add("animate-scale-out"),w("Connecting to Secure Terminal Node IP: 192.168.1.42...","info"),setTimeout(()=>{_.loginGateway.classList.add("hidden"),_.erpShell.classList.remove("hidden"),e.isAuthenticated=!0;const m=document.getElementById("sidebar-username"),g=document.getElementById("sidebar-role");m&&(m.textContent=e.currentUser.name),g&&(g.textContent=e.currentUser.role_id===1?"Administrator":"Inventory Officer"),T(),b(`Welcome back, ${e.currentUser.name}.`,"success")},500)},500)},o.delay)})});const H=document.getElementById("sidebar-btn-view-all-logs");H&&H.addEventListener("click",()=>{const i=_.sidebarNav.querySelector('button[data-tab="ledger"]');i&&i.click()}),_.sidebarNav.addEventListener("click",i=>{const a=i.target.closest("button");if(!a)return;const r=a.getAttribute("data-tab");_.sidebarNav.querySelectorAll("button").forEach(s=>{s.className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-full transition-all text-left text-slate-600 hover:bg-slate-200 hover:text-slate-800"}),a.className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-full transition-all text-left bg-[#2D6A24] text-white",e.activeTab=r,_.headerViewTitle.textContent=a.querySelector("span").textContent,T()});const T=()=>{e.isAuthenticated&&(N(),e.activeTab==="dashboard"?J():e.activeTab==="tracking"?q():e.activeTab==="ledger"?Y():e.activeTab==="zones"?ee():e.activeTab==="reports"&&te(),lucide.createIcons())},J=()=>{e.inventory_locations.length,e.products.length;let i=0;e.inventory_locations.forEach(t=>{const o=e.products.find(m=>m.product_id===t.product_id);o&&(i+=t.quantity*o.base_price)});let a=0;e.inventory_locations.forEach(t=>{const o=e.products.find(m=>m.product_id===t.product_id);o&&t.quantity<=o.min_quantity_threshold&&a++});let r=0;const s=new Date;s.setDate(s.getDate()+30),e.inventory_locations.forEach(t=>{t.expiration_date&&new Date(t.expiration_date)<=s&&r++}),_.mainWorkspace.innerHTML=`
            <div class="space-y-6 animate-slide-up-fade">
                <!-- Dashboard Welcome Banner -->
                <div class="bg-[#2D6A24] text-white p-6 rounded-3xl shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="space-y-1.5 z-10">
                        <h2 class="text-xl font-black font-outfit">Inventory Vault Node Active</h2>
                        <p class="text-xs text-emerald-100 font-semibold max-w-lg leading-relaxed">Coordination terminal for regional storage hubs. Review live stock levels, execute secure stock transfers, and audit the immutable ledger below.</p>
                    </div>
                    ${e.currentUser.role_id===1?`
                    <div class="z-10 shrink-0">
                        <button id="btn-quick-add" class="py-2 px-4 bg-white hover:bg-slate-50 text-[#2D6A24] rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all cursor-pointer">
                            <i data-lucide="plus-circle" class="w-4 h-4"></i>
                            <span>Register New Item</span>
                        </button>
                    </div>
                    `:""}
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
                            <span class="block text-2xl font-black text-slate-800 tracking-tight mt-1 font-outfit">${U(i)}</span>
                        </div>
                    </div>

                    <!-- Low Stock warnings -->
                    <div class="card-surface p-5 flex flex-col justify-between h-36">
                        <div class="flex justify-between items-start">
                            <div class="p-2.5 rounded-xl ${a>0?"bg-amber-500/10 text-amber-600 border-amber-500/10":"bg-emerald-500/10 text-emerald-600 border-emerald-500/10"} border">
                                <i data-lucide="alert-triangle" class="w-5 h-5"></i>
                            </div>
                            <span class="text-[9px] font-bold text-slate-400 uppercase">Alerts</span>
                        </div>
                        <div>
                            <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Low Stock Warnings</span>
                            <span class="block text-2xl font-black ${a>0?"text-amber-600":"text-slate-800"} tracking-tight mt-1 font-outfit">${a} items</span>
                        </div>
                    </div>

                    <!-- Expiring batches -->
                    <div class="card-surface p-5 flex flex-col justify-between h-36">
                        <div class="flex justify-between items-start">
                            <div class="p-2.5 rounded-xl ${r>0?"bg-rose-500/10 text-rose-600 border-rose-500/10":"bg-emerald-500/10 text-emerald-600 border-emerald-500/10"} border">
                                <i data-lucide="calendar" class="w-5 h-5"></i>
                            </div>
                            <span class="text-[9px] font-bold text-slate-400 uppercase">FEFO</span>
                        </div>
                        <div>
                            <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Expiring Batches</span>
                            <span class="block text-2xl font-black ${r>0?"text-rose-600":"text-slate-800"} tracking-tight mt-1 font-outfit">${r} batches</span>
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
                            <span class="block text-2xl font-black text-slate-800 tracking-tight mt-1 font-outfit">${e.warehouses.length} Nodes</span>
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
        `;const u=document.getElementById("dashboard-zone-meters");e.warehouse_zones.forEach(t=>{const o=e.warehouses.find($=>$.warehouse_id===t.warehouse_id);let m=0;e.inventory_locations.forEach($=>{$.zone_id===t.zone_id&&(m+=parseFloat($.quantity))});const g=t.zone_id===3?5e3:1500,y=Math.min(100,Math.round(m/g*100)),x=document.createElement("div");x.className="space-y-1",x.innerHTML=`
                <div class="flex justify-between items-center text-[10px] font-bold text-slate-700">
                    <span class="truncate max-w-[120px]">${o?o.name.split(" ")[0]:"Unknown"} - ${t.zone_name}</span>
                    <span class="font-mono text-slate-500">${y}%</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                    <div class="bg-[#2D6A24] h-full rounded-full transition-all duration-500" style="width: ${y}%"></div>
                </div>
            `,u.appendChild(x)});const p=document.getElementById("dashboard-recent-txs");[...e.stock_transactions].sort((t,o)=>new Date(o.transaction_date)-new Date(t.transaction_date)).slice(0,4).forEach(t=>{const o=e.products.find(x=>x.product_id===t.product_id),m=e.warehouses.find(x=>x.warehouse_id===t.warehouse_id),g=t.transaction_type==="Stock-in"?"bg-emerald-50 text-emerald-700 border border-emerald-200":t.transaction_type==="Stock-out"?"bg-rose-50 text-rose-700 border border-rose-200":"bg-amber-50 text-amber-700 border border-amber-200",y=document.createElement("tr");y.className="border-b border-slate-100/50 hover:bg-slate-50/50",y.innerHTML=`
                <td class="py-2.5 font-mono text-[10px] text-slate-400">${new Date(t.transaction_date).toLocaleTimeString("en-US",{hour12:!1})}</td>
                <td class="py-2.5 font-bold text-slate-700 truncate max-w-[120px]">${o?o.name:"Unknown"}</td>
                <td class="py-2.5 text-slate-500 truncate max-w-[100px]">${m?m.name:"Unknown"}</td>
                <td class="py-2.5">
                    <span class="px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider ${g}">${t.transaction_type}</span>
                </td>
                <td class="py-2.5 text-right font-bold text-slate-700 font-mono">${t.quantity.toFixed(1)}</td>
            `,p.appendChild(y)});const d=document.getElementById("dashboard-category-chart");if(d){const t={};e.categories.forEach(o=>{t[o.category_name]=0}),e.inventory_locations.forEach(o=>{const m=e.products.find(g=>g.product_id===o.product_id);if(m){const g=e.categories.find(y=>y.category_id===m.category_id);if(g){let y=o.quantity*m.base_price;e.currency==="USD"&&(y=y/58),t[g.category_name]+=y}}}),new Chart(d,{type:"doughnut",data:{labels:Object.keys(t),datasets:[{data:Object.values(t),backgroundColor:["#2d6a24","#85c87a","#1e3a1e","#059669"],borderWidth:1,borderColor:"#ffffff"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"bottom",labels:{boxWidth:6,font:{size:8,weight:"bold"}}}}}})}const l=document.getElementById("btn-quick-add");l&&l.addEventListener("click",()=>{P()}),document.getElementById("btn-dashboard-to-ledger").addEventListener("click",()=>{const t=_.sidebarNav.querySelector('button[data-tab="ledger"]');t&&t.click()})},q=()=>{let i='<option value="All">All Categories</option>';e.categories.forEach(c=>{const h=B===c.category_name?"selected":"";i+=`<option value="${c.category_name}" ${h}>${c.category_name}</option>`});const a=[];e.inventory_locations.forEach(c=>{const h=e.products.find(I=>I.product_id===c.product_id);if(!h)return;e.warehouses.find(I=>I.warehouse_id===c.warehouse_id);const f=e.warehouse_zones.find(I=>I.zone_id===c.zone_id),k=e.categories.find(I=>I.category_id===h.category_id),S=e.units_of_measure.find(I=>I.uom_id===h.uom_id);a.push({inventory_id:c.inventory_id,product_id:h.product_id,sku:h.sku,name:h.name,description:h.description||"No description provided.",category:k?k.category_name:"Uncategorized",stockQty:c.quantity,uom:S?S.uom_code:"units",status:h.status||"Active",zone_id:c.zone_id,zone:f?f.zone_name:"Unknown Zone",minQty:h.min_quantity_threshold,maxQty:h.max_quantity_threshold,basePrice:h.base_price})});const r=_.globalSearch.value.toLowerCase(),s=a.filter(c=>{const h=c.sku.toLowerCase().includes(r)||c.name.toLowerCase().includes(r)||c.description.toLowerCase().includes(r)||c.category.toLowerCase().includes(r)||c.zone.toLowerCase().includes(r),f=B==="All"||c.category===B,k=C==="All"||c.status===C,S=!L||c.zone===L;return h&&f&&k&&S}),u=s.length>0&&s.every(c=>v.includes(c.sku));a.filter(c=>c.status==="Active"&&c.stockQty<=c.minQty),[...e.stock_transactions].sort((c,h)=>new Date(h.timestamp)-new Date(c.timestamp)).slice(0,3);const p=c=>({1:"A-101",2:"B-205",3:"A-102",4:"C-301"})[c]||`S-${100+c}`,n=c=>{if(!c)return"Units";const h=c.toLowerCase();return h.includes("bag")?"Bags":h.includes("sack")?"Sacks":h.includes("unit")?"Units":h.includes("kg")?"kg":c.charAt(0).toUpperCase()+c.slice(1)};_.mainWorkspace.innerHTML=`
            <div class="flex flex-col min-h-0 space-y-6 animate-slide-up-fade h-full">
                
                <!-- Zone Filter Indicator Banner -->
                ${L?`
                <div class="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2 flex items-center justify-between text-xs text-emerald-800 font-bold shrink-0">
                    <span>Active Zone Filter: <strong>${L}</strong></span>
                    <button id="btn-clear-zone-filter" class="text-emerald-700 hover:text-red-700 font-extrabold cursor-pointer bg-transparent border-none">
                        Clear Filter &times;
                    </button>
                </div>
                `:""}

                <!-- Filter and Top Actions Header (Screenshot Match) -->
                <div class="bg-white border border-slate-200 p-5 rounded-3xl flex items-center justify-between gap-4 shrink-0 shadow-2xs">
                    <!-- Left Side: Add Button -->
                    ${e.currentUser.role_id===1?`
                    <button id="btn-add-product" class="flex items-center gap-1.5 px-4 py-2.5 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer border-none font-outfit">
                        <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                        <span>Add New Inventory Item</span>
                    </button>
                    `:"<div></div>"}

                    <!-- Right Side: Category and Status Dropdowns -->
                    <div class="flex items-center gap-4">
                        <div class="flex flex-col gap-1">
                            <span class="text-[9px] font-black text-slate-400 uppercase tracking-wider">Category</span>
                            <select id="filter-category" class="px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D6A24] cursor-pointer min-w-[140px]">
                                ${i}
                            </select>
                        </div>

                        <div class="flex flex-col gap-1">
                            <span class="text-[9px] font-black text-slate-400 uppercase tracking-wider">Status</span>
                            <select id="filter-status" class="px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D6A24] cursor-pointer min-w-[140px]">
                                <option value="All" ${C==="All"?"selected":""}>All Statuses</option>
                                <option value="Active" ${C==="Active"?"selected":""}>Active</option>
                                <option value="Obsolete" ${C==="Obsolete"?"selected":""}>Obsolete</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Bulk Action Panel -->
                ${v.length>0?`
                <div class="bg-emerald-950 text-white rounded-2xl px-5 py-3 flex items-center justify-between text-xs shadow-md border border-emerald-900 animate-slide-up-fade shrink-0">
                    <span class="font-bold font-outfit">${v.length} items selected</span>
                    <div class="flex items-center gap-3">
                        <button id="btn-bulk-active" class="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg text-[9px] uppercase tracking-wider cursor-pointer transition-all border-none">Set Active</button>
                        <button id="btn-bulk-obsolete" class="px-3 py-1.5 bg-amber-800 hover:bg-amber-700 text-white font-bold rounded-lg text-[9px] uppercase tracking-wider cursor-pointer transition-all border-none">Set Obsolete</button>
                        ${e.currentUser.role_id===1?`
                        <button id="btn-bulk-delete" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-[9px] uppercase tracking-wider cursor-pointer transition-all border-none">Delete</button>
                        `:""}
                        <button id="btn-bulk-cancel" class="text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer bg-transparent border-none">Cancel</button>
                    </div>
                </div>
                `:""}

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
                    <div class="overflow-auto flex-1 min-h-0 max-h-[calc(100vh-260px)]">
                        <table class="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest select-none">
                                    <th class="p-4 w-12 text-center">
                                        <input type="checkbox" id="check-all-skus" ${u?"checked":""} class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer w-4 h-4" />
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
                        <span>Showing ${s.length} of ${a.length} items</span>
                        <div class="flex gap-4">
                            <span>Active: ${a.filter(c=>c.status==="Active").length}</span>
                            <span>Obsolete: ${a.filter(c=>c.status==="Obsolete").length}</span>
                        </div>
                    </div>
                </div>

            </div>
        `;const d=document.getElementById("stock-tbody");s.length===0?d.innerHTML=`
                <tr>
                    <td colspan="10" class="p-8 text-center text-slate-400 font-bold text-xs">No inventory items found</td>
                </tr>
            `:s.forEach(c=>{const h=v.includes(c.sku),f=c.status==="Active"&&c.stockQty<=c.minQty,k=c.status==="Active"&&c.maxQty&&c.stockQty>c.maxQty;let S="";c.status==="Active"?S='<span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#e6f4ea] text-[#137333]">Active</span>':S='<span class="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#f1f3f4] text-[#3c4043]">Obsolete</span>';let I=h?"bg-emerald-50/20":"hover:bg-slate-50/50";r&&c.sku.toLowerCase()===r.trim()&&(I="bg-emerald-500/10 ring-2 ring-emerald-500/20");const A=document.createElement("tr");A.className=`transition-colors ${I}`,A.innerHTML=`
                    <td class="p-4 text-center">
                        <input type="checkbox" data-sku="${c.sku}" class="check-sku rounded border-slate-300 text-[#2D6A24] focus:ring-[#2D6A24] cursor-pointer w-4 h-4" ${h?"checked":""} />
                    </td>
                    <td class="p-4 font-mono font-bold text-slate-800">${c.sku}</td>
                    <td class="p-4 font-bold text-slate-700">${c.name}</td>
                    <td class="p-4 text-slate-400 font-normal max-w-xs truncate" title="${c.description}">${c.description}</td>
                    <td class="p-4 text-slate-500 font-semibold">${c.category}</td>
                    <td class="p-4 font-mono text-slate-600 font-bold">${p(c.zone_id)}</td>
                    <td class="p-4 text-right font-black tabular-nums">
                        <div class="flex items-center justify-end gap-1.5">
                            ${f?`
                            <span title="Below safety minimum threshold">
                                <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-red-500 fill-red-100"></i>
                            </span>
                            `:""}
                            ${k?`
                            <span title="Exceeds maximum threshold limit (Overstocked)">
                                <i data-lucide="alert-octagon" class="w-3.5 h-3.5 text-rose-500 fill-rose-100"></i>
                            </span>
                            `:""}
                            <span class="${c.stockQty===0?"text-red-500 font-black":"text-slate-800"}">${parseFloat(c.stockQty).toFixed(0)}</span>
                        </div>
                    </td>
                    <td class="p-4 text-slate-400 font-black text-[10px]">${n(c.uom)}</td>
                    <td class="p-4 text-center">${S}</td>
                    <td class="p-4 text-center font-bold text-[11px] select-none whitespace-nowrap">
                        <div class="flex items-center justify-center gap-3">
                            <button data-sku="${c.sku}" class="btn-action-edit text-slate-500 hover:text-slate-800 hover:underline cursor-pointer bg-transparent border-none">Edit</button>
                            ${c.status==="Active"?`
                            <button data-sku="${c.sku}" class="btn-action-archive text-amber-700 hover:text-amber-900 hover:underline cursor-pointer bg-transparent border-none">Archive</button>
                            `:`
                            ${e.currentUser.role_id===1?`
                            <button data-sku="${c.sku}" class="btn-action-delete text-red-600 hover:text-red-800 hover:underline cursor-pointer bg-transparent border-none">Delete</button>
                            `:'<span class="text-slate-300">Locked</span>'}
                            `}
                        </div>
                    </td>
                `,d.appendChild(A)}),lucide.createIcons();const l=document.getElementById("btn-clear-zone-filter");l&&l.addEventListener("click",()=>{L=null,q()}),document.getElementById("filter-category").addEventListener("change",c=>{B=c.target.value,q()}),document.getElementById("filter-status").addEventListener("change",c=>{C=c.target.value,q()});const m=document.getElementById("btn-add-product");m&&m.addEventListener("click",()=>P()),document.getElementById("btn-export-csv").addEventListener("click",()=>{const c=["SKU","Item Name","Description","Category","Stock Qty","UoM","Status","Zone"],h=s.map(A=>[A.sku,A.name,A.description,A.category,A.stockQty.toFixed(0),A.uom,A.status,A.zone]),f="\uFEFF"+[c.join(","),...h.map(A=>A.map(se=>`"${se}"`).join(","))].join(`
`),k=new Blob([f],{type:"text/csv;charset=utf-8;"}),S=document.createElement("a"),I=URL.createObjectURL(k);S.setAttribute("href",I),S.setAttribute("download",`master_inventory_${Date.now()}.csv`),document.body.appendChild(S),S.click(),document.body.removeChild(S),b("CSV ledger exported successfully.","success"),w("Cryptographic ledger signature generated. CSV manifest downloaded.","success")}),d.querySelectorAll(".check-sku").forEach(c=>{c.addEventListener("change",h=>{const f=c.getAttribute("data-sku");h.target.checked?v.includes(f)||v.push(f):v=v.filter(k=>k!==f),q()})});const g=document.getElementById("check-all-skus");g&&g.addEventListener("change",c=>{c.target.checked?v=s.map(h=>h.sku):v=[],q()}),d.querySelectorAll(".btn-action-edit").forEach(c=>{c.addEventListener("click",()=>{const h=c.getAttribute("data-sku"),f=e.products.find(k=>k.sku===h);f&&ae(f.product_id)})}),d.querySelectorAll(".btn-action-archive").forEach(c=>{c.addEventListener("click",()=>{const h=c.getAttribute("data-sku"),f=e.products.find(k=>k.sku===h);f&&(f.status="Obsolete",b(`SKU ${h} archived (Obsolete).`,"success"),w(`[Catalog ARCHIVE] SKU ${h} status set to OBSOLETE.`,"warning"),q())})}),d.querySelectorAll(".btn-action-delete").forEach(c=>{c.addEventListener("click",()=>{const h=c.getAttribute("data-sku"),f=e.products.find(k=>k.sku===h);f&&ne(f.product_id)})});const y=document.getElementById("btn-bulk-active");y&&y.addEventListener("click",()=>{v.forEach(c=>{const h=e.products.find(f=>f.sku===c);h&&(h.status="Active")}),b(`${v.length} items set to Active.`,"success"),w(`[Bulk Action] ${v.length} SKU status updated to ACTIVE.`,"success"),v=[],q()});const x=document.getElementById("btn-bulk-obsolete");x&&x.addEventListener("click",()=>{v.forEach(c=>{const h=e.products.find(f=>f.sku===c);h&&(h.status="Obsolete")}),b(`${v.length} items archived (Obsolete).`,"success"),w(`[Bulk Action] ${v.length} SKU status updated to OBSOLETE.`,"warning"),v=[],q()});const $=document.getElementById("btn-bulk-delete");$&&$.addEventListener("click",()=>{confirm(`Are you sure you want to permanently discontinue these ${v.length} products? This will purge all matching warehouse inventory.`)&&(v.forEach(c=>{const h=e.products.find(f=>f.sku===c);h&&(e.products=e.products.filter(f=>f.product_id!==h.product_id),e.inventory_locations=e.inventory_locations.filter(f=>f.product_id!==h.product_id),w(`[Catalog DELETE] SKU ${c} discontinued. Inventory purged.`,"warning"))}),b(`${v.length} products discontinued successfully.`,"success"),v=[],q())});const X=document.getElementById("btn-bulk-cancel");X&&X.addEventListener("click",()=>{v=[],q()})},Y=()=>{_.mainWorkspace.innerHTML=`
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
                    ${e.currentUser.role_id===1?`
                    <button id="btn-export-ledger" class="py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-600 rounded-xl border border-slate-200 text-[10px] font-bold shadow-2xs flex items-center gap-1 transition-all cursor-pointer">
                        <i data-lucide="download" class="w-3.5 h-3.5"></i>
                        <span>Export CSV</span>
                    </button>
                    `:""}
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
        `;const i=document.getElementById("ledger-tbody");i.innerHTML="",[...e.stock_transactions].sort((s,u)=>new Date(u.transaction_date)-new Date(s.transaction_date)).forEach(s=>{const u=e.products.find(t=>t.product_id===s.product_id),p=e.warehouses.find(t=>t.warehouse_id===s.warehouse_id),n=u?e.units_of_measure.find(t=>t.uom_id===u.uom_id):null,d=s.transaction_type==="Stock-in"?"bg-emerald-50 text-emerald-700 border-emerald-200":s.transaction_type==="Stock-out"?"bg-rose-50 text-rose-700 border-rose-200":"bg-amber-50 text-amber-700 border-amber-200",l=document.createElement("tr");l.className="border-b border-slate-100 hover:bg-slate-50/80",l.innerHTML=`
                <td class="py-3.5 font-mono font-bold text-slate-400">TX-#${String(s.transaction_id).padStart(4,"0")}</td>
                <td class="py-3.5 font-mono text-[10px] text-slate-500">${new Date(s.transaction_date).toLocaleString("en-US")}</td>
                <td class="py-3.5 font-bold text-slate-800">
                    <span class="block">${u?u.name:"Unknown Product"}</span>
                    <span class="block font-mono text-[9px] text-slate-400">${u?u.sku:""}</span>
                </td>
                <td class="py-3.5 text-slate-600 font-semibold">${p?p.name:"Unknown Hub"}</td>
                <td class="py-3.5">
                    <span class="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border ${d}">${s.transaction_type}</span>
                </td>
                <td class="py-3.5 text-right font-black font-mono text-slate-800">${parseFloat(s.quantity).toFixed(2)} ${n?n.uom_code:""}</td>
                <td class="py-3.5 text-slate-400 font-bold max-w-xs truncate">${s.notes||"Routine update."}</td>
            `,i.appendChild(l)});const r=document.getElementById("btn-export-ledger");r&&r.addEventListener("click",()=>{const s=["Log ID","Timestamp","Product SKU","Product Name","Warehouse","Type","Quantity","UOM","Notes"],u=e.stock_transactions.map(t=>{const o=e.products.find(y=>y.product_id===t.product_id),m=e.warehouses.find(y=>y.warehouse_id===t.warehouse_id),g=o?e.units_of_measure.find(y=>y.uom_id===o.uom_id):null;return[t.transaction_id,t.transaction_date,o?o.sku:"N/A",o?o.name:"Unknown",m?m.name:"Unknown",t.transaction_type,t.quantity,g?g.uom_code:"",t.notes||""]}),p=[s,...u].map(t=>t.map(o=>`"${String(o).replace(/"/g,'""')}"`).join(",")).join(`
`),n=new Blob([p],{type:"text/csv;charset=utf-8;"}),d=URL.createObjectURL(n),l=document.createElement("a");l.setAttribute("href",d),l.setAttribute("download",`ambatugrow_ledger_export_${new Date().toISOString().split("T")[0]}.csv`),l.style.visibility="hidden",document.body.appendChild(l),l.click(),document.body.removeChild(l),b("CSV export processing... File downloaded successfully.","success"),w("Cryptographic ledger signature generated. CSV manifest downloaded.","success")})},ee=()=>{_.mainWorkspace.innerHTML=`
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
        `;const i=document.getElementById("warehouses-grid");e.warehouses.forEach(a=>{const r=e.addresses.find(l=>l.address_id===a.address_id),s=e.warehouse_zones.filter(l=>l.warehouse_id===a.warehouse_id);let u=0;e.inventory_locations.forEach(l=>{l.warehouse_id===a.warehouse_id&&(u+=parseFloat(l.quantity))});const p=new Set(e.inventory_locations.filter(l=>l.warehouse_id===a.warehouse_id).map(l=>l.product_id)).size,n=document.createElement("div");n.className="card-surface p-6 flex flex-col justify-between space-y-4",n.innerHTML=`
                <div class="space-y-2">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-base font-black text-slate-800 font-outfit">${a.name}</h3>
                            <span class="block text-[9px] font-bold text-slate-400 uppercase mt-0.5">${r?`${r.street}, ${r.city}`:"No address record"}</span>
                        </div>
                        <span class="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-black uppercase tracking-wider border border-slate-200">${a.capacity_sqm.toFixed(0)} sqm</span>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                        <div>
                            <span class="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Total Stored Qty</span>
                            <span class="block text-base font-black text-slate-700 mt-0.5 font-mono">${u.toFixed(1)} units</span>
                        </div>
                        <div>
                            <span class="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Unique SKUs</span>
                            <span class="block text-base font-black text-slate-700 mt-0.5 font-mono">${p} Batches</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-3 pt-3">
                    <span class="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Allocated Zones</span>
                    <div class="space-y-2.5" id="zones-list-${a.warehouse_id}">
                        <!-- Zones injected dynamically -->
                    </div>
                </div>
            `,i.appendChild(n);const d=document.getElementById(`zones-list-${a.warehouse_id}`);s.forEach(l=>{let t=0;e.inventory_locations.forEach(y=>{y.zone_id===l.zone_id&&(t+=parseFloat(y.quantity))});const o=l.zone_id===3?5e3:1500,m=Math.min(100,Math.round(t/o*100)),g=document.createElement("div");g.className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-2xl space-y-1.5 cursor-pointer transition-all",g.innerHTML=`
                    <div class="flex justify-between items-center text-[10px] font-bold text-slate-700">
                        <span class="font-bold text-slate-800">${l.zone_name}</span>
                        <span class="font-mono">${t.toFixed(1)} / ${o} (${m}%)</span>
                    </div>
                    <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-[#2D6A24] h-full rounded-full transition-all duration-300" style="width: ${m}%"></div>
                    </div>
                    <span class="block text-[8px] font-bold text-slate-400 uppercase">Category: ${l.category}</span>
                `,g.addEventListener("click",()=>{L=l.zone_name,B="All",C="All",_.sidebarNav.querySelector('[data-tab="tracking"]').click()}),d.appendChild(g)})})},te=()=>{const i=[];e.inventory_locations.forEach(n=>{const d=e.products.find(l=>l.product_id===n.product_id);if(d&&n.quantity<=d.min_quantity_threshold){const l=e.warehouses.find(t=>t.warehouse_id===n.warehouse_id);i.push({inventory_id:n.inventory_id,product_id:d.product_id,sku:d.sku,name:d.name,qty:n.quantity,min:d.min_quantity_threshold,max:d.max_quantity_threshold||150,whName:l?l.name.split(" ")[0]:"Unknown"})}});const a=[],r=new Date;r.setDate(r.getDate()+45),e.inventory_locations.forEach(n=>{if(n.expiration_date&&new Date(n.expiration_date)<=r){const l=e.products.find(o=>o.product_id===n.product_id),t=e.warehouses.find(o=>o.warehouse_id===n.warehouse_id);a.push({sku:l?l.sku:"N/A",name:l?l.name:"Unknown",exp:n.expiration_date,whName:t?t.name.split(" ")[0]:"Unknown",qty:n.quantity})}}),_.mainWorkspace.innerHTML=`
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
        `;const s=document.getElementById("reports-low-stock-list");i.length===0?s.innerHTML='<div class="p-4 text-center text-xs text-slate-400 font-bold">All product quantities satisfy min limits.</div>':i.forEach(n=>{const d=document.createElement("div");d.className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex justify-between items-center",d.innerHTML=`
                    <div class="space-y-1">
                        <h4 class="text-xs font-black text-slate-800">${n.name}</h4>
                        <span class="block text-[8px] font-bold text-slate-400 uppercase">SKU: ${n.sku} | Location: ${n.whName}</span>
                        <!-- Reorder Button -->
                        <button data-inventory-id="${n.inventory_id}" class="btn-generate-po px-2.5 py-1 mt-1 bg-[#2D6A24] text-white hover:bg-[#23531B] rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                            <i data-lucide="file-plus" class="w-3 h-3"></i>
                            <span>Generate PO</span>
                        </button>
                    </div>
                    <div class="text-right">
                        <span class="block text-xs font-black text-rose-600 font-mono">${n.qty.toFixed(1)} left</span>
                        <span class="block text-[8px] font-bold text-slate-400 uppercase">Threshold: ${n.min.toFixed(0)}</span>
                    </div>
                `,s.appendChild(d)});const u=document.getElementById("reports-expiration-list");a.length===0?u.innerHTML='<div class="p-4 text-center text-xs text-slate-400 font-bold">No batches expire in the next 45 days.</div>':a.forEach(n=>{const d=new Date(n.exp)<new Date,l=d?"text-rose-600 font-black":"text-amber-600 font-black",t=d?"Expired":"Expires Soon",o=d?"bg-rose-500/5 border-rose-500/20":"bg-amber-500/5 border-amber-500/20",m=document.createElement("div");m.className=`p-3.5 border rounded-2xl flex justify-between items-center ${o}`,m.innerHTML=`
                    <div class="space-y-1">
                        <h4 class="text-xs font-black text-slate-800">${n.name} (${n.qty.toFixed(0)} bags)</h4>
                        <span class="block text-[8px] font-bold text-slate-400 uppercase">SKU: ${n.sku} | Location: ${n.whName}</span>
                    </div>
                    <div class="text-right">
                        <span class="block text-xs ${l} font-mono">${M(n.exp)}</span>
                        <span class="block text-[8px] font-black uppercase tracking-wider text-rose-600">${t}</span>
                    </div>
                `,u.appendChild(m)});const p=document.getElementById("reports-occupancy-chart");if(p){const n=[],d=[],l=[];e.warehouses.forEach(t=>{e.warehouse_zones.filter(m=>m.warehouse_id===t.warehouse_id).forEach(m=>{let g=0;e.inventory_locations.forEach(x=>{x.zone_id===m.zone_id&&(g+=parseFloat(x.quantity))});const y=m.zone_id===3?5e3:1500;n.push(`${t.name.split(" ")[0]} - ${m.zone_name}`),d.push(parseFloat(g.toFixed(1))),l.push(y)})}),new Chart(p,{type:"bar",data:{labels:n,datasets:[{label:"Current Quantity",data:d,backgroundColor:"rgba(45, 106, 36, 0.85)",borderColor:"#2d6a24",borderWidth:1,borderRadius:6},{label:"Max Capacity Limit",data:l,backgroundColor:"rgba(226, 232, 240, 0.5)",borderColor:"#cbd5e1",borderWidth:1,borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,grid:{color:"rgba(0, 0, 0, 0.05)"},ticks:{font:{size:9,weight:"bold"}}},x:{grid:{display:!1},ticks:{font:{size:9,weight:"bold"}}}},plugins:{legend:{position:"top",labels:{boxWidth:10,font:{size:9,weight:"bold"}}}}}}),s.querySelectorAll(".btn-generate-po").forEach(t=>{t.addEventListener("click",o=>{const m=parseInt(t.getAttribute("data-inventory-id"));oe(m)})}),lucide.createIcons()}};document.querySelectorAll(".close-modal").forEach(i=>{i.addEventListener("click",a=>{a.preventDefault(),i.closest(".fixed").classList.add("hidden")})}),document.querySelectorAll(".close-drawer").forEach(i=>{i.addEventListener("click",a=>{a.preventDefault();const r=i.closest(".fixed").querySelector(".animate-slide-in");r.className="bg-white h-full w-full max-w-sm border-l border-slate-200 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out",r.style.transform="translateX(100%)",setTimeout(()=>{i.closest(".fixed").classList.add("hidden")},300)})});const G=()=>{_.modalTransferWizard.classList.remove("hidden");const i=document.getElementById("transfer-product-id");i.innerHTML="",e.products.forEach(p=>{const n=document.createElement("option");n.value=p.product_id,n.textContent=`${p.name} (${p.sku})`,i.appendChild(n)});const a=document.getElementById("transfer-source-location"),r=document.getElementById("transfer-dest-location");a.innerHTML="",r.innerHTML="",e.warehouse_zones.forEach(p=>{const n=e.warehouses.find(o=>o.warehouse_id===p.warehouse_id),d=`${n?n.name.split(" ")[0]:"Node"} - ${p.zone_name}`,l=document.createElement("option");l.value=p.zone_id,l.textContent=d,a.appendChild(l);const t=document.createElement("option");t.value=p.zone_id,t.textContent=d,r.appendChild(t)});const s=()=>{const p=parseInt(i.value),n=parseInt(a.value),d=e.inventory_locations.find(o=>o.product_id===p&&o.zone_id===n),l=d?parseFloat(d.quantity):0,t=document.getElementById("transfer-qty");t.max=l,t.placeholder=`Max: ${l.toFixed(1)}`},u=()=>{const p=parseInt(i.value),n=e.inventory_locations.filter(t=>t.product_id===p&&parseFloat(t.quantity)>0&&t.expiration_date),d=document.getElementById("transfer-fefo-recommendation"),l=document.getElementById("transfer-fefo-text");if(n.length>0){n.sort((y,x)=>new Date(y.expiration_date)-new Date(x.expiration_date));const t=n[0],o=e.warehouses.find(y=>y.warehouse_id===t.warehouse_id),m=e.warehouse_zones.find(y=>y.zone_id===t.zone_id),g=`${o?o.name.split(" ")[0]:"Node"} - ${m?m.zone_name:"Zone"}`;l.textContent=`FEFO Auto-Suggest: Oldest batch expires on ${M(t.expiration_date)}. Relocate from: ${g} (Qty: ${parseFloat(t.quantity).toFixed(0)} units).`,d.classList.remove("hidden"),a.value=t.zone_id,s()}else d.classList.add("hidden")};i.addEventListener("change",()=>{u(),s()}),a.addEventListener("change",s),u(),s(),lucide.createIcons()};_.btnTransferWizard.addEventListener("click",G),_.transferForm.addEventListener("submit",async i=>{i.preventDefault();const a=parseInt(document.getElementById("transfer-product-id").value),r=parseInt(document.getElementById("transfer-source-location").value),s=parseInt(document.getElementById("transfer-dest-location").value),u=parseFloat(document.getElementById("transfer-qty").value),p=document.getElementById("transfer-operator").value,n=document.getElementById("transfer-notes").value;if(r===s){b("Source and Destination zones cannot be identical.","error");return}const d=e.inventory_locations.find(t=>t.product_id===a&&t.zone_id===r);if(!d||parseFloat(d.quantity)<u){b("Insufficient quantity at source zone location.","error");return}const l=e.products.find(t=>t.product_id===a);e.warehouse_zones.find(t=>t.zone_id===r),e.warehouse_zones.find(t=>t.zone_id===s);try{const t=document.querySelector('meta[name="csrf-token"]').getAttribute("content"),o=await fetch("/api/transfers",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":t},body:JSON.stringify({product_id:a,source_zone_id:r,dest_zone_id:s,quantity:u,operator:p,notes:n})});if(!o.ok){const m=await o.json();throw new Error(m.error||"Server error occurred.")}await R(),_.modalTransferWizard.classList.add("hidden"),T(),b(`Stock transfer of ${u.toFixed(1)} units executed successfully.`,"success"),w(`[Transfer SUCCESS] Relocated ${u} units of ${l.sku}. Transaction signed.`,"success")}catch(t){b(t.message,"error")}});const P=()=>{_.modalNewProduct.classList.remove("hidden");const i=document.getElementById("prod-category");i.innerHTML="",e.categories.forEach(u=>{const p=document.createElement("option");p.value=u.category_id,p.textContent=u.category_name,i.appendChild(p)});const a=document.getElementById("prod-uom");a.innerHTML="",e.units_of_measure.forEach(u=>{const p=document.createElement("option");p.value=u.uom_id,p.textContent=u.uom_code,a.appendChild(p)});const r=document.getElementById("prod-currency");r.innerHTML="",e.currencies.forEach(u=>{const p=document.createElement("option");p.value=u.currency_id,p.textContent=u.currency_code,r.appendChild(p)});const s=document.getElementById("prod-init-zone");s.innerHTML="",e.warehouse_zones.forEach(u=>{const p=e.warehouses.find(d=>d.warehouse_id===u.warehouse_id),n=document.createElement("option");n.value=u.zone_id,n.textContent=`${p?p.name.split(" ")[0]:"Node"} - ${u.zone_name}`,s.appendChild(n)})};_.productForm.addEventListener("submit",async i=>{i.preventDefault();const a=document.getElementById("prod-sku").value,r=document.getElementById("prod-name").value,s=document.getElementById("prod-desc").value,u=parseInt(document.getElementById("prod-category").value),p=parseInt(document.getElementById("prod-uom").value),n=parseInt(document.getElementById("prod-currency").value),d=parseFloat(document.getElementById("prod-price").value),l=parseFloat(document.getElementById("prod-threshold").value);parseFloat(document.getElementById("prod-max-threshold").value);const t=parseInt(document.getElementById("prod-lead-time").value),o=parseInt(document.getElementById("prod-init-zone").value),m=parseFloat(document.getElementById("prod-init-qty").value),g=document.getElementById("prod-init-expiration").value||null;if(e.products.some(y=>y.sku===a)){b("SKU identifier already exists in system directories.","error");return}try{const y=document.querySelector('meta[name="csrf-token"]').getAttribute("content"),x=await fetch("/api/products",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":y},body:JSON.stringify({sku:a,name:r,description:s,category_id:u,uom_id:p,currency_id:n,base_price:d,min_quantity_threshold:l,lead_time_days:t,init_zone_id:o,init_qty:m,init_expiration:g})});if(!x.ok){const $=await x.json();throw new Error($.error||"Server error occurred.")}await R(),_.modalNewProduct.classList.add("hidden"),T(),b(`Product ${r} successfully registered.`,"success"),w(`[Product REGISTERED] ${a} - ${r} added to database.`,"success")}catch(y){b(y.message,"error")}});const ae=i=>{const a=e.products.find(s=>s.product_id===i);if(!a)return;document.getElementById("edit-prod-id").value=a.product_id,document.getElementById("edit-prod-name").value=a.name,document.getElementById("edit-prod-sku").value=a.sku,document.getElementById("edit-prod-price").value=a.base_price,document.getElementById("edit-prod-leadtime").value=a.lead_time_days||7,document.getElementById("edit-prod-min").value=a.min_quantity_threshold,document.getElementById("edit-prod-max").value=a.max_quantity_threshold||150;const r=document.getElementById("edit-prod-category");r.innerHTML="",e.categories.forEach(s=>{const u=document.createElement("option");u.value=s.category_id,u.textContent=s.category_name,s.category_id===a.category_id&&(u.selected=!0),r.appendChild(u)}),document.getElementById("modal-edit-product").classList.remove("hidden")},W=document.getElementById("edit-product-form");W&&W.addEventListener("submit",async i=>{i.preventDefault();const a=parseInt(document.getElementById("edit-prod-id").value),r=document.getElementById("edit-prod-name").value,s=document.getElementById("edit-prod-sku").value,u=parseFloat(document.getElementById("edit-prod-price").value),p=parseInt(document.getElementById("edit-prod-leadtime").value),n=parseFloat(document.getElementById("edit-prod-min").value),d=parseFloat(document.getElementById("edit-prod-max").value),l=parseInt(document.getElementById("edit-prod-category").value);if(e.products.find(o=>o.product_id===a)){if(e.products.some(o=>o.sku===s&&o.product_id!==a)){b("SKU identifier is already assigned to another catalog item.","error");return}try{const o=document.querySelector('meta[name="csrf-token"]').getAttribute("content"),m=await fetch(`/api/products/${a}`,{method:"PUT",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":o},body:JSON.stringify({name:r,sku:s,base_price:u,lead_time_days:p,min_quantity_threshold:n,max_quantity_threshold:d,category_id:l})});if(!m.ok){const g=await m.json();throw new Error(g.error||"Server error occurred.")}await R(),document.getElementById("modal-edit-product").classList.add("hidden"),T(),b(`Product ${r} updated successfully.`,"success"),w(`[Catalog UPDATE] SKU ${s} properties modified in database.`,"info")}catch(o){b(o.message,"error")}}});const ne=i=>{const a=e.products.find(r=>r.product_id===i);a&&(document.getElementById("delete-prod-id").value=a.product_id,document.getElementById("delete-prod-display-name").textContent=a.name,document.getElementById("delete-prod-display-sku").textContent=a.sku,document.getElementById("modal-delete-product").classList.remove("hidden"))},Q=document.getElementById("btn-confirm-delete");Q&&Q.addEventListener("click",async()=>{const i=parseInt(document.getElementById("delete-prod-id").value),a=e.products.find(r=>r.product_id===i);if(a)try{const r=document.querySelector('meta[name="csrf-token"]').getAttribute("content"),s=await fetch(`/api/products/${i}`,{method:"DELETE",headers:{"X-CSRF-TOKEN":r}});if(!s.ok){const u=await s.json();throw new Error(u.error||"Server error occurred.")}await R(),document.getElementById("modal-delete-product").classList.add("hidden"),T(),b(`Product ${a.name} discontinued and removed.`,"success"),w(`[Catalog DELETE] SKU ${a.sku} discontinued from database.`,"warning")}catch(r){b(r.message,"error")}});let E=null;const oe=i=>{const a=e.inventory_locations.find(t=>t.inventory_id===i);if(!a)return;const r=e.products.find(t=>t.product_id===a.product_id);if(!r)return;const s=r.max_quantity_threshold||150,u=Math.max(0,s-parseFloat(a.quantity)),p=u*r.base_price,n=`PO-2026-${Math.floor(1e3+Math.random()*9e3)}`;document.getElementById("po-invoice-no").textContent=n,document.getElementById("po-date").textContent=`Date: ${new Date().toISOString().split("T")[0]}`,document.getElementById("po-item-name").textContent=r.name,document.getElementById("po-item-sku").textContent=`SKU: ${r.sku}`;const d=e.units_of_measure.find(t=>t.uom_id===r.uom_id),l=d?d.uom_code:"units";document.getElementById("po-item-qty").textContent=`${u.toFixed(1)} ${l}`,document.getElementById("po-unit-price").textContent=U(r.base_price),document.getElementById("po-total-price").textContent=U(p),E={inventory_id:i,product_id:r.product_id,warehouse_id:a.warehouse_id,qty:u,sku:r.sku,name:r.name,poNo:n},document.getElementById("modal-purchase-order").classList.remove("hidden"),lucide.createIcons()},z=document.getElementById("btn-dispatch-po");z&&z.addEventListener("click",()=>{E&&(z.disabled=!0,z.innerHTML='<i data-lucide="loader" class="w-3.5 h-3.5 animate-spin inline-block"></i> <span>Transmitting PO...</span>',lucide.createIcons(),b(`Purchase Order ${E.poNo} approved. Transmitting to supplier...`,"success"),w(`[PO DISPATCHED] Order ${E.poNo} sent. Delivery transit initiated.`,"info"),setTimeout(()=>{const i=e.inventory_locations.find(a=>a.inventory_id===E.inventory_id);if(i){i.quantity+=E.qty;const a=e.stock_transactions.length+1;e.stock_transactions.push({transaction_id:a,product_id:E.product_id,warehouse_id:E.warehouse_id,transaction_type:"Stock-in",quantity:E.qty,transaction_date:new Date().toISOString(),notes:`Procurement fulfillment delivery receipt via PO ${E.poNo}.`})}z.disabled=!1,z.innerHTML='<i data-lucide="send" class="w-3.5 h-3.5"></i> <span>Approve & Dispatch PO</span>',lucide.createIcons(),document.getElementById("modal-purchase-order").classList.add("hidden"),T(),b(`PO ${E.poNo} fulfilled! ${E.qty.toFixed(1)} units delivered to warehouse.`,"success"),w(`[Fulfillment SUCCESS] Received ${E.qty.toFixed(1)} units of ${E.sku}. Stock levels optimized.`,"success"),E=null},3e3))}),_.btnSubmitAdjust.addEventListener("click",async i=>{i.preventDefault();const a=parseInt(document.getElementById("adjust-inventory-id").value),r=parseFloat(document.getElementById("adjust-qty").value),s=document.querySelector('input[name="adjust-action"]:checked').value,u=document.getElementById("adjust-operator").value,p=document.getElementById("adjust-notes").value;if(!r||r<=0){b("Enter a valid quantity amount.","error");return}const n=e.inventory_locations.find(t=>t.inventory_id===a);if(!n)return;const d=e.products.find(t=>t.product_id===n.product_id),l=s==="in"?"Stock-in":"Stock-out";if(s==="out"&&parseFloat(n.quantity)<r){b("Insufficient quantities available to execute stock-out.","error");return}try{const t=document.querySelector('meta[name="csrf-token"]').getAttribute("content"),o=await fetch("/api/adjustments",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":t},body:JSON.stringify({inventory_id:a,action:s,quantity:r,operator:u,notes:p})});if(!o.ok){const g=await o.json();throw new Error(g.error||"Server error occurred.")}await R();const m=_.drawerAdjustStock.querySelector(".bg-white");m.style.transform="translateX(100%)",setTimeout(()=>{_.drawerAdjustStock.classList.add("hidden"),T(),b("Manual stock adjustment applied successfully.","success"),w(`[Adjust SUCCESS] ${l} of ${r.toFixed(1)} units on SKU ${d.sku}.`,"success")},300)}catch(t){b(t.message,"error")}}),_.btnSettings.addEventListener("click",()=>{document.getElementById("modal-settings").classList.remove("hidden")});const F=document.getElementById("btn-currency-php"),O=document.getElementById("btn-currency-usd"),V=()=>{e.currency==="PHP"?(F.className="py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer bg-slate-50 text-slate-800",O.className="py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer bg-white text-slate-500 hover:bg-slate-55"):(O.className="py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer bg-slate-50 text-slate-800",F.className="py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer bg-white text-slate-500 hover:bg-slate-55")};F&&O&&(F.addEventListener("click",()=>{e.currency!=="PHP"&&(e.currency="PHP",V(),T(),b("Global currency set to Philippine Peso (PHP).","success"),w("[System Settings] Currency changed to PHP (₱). Valuation records recalculated.","info"))}),O.addEventListener("click",()=>{e.currency!=="USD"&&(e.currency="USD",V(),T(),b("Global currency set to United States Dollar (USD).","success"),w("[System Settings] Currency changed to USD ($). Valuation records recalculated.","info"))})),_.themeToggle.addEventListener("click",i=>{i.preventDefault(),e.isDark=!e.isDark,e.isDark?(document.documentElement.classList.add("dark"),document.body.classList.add("dark"),_.themeText.textContent="Dark Mode",_.themeIcon.setAttribute("data-lucide","moon"),b("Terminal theme set to Tonal Forest Dark Mode.","success"),w("UI theme changed to high-contrast Dark mode.","info")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark"),_.themeText.textContent="Light Mode",_.themeIcon.setAttribute("data-lucide","sun"),b("Terminal theme set to Forest Light Mode.","success"),w("UI theme changed to standard Light mode.","info")),lucide.createIcons()});const K=()=>{_.modalCmdPalette.classList.remove("hidden"),_.cmdInput.value="",_.cmdInput.focus(),Z("")},Z=i=>{_.cmdResults.innerHTML="";const a=[{title:"Go to Dashboard",desc:"Jump to the main Launchpad View",action:()=>_.sidebarNav.querySelector('[data-tab="dashboard"]').click()},{title:"Go to Inventory Tracking",desc:"Jump to detailed batch tables",action:()=>_.sidebarNav.querySelector('[data-tab="tracking"]').click()},{title:"Go to Stock Transactions",desc:"View audit transaction movement log",action:()=>_.sidebarNav.querySelector('[data-tab="ledger"]').click()},{title:"Go to Warehouse Location Tracking",desc:"Audit distribution node volumes",action:()=>_.sidebarNav.querySelector('[data-tab="zones"]').click()},{title:"Go to Inventory Reporting and Alerts",desc:"View FEFO lists and stock outages",action:()=>_.sidebarNav.querySelector('[data-tab="reports"]').click()},{title:"Open Transfer Wizard",desc:"Dispatch relocation batch",action:()=>G()},{title:"Register New Product",desc:"Insert SKU records to catalog",action:()=>P()},{title:"Toggle System Theme",desc:"Swap between Light and Dark modes",action:()=>_.themeToggle.click()}];e.products.forEach(s=>{a.push({title:`Locate SKU: ${s.sku}`,desc:`Audit quantities and locations for ${s.name}`,action:()=>{_.sidebarNav.querySelector('[data-tab="tracking"]').click(),B="All",C="All",L=null,_.globalSearch.value=s.sku,_.globalSearch.dispatchEvent(new Event("input")),setTimeout(()=>{const u=document.getElementById("stock-tbody");u&&u.querySelectorAll("tr").forEach(n=>{const d=n.querySelector("td");d&&d.textContent.trim().toLowerCase()===s.sku.toLowerCase()&&(n.classList.add("bg-emerald-500/10","ring-2","ring-emerald-500/20","transition-all","duration-300"),n.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{n.classList.remove("bg-emerald-500/10","ring-2","ring-emerald-500/20")},2500))})},200)}})});const r=a.filter(s=>s.title.toLowerCase().includes(i.toLowerCase())||s.desc.toLowerCase().includes(i.toLowerCase()));if(r.length===0){_.cmdResults.innerHTML=`<div class="p-4 text-center text-xs text-slate-400 font-bold">No commands matched "${i}".</div>`;return}r.forEach(s=>{const u=document.createElement("div");u.className="p-3 hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-2xl cursor-pointer transition-all flex items-center justify-between",u.innerHTML=`
                <div>
                    <h4 class="text-xs font-black text-slate-700">${s.title}</h4>
                    <span class="text-[9px] font-bold text-slate-400">${s.desc}</span>
                </div>
                <i data-lucide="corner-down-left" class="w-3.5 h-3.5 text-slate-300"></i>
            `,u.addEventListener("click",()=>{_.modalCmdPalette.classList.add("hidden"),s.action()}),_.cmdResults.appendChild(u)}),lucide.createIcons()};window.addEventListener("keydown",i=>{if((i.ctrlKey||i.metaKey)&&i.key==="k"&&(i.preventDefault(),K()),i.key==="Escape"){_.modalCmdPalette.classList.add("hidden"),_.modalTransferWizard.classList.add("hidden"),_.modalNewProduct.classList.add("hidden"),document.getElementById("modal-settings").classList.add("hidden"),document.getElementById("modal-edit-product").classList.add("hidden"),document.getElementById("modal-delete-product").classList.add("hidden"),document.getElementById("modal-purchase-order").classList.add("hidden");const a=_.drawerAdjustStock.querySelector(".bg-white");a&&(a.style.transform="translateX(100%)"),setTimeout(()=>{_.drawerAdjustStock.classList.add("hidden")},300)}}),_.cmdInput.addEventListener("input",i=>{Z(i.target.value)}),_.globalSearch.addEventListener("click",K),document.querySelectorAll(".btn-locked-dept").forEach(i=>{i.addEventListener("click",a=>{a.preventDefault();const r=i.getAttribute("data-dept");b(`Access Restricted: ${r} module is locked.`,"error"),w(`[Security Block] Unauthorized attempt to access ${r} module.`,"error")})});const D=document.getElementById("sidebar-container");D&&(D.addEventListener("mouseenter",()=>{D.classList.add("expanded")}),D.addEventListener("mouseleave",()=>{D.classList.remove("expanded")}),document.addEventListener("click",i=>{D.contains(i.target)||D.classList.remove("expanded")}))});
