@extends('layouts.app')

@section('content')
<style>
    /* Collapsible 3-Tier Sidebar CSS Styles */
    #sidebar-container {
        width: 7rem; /* w-28 (112px) = Tier 1 (56px) + Tier 2 (56px) when minimized */
        transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
        overflow-x: hidden;
    }
    
    #sidebar-container.expanded {
        width: 20rem; /* Expanded to 320px (Tier 1 is 56px, Tier 2 is 264px) to prevent text truncation */
    }
    
    /* Text labels hiding rules */
    #sidebar-container nav button span,
    #sidebar-container .brand-details,
    #sidebar-container #theme-text {
        opacity: 0;
        width: 0;
        overflow: hidden;
        white-space: nowrap;
        display: none;
    }
    
    #sidebar-container.expanded nav button span,
    #sidebar-container.expanded .brand-details {
        opacity: 1;
        width: auto;
        display: inline-block;
        margin-left: 0.5rem;
    }
    
    #sidebar-container.expanded #theme-text {
        opacity: 1;
        width: auto;
        display: inline;
        margin-left: 0.5rem;
    }
    
    /* Alignments when collapsed vs expanded */
    #sidebar-container nav button {
        justify-content: center;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
    #sidebar-container.expanded nav button {
        justify-content: flex-start;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    #sidebar-container.expanded .brand-details {
        display: flex;
    }

    /* Collapsed state layouts for Profile & Footer utilities */
    #sidebar-container:not(.expanded) nav {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
    }

    #sidebar-container:not(.expanded) nav button {
        width: 2.25rem; /* 36px */
        height: 2.25rem; /* 36px */
        border-radius: 0.75rem;
        padding: 0 !important;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
    }

    #sidebar-container:not(.expanded) .p-4.border-t {
        padding: 1rem 0.5rem !important; /* Tighter padding for vertical stack */
    }

    #sidebar-container:not(.expanded) .bg-white\/40 {
        background-color: transparent !important;
        padding: 0 !important;
        justify-content: center;
        border: none !important;
    }

    #sidebar-container:not(.expanded) .bg-white\/40 .shrink-0 {
        margin: 0 auto;
    }

    #sidebar-container:not(.expanded) .flex.gap-2 {
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    #sidebar-container:not(.expanded) #theme-toggle,
    #sidebar-container:not(.expanded) #btn-settings {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 0.75rem;
        padding: 0 !important;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: none !important;
    }
