document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:5000/api/admin/allRequestHistory"); // <-- your blood request history API
    if (!response.ok) {
      throw new Error("Failed to fetch blood request history");
    }

    const data = await response.json();
    const tableBody = document.getElementById("requestTableBody");
    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center">No blood request history found.</td></tr>`;
      return;
    }

    data.forEach((request, index) => {
      const fullName = `${request.firstName || ""} ${request.lastName || ""}`.trim();
      tableBody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${request.userType || "N/A"}</td>
          <td>${fullName || "N/A"}</td>
          <td>${request.blood_group || "N/A"}</td>
          <td>${request.quantity || "N/A"}</td>
          <td>
            <span class="badge bg-${request.status === "approved" ? "success" : request.status === "pending" ? "warning text-dark" : "danger"}">
              ${request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </td>
          <td>${new Date(request.createdAt).toLocaleDateString()}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error loading blood request history:", error.message);
    alert("Failed to load blood request history. Try again later.");
  }
});
