<!-- Warehouse Location Tracking View Partial -->
<script>
window.renderZones = function(State, DOM) {
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
                        <h3 class="text-base font-black text-slate-800 font-outfit">\${wh.name}</h3>
                        <span class="block text-[9px] font-bold text-slate-400 uppercase mt-0.5">\${addr ? `\${addr.street}, \${addr.city}` : 'No address record'}</span>
                    </div>
                    <span class="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-black uppercase tracking-wider border border-slate-200">\${parseFloat(wh.capacity_sqm).toFixed(0)} sqm</span>
                </div>
                
                <div class="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                    <div>
                        <span class="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Total Stored Qty</span>
                        <span class="block text-base font-black text-slate-700 mt-0.5 font-mono">\${totalQty.toFixed(1)} units</span>
                    </div>
                    <div>
                        <span class="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Unique SKUs</span>
                        <span class="block text-base font-black text-slate-700 mt-0.5 font-mono">\${uniqueSKUs} Batches</span>
                    </div>
                </div>
            </div>

            <div class="space-y-3 pt-3">
                <span class="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Allocated Zones</span>
                <div class="space-y-2.5" id="zones-list-\${wh.warehouse_id}">
                    <!-- Zones injected dynamically -->
                </div>
            </div>
        `;
        whGrid.appendChild(card);

        // Inject zone occupancy subbars
        const zonesList = document.getElementById(`zones-list-\${wh.warehouse_id}`);
        
        whZones.forEach(zone => {
            let zoneSum = 0;
            State.inventory_locations.forEach(loc => {
                if (loc.zone_id === zone.zone_id) {
                    zoneSum += parseFloat(loc.quantity);
                }
            });

            const zoneMax = zone.zone_id === 3 ? 5000 : 1500;
            const pct = Math.min(100, Math.round((zoneSum / zoneMax) * 100));

            const zoneItem = document.createElement('div');
            zoneItem.className = 'p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 rounded-2xl space-y-1.5 cursor-pointer transition-all';
            zoneItem.innerHTML = `
                <div class="flex justify-between items-center text-[10px] font-bold text-slate-700">
                    <span class="font-bold text-slate-800">\${zone.zone_name}</span>
                    <span class="font-mono">\${zoneSum.toFixed(1)} / \${zoneMax} (\${pct}%)</span>
                </div>
                <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-[#2D6A24] h-full rounded-full transition-all duration-300" style="width: \${pct}%"></div>
                </div>
                <span class="block text-[8px] font-bold text-slate-400 uppercase">Category: \${zone.category}</span>
            `;
            zoneItem.addEventListener('click', () => {
                State.selectedZoneFilter = zone.zone_name;
                State.selectedCategoryFilter = 'All';
                State.selectedStatusFilter = 'All';
                DOM.sidebarNav.querySelector('[data-tab="tracking"]').click();
            });
            zonesList.appendChild(zoneItem);
        });
    });
};
</script>
