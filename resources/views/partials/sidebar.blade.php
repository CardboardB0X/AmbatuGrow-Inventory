<!-- SIDEBAR (Column 1 - 3-Tier Layout) -->
<aside id="sidebar-container" class="w-72 border-r border-slate-200 flex shrink-0 transition-all duration-300">
    <!-- Tier 1: Department Switcher (Outer thin sidebar) -->
    <div class="w-14 bg-[#173812] flex flex-col justify-between items-center py-5 shrink-0 border-r border-[#2D6A24]/10">
        <div class="flex flex-col items-center gap-6 w-full">
            <!-- Brand Logo -->
            <div class="w-9 h-9 bg-white rounded-xl flex items-center justify-center p-1 shadow-md border border-emerald-800/10 shrink-0">
                <img src="/logo.png" alt="Logo" class="object-contain w-full h-full">
            </div>

            <!-- Department Switcher list -->
            <div class="flex flex-col items-center gap-4 w-full px-2">
                <!-- Inventory System (Active) -->
                <button class="w-9 h-9 rounded-xl bg-[#2D6A24] text-white flex items-center justify-center shadow-md relative group cursor-pointer" title="Inventory System">
                    <i data-lucide="layers" class="w-4 h-4"></i>
                    <span class="absolute left-12 bg-slate-900 text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-md hidden group-hover:block z-50 whitespace-nowrap">Inventory Tracking</span>
                </button>

                <!-- Procurement (Locked) -->
                <button class="btn-locked-dept w-9 h-9 rounded-xl bg-slate-900/40 text-slate-500 hover:text-slate-400 flex items-center justify-center relative group cursor-not-allowed border border-slate-800/20" data-dept="Procurement" title="Procurement (Locked)">
                    <i data-lucide="shopping-cart" class="w-4 h-4 opacity-60"></i>
                    <div class="absolute -bottom-1 -right-1 bg-slate-950/80 text-rose-500 rounded-full p-0.5 border border-slate-900">
                        <i data-lucide="lock" class="w-2 h-2"></i>
                    </div>
                    <span class="absolute left-12 bg-slate-900 text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-md hidden group-hover:block z-50 whitespace-nowrap">Procurement (LOCKED)</span>
                </button>

                <!-- Logistics (Locked) -->
                <button class="btn-locked-dept w-9 h-9 rounded-xl bg-slate-900/40 text-slate-500 hover:text-slate-400 flex items-center justify-center relative group cursor-not-allowed border border-slate-800/20" data-dept="Sales & Logistics" title="Sales & Logistics (Locked)">
                    <i data-lucide="truck" class="w-4 h-4 opacity-60"></i>
                    <div class="absolute -bottom-1 -right-1 bg-slate-950/80 text-rose-500 rounded-full p-0.5 border border-slate-900">
                        <i data-lucide="lock" class="w-2 h-2"></i>
                    </div>
                    <span class="absolute left-12 bg-slate-900 text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-md hidden group-hover:block z-50 whitespace-nowrap">Logistics (LOCKED)</span>
                </button>

                <!-- Finance (Locked) -->
                <button class="btn-locked-dept w-9 h-9 rounded-xl bg-slate-900/40 text-slate-500 hover:text-slate-400 flex items-center justify-center relative group cursor-not-allowed border border-slate-800/20" data-dept="Finance" title="Finance (Locked)">
                    <i data-lucide="banknote" class="w-4 h-4 opacity-60"></i>
                    <div class="absolute -bottom-1 -right-1 bg-slate-950/80 text-rose-500 rounded-full p-0.5 border border-slate-900">
                        <i data-lucide="lock" class="w-2 h-2"></i>
                    </div>
                    <span class="absolute left-12 bg-slate-900 text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-md hidden group-hover:block z-50 whitespace-nowrap">Finance (LOCKED)</span>
                </button>
            </div>
        </div>

        <!-- Bottom User/Diagnostic triggers -->
        <div class="flex flex-col items-center gap-4 w-full">
            <button class="btn-locked-dept w-9 h-9 rounded-xl bg-slate-900/40 text-slate-500 hover:text-slate-400 flex items-center justify-center relative group cursor-pointer border border-slate-800/20" data-dept="Nodes Status" title="System Nodes Status">
                <i data-lucide="activity" class="w-4 h-4"></i>
                <span class="absolute left-12 bg-slate-900 text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-md hidden group-hover:block z-50 whitespace-nowrap">Nodes Status</span>
            </button>
        </div>
    </div>

    <!-- Tier 2: Navigation & Section Scope (Inner sidebar) -->
    <div class="flex-1 bg-slate-200/80 flex flex-col justify-between min-w-0">
        <div>
            <!-- Brand text Header -->
            <div class="flex items-center gap-3 p-5 border-b border-slate-200/80 shrink-0">
                <div class="brand-details flex flex-col min-w-0">
                    <span class="text-xs font-black uppercase tracking-wider leading-none">AMBATUGROW</span>
                    <span class="text-[9px] text-[#2D6A24] font-bold mt-0.5">Inventory Portal</span>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <nav class="p-4 space-y-1.5" id="sidebar-nav">
                <button data-tab="dashboard" class="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-full transition-all text-left bg-[#2D6A24] text-white">
                    <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                    <span>Dashboard Launchpad</span>
                </button>
                <button data-tab="tracking" class="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-full transition-all text-left text-slate-600 hover:bg-slate-200 hover:text-slate-800">
                    <i data-lucide="layers" class="w-4 h-4"></i>
                    <span>Inventory Tracking</span>
                </button>
                <button data-tab="ledger" class="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-full transition-all text-left text-slate-600 hover:bg-slate-200 hover:text-slate-800">
                    <i data-lucide="history" class="w-4 h-4"></i>
                    <span>Stock Transactions</span>
                </button>
                <button data-tab="zones" class="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-full transition-all text-left text-slate-600 hover:bg-slate-200 hover:text-slate-800">
                    <i data-lucide="warehouse" class="w-4 h-4"></i>
                    <span>Warehouse Location Tracking</span>
                </button>
                <button data-tab="reports" class="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-full transition-all text-left text-slate-600 hover:bg-slate-200 hover:text-slate-800">
                    <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                    <span>Inventory Reporting and Alerts</span>
                </button>
            </nav>
        </div>

        <!-- Footer Utilities -->
        <div class="p-4 border-t border-slate-200/80 space-y-3 shrink-0">
            <!-- User Badge -->
            <div class="flex items-center gap-3 p-2 bg-white/40 rounded-xl">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#2D6A24] border border-[#2D6A24]/20 flex items-center justify-center font-bold shrink-0">
                    <i data-lucide="shield" class="w-4 h-4"></i>
                </div>
                <div class="brand-details min-w-0">
                    <div class="text-[10px] font-black text-slate-800 truncate" id="sidebar-username">System Admin</div>
                    <div class="text-[8px] font-bold text-slate-400 uppercase tracking-wide" id="sidebar-role">Administrator</div>
                </div>
            </div>

            <!-- Theme / Settings Buttons -->
            <div class="flex gap-2">
                <button id="theme-toggle" class="flex-1 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1.5 text-[9px] font-bold shadow-xs">
                    <i data-lucide="sun" id="theme-icon" class="w-3.5 h-3.5"></i>
                    <span id="theme-text">Light Mode</span>
                </button>
                <button id="btn-settings" class="px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-700 flex items-center justify-center shadow-xs" title="Settings">
                    <i data-lucide="settings" class="w-3.5 h-3.5"></i>
                </button>
                <button id="btn-logout" class="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-600 hover:text-rose-700 flex items-center justify-center shadow-xs" title="Sign Out">
                    <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
                </button>
            </div>
        </div>
    </div>
</aside>
