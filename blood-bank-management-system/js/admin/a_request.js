document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");

  // Load pending requests from backend
  function loadRequests() {
    fetch("http://localhost:5000/api/admin/getPendingRequests")
      .then(res => res.json())
      .then(requests => {
        tableBody.innerHTML = "";

        if (requests.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="8" class="text-center">No pending requests found.</td></tr>`;
          return;
        }

        requests.forEach((request, index) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${request.firstName} ${request.lastName}</td>
            <td>${request.blood_group}</td>
            <td>${request.email}</td>
            <td>${request.phone}</td>
            <td>${new Date(request.createdAt).toLocaleDateString()}</td>
            <td><span class="badge bg-info text-dark">${capitalize(request.status)}</span></td>
            <td class="d-flex gap-1 align-items-center" style="height: 4rem;">
              <button class="btn btn-primary h-75 accept-btn" data-id="${request._id}">Accept</button>
              <button class="btn btn-danger h-75 reject-btn" data-id="${request._id}">Reject</button>
            </td>
          `;

          tableBody.appendChild(tr);
        });

        addActionListeners();
      })
      .catch(error => {
        console.error("Error loading requests:", error);
        tableBody.innerHTML = `<tr><td colspan="8" class="text-danger text-center">Failed to load requests</td></tr>`;
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
    fetch(`http://localhost:5000/api/admin/updateRequestStatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        loadRequests(); // reload table after update
      })
      .catch(err => {
        console.error("Failed to update status:", err);
        alert("Failed to update status");
      });
  }

  // Helper function to capitalize first letter
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Initial load
  loadRequests();
});
