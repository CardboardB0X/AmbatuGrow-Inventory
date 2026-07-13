<!-- ========================================== -->
<!-- 3. DIALOG OVERLAYS & MODALS                -->
<!-- ========================================== -->

<!-- TRANSFER WIZARD DIALOG -->
<div id="modal-transfer-wizard" class="hidden fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
    <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden transform transition-all duration-300 scale-95 animate-slide-up-fade">
        <header class="bg-[#2D6A24] text-white p-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i data-lucide="arrow-right-left" class="w-4 h-4"></i>
                <h3 class="text-sm font-black uppercase tracking-wider font-outfit">Stock Transfer Wizard</h3>
            </div>
            <button class="close-modal text-white/80 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
        </header>
        
        <form id="transfer-form" class="p-6 space-y-4">
            <!-- Select Product -->
            <div class="space-y-1">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Product</label>
                <select id="transfer-product-id" required class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]"></select>
                <!-- FEFO Recommendation Box -->
                <div id="transfer-fefo-recommendation" class="hidden p-3 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-start gap-2.5 text-[9px] leading-relaxed text-slate-600">
                    <i data-lucide="info" class="w-4 h-4 text-amber-500 shrink-0 mt-0.5"></i>
                    <div>
                        <span class="block font-black text-amber-600 uppercase tracking-wider">FEFO Recommendation</span>
                        <span class="block mt-0.5" id="transfer-fefo-text">We suggest relocation from [Zone] where this product expires first on [Date].</span>
                    </div>
                </div>
            </div>

            <!-- Source Warehouse -->
            <div class="space-y-1">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Source Warehouse / Zone</label>
                <select id="transfer-source-location" required class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]"></select>
            </div>

            <!-- Destination Warehouse -->
            <div class="space-y-1">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Destination Warehouse / Zone</label>
                <select id="transfer-dest-location" required class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]"></select>
            </div>

            <!-- Quantity & Details -->
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Quantity to Transfer</label>
                    <input type="number" id="transfer-qty" required min="1" step="any" placeholder="0.00" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Operator Name</label>
                    <input type="text" id="transfer-operator" required value="Admin Operator" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]">
                </div>
            </div>

            <!-- Notes -->
            <div class="space-y-1">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Notes / Purpose</label>
                <textarea id="transfer-notes" placeholder="Reason for inventory relocation..." class="w-full text-xs font-semibold p-2.5 h-16 resize-none focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]"></textarea>
            </div>

            <div class="pt-2 flex justify-end gap-2.5">
                <button type="button" class="close-modal px-4 py-2 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-xl text-xs font-black uppercase tracking-wider">Execute Transfer</button>
            </div>
        </form>
    </div>
</div>

<!-- NEW PRODUCT DIALOG -->
<div id="modal-new-product" class="hidden fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
    <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden transform scale-95 transition-all duration-300 animate-slide-up-fade">
        <header class="bg-[#2D6A24] text-white p-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i data-lucide="plus-circle" class="w-4 h-4"></i>
                <h3 class="text-sm font-black uppercase tracking-wider font-outfit">Add New Product</h3>
            </div>
            <button class="close-modal text-white/80 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
        </header>

        <form id="product-form" class="p-6 space-y-4">
            <!-- Name & SKU -->
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Product SKU</label>
                    <input type="text" id="prod-sku" required placeholder="AGRI-SEED-999" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Product Name</label>
                    <input type="text" id="prod-name" required placeholder="F1 Maize Hybrid" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]">
                </div>
            </div>

            <!-- Description -->
            <div class="space-y-1">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Description</label>
                <input type="text" id="prod-desc" placeholder="Product details and logistics warnings..." class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]">
            </div>

            <!-- Category, UOM & Currency -->
            <div class="grid grid-cols-3 gap-2">
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Category</label>
                    <select id="prod-category" required class="w-full text-xs font-semibold p-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]"></select>
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">UOM</label>
                    <select id="prod-uom" required class="w-full text-xs font-semibold p-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]"></select>
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Currency</label>
                    <select id="prod-currency" required class="w-full text-xs font-semibold p-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]"></select>
                </div>
            </div>

            <!-- Price & Lead Time -->
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Base Price (PHP)</label>
                    <input type="number" id="prod-price" required step="any" min="0" placeholder="0.00" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Lead Days</label>
                    <input type="number" id="prod-lead-time" required min="0" placeholder="7" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl">
                </div>
            </div>

            <!-- Min & Max Thresholds -->
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Min Threshold</label>
                    <input type="number" id="prod-threshold" required step="any" min="0" placeholder="10.00" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Max Threshold</label>
                    <input type="number" id="prod-max-threshold" required step="any" min="1" placeholder="150.00" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl">
                </div>
            </div>

            <!-- Initial Location Setup -->
            <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 class="text-[9px] font-black text-slate-600 uppercase tracking-wider">Initial Location Allocation</h4>
                <div class="grid grid-cols-2 gap-2">
                    <div class="space-y-1">
                        <label class="block text-[8px] font-bold text-slate-400 uppercase">Target Warehouse / Zone</label>
                        <select id="prod-init-zone" class="w-full text-xs p-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]"></select>
                    </div>
                    <div class="grid grid-cols-2 gap-1.5">
                        <div class="space-y-1">
                            <label class="block text-[8px] font-bold text-slate-400 uppercase">Quantity</label>
                            <input type="number" id="prod-init-qty" step="any" min="0" value="0" class="w-full text-xs p-2 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]">
                        </div>
                        <div class="space-y-1">
                            <label class="block text-[8px] font-bold text-slate-400 uppercase">Expiration</label>
                            <input type="date" id="prod-init-expiration" class="w-full text-xs p-1.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]">
                        </div>
                    </div>
                </div>
            </div>

            <div class="pt-2 flex justify-end gap-2.5">
                <button type="button" class="close-modal px-4 py-2 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-xl text-xs font-black uppercase tracking-wider">Add Product</button>
            </div>
        </form>
    </div>
