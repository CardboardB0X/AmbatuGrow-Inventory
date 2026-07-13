<!-- Header (Top bar) -->
<header class="h-16 bg-slate-200/50 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
    <!-- Breadcrumbs & Tab Title -->
    <div class="flex items-center gap-2">
        <i data-lucide="terminal" class="w-4 h-4 text-[#2D6A24]"></i>
        <span class="text-xs font-black uppercase tracking-wider text-slate-400">Terminal</span>
        <span class="text-xs font-black text-slate-300">/</span>
        <span class="text-xs font-black text-slate-800 font-outfit" id="header-view-title">Dashboard Launchpad</span>
    </div>

    <!-- Center Search / Command Palette Shortcut -->
    <div class="hidden sm:flex items-center gap-2 max-w-sm w-80 relative">
        <i data-lucide="search" class="w-3.5 h-3.5 absolute left-3 text-slate-400"></i>
        <input type="text" id="global-search" placeholder="Search inventory or type commands... (Ctrl+K)" class="w-full bg-white pl-9 pr-4 py-1.5 text-xs font-semibold rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24]">
    </div>

    <!-- Right Toolbar (Profile and Actions) -->
    <div class="flex items-center gap-4">
        <!-- User Actions -->
        <button id="btn-transfer-wizard" class="py-1.5 px-3 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all">
            <i data-lucide="arrow-right-left" class="w-3 h-3"></i>
            <span>Transfer Wizard</span>
        </button>
    </div>
</header>
