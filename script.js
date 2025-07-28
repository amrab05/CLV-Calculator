function calculateImpact() {
    const avgPurchaseValue = parseFloat(document.getElementById('avgPurchaseValue').value);
    const purchasesPerYear = parseFloat(document.getElementById('purchasesPerYear').value);
    const lifespan = parseFloat(document.getElementById('lifespan').value);
    const churnRisk = parseFloat(document.getElementById('churnRisk').value);

    if (isNaN(avgPurchaseValue) || isNaN(purchasesPerYear) || isNaN(lifespan) || isNaN(churnRisk)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    const originalCLV = avgPurchaseValue * purchasesPerYear * lifespan;
    const valueAtRisk = originalCLV * churnRisk;
    const adjustedCLV = originalCLV - valueAtRisk;

    document.getElementById('originalClv').textContent = `$${originalCLV.toFixed(2)}`;
    document.getElementById('valueAtRisk').textContent = `$${valueAtRisk.toFixed(2)}`;
    document.getElementById('adjustedClv').textContent = `$${adjustedCLV.toFixed(2)}`;
}

// Optional: handle the form submit (if you're using Postmark for the report form)
document.getElementById("reportForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Report sending temporarily disabled for launch setup. We'll enable Postmark shortly.");
});