</div>

<!-- ADJUST STOCK DRAWER (Slides from right) -->
<div id="drawer-adjust-stock" class="hidden fixed inset-0 z-40 flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
    <div class="bg-white h-full w-full max-w-sm border-l border-slate-200 flex flex-col justify-between shadow-2xl transform translate-x-full transition-transform duration-300 ease-out animate-slide-in">
        <header class="bg-[#2D6A24] text-white p-5 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-2">
                <i data-lucide="edit" class="w-4 h-4"></i>
                <h3 class="text-sm font-black uppercase tracking-wider font-outfit">Adjust Product Stock</h3>
            </div>
            <button class="close-drawer text-white/80 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
        </header>

        <form id="adjust-form" class="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
            <input type="hidden" id="adjust-inventory-id">
            
            <!-- Display active item info -->
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span class="block text-[8px] font-bold text-slate-400 uppercase tracking-widest" id="adjust-info-sku">SKU: AGRI-SEED-042</span>
                <h4 class="text-sm font-black text-slate-800 mt-1 font-outfit" id="adjust-info-name">Hybrid Rice Seeds</h4>
                <span class="block text-[9px] font-bold text-emerald-600 mt-1" id="adjust-info-location">Cavite Warehouse - Zone A (Seeds Store)</span>
            </div>

            <!-- Adjustment Type -->
            <div class="space-y-1">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Adjustment Action</label>
                <div class="grid grid-cols-2 gap-2">
                    <label class="border border-slate-200 hover:bg-slate-50 rounded-xl p-3 flex items-center gap-2 cursor-pointer transition-colors" id="label-action-in">
                        <input type="radio" name="adjust-action" id="action-in" value="in" checked class="text-[#2D6A24] focus:ring-0">
                        <span class="text-xs font-black uppercase text-slate-700">Stock-In (+)</span>
                    </label>
                    <label class="border border-slate-200 hover:bg-slate-50 rounded-xl p-3 flex items-center gap-2 cursor-pointer transition-colors" id="label-action-out">
                        <input type="radio" name="adjust-action" id="action-out" value="out" class="text-[#2D6A24] focus:ring-0">
                        <span class="text-xs font-black uppercase text-slate-700">Stock-Out (-)</span>
                    </label>
                </div>
            </div>

            <!-- FEFO Stock-out Warning Box -->
            <div id="adjust-fefo-warning" class="hidden p-3.5 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-start gap-2.5 text-[9px] leading-relaxed text-slate-600">
                <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <div>
                    <span class="block font-black text-rose-600 uppercase tracking-wider">FEFO Warning</span>
                    <span class="block mt-0.5" id="adjust-fefo-warning-text">Another batch of this product expires earlier on [Date] in [Zone]. Consider depleteting that batch first.</span>
                </div>
            </div>

            <!-- Quantity -->
            <div class="space-y-1">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Quantity</label>
                <div class="relative">
                    <input type="number" id="adjust-qty" required min="0.01" step="any" placeholder="0.00" class="w-full text-xs font-semibold p-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]">
                    <span class="absolute right-4 inset-y-0 flex items-center text-[10px] font-black text-slate-400 uppercase" id="adjust-info-uom">kg</span>
                </div>
            </div>

            <!-- Operator Name -->
            <div class="space-y-1">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Operator Name</label>
                <input type="text" id="adjust-operator" required value="Admin Operator" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]">
            </div>

            <!-- Notes / Reason -->
            <div class="space-y-1">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Reason / Remarks</label>
                <textarea id="adjust-notes" placeholder="Cycle count, procurement audit, sales deduction, spoilage..." class="w-full text-xs font-semibold p-2.5 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]"></textarea>
            </div>
        </form>

        <div class="p-5 border-t border-slate-200 shrink-0 bg-slate-50 flex gap-2.5">
            <button type="button" class="close-drawer flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-100 bg-white">Cancel</button>
            <button type="button" id="btn-submit-adjust" class="flex-1 py-2.5 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-xl text-xs font-black uppercase tracking-wider">Apply Stock</button>
        </div>
    </div>
