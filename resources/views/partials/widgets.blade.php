<!-- RIGHT-SIDE LOG TERMINAL (Column 3) -->
<aside class="w-80 border-l border-slate-200 bg-white p-6 flex flex-col gap-6 overflow-y-auto select-none shrink-0 min-h-0" id="widget-sidebar">
    
    <!-- Widget 1: Low Stock Warning Container -->
    <div id="sidebar-widget-low-stock"></div>

    <!-- Widget 2: Zone Density (Screenshot Progress Bars) -->
    <div class="space-y-4" id="sidebar-widget-zone-density">
        <div class="flex items-center gap-2 text-slate-800">
            <i data-lucide="map-pin" class="w-4 h-4 text-emerald-700 shrink-0"></i>
            <h4 class="font-extrabold text-sm">Zone Density</h4>
        </div>
        <div class="space-y-3.5" id="sidebar-zones-list">
            <!-- Injected dynamically -->
        </div>
    </div>

    <!-- Widget 3: Recent Logs timeline -->
    <div class="flex-1 flex flex-col min-h-0 space-y-4" id="sidebar-widget-recent-logs">
        <div class="flex justify-between items-center text-slate-800 shrink-0">
            <div class="flex items-center gap-2">
                <i data-lucide="clock" class="w-4 h-4 text-emerald-700 shrink-0"></i>
                <h4 class="font-extrabold text-sm">Recent Logs</h4>
            </div>
            <button id="sidebar-btn-view-all-logs" class="text-[10px] font-black uppercase tracking-wider text-emerald-700 hover:text-emerald-950 hover:underline cursor-pointer bg-transparent border-none">
                View All
            </button>
        </div>
        <div class="flex-1 overflow-y-auto pr-1 space-y-4" id="sidebar-logs-list">
            <!-- Injected dynamically -->
        </div>
    </div>

</aside>
