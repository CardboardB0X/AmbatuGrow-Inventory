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