</div>

<!-- COMMAND PALETTE (CTRL+K) -->
<div id="modal-cmd-palette" class="hidden fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
    <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden transform scale-95 transition-all duration-300 animate-slide-up-fade">
        <div class="p-4 border-b border-slate-200 relative flex items-center">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-4"></i>
            <input type="text" id="cmd-input" placeholder="Type a tab name (e.g. tracking, ledger) or a command (e.g. /theme)..." class="w-full pl-9 pr-8 py-2 text-xs font-semibold border-none focus:outline-none">
            <span class="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 shrink-0">ESC</span>
        </div>
        <div class="max-h-64 overflow-y-auto p-2" id="cmd-results">
            <!-- Search results injected dynamically -->
        </div>
    </div>
</div>

<!-- EDIT PRODUCT DETAILS MODAL -->
<div id="modal-edit-product" class="hidden fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
    <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden transform transition-all duration-300 scale-95 animate-slide-up-fade">
        <header class="bg-[#2D6A24] text-white p-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i data-lucide="edit-3" class="w-4 h-4"></i>
                <h3 class="text-sm font-black uppercase tracking-wider font-outfit">Edit Product Details</h3>
            </div>
            <button class="close-modal text-white/80 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
        </header>
        
        <form id="edit-product-form" class="p-6 space-y-4">
            <input type="hidden" id="edit-prod-id">
            
            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Product Name</label>
                    <input type="text" id="edit-prod-name" required class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Product SKU</label>
                    <input type="text" id="edit-prod-sku" required class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl">
                </div>
            </div>

            <div class="space-y-1">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Category</label>
                <select id="edit-prod-category" required class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl bg-white"></select>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Base Price (PHP)</label>
                    <input type="number" id="edit-prod-price" required min="1" step="any" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Lead Time (Days)</label>
                    <input type="number" id="edit-prod-leadtime" required min="1" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Min Threshold</label>
                    <input type="number" id="edit-prod-min" required min="1" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl">
                </div>
                <div class="space-y-1">
                    <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Max Threshold</label>
                    <input type="number" id="edit-prod-max" required min="1" class="w-full text-xs font-semibold p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] border border-slate-200 rounded-xl">
                </div>
            </div>

            <div class="pt-2 flex justify-end gap-2.5">
                <button type="button" class="close-modal px-4 py-2 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 bg-white">Cancel</button>
                <button type="submit" class="px-5 py-2 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-xl text-xs font-black uppercase tracking-wider">Save Changes</button>
            </div>
        </form>
    </div>
</div>

<!-- DELETE PRODUCT CONFIRMATION MODAL -->
<div id="modal-delete-product" class="hidden fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
    <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden transform transition-all duration-300 scale-95 animate-slide-up-fade">
        <header class="bg-rose-600 text-white p-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                <h3 class="text-sm font-black uppercase tracking-wider font-outfit">Discontinue Product</h3>
            </div>
            <button class="close-modal text-white/80 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
        </header>
        
        <div class="p-6 space-y-4">
            <input type="hidden" id="delete-prod-id">
            <p class="text-xs text-slate-600 font-semibold leading-relaxed">
                Are you sure you want to discontinue and delete <span id="delete-prod-display-name" class="font-bold text-slate-800"></span> (<span id="delete-prod-display-sku" class="font-mono text-[10px] font-bold text-slate-500"></span>)?
            </p>
            <div class="p-3.5 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-start gap-2.5 text-[9px] leading-relaxed text-rose-600">
                <i data-lucide="info" class="w-4 h-4 text-rose-500 shrink-0 mt-0.5"></i>
                <span>This action will permanently delete all registered warehouse inventory locations and stock history linked to this SKU.</span>
            </div>
            <div class="pt-2 flex justify-end gap-2.5">
                <button type="button" class="close-modal px-4 py-2 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-55 bg-white">Cancel</button>
                <button type="button" id="btn-confirm-delete" class="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black uppercase tracking-wider">Confirm Delete</button>
            </div>
        </div>
    </div>
</div>

