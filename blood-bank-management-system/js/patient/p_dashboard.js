// Check login status and redirect if not logged in
let isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn !== "true") {
  window.location.href = "p_login.html";
}

document.getElementById("pWelcome").innerText = "Welcome Patient";

async function updateRequestStats() {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    alert("You are not logged in. Please login first.");
    window.location.href = "p_login.html";
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/patient/requestHistory/${email}`);
    const requests = await response.json();

    if (!response.ok) {
      alert("Failed to load request history: " + (requests.message || ""));
      return;
    }

    // Calculate counts
    const totalRequests = requests.length;
    const pendingRequests = requests.filter(r => r.status === "pending").length;
    const approvedRequests = requests.filter(r => r.status === "approved").length;
    const rejectedRequests = requests.filter(r => r.status === "rejected").length;

    // Update DOM
    document.getElementById("made-req").innerText = totalRequests;
    document.getElementById("pen-req").innerText = pendingRequests;
    document.getElementById("app-req").innerText = approvedRequests;
    document.getElementById("rej-req").innerText = rejectedRequests;

  } catch (error) {
    console.error("Error loading request history:", error);
    alert("Something went wrong. Try again later.");
  }
}

// Call the function on page load
window.onload = updateRequestStats;
