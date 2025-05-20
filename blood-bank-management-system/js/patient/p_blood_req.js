


document.getElementById("pWelcome").innerText = "Welcome Patient";

// Auto-fill email from localStorage
const savedEmail = localStorage.getItem("userEmail");
if (savedEmail) {
  document.getElementById("br-email").value = savedEmail;
} else {
  alert("User not logged in. Please login again.");
  window.location.href = "../index.html"; // redirect to login
}

// Handle blood request form submission
document.getElementById("br-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  let fName = document.getElementById("br-fName").value.trim();
  let lName = document.getElementById("br-lName").value.trim();
  let age = document.getElementById("br-age").value;
  let gender = document.querySelector('input[name="br-gender"]:checked')?.value;
  let email = document.getElementById("br-email").value.trim();
  let bloodGrp = document.getElementById("br-bloodGrp").value;
  let reason = document.getElementById("br-reason").value.trim();
  let quantity = document.getElementById("br-quantity").value;
  let address = document.getElementById("br-address").value.trim();
  let phone = document.getElementById("br-phone").value.trim();
  let description = document.getElementById("br-description").value.trim();

  if (
    fName && lName && age && gender && email &&
    bloodGrp !== "Enter Blood Group" &&
    reason && quantity && address && phone
  ) {
    try {
      const response = await fetch(`http://localhost:5000/api/patient/bloodRequest/${savedEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: fName,
          lastName: lName,
          age: Number(age),
          gender,
          blood_group: bloodGrp,
          reason,
          quantity: Number(quantity),
          address,
          phone,
          description
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Blood Request Submitted Successfully!");
        document.getElementById("br-form").reset();
        document.getElementById("br-email").value = email; // retain email after reset
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting blood request:", error);
      alert("Server error. Please try again later.");
    }
  } else {
    alert("Please fill in all required fields!");
  }
});
