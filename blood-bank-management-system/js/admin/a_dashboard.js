

async function loadBloodStock() {
  try {
    const response = await fetch("http://localhost:5000/api/admin/getblood");
    const data = await response.json();

    const map = {
      "A+": "bStock-Ap",
      "A-": "bStock-An",
      "B+": "bStock-Bp",
      "B-": "bStock-Bn",
      "AB+": "bStock-ABp",
      "AB-": "bStock-ABn",
      "O+": "bStock-Op",
      "O-": "bStock-On",
    };

    data.forEach((stock) => {
      const elId = map[stock.blood_group];
      if (elId) {
        document.getElementById(elId).innerText = stock.quantity ;
      }
    });
  } catch (error) {
    console.log("Error loading blood stock:", error);
  }
}

// Call this on page load
window.addEventListener("DOMContentLoaded", loadBloodStock);

