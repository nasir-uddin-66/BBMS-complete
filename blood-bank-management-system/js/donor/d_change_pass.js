document.getElementById("dWelcome").innerText = "Welcome Donor";

const dChangePassForm = document.querySelector("#dChangePassForm");

dChangePassForm.onsubmit = async function (e) {
  e.preventDefault();

  const email = localStorage.getItem("userEmail"); // get donor email from localStorage
  const newPassword = document.querySelector("#dChangePass").value;
  const confirmPassword = document.querySelector("#dConfirmChangePass").value;

  if (!email) {
    alert("User not logged in. Please log in again.");
    window.location.href = "../donor/d_login.html";
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const confirmed = confirm("Confirm Change Password?");
  if (!confirmed) return;

  try {
    const response = await fetch(`http://localhost:5000/api/donor/changePassword/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password: newPassword })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Password changed successfully.");
      dChangePassForm.reset();
    } else {
      alert(result.message || "Failed to change password.");
    }
  } catch (error) {
    console.error("Password change error:", error);
    alert("Something went wrong. Please try again later.");
  }
};
