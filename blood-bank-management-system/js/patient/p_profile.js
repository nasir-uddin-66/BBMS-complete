

document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first.");
    window.location.href = "p_login.html";
    return;
  }

  // Get all DOM elements
  const profileName = document.getElementById("p-profile-name");
  const profileEmail = document.getElementById("p-profile-mail");
  const profileAge = document.getElementById("p-profile-age");
  const profileBloodGrp = document.getElementById("p-profile-bloodGrp");
  const profileAddress = document.getElementById("p-profile-address");
  const profilePhone = document.getElementById("p-profile-phone");

  const updateEmail = document.getElementById("pUpdateEmail");
  const updateUsername = document.getElementById("pUpdateUsername");
  const updateAge = document.getElementById("pUpdateAge");
  const updateBloodGrp = document.getElementById("pUpdateBloodGrp");
  const updateAddress = document.getElementById("pUpdateAddress");
  const updatePhone = document.getElementById("pUpdatePhone");

  const updateForm = document.getElementById("pUpdateForm");
  const updateButton = document.getElementById("pInfoUpdate");
  const cancelButton = document.querySelector(".cancelBtn");

  const profileBox1 = document.getElementById("profile-box1");
  const profileBox2 = document.getElementById("profile-box2");

  // Load profile data
  async function loadProfile() {
    try {
      const response = await fetch(`http://localhost:5000/api/patient/profile/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch profile");
      
      const data = await response.json();
      const user = data.user;

      // Update display
      profileName.textContent = user.name;
      profileEmail.textContent = user.email;
      profileAge.textContent = user.age || "N/A";
      profileBloodGrp.textContent = user.blood_group || "N/A";
      profileAddress.textContent = user.address || "N/A";
      profilePhone.textContent = user.phone || "N/A";

      // Fill form
      updateEmail.value = user.email;
      updateUsername.value = user.name;
      updateAge.value = user.age || "";
      updateBloodGrp.value = user.blood_group || "";
      updateAddress.value = user.address || "";
      updatePhone.value = user.phone || "";
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to load profile");
    }
  }

  // Show update form
  updateButton.addEventListener("click", () => {
    profileBox1.style.transform = "translateX(-800px)";
    profileBox2.style.transform = "translateX(-220px)";
  });

  // Cancel update
  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    profileBox1.style.transform = "translateX(0)";
    profileBox2.style.transform = "translateX(800px)";
  });

  // Handle form submission
  updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const updatedData = {
      name: updateUsername.value.trim(),
      age: Number(updateAge.value),
      blood_group: updateBloodGrp.value,
      address: updateAddress.value.trim(),
      phone: updatePhone.value.trim(),
    };

    try {
      const response = await fetch(`http://localhost:5000/api/patient/updateprofile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) throw new Error("Update failed");
      
      const data = await response.json();
      alert(data.message || "Profile updated");
      
      // Reset view and reload data
      profileBox1.style.transform = "translateX(0)";
      profileBox2.style.transform = "translateX(800px)";
      loadProfile();
    } catch (err) {
      console.error("Error:", err);
      alert("Update failed. Please try again.");
    }
  });

  // Initialize
  profileBox2.style.transform = "translateX(800px)";
  loadProfile();
});
