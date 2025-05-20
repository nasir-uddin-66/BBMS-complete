

document.getElementById("pWelcome").innerText = "Welcome Patient";

window.onload = async function () {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    alert("You are not logged in. Please login first.");
    window.location.href = "../index.html";
    return;
  }

  try {
   const response = await fetch(`http://localhost:5000/api/patient/requestHistory/${email}`);

    const result = await response.json();

    const tBody = document.querySelector("#pHistoryTable");
    tBody.innerHTML = "";

    if (response.ok) {
      if (result.length === 0) {
        tBody.innerHTML = `<tr><td colspan="5" class="text-center">No requests found.</td></tr>`;
      } else {
        result.forEach((data) => {
          const row = document.createElement("tr");
          row.innerHTML = `
           <td>${new Date(data.createdAt).toLocaleDateString()}</td>
            <td>${data.blood_group}</td>
            <td>${data.quantity}</td>
            <td>${data.reason}</td>
            <td>${data.status}</td>
          `;
          tBody.appendChild(row);
        });
      }
    } else {
      alert("Failed to load request history: " + result.message);
    }
  } catch (error) {
    console.error("Error loading request history:", error);
    alert("Something went wrong. Try again later.");
  }
};
