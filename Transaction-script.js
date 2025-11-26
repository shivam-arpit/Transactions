document.addEventListener('DOMContentLoaded', function() {
    const paymentsBtn = document.getElementById('payments-btn');
    const invoicesBtn = document.getElementById('invoices-btn');
    const paymentsTable = document.getElementById('payments-table');
    const invoicesTable = document.getElementById('invoices-table');
    const pageTitle = document.getElementById('page-title');

    // Initialize with Payments view
    showPayments();

    // Event listeners for toggle buttons
    paymentsBtn.addEventListener('click', showPayments);
    invoicesBtn.addEventListener('click', showInvoices);

    function showPayments() {
        // Update buttons
        paymentsBtn.classList.add('active');
        invoicesBtn.classList.remove('active');
        
        // Update tables
        paymentsTable.classList.add('active');
        invoicesTable.classList.remove('active');
        
        // Update page title
        pageTitle.textContent = 'Transactions - Payments';
    }

    function showInvoices() {
        // Update buttons
        invoicesBtn.classList.add('active');
        paymentsBtn.classList.remove('active');
        
        // Update tables
        invoicesTable.classList.add('active');
        paymentsTable.classList.remove('active');
        
        // Update page title
        pageTitle.textContent = 'Transactions - Invoices';
    }

    // Add click handlers for links in payments table
    const paymentLinks = document.querySelectorAll('#payments-table .link');
    paymentLinks.forEach(link => {
        link.addEventListener('click', function() {
            alert('Payment details for: ' + this.textContent);
            // Here you can add functionality to show payment details modal or navigate to details page
        });
    });

    // Add hover effects for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Invoice filter functionality
    const openInvoicesBtn = document.getElementById('open-invoices-btn');
    const closedInvoicesBtn = document.getElementById('closed-invoices-btn');
    const invoiceRows = document.querySelectorAll('.invoice-row');

    // Initialize with Open Invoices view
    showOpenInvoices();

    openInvoicesBtn.addEventListener('click', showOpenInvoices);
    closedInvoicesBtn.addEventListener('click', showClosedInvoices);

    function showOpenInvoices() {
        openInvoicesBtn.classList.add('active');
        closedInvoicesBtn.classList.remove('active');
        
        invoiceRows.forEach(row => {
            if (row.classList.contains('open-invoice')) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function showClosedInvoices() {
        closedInvoicesBtn.classList.add('active');
        openInvoicesBtn.classList.remove('active');
        
        invoiceRows.forEach(row => {
            if (row.classList.contains('closed-invoice')) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
});

// PDF Modal Functions
let currentInvoiceId = '';

function openInvoicePDF(invoiceId) {
    currentInvoiceId = invoiceId;
    const modal = document.getElementById('pdf-modal');
    const pdfInvoiceId = document.getElementById('pdf-invoice-id');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    // Update modal title
    pdfInvoiceId.textContent = invoiceId;
    
    // Generate or load PDF (this is where you'd integrate with your backend)
    const pdfUrl = generateInvoicePDF(invoiceId);
    
    // Set PDF in iframe
    pdfViewer.src = pdfUrl;
    
    // Show modal
    modal.style.display = 'block';
}

function closePDFModal() {
    const modal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    modal.style.display = 'none';
    pdfViewer.src = '';
    currentInvoiceId = '';
}

function downloadPDF() {
    if (currentInvoiceId) {
        // Simulate PDF download
        const pdfUrl = generateInvoicePDF(currentInvoiceId);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${currentInvoiceId}.pdf`;
        link.click();
        
        // In real implementation, this would be:
        // window.open(`/api/invoices/${currentInvoiceId}/download`, '_blank');
    }
}

function printPDF() {
    const pdfViewer = document.getElementById('pdf-viewer');
    pdfViewer.contentWindow.print();
}

// Generate PDF URL - Replace this with your actual PDF generation logic
function generateInvoicePDF(invoiceId) {
    // This is a mock implementation
    // In a real application, you would:
    // 1. Call your backend API to generate the PDF
    // 2. Return the PDF URL or blob
    
    // For demo purposes, using a sample PDF
    const samplePDFs = {
        'INV-2025-1234': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        'INV-2025-1235': 'https://www.africau.edu/images/default/sample.pdf',
        'INV-2025-1236': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        'INV-2025-1237': 'https://www.africau.edu/images/default/sample.pdf',
        'INV-2025-1238': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        'INV-2025-1001': 'https://www.africau.edu/images/default/sample.pdf',
        'INV-2025-1002': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    };
    
    return samplePDFs[invoiceId] || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('pdf-modal');
    if (event.target === modal) {
        closePDFModal();
    }
});