</style>
<div id="app-container" class="relative h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900 antialiased">
    
    <!-- ========================================== -->
    <!-- 1. LOGIN GATEWAY OVERLAY                   -->
    <!-- ========================================== -->
    <div id="login-gateway" class="fixed inset-0 z-50 flex h-screen w-screen bg-slate-100 overflow-hidden select-none transition-all duration-500">
        <!-- Brand Panel (Left) -->
        <section class="hidden md:flex md:w-1/2 bg-[#2D6A24] relative flex-col justify-between p-12 text-white transition-transform duration-700 ease-out" id="login-brand-panel">
            <div class="flex items-center gap-2">
                <i data-lucide="shield-check" class="w-5 h-5 text-[#aee2a4]"></i>
                <span class="text-[10px] font-black uppercase tracking-widest text-[#c2e4bb]">Secure Gateway Access</span>
            </div>
            
            <div class="flex flex-col items-center text-center justify-center flex-1 space-y-6">
                <div class="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-2 border border-emerald-300/20">
                    <img src="/logo.png" alt="Ambatugrow Logo" class="object-contain w-full h-full">
                </div>
                <div>
                    <h1 class="text-3xl font-black tracking-widest text-white leading-tight font-outfit">AMBATUGROW</h1>
                    <p class="text-xs text-emerald-200/80 font-bold tracking-wider mt-1 uppercase">Inventory Terminal ERP</p>
                </div>
            </div>
            
            <div class="flex justify-between items-end border-t border-emerald-800/60 pt-4">
                <div class="text-[10px] font-bold text-emerald-300/80">Node: Gateway-US-West</div>
                <div class="text-right">
                    <div id="gateway-time" class="font-mono text-sm font-black tracking-widest text-white leading-none">00:00:00</div>
                    <div id="gateway-date" class="text-[9px] font-bold text-emerald-200/80 uppercase mt-1 tracking-wider">Loading...</div>
                </div>
            </div>
        </section>

        <!-- Credentials Portal (Right) -->
        <section class="w-full md:w-1/2 bg-white flex items-center justify-center p-8 relative" id="login-form-panel">
    <!-- Full-Screen Node Connection Loader -->
    <div id="login-loader" class="hidden fixed inset-0 z-55 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white select-none">
        <div class="w-full max-w-md space-y-8 flex flex-col items-center">
            
            <!-- Circuit Node Animation -->
            <div class="relative w-40 h-40 flex items-center justify-center">
                <!-- Center Core Node -->
                <div class="w-14 h-14 bg-[#2D6A24] rounded-full border border-emerald-400 shadow-[0_0_25px_rgba(45,106,36,0.6)] flex items-center justify-center z-10 animate-pulse">
                    <i data-lucide="shield" class="w-6 h-6 text-emerald-100"></i>
                </div>
                
                <!-- Satellite Node 1 (Top Left) -->
                <div class="sat-node absolute top-0 left-0 w-8 h-8 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center transition-all duration-300" id="node-sat-1">
                    <i data-lucide="database" class="w-4 h-4 text-slate-500"></i>
                </div>
                <!-- Satellite Node 2 (Top Right) -->
                <div class="sat-node absolute top-0 right-0 w-8 h-8 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center transition-all duration-300" id="node-sat-2">
                    <i data-lucide="key-round" class="w-4 h-4 text-slate-500"></i>
                </div>
                <!-- Satellite Node 3 (Bottom Left) -->
                <div class="sat-node absolute bottom-0 left-0 w-8 h-8 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center transition-all duration-300" id="node-sat-3">
                    <i data-lucide="network" class="w-4 h-4 text-slate-500"></i>
                </div>
                <!-- Satellite Node 4 (Bottom Right) -->
                <div class="sat-node absolute bottom-0 right-0 w-8 h-8 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center transition-all duration-300" id="node-sat-4">
                    <i data-lucide="server" class="w-4 h-4 text-slate-500"></i>
                </div>

                <!-- Connections SVG paths -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 160">
                    <line x1="20" y1="20" x2="80" y2="80" stroke="rgba(148, 163, 184, 0.15)" stroke-width="2" id="line-sat-1" class="transition-all duration-300"/>
                    <line x1="140" y1="20" x2="80" y2="80" stroke="rgba(148, 163, 184, 0.15)" stroke-width="2" id="line-sat-2" class="transition-all duration-300"/>
                    <line x1="20" y1="140" x2="80" y2="80" stroke="rgba(148, 163, 184, 0.15)" stroke-width="2" id="line-sat-3" class="transition-all duration-300"/>
                    <line x1="140" y1="140" x2="80" y2="80" stroke="rgba(148, 163, 184, 0.15)" stroke-width="2" id="line-sat-4" class="transition-all duration-300"/>
                </svg>
            </div>

            <!-- Monospace status console -->
            <div class="w-full space-y-3.5">
                <div class="flex items-center justify-between text-[10px] font-black text-slate-400 font-mono">
                    <span id="load-status-title" class="animate-pulse">INITIALIZING HANDSHAKE...</span>
                    <span id="load-status-percent">0%</span>
                </div>
                
                <!-- Progress Bar -->
                <div class="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div class="bg-emerald-500 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_#10b981]" style="width: 0%" id="load-progress-bar"></div>
                </div>

                <!-- Logs console box -->
                <div class="w-full h-32 bg-slate-950 border border-slate-900 rounded-2xl p-4 font-mono text-[9px] text-emerald-400 space-y-1.5 overflow-y-auto leading-relaxed shadow-inner" id="loader-console-logs"></div>
            </div>
            
        </div>
    </div>

            <div class="w-full max-w-sm space-y-8">
                <div class="space-y-2 text-center md:text-left">
                    <div class="md:hidden flex items-center justify-center gap-2 mb-4">
                        <div class="w-9 h-9 bg-white rounded-lg shadow border border-slate-200 flex items-center justify-center p-1">
                            <img src="/logo.png" alt="Logo" class="object-contain w-full h-full">
                        </div>
                        <span class="font-extrabold text-sm tracking-wider text-slate-800">AMBATUGROW</span>
                    </div>
                    <h2 class="text-2xl font-black text-slate-800 tracking-tight font-outfit">Welcome to Terminal</h2>
                    <p class="text-xs text-slate-400 font-bold leading-tight">Enter credentials to access the central directories.</p>
                </div>

                <form id="login-form" class="space-y-5">
                    <div class="space-y-1">
                        <label class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Username or Email</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <i data-lucide="user" class="w-4 h-4"></i>
                            </div>
                            <input type="text" id="username" required value="admin@ambatugrow.com" class="w-full pl-9 pr-4 py-2.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] focus:bg-white text-slate-700 transition-all">
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <i data-lucide="key-round" class="w-4 h-4"></i>
                            </div>
                            <input type="password" id="password" required value="admin123" class="w-full pl-9 pr-4 py-2.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6A24]/20 focus:border-[#2D6A24] focus:bg-white text-slate-700 transition-all">
                        </div>
                    </div>

                    <div class="flex items-center justify-between text-[10px] font-bold text-slate-400">
                        <label class="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" class="rounded text-[#2D6A24] focus:ring-0 focus:ring-offset-0 cursor-pointer">
                            <span>Remember session</span>
                        </label>
                        <a href="#" class="hover:text-slate-600 transition-colors">Forgot Password?</a>
                    </div>

                    <button type="submit" class="w-full py-2.5 bg-[#2D6A24] hover:bg-[#23531B] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all hover:scale-[1.01] hover:shadow cursor-pointer flex items-center justify-center gap-2">
                        Sign In to Terminal
                    </button>
                </form>

                <div class="p-3 bg-slate-50 border border-slate-200/60 rounded-xl text-center">
                    <span class="text-[8px] font-extrabold text-slate-400 block uppercase tracking-wider">Simulation Sandbox</span>
                    <span class="text-[9px] font-bold text-slate-500 mt-1 block leading-normal">Admin: admin@ambatugrow.com / admin123<br>Officer: officer@ambatugrow.com / officer123</span>
                </div>
            </div>
        </section>
    </div>

    <!-- ========================================== -->
    <!-- 2. MAIN ERP WORKING INTERFACE              -->
    <!-- ========================================== -->
    <div id="erp-shell" class="hidden flex h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900 antialiased animate-fade-in relative">
        
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
                        <button id="btn-settings" class="px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-700 flex items-center justify-center shadow-xs">
                            <i data-lucide="settings" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
            </div>
        </aside>

        <!-- MAIN WINDOW CONTAINER (Column 2) -->
        <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
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

            <!-- Dynamic Workspace Content + Right widgets -->
            <div class="flex-1 flex min-h-0 overflow-hidden">
                
                <!-- Central Core Workspace -->
                <main class="flex-1 flex flex-col min-h-0 p-6 bg-slate-50 transition-all duration-300" id="main-workspace">
                    <!-- Core views injected dynamically by JavaScript templates -->
                </main>

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

            </div>
        </div>

    </div>

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

</div>
@endsection
