<!-- Inventory Reports and Alerts View Partial -->
<script>
window.renderReports = function(State, DOM, formatDate, openPurchaseOrderModal, lucide) {
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

    // Pagination initialization
    State.reportsLowStockPage = State.reportsLowStockPage || 1;
    State.reportsExpiringPage = State.reportsExpiringPage || 1;
    const itemsPerPage = 5;

    // Paginate lowStock
    const totalLowStockPages = Math.ceil(lowStock.length / itemsPerPage) || 1;
    if (State.reportsLowStockPage > totalLowStockPages) State.reportsLowStockPage = totalLowStockPages;
    const startLowStock = (State.reportsLowStockPage - 1) * itemsPerPage;
    const endLowStock = startLowStock + itemsPerPage;
    const paginatedLowStock = lowStock.slice(startLowStock, endLowStock);

    // Paginate expiringSoon
    const totalExpiringPages = Math.ceil(expiringSoon.length / itemsPerPage) || 1;
    if (State.reportsExpiringPage > totalExpiringPages) State.reportsExpiringPage = totalExpiringPages;
    const startExpiring = (State.reportsExpiringPage - 1) * itemsPerPage;
    const endExpiring = startExpiring + itemsPerPage;
    const paginatedExpiring = expiringSoon.slice(startExpiring, endExpiring);

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
                <div class="card-surface p-5 flex flex-col justify-between min-h-[460px]">
                    <div>
                        <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <span class="text-[10px] font-black uppercase tracking-wider text-slate-700">Low Stock Trigger Reports</span>
                            <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500"></i>
                        </div>
                        <div class="space-y-3 max-h-[320px] overflow-y-auto pr-1 mt-3" id="reports-low-stock-list">
                            <!-- Injected -->
                        </div>
                    </div>
                    <!-- Pagination panel -->
                    <div id="reports-low-stock-pagination" class="pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-600 mt-4">
                        <!-- Injected -->
                    </div>
                </div>
 
                <!-- Expiring Batches FEFO Panel -->
                <div class="card-surface p-5 flex flex-col justify-between min-h-[460px]">
                    <div>
                        <div class="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <span class="text-[10px] font-black uppercase tracking-wider text-slate-700">FEFO Expiration Timeline</span>
                            <i data-lucide="calendar" class="w-4 h-4 text-rose-500"></i>
                        </div>
                        <div class="space-y-3 max-h-[320px] overflow-y-auto pr-1 mt-3" id="reports-expiration-list">
                            <!-- Injected -->
                        </div>
                    </div>
                    <!-- Pagination panel -->
                    <div id="reports-expiration-pagination" class="pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-600 mt-4">
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
        paginatedLowStock.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex justify-between items-center';
            itemDiv.innerHTML = `
                <div class="space-y-1">
                    <h4 class="text-xs font-black text-slate-800">${item.name}</h4>
                    <span class="block text-[8px] font-bold text-slate-400 uppercase">SKU: ${item.sku} | Location: ${item.whName}</span>
                    <!-- Reorder Button -->
                    ${(State.currentUser.role_id === 1 || State.currentUser.role_id === 3) ? `
                    <button data-inventory-id="${item.inventory_id}" class="btn-generate-po px-2.5 py-1 mt-1 bg-[#2D6A24] text-white hover:bg-[#23531B] rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                        <i data-lucide="file-plus" class="w-3 h-3"></i>
                        <span>Generate PO</span>
                    </button>
                    ` : `
                    <button disabled class="px-2.5 py-1 mt-1 bg-slate-100 text-slate-400 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-not-allowed border border-slate-200">
                        <i data-lucide="lock" class="w-3 h-3 text-slate-400"></i>
                        <span>Locked</span>
                    </button>
                    `}
                </div>
                <div class="text-right">
                    <span class="block text-xs font-black text-rose-600 font-mono">${item.qty.toFixed(1)} left</span>
                    <span class="block text-[8px] font-bold text-slate-400 uppercase">Threshold: ${item.min.toFixed(0)}</span>
                </div>
            `;
            lsContainer.appendChild(itemDiv);
        });
    }

    // Render low stock pagination panel
    const lsPagination = document.getElementById('reports-low-stock-pagination');
    if (lsPagination && lowStock.length > 0) {
        lsPagination.innerHTML = `
            <span class="text-slate-400">Showing ${startLowStock + 1} to ${Math.min(endLowStock, lowStock.length)} of ${lowStock.length} items</span>
            <div class="flex items-center gap-1" id="reports-low-stock-page-buttons"></div>
        `;

        const lsButtons = document.getElementById('reports-low-stock-page-buttons');
        
        // Prev button
        const prevBtn = document.createElement('button');
        prevBtn.className = `px-2 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer ${State.reportsLowStockPage === 1 ? 'opacity-40 pointer-events-none' : ''}`;
        prevBtn.innerHTML = '<i data-lucide="chevron-left" class="w-3 h-3"></i>';
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            State.reportsLowStockPage--;
            window.renderReports(State, DOM, formatDate, openPurchaseOrderModal, lucide);
        });
        lsButtons.appendChild(prevBtn);

        // Page buttons
        for (let p = 1; p <= totalLowStockPages; p++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `px-2.5 py-1 border rounded-lg transition-all cursor-pointer font-bold text-[10px] ${p === State.reportsLowStockPage ? 'bg-[#2D6A24] text-white border-[#2D6A24]' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`;
            pageBtn.textContent = p;
            pageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                State.reportsLowStockPage = p;
                window.renderReports(State, DOM, formatDate, openPurchaseOrderModal, lucide);
            });
            lsButtons.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = `px-2 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer ${State.reportsLowStockPage === totalLowStockPages ? 'opacity-40 pointer-events-none' : ''}`;
        nextBtn.innerHTML = '<i data-lucide="chevron-right" class="w-3 h-3"></i>';
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            State.reportsLowStockPage++;
            window.renderReports(State, DOM, formatDate, openPurchaseOrderModal, lucide);
        });
        lsButtons.appendChild(nextBtn);
    }
 
    // Render expirations
    const expContainer = document.getElementById('reports-expiration-list');
    if (expiringSoon.length === 0) {
        expContainer.innerHTML = `<div class="p-4 text-center text-xs text-slate-400 font-bold">No batches expire in the next 45 days.</div>`;
    } else {
        paginatedExpiring.forEach(item => {
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

    // Render expirations pagination panel
    const expPagination = document.getElementById('reports-expiration-pagination');
    if (expPagination && expiringSoon.length > 0) {
        expPagination.innerHTML = `
            <span class="text-slate-400">Showing ${startExpiring + 1} to ${Math.min(endExpiring, expiringSoon.length)} of ${expiringSoon.length} items</span>
            <div class="flex items-center gap-1" id="reports-expiration-page-buttons"></div>
        `;

        const expButtons = document.getElementById('reports-expiration-page-buttons');
        
        // Prev button
        const prevBtn = document.createElement('button');
        prevBtn.className = `px-2 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer ${State.reportsExpiringPage === 1 ? 'opacity-40 pointer-events-none' : ''}`;
        prevBtn.innerHTML = '<i data-lucide="chevron-left" class="w-3 h-3"></i>';
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            State.reportsExpiringPage--;
            window.renderReports(State, DOM, formatDate, openPurchaseOrderModal, lucide);
        });
        expButtons.appendChild(prevBtn);

        // Page buttons
        for (let p = 1; p <= totalExpiringPages; p++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `px-2.5 py-1 border rounded-lg transition-all cursor-pointer font-bold text-[10px] ${p === State.reportsExpiringPage ? 'bg-[#2D6A24] text-white border-[#2D6A24]' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`;
            pageBtn.textContent = p;
            pageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                State.reportsExpiringPage = p;
                window.renderReports(State, DOM, formatDate, openPurchaseOrderModal, lucide);
            });
            expButtons.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = `px-2 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer ${State.reportsExpiringPage === totalExpiringPages ? 'opacity-40 pointer-events-none' : ''}`;
        nextBtn.innerHTML = '<i data-lucide="chevron-right" class="w-3 h-3"></i>';
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            State.reportsExpiringPage++;
            window.renderReports(State, DOM, formatDate, openPurchaseOrderModal, lucide);
        });
        expButtons.appendChild(nextBtn);
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
                
                const zoneMax = zone.zone_id === 3 ? 5000 : 1500;
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
</script>

