// donor signup

const dSignupForm = document.querySelector("#dSignupForm");

dSignupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dUsername = document.querySelector("#dUsername").value;
  const dEmail = document.querySelector("#dEmail").value;
  const dPassword = document.querySelector("#dPassword").value;
  const dConfirmPassword = document.querySelector("#dConfirmPassword").value;

  if (dPassword !== dConfirmPassword) {
    alert("Password didn't match!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/donor/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dUsername,
        email: dEmail,
        password: dPassword,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Signup successful! Redirecting to login...");
      window.location.href = "../donor/d_login.html";
    } else {
      const errorData = await response.json();
      alert("Signup failed: " + errorData.message);
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again later.");
  }
});
