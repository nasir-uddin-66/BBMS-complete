document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");

  // Load pending donation requests from backend
  function loadDonationRequests() {
    fetch("http://localhost:5000/api/admin/getPendingDonations")
      .then(res => res.json())
      .then(donations => {
        tableBody.innerHTML = "";

        if (donations.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="8" class="text-center">No pending donation requests found.</td></tr>`;
          return;
        }

        donations.forEach((donation, index) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${donation.firstName} ${donation.lastName}</td>
            <td>${donation.blood_group}</td>
            <td>${new Date(donation.appointmentDateTime).toLocaleString()}</td>
            <td>${donation.email}</td>
            <td>${new Date(donation.lastDonationDate).toLocaleDateString()}</td>
            <td><span class="badge ${donation.eligibility === 'Eligible' ? 'bg-success' : 'bg-danger'}">Yes</span></td>
            <td class="d-flex gap-1 align-items-center" style="height: 4rem;">
              <button class="btn btn-primary h-75 accept-btn" data-id="${donation._id}">Accept</button>
              <button class="btn btn-danger h-75 reject-btn" data-id="${donation._id}">Reject</button>
            </td>
          `;

          tableBody.appendChild(tr);
        });

        addActionListeners();
      })
      .catch(error => {
        console.error("Error loading donation requests:", error);
        tableBody.innerHTML = `<tr><td colspan="8" class="text-danger text-center">Failed to load donation requests</td></tr>`;
      });
  }

  // Add click listeners to accept and reject buttons
  function addActionListeners() {
    document.querySelectorAll(".accept-btn").forEach(button => {
      button.addEventListener("click", () => updateStatus(button.dataset.id, 'approved'));
    });

    document.querySelectorAll(".reject-btn").forEach(button => {
      button.addEventListener("click", () => updateStatus(button.dataset.id, 'rejected'));
    });
  }

  // Update status API call
  function updateStatus(id, status) {
    fetch(`http://localhost:5000/api/admin/updateDonationStatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        loadDonationRequests(); // reload table after update
      })
      .catch(err => {
        console.error("Failed to update status:", err);
        alert("Failed to update status");
      });
  }

  // Initial load
  loadDonationRequests();
});
