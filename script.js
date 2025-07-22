// CLV Calculator - script.js (v1.2 - Final with Email Engine)
document.addEventListener('DOMContentLoaded', () => {
    const clvForm = document.getElementById('clv-form');
    const avgPurchaseValueInput = document.getElementById('avg-purchase-value');
    const purchaseFrequencyInput = document.getElementById('purchase-frequency');
    const customerLifespanInput = document.getElementById('customer-lifespan');
    const churnRiskSelect = document.getElementById('churn-risk-select');
    const resultsContainer = document.getElementById('results-container');
    const originalClvOutput = document.getElementById('original-clv-result');
    const valueLostOutput = document.getElementById('value-lost-result');
    const adjustedClvOutput = document.getElementById('adjusted-clv-result');
    const leadCaptureSection = document.getElementById('lead-capture-section');
    const emailReportForm = document.getElementById('email-report-form');
    const leadNameInput = document.getElementById('lead-name-input');
    const leadEmailInput = document.getElementById('lead-email-input');
    const sendReportButton = document.getElementById('send-report-button');

    const formatCurrency = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const calculateAndDisplay = () => {
        const avgPurchaseValue = parseFloat(avgPurchaseValueInput.value);
        const purchaseFrequency = parseFloat(purchaseFrequencyInput.value);
        const customerLifespan = parseFloat(customerLifespanInput.value);
        const churnRiskFactor = parseFloat(churnRiskSelect.value);

        if (isNaN(avgPurchaseValue) || isNaN(purchaseFrequency) || isNaN(customerLifespan)) { return; }

        const baseClv = avgPurchaseValue * purchaseFrequency * customerLifespan;
        const valueLost = baseClv * churnRiskFactor;
        const adjustedClv = baseClv - valueLost;

        originalClvOutput.textContent = formatCurrency(baseClv);
        valueLostOutput.textContent = formatCurrency(valueLost);
        adjustedClvOutput.textContent = formatCurrency(adjustedClv);

        resultsContainer.style.display = 'block';
        leadCaptureSection.style.display = 'block';
    };

    clvForm.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateAndDisplay();
    });

    avgPurchaseValueInput.addEventListener('input', calculateAndDisplay);
    purchaseFrequencyInput.addEventListener('input', calculateAndDisplay);
    customerLifespanInput.addEventListener('input', calculateAndDisplay);
    churnRiskSelect.addEventListener('change', calculateAndDisplay);

    emailReportForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const leadName = leadNameInput.value.trim();
        const leadEmail = leadEmailInput.value.trim();
        if (!leadEmail) {
            alert('Please enter a valid email address.');
            return;
        }

        sendReportButton.disabled = true;
        sendReportButton.textContent = 'Sending...';

        try {
            const reportData = {
                originalClv: originalClvOutput.textContent,
                valueLost: valueLostOutput.textContent,
                adjustedClv: adjustedClvOutput.textContent
            };

            const response = await fetch('/api/send-clv-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadName, leadEmail, reportData })
            });

            if (!response.ok) {
                throw new Error('The mail server failed to send the report.');
            }

            leadCaptureSection.innerHTML = '<h3>🎉 Report on its way!</h3><p>Check your spam folder if you don’t see it in the next minute.</p>';

        } catch (error) {
            alert(`Error: ${error.message}`);
            sendReportButton.disabled = false;
            sendReportButton.textContent = 'Send My Report →';
        }
    });
});