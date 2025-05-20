document.getElementById("pWelcome").innerText = "Welcome Patient";

let pChangePassForm = document.querySelector("#pChangePassForm");

pChangePassForm.onsubmit = async function (e) {
  e.preventDefault();

  const email = localStorage.getItem("userEmail"); // Assume user email is stored in localStorage
  const newPassword = document.querySelector("#pChangePass").value;
  const confirmPassword = document.querySelector("#pConfirmChangePass").value;

  if (!email) {
    alert("User not logged in. Please log in again.");
    window.location.href = "p_login.html";
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const confirmed = confirm("Confirm password change?");
  if (!confirmed) return;

  try {
    const response = await fetch(`http://localhost:5000/api/patient/changePassword/${email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: newPassword })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Password changed successfully.");
      document.getElementById("pChangePassForm").reset();
    } else {
      alert(result.message || "Failed to change password.");
    }
  } catch (error) {
    console.error("Password change error:", error);
    alert("Something went wrong. Please try again later.");
  }
};
