document.getElementById("dWelcome").innerText = "Welcome Donor";

document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first.");
    window.location.href = "d_login.html";
    return;
  }

  // DOM elements
  const profileName = document.getElementById("d-profile-name");
  const profileEmail = document.getElementById("d-profile-mail");
  const profileAge = document.getElementById("d-profile-age");
  const profileBloodGrp = document.getElementById("d-profile-bloodGrp");
  const profileAddress = document.getElementById("d-profile-address");
  const profilePhone = document.getElementById("d-profile-phone");

  const updateEmail = document.getElementById("dUpdateEmail");
  const updateUsername = document.getElementById("dUpdateUsername");
  const updateAge = document.getElementById("dUpdateAge");
  const updateBloodGrp = document.getElementById("dUpdateBloodGrp");
  const updateAddress = document.getElementById("dUpdateAddress");
  const updatePhone = document.getElementById("dUpdatePhone");

  const updateForm = document.getElementById("dUpdateForm");
  const updateButton = document.getElementById("dInfoUpdate");
  const cancelButton = document.querySelector(".cancelBtn");

  const profileBox1 = document.getElementById("profile-box1");
  const profileBox2 = document.getElementById("profile-box2");

  // Load donor profile data from API
  async function loadProfile() {
    try {
      const response = await fetch(`http://localhost:5000/api/donor/profile/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch profile");
      
      const data = await response.json();
      const user = data.user;

      // Update profile display
      profileName.textContent = user.name;
      profileEmail.textContent = user.email;
      profileAge.textContent = user.age || "N/A";
      profileBloodGrp.textContent = user.blood_group || "N/A";
      profileAddress.textContent = user.address || "N/A";
      profilePhone.textContent = user.phone || "N/A";

      // Fill update form
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

  // Show update form on button click
  updateButton.addEventListener("click", () => {
    profileBox1.style.transform = "translateX(-800px)";
    profileBox2.style.transform = "translateX(-220px)";
  });

  // Cancel update, go back to profile view
  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    profileBox1.style.transform = "translateX(0)";
    profileBox2.style.transform = "translateX(800px)";
  });

  // Handle profile update form submission
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
      const response = await fetch(`http://localhost:5000/api/donor/updateprofile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Update failed");

      const data = await response.json();
      alert(data.message || "Profile updated");

      // Reset view and reload data
      profileBox1.style.transform = "translateX(0)";
      profileBox2.style.transform = "translateX(800px)";
      loadProfile();
    } catch (err) {
      console.log("Error:", err.message);
      alert("Update failed. Please try again.");
    }
  });

  // Initialize form position and load profile
  profileBox2.style.transform = "translateX(800px)";
  loadProfile();
});
