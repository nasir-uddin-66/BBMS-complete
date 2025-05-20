// patient login

const pLoginForm = document.querySelector("#pLoginForm");

pLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const pLoginEmail = document.querySelector("#pLoginEmail").value;
  const pLoginPassword = document.querySelector("#pLoginPassword").value;

  try {
    const response = await fetch("http://localhost:5000/api/patient/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: pLoginEmail,
        password: pLoginPassword,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Login successful!");

      // Store flags and user info in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(result.user));       // full user info
      localStorage.setItem("userEmail", result.user.email);            // email only
      localStorage.setItem("userId", result.user._id);                 // user ID (if needed)

      // Redirect to dashboard
      window.location.href = "../patient/p_dashboard.html";
    } else {
      alert("Login failed: " + result.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Please try again later.");
  }
});