<!-- PURCHASE ORDER PREVIEW MODAL -->
<div id="modal-purchase-order" class="hidden fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
    <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden transform transition-all duration-300 scale-95 animate-slide-up-fade">
        <header class="bg-[#2D6A24] text-white p-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i data-lucide="file-text" class="w-4 h-4"></i>
                <h3 class="text-sm font-black uppercase tracking-wider font-outfit">Procurement Purchase Order</h3>
            </div>
            <button class="close-modal text-white/80 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
        </header>
        
        <div class="p-6 space-y-6">
            <!-- PO Receipt Header -->
            <div class="flex justify-between items-start text-xs border-b border-slate-100 pb-4">
                <div class="space-y-1">
                    <span class="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Supplier Details</span>
                    <span class="block font-black text-slate-800" id="po-supplier-name">AgriGrow Supplies Corp.</span>
                    <span class="block text-[9px] text-slate-400 font-semibold leading-relaxed">Indang Agricultural Zone, Cavite</span>
                </div>
                <div class="text-right space-y-1">
                    <span class="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">PO Number</span>
                    <span class="block font-mono font-bold text-[#2D6A24]" id="po-invoice-no">PO-2026-0042</span>
                    <span class="block text-[9px] text-slate-400 font-semibold" id="po-date">Date: 2026-07-07</span>
                </div>
            </div>

            <!-- PO Item Details table -->
            <div class="space-y-2">
                <span class="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Order Details</span>
                <div class="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden p-4 space-y-3">
                    <div class="flex justify-between items-center text-xs">
                        <div>
                            <span class="block font-black text-slate-800" id="po-item-name">Hybrid Rice Seeds</span>
                            <span class="block text-[8px] font-bold text-slate-400 uppercase mt-0.5" id="po-item-sku">SKU: AGRI-SEED-042</span>
                        </div>
                        <div class="text-right">
                            <span class="block font-mono font-bold text-slate-700" id="po-item-qty">82.00 bags</span>
                            <span class="block text-[8px] font-bold text-slate-400 uppercase mt-0.5">Deficit Order Qty</span>
                        </div>
                    </div>
                    <div class="border-t border-slate-200/50 pt-2 flex justify-between items-center text-xs">
                        <span class="font-bold text-slate-500">Unit Price:</span>
                        <span class="font-mono text-slate-700" id="po-unit-price">PHP 1,800.00</span>
                    </div>
                    <div class="border-t border-slate-200/50 pt-2.5 flex justify-between items-center text-xs">
                        <span class="font-black text-slate-800 uppercase tracking-wider text-[10px]">Estimated Total Valuation:</span>
                        <span class="font-mono font-black text-[#2D6A24] text-sm" id="po-total-price">PHP 147,600.00</span>
                    </div>
                </div>
            </div>

            <!-- Footer Notice -->
            <div class="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-start gap-2.5 text-[9px] leading-relaxed text-[#2D6A24]">
                <i data-lucide="info" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
                <span>This PO is auto-calculated to replenish the stock back to its Maximum Quantity Threshold to optimize warehouse storage.</span>
            </div>

            <!-- Action buttons -->
            <div class="flex justify-end gap-2.5 border-t border-slate-100 pt-4">
                <button type="button" class="close-modal px-4 py-2 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 bg-white">Close</button>
                <button type="button" id="btn-dispatch-po" class="px-5 py-2 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer">
                    <i data-lucide="send" class="w-3.5 h-3.5"></i>
                    <span>Approve & Dispatch PO</span>
                </button>
            </div>
        </div>
    </div>
</div>

<!-- SYSTEM SETTINGS / CONFIGURATIONS MODAL -->
<div id="modal-settings" class="hidden fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
    <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden transform transition-all duration-300 scale-95 animate-slide-up-fade">
        <header class="bg-[#2D6A24] text-white p-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i data-lucide="settings" class="w-4 h-4"></i>
                <h3 class="text-sm font-black uppercase tracking-wider font-outfit">System Configurations</h3>
            </div>
            <button class="close-modal text-white/80 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
        </header>
        
        <div class="p-6 space-y-6">
            <!-- Currency Selector Option -->
            <div class="space-y-2">
                <label class="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Base Currency Conversion</label>
                <div class="grid grid-cols-2 gap-2">
                    <button type="button" id="btn-currency-php" class="py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer bg-slate-50 text-slate-800">
                        <span>PHP (₱)</span>
                    </button>
                    <button type="button" id="btn-currency-usd" class="py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer bg-white text-slate-500 hover:bg-slate-50">
                        <span>USD ($)</span>
                    </button>
                </div>
                <span class="block text-[8px] text-slate-400 leading-normal">Swaps display symbols and automatically divides PHP prices by 58.00 in the dashboard, PO reports, and ledger tables.</span>
            </div>

            <div class="pt-4 flex justify-end border-t border-slate-100">
                <button type="button" class="close-modal px-5 py-2.5 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer">Done</button>
            </div>
        </div>
    </div>
</div>

<!-- GLOBAL TOAST NOTIFICATIONS -->
<div id="toast-container" class="fixed bottom-6 right-6 z-55 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
    <!-- Toast items prepended dynamically -->
</div>
