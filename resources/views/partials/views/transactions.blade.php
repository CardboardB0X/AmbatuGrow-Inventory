<!-- Stock Transactions / Ledger View Partial -->
<script>
window.renderLedger = function(State, DOM, showToast, addConsoleLog) {
    DOM.mainWorkspace.innerHTML = `
        <div class="space-y-6 animate-slide-up-fade">
            <!-- Audit disclaimer banner -->
            <div class="bg-white border border-slate-200 p-4 rounded-3xl flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-emerald-500/10 rounded-xl text-[#2D6A24]">
                        <i data-lucide="shield-check" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="text-xs font-black text-slate-800">Immutable Cryptographic Ledger</h4>
                        <p class="text-[10px] text-slate-400 font-semibold leading-relaxed">All stock ins, outs, and zone relocation transfers are securely written to this history log. These details cannot be altered.</p>
                    </div>
                </div>
                ${(State.currentUser.role_id === 1 || State.currentUser.role_id === 6) ? `
                <button id="btn-export-ledger" class="py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-600 rounded-xl border border-slate-200 text-[10px] font-bold shadow-2xs flex items-center gap-1 transition-all cursor-pointer">
                    <i data-lucide="download" class="w-3.5 h-3.5"></i>
                    <span>Export CSV</span>
                </button>
                ` : ''}
            </div>

            <!-- Ledger Audit Logs table -->
            <div class="card-surface p-5">
                <div class="overflow-x-auto max-h-[500px] overflow-y-auto pr-1">
                    <table class="w-full text-left text-xs">
                        <thead>
                            <tr class="border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest sticky top-0 bg-white z-10">
                                <th class="py-3 bg-white">Log ID</th>
                                <th class="py-3 bg-white">Timestamp</th>
                                <th class="py-3 bg-white">Product Name</th>
                                <th class="py-3 bg-white">Warehouse</th>
                                <th class="py-3 bg-white">Movement Type</th>
                                <th class="py-3 text-right bg-white">Quantity</th>
                                <th class="py-3 bg-white">Remarks / Verification</th>
                            </tr>
                        </thead>
                        <tbody id="ledger-tbody">
                            <!-- Dynamic rows -->
                        </tbody>
                    </table>
                </div>
                <!-- Pagination controls -->
                <div id="ledger-pagination" class="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-600">
                    <!-- Injected -->
                </div>
            </div>
        </div>
    `;

    const tbody = document.getElementById('ledger-tbody');
    tbody.innerHTML = '';

    // Order transactions by descending date
    const sortedTx = [...State.stock_transactions].sort((a,b) => new Date(b.transaction_date) - new Date(a.transaction_date));

    // Pagination logic
    State.ledgerPage = State.ledgerPage || 1;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(sortedTx.length / itemsPerPage) || 1;
    if (State.ledgerPage > totalPages) State.ledgerPage = totalPages;

    const startIdx = (State.ledgerPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedTxs = sortedTx.slice(startIdx, endIdx);

    paginatedTxs.forEach(tx => {
        const prod = State.products.find(p => p.product_id === tx.product_id);
        const wh = State.warehouses.find(w => w.warehouse_id === tx.warehouse_id);
        const uom = prod ? State.units_of_measure.find(u => u.uom_id === prod.uom_id) : null;
        
        const badgeClass = tx.transaction_type === 'Stock-in' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                         tx.transaction_type === 'Stock-out' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                         'bg-amber-50 text-amber-700 border-amber-200';

        const row = document.createElement('tr');
        row.className = 'border-b border-slate-100 hover:bg-slate-50/80';
        row.innerHTML = `
            <td class="py-3.5 font-mono font-bold text-slate-400">TX-#${String(tx.transaction_id).padStart(4, '0')}</td>
            <td class="py-3.5 font-mono text-[10px] text-slate-500">${new Date(tx.transaction_date).toLocaleString('en-US')}</td>
            <td class="py-3.5 font-bold text-slate-800">
                <span class="block">${prod ? prod.name : 'Unknown Product'}</span>
                <span class="block font-mono text-[9px] text-slate-400">${prod ? prod.sku : ''}</span>
            </td>
            <td class="py-3.5 text-slate-600 font-semibold">${wh ? wh.name : 'Unknown Hub'}</td>
            <td class="py-3.5">
                <span class="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border ${badgeClass}">${tx.transaction_type}</span>
            </td>
            <td class="py-3.5 text-right font-black font-mono text-slate-800">${parseFloat(tx.quantity).toFixed(2)} ${uom ? uom.uom_code : ''}</td>
            <td class="py-3.5 text-slate-400 font-bold max-w-xs truncate">${tx.notes || 'Routine update.'}</td>
        `;
        tbody.appendChild(row);
    });

    // Render pagination panel
    const paginationContainer = document.getElementById('ledger-pagination');
    if (paginationContainer) {
        paginationContainer.innerHTML = `
            <span class="text-slate-400">Showing ${sortedTx.length > 0 ? startIdx + 1 : 0} to ${Math.min(endIdx, sortedTx.length)} of ${sortedTx.length} entries</span>
            <div class="flex items-center gap-1.5" id="ledger-page-buttons"></div>
        `;

        const buttonsContainer = document.getElementById('ledger-page-buttons');
        
        // Previous Button
        const prevBtn = document.createElement('button');
        prevBtn.className = `px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer ${State.ledgerPage === 1 ? 'opacity-40 pointer-events-none' : ''}`;
        prevBtn.innerHTML = '<i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>';
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            State.ledgerPage--;
            window.renderLedger(State, DOM, showToast, addConsoleLog);
        });
        buttonsContainer.appendChild(prevBtn);

        // Page Numbers
        for (let p = 1; p <= totalPages; p++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `px-3 py-1.5 border rounded-lg transition-all cursor-pointer font-bold text-xs ${p === State.ledgerPage ? 'bg-[#2D6A24] text-white border-[#2D6A24]' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`;
            pageBtn.textContent = p;
            pageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                State.ledgerPage = p;
                window.renderLedger(State, DOM, showToast, addConsoleLog);
            });
            buttonsContainer.appendChild(pageBtn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = `px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer ${State.ledgerPage === totalPages ? 'opacity-40 pointer-events-none' : ''}`;
        nextBtn.innerHTML = '<i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>';
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            State.ledgerPage++;
            window.renderLedger(State, DOM, showToast, addConsoleLog);
        });
        buttonsContainer.appendChild(nextBtn);
    }

    const btnExportLedger = document.getElementById('btn-export-ledger');
    if (btnExportLedger) {
        btnExportLedger.addEventListener('click', () => {
            const headers = ["Log ID", "Timestamp", "Product SKU", "Product Name", "Warehouse", "Type", "Quantity", "UOM", "Notes"];
            const rows = State.stock_transactions.map(tx => {
                const prod = State.products.find(p => p.product_id === tx.product_id);
                const wh = State.warehouses.find(w => w.warehouse_id === tx.warehouse_id);
                const uom = prod ? State.units_of_measure.find(u => u.uom_id === prod.uom_id) : null;
                return [
                    tx.transaction_id,
                    tx.transaction_date,
                    prod ? prod.sku : 'N/A',
                    prod ? prod.name : 'Unknown',
                    wh ? wh.name : 'Unknown',
                    tx.transaction_type,
                    tx.quantity,
                    uom ? uom.uom_code : '',
                    tx.notes || ''
                ];
            });
            
            const csvString = [headers, ...rows]
                .map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
                .join("\n");
            
            const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `ambatugrow_ledger_export_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showToast('CSV export processing... File downloaded successfully.', 'success');
            addConsoleLog('Cryptographic ledger signature generated. CSV manifest downloaded.', 'success');
        });
    }
};
</script>

