// donor login

const dLoginForm = document.querySelector("#dLoginForm");

dLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dLoginEmail = document.querySelector("#dLoginEmail").value;
  const dLoginPassword = document.querySelector("#dLoginPassword").value;

  try {
    const response = await fetch("http://localhost:5000/api/donor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: dLoginEmail,
        password: dLoginPassword,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Login successful!");

      // Store flags and user info in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(result.user));      // full user info
      localStorage.setItem("userEmail", result.user.email);           // email only
      localStorage.setItem("userId", result.user._id);                // user ID

      // Redirect to donor dashboard
      window.location.href = "../donor/d_dashboard.html";
    } else {
      alert("Login failed: " + result.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Please try again later.");
  }
});
