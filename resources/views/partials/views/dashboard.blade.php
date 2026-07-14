<!-- Dashboard Launchpad View Partial -->
<script>
window.renderDashboard = function(State, DOM, formatPHP, lucide, openNewProductModal) {
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
                <div class="card-surface p-5 lg:col-span-1 flex flex-col space-y-4">
                    <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                        <span class="text-[10px] font-black uppercase tracking-wider text-slate-600">Value by Category</span>
                        <i data-lucide="pie-chart" class="w-4 h-4 text-slate-400"></i>
                    </div>
                    <div class="flex-1 flex items-center justify-center p-2 relative h-48">
                        <canvas id="dashboard-category-chart"></canvas>
                    </div>
                </div>

                <!-- Zone Occupancy Meter -->
                <div class="card-surface p-5 lg:col-span-1 flex flex-col space-y-4">
                    <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                        <span class="text-[10px] font-black uppercase tracking-wider text-slate-600">Zone Occupancy</span>
                        <i data-lucide="activity" class="w-4 h-4 text-slate-400"></i>
                    </div>
                    <div class="space-y-4 font-outfit" id="dashboard-zone-meters">
                        <!-- Dynamic Meters added here -->
                    </div>
                </div>

                <!-- Recent movements logs list -->
                <div class="card-surface p-5 lg:col-span-2 flex flex-col space-y-4">
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

            <!-- Full-width Section: Agricultural Planting & Supply Chain Calendar -->
            <div class="card-surface p-5 space-y-4">
                <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                    <div class="flex items-center gap-2 text-slate-800">
                        <i data-lucide="calendar-days" class="w-4 h-4 text-[#2D6A24]"></i>
                        <span class="text-[10px] font-black uppercase tracking-wider text-slate-600 font-outfit">Agricultural Planting & Supply Chain Calendar</span>
                    </div>
                    <span class="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">Live Cavite Cycle</span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <!-- Season details -->
                    <div class="md:col-span-4 space-y-3 bg-[#e6f4ea]/40 border border-emerald-200/40 rounded-3xl p-5 select-none">
                        <div class="flex items-center gap-2">
                            <span id="calendar-season-icon" class="text-xl">🌾</span>
                            <div>
                                <h4 class="text-xs font-black text-slate-800 font-outfit" id="calendar-season-title">Rice Wet Planting Season</h4>
                                <span class="text-[9px] font-bold text-[#2D6A24] font-mono" id="calendar-season-dates">July - September</span>
                            </div>
                        </div>
                        <p class="text-[10px] text-slate-500 font-semibold leading-relaxed" id="calendar-season-desc">Main planting cycle for high-yield grains. Ensure high stock availability of organic fertilizers and crop protection tools at Silang Hub.</p>
                        <div class="pt-2 border-t border-slate-200/50 flex justify-between items-center text-[9px] font-bold text-slate-400">
                            <span>Storage Advice:</span>
                            <span class="text-emerald-700" id="calendar-storage-advice">Keep seeds at < 70% humidity</span>
                        </div>
                    </div>

                    <!-- Timeline display -->
                    <div class="md:col-span-8 overflow-x-auto select-none">
                        <div class="min-w-[600px] flex items-center justify-between relative py-6 px-4" id="calendar-timeline-nodes">
                            <!-- Horizontal Timeline Line -->
                            <div class="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full z-0"></div>
                            <div class="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-[#2D6A24] rounded-full z-0 transition-all duration-500" id="calendar-progress-bar" style="width: 58%;"></div>

                            <!-- Timeline Months nodes injected dynamically -->
                        </div>
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
        const zoneMax = zone.zone_id === 3 ? 5000 : 1500;
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
            <td class="py-2.5 text-right font-bold text-slate-700 font-mono">${parseFloat(tx.quantity).toFixed(1)}</td>
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

    // Render Agricultural Calendar
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let seasonTitle = 'Rice Wet Planting Season';
    let seasonDates = 'July - September';
    let seasonDesc = 'Main planting cycle for high-yield grains. Ensure high stock availability of organic fertilizers and crop protection tools at Silang Hub.';
    let storageAdvice = 'Keep seeds at < 70% humidity';
    let seasonIcon = '🌾';
    
    if (currentMonth >= 0 && currentMonth <= 2) {
        seasonTitle = 'Dry Crops & Grains Season';
        seasonDates = 'January - March';
        seasonDesc = 'Optimized for leafy greens and vegetables. Grains demand is moderate. Relocate surplus organic fertilizers to Indang Hub.';
        storageAdvice = 'Keep seeds cool (15-20°C)';
        seasonIcon = '🥬';
    } else if (currentMonth >= 3 && currentMonth <= 5) {
        seasonTitle = 'Nutrient Preparation Cycle';
        seasonDates = 'April - June';
        seasonDesc = 'Focus on soil enrichment and pre-planting soil conditioning. High demand for liquid nutrients and organic fertilizers.';
        storageAdvice = 'Seal liquid feeds tightly';
        seasonIcon = '🧪';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
        seasonTitle = 'Rice Wet Planting Season';
        seasonDates = 'July - September';
        seasonDesc = 'Main planting cycle for high-yield grains. Ensure high stock availability of organic fertilizers and crop protection tools at Silang Hub.';
        storageAdvice = 'Keep seeds at < 70% humidity';
        seasonIcon = '🌾';
    } else {
        seasonTitle = 'Harvest & Consolidation Period';
        seasonDates = 'October - December';
        seasonDesc = 'Storage consolidation of newly harvested grains. Peak demand for heavy-duty tools and storage pallets.';
        storageAdvice = 'Audit ventilation blowers';
        seasonIcon = '🚜';
    }

    const tTitle = document.getElementById('calendar-season-title');
    const tDates = document.getElementById('calendar-season-dates');
    const tDesc = document.getElementById('calendar-season-desc');
    const tAdvice = document.getElementById('calendar-storage-advice');
    const tIcon = document.getElementById('calendar-season-icon');

    if (tTitle) tTitle.textContent = seasonTitle;
    if (tDates) tDates.textContent = seasonDates;
    if (tDesc) tDesc.textContent = seasonDesc;
    if (tAdvice) tAdvice.textContent = storageAdvice;
    if (tIcon) tIcon.textContent = seasonIcon;

    const timelineContainer = document.getElementById('calendar-timeline-nodes');
    if (timelineContainer) {
        const progressLine = timelineContainer.querySelector('.bg-slate-200');
        const progressBar = timelineContainer.querySelector('#calendar-progress-bar');
        
        timelineContainer.innerHTML = '';
        if (progressLine) timelineContainer.appendChild(progressLine);
        if (progressBar) {
            timelineContainer.appendChild(progressBar);
            const progressPct = Math.round((currentMonth / 11) * 100);
            progressBar.style.width = `${progressPct}%`;
        }

        months.forEach((m, idx) => {
            const node = document.createElement('div');
            node.className = 'flex flex-col items-center relative z-10';
            
            let circleClass = 'w-6 h-6 rounded-full bg-white border border-slate-200 text-[9px] font-bold text-slate-400 flex items-center justify-center';
            let labelClass = 'text-[9px] font-bold text-slate-400 mt-1';
            
            if (idx === currentMonth) {
                circleClass = 'w-7 h-7 rounded-full bg-[#2D6A24] border border-[#2D6A24] text-[10px] font-black text-white flex items-center justify-center shadow-[0_0_10px_rgba(45,106,36,0.3)] animate-pulse';
                labelClass = 'text-[10px] font-black text-[#2D6A24] mt-1';
            } else if (idx < currentMonth) {
                circleClass = 'w-6 h-6 rounded-full bg-emerald-50 border border-[#2D6A24] text-[9px] font-bold text-[#2D6A24] flex items-center justify-center';
                labelClass = 'text-[9px] font-bold text-slate-500 mt-1';
            }
            
            node.innerHTML = `
                <div class="${circleClass}">${idx + 1}</div>
                <span class="${labelClass}">${m}</span>
            `;
            timelineContainer.appendChild(node);
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
</script>

