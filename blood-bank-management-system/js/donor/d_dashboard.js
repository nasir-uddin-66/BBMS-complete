// Check if donor is logged in
let isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn !== "true") {
  window.location.href = "d_login.html";
}

// Set welcome text
document.getElementById("dWelcome").innerText = "Welcome Donor";

// Fetch and update donor's donation stats
async function updateDonationStats() {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    alert("You are not logged in. Please login first.");
    window.location.href = "d_login.html";
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/donor/donateHistory/${email}`);
    const donations = await response.json();

    if (!response.ok) {
      alert("Failed to load donation history: " + (donations.message || ""));
      return;
    }

    // Calculate counts
    const totalDonations = donations.length;
    const pendingDonations = donations.filter(d => d.status === "pending").length;
    const approvedDonations = donations.filter(d => d.status === "approved").length;
    const rejectedDonations = donations.filter(d => d.status === "rejected").length;

    // Update DOM
    document.getElementById("made-req").innerText = totalDonations;
    document.getElementById("pen-req").innerText = pendingDonations;
    document.getElementById("app-req").innerText = approvedDonations;
    document.getElementById("rej-req").innerText = rejectedDonations;

  } catch (error) {
    console.error("Error loading donation history:", error);
    alert("Something went wrong. Try again later.");
  }
}

// Call the function on page load
window.onload = updateDonationStats;
