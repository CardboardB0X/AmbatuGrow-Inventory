<!-- Inventory Tracking View Partial -->
<script>
window.renderTracking = function(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog) {
    // Initialize default filter states if not present
    if (State.selectedCategoryFilter === undefined) State.selectedCategoryFilter = 'All';
    if (State.selectedStatusFilter === undefined) State.selectedStatusFilter = 'All';
    if (State.selectedZoneFilter === undefined) State.selectedZoneFilter = null;
    if (State.selectedSkus === undefined) State.selectedSkus = [];

    // Build category options list
    let catOptionsHTML = '<option value="All">All Categories</option>';
    State.categories.forEach(c => {
        const selected = State.selectedCategoryFilter === c.category_name ? 'selected' : '';
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

        const matchesCategory = State.selectedCategoryFilter === 'All' || item.category === State.selectedCategoryFilter;
        const matchesStatus = State.selectedStatusFilter === 'All' || item.status === State.selectedStatusFilter;
        const matchesZone = !State.selectedZoneFilter || item.zone === State.selectedZoneFilter;

        return matchesSearch && matchesCategory && matchesStatus && matchesZone;
    });

    const isAllSelected = filteredItems.length > 0 && filteredItems.every(i => State.selectedSkus.includes(i.sku));

    // Derive Low Stock items
    const lowStockItems = items.filter(i => i.status === 'Active' && i.stockQty <= i.minQty);

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
        <div class="flex flex-col min-h-0 space-y-6 animate-slide-up-fade h-full">
            
            <!-- Zone Filter Indicator Banner -->
            ${State.selectedZoneFilter ? `
            <div class="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2 flex items-center justify-between text-xs text-emerald-800 font-bold shrink-0">
                <span>Active Zone Filter: <strong>${State.selectedZoneFilter}</strong></span>
                <button id="btn-clear-zone-filter" class="text-emerald-700 hover:text-red-700 font-extrabold cursor-pointer bg-transparent border-none">
                    Clear Filter &times;
                </button>
            </div>
            ` : ''}

            <!-- Filter and Top Actions Header (Screenshot Match) -->
            <div class="bg-white border border-slate-200 p-5 rounded-3xl flex items-center justify-between gap-4 shrink-0 shadow-2xs">
                <!-- Left Side: Add Button -->
                ${(State.currentUser.role_id === 1 || State.currentUser.role_id === 2) ? `
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
                            <option value="All" ${State.selectedStatusFilter === 'All' ? 'selected' : ''}>All Statuses</option>
                            <option value="Active" ${State.selectedStatusFilter === 'Active' ? 'selected' : ''}>Active</option>
                            <option value="Obsolete" ${State.selectedStatusFilter === 'Obsolete' ? 'selected' : ''}>Obsolete</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Bulk Action Panel -->
            ${State.selectedSkus.length > 0 ? `
            <div class="bg-emerald-950 text-white rounded-2xl px-5 py-3 flex items-center justify-between text-xs shadow-md border border-emerald-900 animate-slide-up-fade shrink-0">
                <span class="font-bold font-outfit">${State.selectedSkus.length} items selected</span>
                <div class="flex items-center gap-3">
                    ${(State.currentUser.role_id === 1 || State.currentUser.role_id === 2) ? `
                    <button id="btn-bulk-active" class="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg text-[9px] uppercase tracking-wider cursor-pointer transition-all border-none">Set Active</button>
                    <button id="btn-bulk-obsolete" class="px-3 py-1.5 bg-amber-800 hover:bg-amber-700 text-white font-bold rounded-lg text-[9px] uppercase tracking-wider cursor-pointer transition-all border-none">Set Obsolete</button>
                    ` : ''}
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
                <div class="overflow-auto flex-1 min-h-0 max-h-[calc(100vh-260px)]">
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
            const isSelected = State.selectedSkus.includes(item.sku);
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
                        ${(State.currentUser.role_id === 1 || State.currentUser.role_id === 2) ? `
                            <button data-sku="${item.sku}" class="btn-action-edit text-slate-500 hover:text-slate-800 hover:underline cursor-pointer bg-transparent border-none">Edit</button>
                            ${item.status === 'Active' ? `
                            <button data-sku="${item.sku}" class="btn-action-archive text-amber-700 hover:text-amber-900 hover:underline cursor-pointer bg-transparent border-none">Archive</button>
                            ` : `
                            ${State.currentUser.role_id === 1 ? `
                            <button data-sku="${item.sku}" class="btn-action-delete text-red-600 hover:text-red-800 hover:underline cursor-pointer bg-transparent border-none">Delete</button>
                            ` : `<span class="text-slate-300">Locked</span>`}
                            `}
                        ` : `
                            <span class="text-slate-400 italic">Read-Only</span>
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
            State.selectedZoneFilter = null;
            window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
        });
    }

    // Category Filter dropdown
    const fCat = document.getElementById('filter-category');
    fCat.addEventListener('change', (e) => {
        State.selectedCategoryFilter = e.target.value;
        window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
    });

    // Status Filter dropdown
    const fStatus = document.getElementById('filter-status');
    fStatus.addEventListener('change', (e) => {
        State.selectedStatusFilter = e.target.value;
        window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
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
                if (!State.selectedSkus.includes(sku)) State.selectedSkus.push(sku);
            } else {
                State.selectedSkus = State.selectedSkus.filter(s => s !== sku);
            }
            window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
        });
    });

    // Checkbox select all toggle
    const checkAll = document.getElementById('check-all-skus');
    if (checkAll) {
        checkAll.addEventListener('change', (e) => {
            if (e.target.checked) {
                State.selectedSkus = filteredItems.map(i => i.sku);
            } else {
                State.selectedSkus = [];
            }
            window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
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
                window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
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
            State.selectedSkus.forEach(sku => {
                const prod = State.products.find(p => p.sku === sku);
                if (prod) prod.status = 'Active';
            });
            showToast(`${State.selectedSkus.length} items set to Active.`, 'success');
            addConsoleLog(`[Bulk Action] ${State.selectedSkus.length} SKU status updated to ACTIVE.`, 'success');
            State.selectedSkus = [];
            window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
        });
    }

    const btnBulkObsolete = document.getElementById('btn-bulk-obsolete');
    if (btnBulkObsolete) {
        btnBulkObsolete.addEventListener('click', () => {
            State.selectedSkus.forEach(sku => {
                const prod = State.products.find(p => p.sku === sku);
                if (prod) prod.status = 'Obsolete';
            });
            showToast(`${State.selectedSkus.length} items archived (Obsolete).`, 'success');
            addConsoleLog(`[Bulk Action] ${State.selectedSkus.length} SKU status updated to OBSOLETE.`, 'warning');
            State.selectedSkus = [];
            window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
        });
    }

    const btnBulkDelete = document.getElementById('btn-bulk-delete');
    if (btnBulkDelete) {
        btnBulkDelete.addEventListener('click', () => {
            if (confirm(`Are you sure you want to permanently discontinue these ${State.selectedSkus.length} products? This will purge all matching warehouse inventory.`)) {
                State.selectedSkus.forEach(sku => {
                    const prod = State.products.find(p => p.sku === sku);
                    if (prod) {
                        State.products = State.products.filter(p => p.product_id !== prod.product_id);
                        State.inventory_locations = State.inventory_locations.filter(loc => loc.product_id !== prod.product_id);
                        addConsoleLog(`[Catalog DELETE] SKU ${sku} discontinued. Inventory purged.`, 'warning');
                    }
                });
                showToast(`${State.selectedSkus.length} products discontinued successfully.`, 'success');
                State.selectedSkus = [];
                window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
            }
        });
    }

    const btnBulkCancel = document.getElementById('btn-bulk-cancel');
    if (btnBulkCancel) {
        btnBulkCancel.addEventListener('click', () => {
            State.selectedSkus = [];
            window.renderTracking(State, DOM, formatPHP, lucide, openNewProductModal, openEditProductModal, openDeleteProductModal, showToast, addConsoleLog);
        });
    }
};
</script>

