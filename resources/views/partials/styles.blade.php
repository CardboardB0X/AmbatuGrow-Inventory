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
