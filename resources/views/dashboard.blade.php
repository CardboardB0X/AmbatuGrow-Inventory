@extends('layouts.app')

@section('content')

@include('partials.styles')

<div id="app-container" class="relative h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900 antialiased">
    
    @include('partials.login')

    <!-- ========================================== -->
    <!-- 2. MAIN ERP WORKING INTERFACE              -->
    <!-- ========================================== -->
    <div id="erp-shell" class="hidden flex h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900 antialiased animate-fade-in relative">
        
        @include('partials.sidebar')

        <!-- MAIN WINDOW CONTAINER (Column 2) -->
        <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            @include('partials.header')

            <!-- Dynamic Workspace Content + Right widgets -->
            <div class="flex-1 flex min-h-0 overflow-hidden">
                
                <!-- Central Core Workspace -->
                <main class="flex-1 flex flex-col min-h-0 p-6 bg-slate-50 transition-all duration-300" id="main-workspace">
                    <!-- Core views injected dynamically by JavaScript templates -->
                </main>

                @include('partials.widgets')

            </div>
        </div>

    </div>

    @include('partials.modals')

</div>
@endsection
