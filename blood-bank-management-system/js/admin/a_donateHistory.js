document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:5000/api/admin/allDonateHistory");
    if (!response.ok) {
      throw new Error("Failed to fetch donation history");
    }

    const data = await response.json();
    const tableBody = document.getElementById("requestTableBody");
    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No donation history found.</td></tr>`;
      return;
    }

    data.forEach((donation, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>Donor</td>
        <td>${donation.firstName || ""} ${donation.lastName || ""}</td>
        <td>${donation.blood_group}</td>
        <td>${donation.quantity}</td>
        <td>
          <span class="badge bg-${donation.status === "approved" ? "success" : donation.status === "pending" ? "warning text-dark" : "danger"}">
            ${donation.status}
          </span>
        </td>
        <td>${new Date(donation.createdAt).toLocaleDateString()}</td>
      `;
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.log("Error loading donation history:", error.message);
    alert("Failed to load donation history. Try again later.");
  }
});
