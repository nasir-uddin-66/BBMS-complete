
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");

  fetch("http://localhost:5000/api/admin/getAllUsers")
    .then(res => res.json())
    .then(users => {
      console.log("Fetched users:", users);  // Debug log

      if (!Array.isArray(users)) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-danger text-center">Invalid user data format</td></tr>`;
        return;
      }

      tableBody.innerHTML = "";

      users.forEach(user => {
        console.log(user);

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${user.name || 'No Name'}</td>
          <td>${user.userType || "N/A"}</td>
          <td>${user.blood_group || "-"}</td>
          <td>${user.phone || "-"}</td>
          <td>${user.address || "-"}</td>
          <td>${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
          <td>
            <button class="btn btn-danger btn-sm delete-user" data-id="${user._id}">
              Delete
            </button>
          </td>
        `;
        tableBody.appendChild(tr);
      });

      // Add delete event listeners AFTER adding all rows
      document.querySelectorAll(".delete-user").forEach(button => {
        button.addEventListener("click", () => {
          const userId = button.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this user?")) {
            fetch(`http://localhost:5000/api/admin/deleteUser/${userId}`, {
              method: "DELETE",
            })
              .then(res => res.json())
              .then(data => {
                alert(data.message);
                location.reload();
              })
              .catch(err => {
                console.error("Delete failed:", err);
                alert("Failed to delete user");
              });
          }
        });
      });
    })
    .catch(error => {
      console.log("Error loading users:", error);
      tableBody.innerHTML = `<tr><td colspan="7" class="text-danger text-center">Failed to load users</td></tr>`;
    });
});
