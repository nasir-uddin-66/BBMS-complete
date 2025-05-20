document.getElementById("dWelcome").innerText = "Welcome Donor";

// On page load, fetch donation history from backend and populate table
window.onload = async function () {
  const savedEmail = localStorage.getItem("userEmail");
  if (!savedEmail) {
    alert("Please login first.");
    window.location.href = "../donor_login.html";
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/donor/donateHistory/${savedEmail}`);
    if (!response.ok) {
      throw new Error("Failed to fetch donation history");
    }
    const data = await response.json();

    let tBody = document.querySelector("#dHistoryTable");
    tBody.innerHTML = "";

    if (data.length === 0) {
      tBody.innerHTML = `<tr><td colspan="5" class="text-center">No donation history found.</td></tr>`;
      return;
    }

    data.forEach((entry) => {
      let row = document.createElement("tr");

      row.innerHTML = `
        <td>${new Date(entry.createdAt).toLocaleDateString()}</td>

        <td>${entry.blood_group}</td>
        <td>${entry.quantity}</td>
        <td>${entry.disease}</td>
        <td class="${entry.status.toLowerCase()}">${entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}</td>
      `;

      tBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading donation history:", error);
    alert("Error loading donation history. Please try again later.");
  }
};
