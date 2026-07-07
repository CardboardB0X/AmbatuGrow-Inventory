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
        
        // Products Table
        products: [
            { product_id: 1, sku: 'AGRI-SEED-042', name: 'Hybrid Rice Seeds', description: 'High-yield F1 hybrid seeds', category_id: 1, uom_id: 3, currency_id: 1, base_price: 1800.00, min_quantity_threshold: 15.00, max_quantity_threshold: 100.00, lead_time_days: 7 },
            { product_id: 2, sku: 'AGRI-FERT-009', name: 'Premium Vermicast', description: '100% organic worm castings', category_id: 2, uom_id: 3, currency_id: 1, base_price: 650.00, min_quantity_threshold: 40.00, max_quantity_threshold: 200.00, lead_time_days: 5 },
            { product_id: 3, sku: 'AGRI-PROD-001', name: 'Industrial Gloves', description: 'Heavy duty nitrile gloves', category_id: 3, uom_id: 4, currency_id: 1, base_price: 150.00, min_quantity_threshold: 100.00, max_quantity_threshold: 300.00, lead_time_days: 14 },
            { product_id: 4, sku: 'AGRI-NUTRI-501', name: 'Growmax Liquid Foliar', description: 'Concentrated nitrogen foliar feed', category_id: 4, uom_id: 2, currency_id: 1, base_price: 450.00, min_quantity_threshold: 25.00, max_quantity_threshold: 150.00, lead_time_days: 10 },
            { product_id: 5, sku: 'AGRI-SEED-101', name: 'Sweet Corn Seeds', description: 'Yellow sweet corn hybrid seeds', category_id: 1, uom_id: 1, currency_id: 1, base_price: 980.00, min_quantity_threshold: 10.00, max_quantity_threshold: 80.00, lead_time_days: 7 }
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
            { inventory_id: 3, product_id: 3, warehouse_id: 2, zone_id: 3, quantity: 85.00, expiration_date: null }, // Low stock initial
            { inventory_id: 4, product_id: 4, warehouse_id: 1, zone_id: 2, quantity: 30.00, expiration_date: '2026-07-28' }, // Expiring soon (FEFO alert)
            { inventory_id: 5, product_id: 5, warehouse_id: 3, zone_id: 4, quantity: 8.00, expiration_date: '2026-10-15' }  // Low stock initial
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

    // Helper: Appends log to console terminal
    const addConsoleLog = (text, type = 'info') => {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        const log = document.createElement('div');
        log.className = 'py-1 border-b border-slate-900/40 flex items-start gap-2 transition-all duration-300 animate-slide-up-fade text-[9px] leading-relaxed';
        
        let prefix = `<span class="text-slate-500 shrink-0 font-bold font-mono">[${time}]</span>`;
        let icon = `<span class="text-slate-400 shrink-0 font-black font-mono">&gt;</span>`;
        let contentClass = 'text-slate-300 font-medium break-all';

        if (type === 'success') {
            icon = `<span class="text-emerald-400 shrink-0 font-black font-mono">✓</span>`;
            contentClass = 'text-emerald-400 font-semibold';
        } else if (type === 'error') {
            icon = `<span class="text-rose-400 shrink-0 font-black font-mono">✗</span>`;
            contentClass = 'text-rose-400 font-semibold';
        } else if (type === 'warning') {
            icon = `<span class="text-amber-400 shrink-0 font-black font-mono">⚠</span>`;
            contentClass = 'text-amber-400 font-semibold';
        }

        // Highlight tags enclosed in brackets e.g. [Product REGISTERED] or [PO DISPATCHED]
        let formattedText = text.replace(/\[([^\]]+)\]/g, '<span class="bg-slate-900/80 px-1 py-0.5 rounded text-[8px] font-black uppercase tracking-wider text-slate-300 border border-slate-800">$1</span>');

        // Highlight SKUs like AGRI-SEED-042
        formattedText = formattedText.replace(/(AGRI-[A-Z0-9-]+)/g, '<span class="font-mono text-cyan-400 font-bold bg-cyan-950/20 px-1 border border-cyan-800/20 rounded">$1</span>');

        log.innerHTML = `${prefix} ${icon} <div class="${contentClass} flex-1">${formattedText}</div>`;
        DOM.consoleLogs.appendChild(log);
        DOM.consoleLogs.scrollTop = DOM.consoleLogs.scrollHeight;
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
                            addConsoleLog(`Session authenticated. Access level: ${State.currentUser.role_id === 1 ? 'ADMIN' : 'OFFICER'}.`, 'success');
                        }, 500);
                    }, 500);
                }
            }, step.delay);
        });
    });

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
        DOM.mainWorkspace.innerHTML = `
            <div class="space-y-6 animate-slide-up-fade">
                <!-- Actions panel -->
                <div class="bg-white border border-slate-200 p-4 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        ${State.currentUser.role_id === 1 ? `
                        <button id="btn-add-product" class="py-2 px-4 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 cursor-pointer">
                            <i data-lucide="plus-circle" class="w-4 h-4"></i>
                            <span>Register Product</span>
                        </button>
                        ` : ''}
                        <button id="btn-trigger-transfer" class="py-2 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                            <i data-lucide="arrow-right-left" class="w-4 h-4"></i>
                            <span>Relocate Batch</span>
                        </button>
                    </div>
                    <!-- Filter indicators -->
                    <div class="flex gap-2">
                        <select id="filter-warehouse" class="text-xs font-semibold px-3 py-1.5">
                            <option value="all">All Warehouses</option>
                            <!-- Injected -->
                        </select>
                        <select id="filter-category" class="text-xs font-semibold px-3 py-1.5">
                            <option value="all">All Categories</option>
                            <!-- Injected -->
                        </select>
                    </div>
                </div>

                <!-- Stock Table -->
                <div class="card-surface p-5">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs">
                            <thead>
                                <tr class="border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th class="py-3">SKU</th>
                                    <th class="py-3">Product Name</th>
                                    <th class="py-3">Category</th>
                                    <th class="py-3">Location</th>
                                    <th class="py-3 text-right">Qty</th>
                                    <th class="py-3">UOM</th>
                                    <th class="py-3">Expiration</th>
                                    <th class="py-3">Status</th>
                                    <th class="py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="stock-tbody">
                                <!-- Dynamic rows -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        // Load Select filter options
        const fWarehouse = document.getElementById('filter-warehouse');
        State.warehouses.forEach(w => {
            const opt = document.createElement('option');
            opt.value = w.warehouse_id;
            opt.textContent = w.name;
            fWarehouse.appendChild(opt);
        });

        const fCategory = document.getElementById('filter-category');
        State.categories.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.category_id;
            opt.textContent = c.category_name;
            fCategory.appendChild(opt);
        });

        // Filter trigger
        const filterStocks = () => {
            const whVal = fWarehouse.value;
            const catVal = fCategory.value;
            const searchVal = DOM.globalSearch.value.toLowerCase();
            
            const tbody = document.getElementById('stock-tbody');
            tbody.innerHTML = '';

            State.inventory_locations.forEach(loc => {
                const prod = State.products.find(p => p.product_id === loc.product_id);
                if (!prod) return;
                const wh = State.warehouses.find(w => w.warehouse_id === loc.warehouse_id);
                const zone = State.warehouse_zones.find(z => z.zone_id === loc.zone_id);
                const cat = State.categories.find(c => c.category_id === prod.category_id);
                const uom = State.units_of_measure.find(u => u.uom_id === prod.uom_id);

                // Apply filters
                if (whVal !== 'all' && loc.warehouse_id.toString() !== whVal) return;
                if (catVal !== 'all' && prod.category_id.toString() !== catVal) return;
                
                // Apply global search search query
                if (searchVal && !prod.name.toLowerCase().includes(searchVal) && !prod.sku.toLowerCase().includes(searchVal)) return                // Threshold state evaluations
                const isLow = loc.quantity <= prod.min_quantity_threshold;
                const isOver = prod.max_quantity_threshold && loc.quantity > prod.max_quantity_threshold;
                
                let statusText = 'In Stock';
                let statusBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                
                if (isLow) {
                    statusText = 'Low Stock';
                    statusBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
                } else if (isOver) {
                    statusText = 'Overstocked';
                    statusBadgeClass = 'bg-rose-55 text-rose-700 border-rose-200';
                }

                const row = document.createElement('tr');
                if (searchVal && prod.sku.toLowerCase() === searchVal.trim().toLowerCase()) {
                    row.className = 'border-b border-slate-100 bg-emerald-500/10 ring-2 ring-emerald-500/20 transition-all duration-300';
                    setTimeout(() => {
                        row.classList.remove('bg-emerald-500/10', 'ring-2', 'ring-emerald-500/20');
                    }, 2500);
                } else {
                    row.className = 'border-b border-slate-100 hover:bg-slate-50/80';
                }
                
                const isAdmin = State.currentUser.role_id === 1;
                const adminActions = isAdmin ? `
                    <button data-product-id="${prod.product_id}" class="btn-edit-prod p-1 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg shadow-2xs inline-flex items-center cursor-pointer" title="Edit Catalog Details">
                        <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                    </button>
                    <button data-product-id="${prod.product_id}" class="btn-delete-prod p-1 text-rose-500 hover:text-rose-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs inline-flex items-center cursor-pointer" title="Discontinue Product">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                ` : '';

                row.innerHTML = `
                    <td class="py-3.5 font-mono font-bold text-slate-500">${prod.sku}</td>
                    <td class="py-3.5 font-bold text-slate-800">${prod.name}</td>
                    <td class="py-3.5 text-slate-500 font-semibold">${cat ? cat.category_name : 'N/A'}</td>
                    <td class="py-3.5 text-slate-600">
                        <span class="block font-bold">${wh ? wh.name.split(' ')[0] : 'Unknown'}</span>
                        <span class="block text-[10px] text-slate-400 font-semibold">${zone ? zone.zone_name : 'Unknown'}</span>
                    </td>
                    <td class="py-3.5 text-right font-black font-mono text-slate-800">${parseFloat(loc.quantity).toFixed(2)}</td>
                    <td class="py-3.5 text-slate-400 font-black uppercase text-[10px]">${uom ? uom.uom_code : ''}</td>
                    <td class="py-3.5 font-mono text-[10px] text-slate-500">${formatDate(loc.expiration_date)}</td>
                    <td class="py-3.5">
                        <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border ${statusBadgeClass}">${statusText}</span>
                    </td>
                    <td class="py-3.5 text-right space-x-1">
                        <button data-inventory-id="${loc.inventory_id}" class="btn-adjust px-2 py-1 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg text-[10px] font-bold shadow-2xs inline-flex items-center gap-1 cursor-pointer">
                            <i data-lucide="sliders" class="w-3 h-3"></i>
                            <span>Adjust</span>
                        </button>
                        ${adminActions}
                    </td>
                `;
                tbody.appendChild(row);
            });
            lucide.createIcons();
            
            // Re-bind adjust buttons
            tbody.querySelectorAll('.btn-adjust').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const invId = btn.getAttribute('data-inventory-id');
                    openAdjustDrawer(invId);
                });
            });

            // Re-bind edit buttons
            tbody.querySelectorAll('.btn-edit-prod').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const prodId = parseInt(btn.getAttribute('data-product-id'));
                    openEditProductModal(prodId);
                });
            });

            // Re-bind delete buttons
            tbody.querySelectorAll('.btn-delete-prod').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const prodId = parseInt(btn.getAttribute('data-product-id'));
                    openDeleteProductModal(prodId);
                });
            });
        };

        // Event listeners for filters & searches
        fWarehouse.addEventListener('change', filterStocks);
        fCategory.addEventListener('change', filterStocks);
        
        // Listen to global header search input
        DOM.globalSearch.addEventListener('input', filterStocks);

        // Quick triggers
        const btnAddProduct = document.getElementById('btn-add-product');
        if (btnAddProduct) {
            btnAddProduct.addEventListener('click', () => openNewProductModal());
        }
        document.getElementById('btn-trigger-transfer').addEventListener('click', () => openTransferWizard());

        // Run initial load
        filterStocks();
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
                zoneItem.className = 'p-3 bg-slate-50 border border-slate-200/50 rounded-2xl space-y-1.5';
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
            lead_time_days: leadTime
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
                    const fWh = document.getElementById('filter-warehouse');
                    const fCat = document.getElementById('filter-category');
                    if (fWh) fWh.value = 'all';
                    if (fCat) fCat.value = 'all';
                    
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
