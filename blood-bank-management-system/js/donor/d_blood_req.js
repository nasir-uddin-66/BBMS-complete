document.getElementById("dWelcome").innerText = "Welcome Donor";

// Get saved email from localStorage (replace with actual login email storage key)
const savedEmail = localStorage.getItem("userEmail");

if (savedEmail) {
  document.getElementById("br-email").value = savedEmail;
} else {
  alert("Please login first.");
  window.location.href = "../donor_login.html"; // adjust path as needed
}

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
      const requestData = {
        firstName: fName,
        lastName: lName,
        age: Number(age),
        gender,
        blood_group: bloodGrp,
        reason,
        quantity: Number(quantity),
        address,
        phone,
        description,
        email
      };

      // Update the URL endpoint as per your backend API for donor requests
      const response = await fetch(`http://localhost:5000/api/donor/bloodRequest/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Blood Request Submitted Successfully!");
        document.getElementById("br-form").reset();
        document.getElementById("br-email").value = email; // retain email after reset
      } else {
        alert(`Error: ${result.message || "Failed to submit request"}`);
      }
    } catch (error) {
      console.error("Error submitting blood request:", error);
      alert("Server error. Please try again later.");
    }
  } else {
    alert("Please fill in all required fields!");
  }
});
