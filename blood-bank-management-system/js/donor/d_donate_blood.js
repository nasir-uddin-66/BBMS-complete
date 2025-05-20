// On page load, fill email input if saved in localStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedEmail = localStorage.getItem("userEmail"); // Replace with your actual storage key

  if (savedEmail) {
    document.getElementById("bd-email").value = savedEmail;
  } else {
    alert("Please login first.");
    window.location.href = "../donor_login.html"; // Adjust path if needed
  }
});

document.getElementById("bd-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Trim inputs where relevant
  const fName = document.getElementById("bd-fName").value.trim();
  const lName = document.getElementById("bd-lName").value.trim();
  const age = document.getElementById("bd-age").value.trim();
  const genderElem = document.querySelector('input[name="bd-gender"]:checked');
  const bloodGrp = document.getElementById("bd-bloodGrp").value;
  const disease = document.getElementById("bd-disease").value.trim();
  const quantity = document.getElementById("bd-quantity").value.trim();
  const address = document.getElementById("bd-address").value.trim();
  const phone = document.getElementById("bd-phone").value.trim();
  const donated = document.getElementById("bd-donated").value;
  const donationDate = document.getElementById("bd-date").value;
  const datenTime = document.getElementById("bd-datenTime").value;
  const email = document.getElementById("bd-email").value.trim();

  // Validate required fields
  if (!fName || !lName || !age || !genderElem || !bloodGrp || !disease || !quantity || !address || !phone || !datenTime || !email) {
    alert("Please fill in all required fields!");
    return;
  }

  // Validate gender selected
  if (!genderElem) {
    alert("Please select your gender");
    return;
  }
  const gender = genderElem.value;

  // Validate blood group selection (assuming default option has no value or special text)
  if (bloodGrp === "Enter Blood Group" || bloodGrp === "") {
    alert("Please select a valid blood group.");
    return;
  }

  // If donated before is Yes, last donation date must be filled
  if (donated === "Yes" && !donationDate) {
    alert("Please enter last donation date!");
    return;
  }

  // Parse date/time
  const bdDateTime = new Date(datenTime);
  if (isNaN(bdDateTime.getTime())) {
    alert("Please select a valid preferred date and time.");
    return;
  }
  const date = bdDateTime.toLocaleDateString();
  const time = bdDateTime.toLocaleTimeString();

  // Prepare data for sending
  const requestData = {
    firstName: fName,
    lastName: lName,
    age: Number(age),
    gender,
    blood_group: bloodGrp,
    disease,
    quantity: Number(quantity),
    address,
    phone,
    donatedBefore: donated,
    lastDonationDate: donationDate || null,
    appointmentDate: date,
    appointmentTime: time,
  };

  try {
    const response = await fetch(`http://localhost:5000/api/donor/bloodDonate/${email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Donation recorded successfully!");
      document.getElementById("bd-form").reset();
      // Retain email after reset
      document.getElementById("bd-email").value = email;
    } else {
      alert(`Error: ${result.message || "Failed to submit donation."}`);
    }
  } catch (error) {
    console.error("Error submitting donation:", error);
    alert("Server error. Please try again later.");
  }
});
