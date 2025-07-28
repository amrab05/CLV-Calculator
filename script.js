// ✅ FINAL VERSION of script.js for CLV Calculator

document.getElementById("reportForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const leadName = document.getElementById("firstName").value.trim();
    const leadEmail = document.getElementById("email").value.trim();
    const originalClv = document.getElementById("originalClv").textContent;
    const valueLost = document.getElementById("valueLost").textContent;
    const adjustedClv = document.getElementById("adjustedClv").textContent;

    if (!leadEmail) {
        alert("Please enter your email address.");
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
            }
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