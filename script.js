function calculateImpact() {
    const avgPurchaseValue = parseFloat(document.getElementById("avgPurchaseValue").value);
    const purchasesPerYear = parseFloat(document.getElementById("purchasesPerYear").value);
    const lifespan = parseFloat(document.getElementById("lifespan").value);
    const churnRisk = parseFloat(document.getElementById("churnRisk").value);

    const originalClv = avgPurchaseValue * purchasesPerYear * lifespan;
    const valueAtRisk = originalClv * churnRisk;
    const adjustedClv = originalClv - valueAtRisk;

    document.getElementById("originalClv").textContent = formatCurrency(originalClv);
    document.getElementById("valueAtRisk").textContent = formatCurrency(valueAtRisk);
    document.getElementById("adjustedClv").textContent = formatCurrency(adjustedClv);
}

function formatCurrency(value) {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}