// CLV Calculator - script.js (v1.0)
document.addEventListener('DOMContentLoaded', () => {
    const clvForm = document.getElementById('clv-form');
    const avgPurchaseValueInput = document.getElementById('avg-purchase-value');
    const purchaseFrequencyInput = document.getElementById('purchase-frequency');
    const customerLifespanInput = document.getElementById('customer-lifespan');
    const resultsContainer = document.getElementById('results-container');
    const clvResultOutput = document.getElementById('clv-result');
    const insightValue = document.getElementById('insight-value');

    clvForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const avgPurchaseValue = parseFloat(avgPurchaseValueInput.value);
        const purchaseFrequency = parseFloat(purchaseFrequencyInput.value);
        const customerLifespan = parseFloat(customerLifespanInput.value);

        if (isNaN(avgPurchaseValue) || isNaN(purchaseFrequency) || isNaN(customerLifespan) || avgPurchaseValue < 0 || purchaseFrequency < 0 || customerLifespan < 0) {
            alert('Please enter valid, positive numbers in all fields.');
            return;
        }

        const clv = avgPurchaseValue * purchaseFrequency * customerLifespan;

        const formattedClv = clv.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        clvResultOutput.textContent = formattedClv;
        insightValue.textContent = formattedClv;
        resultsContainer.style.display = 'block';
    });
});