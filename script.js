// ✅ Updated script.js with proper field names matching send-clv-report.js expectations

document.getElementById("reportForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const leadName = document.getElementById("firstName").value.trim();
    const leadEmail = document.getElementById("email").value.trim();

    // These are the calculated report values pulled from DOM
    const originalClv = document.getElementById("originalClv").innerText;
    const valueLost = document.getElementById("valueLost").innerText;
    const adjustedClv = document.getElementById("adjustedClv").innerText;

    if (!leadEmail || !originalClv || !valueLost || !adjustedClv) {
        alert("Please ensure all report values and your email are filled.");
        return;
    }

    fetch("/api/send-clv-report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            leadName,
            leadEmail,
            reportData: {
                originalClv,
                valueLost,
                adjustedClv
            } Oh
        })
    })
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok.");
            return response.json();
        })
        .then(data => {
            alert("✅ Your CLV report has been sent! Please check your inbox.");
            document.getElementById("reportForm").reset();
        })
        .catch(error => {
            console.error("Error sending report:", error);
            alert("⚠️ Something went wrong. Please try again later.");
        });
});
