// patient signup

const pSignupForm = document.querySelector("#pSignupForm");

pSignupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const pUsername = document.querySelector("#pUsername").value;
  const pEmail = document.querySelector("#pEmail").value;
  const pPassword = document.querySelector("#pPassword").value;
  const pConfirmPassword = document.querySelector("#pConfirmPassword").value;

  if (pPassword !== pConfirmPassword) {
    alert("Password didn't match!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/patient/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pUsername,
        email: pEmail,
        password: pPassword,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Signup successful! Redirecting to login...");
      window.location.href = "../patient/p_login.html";
    } else {
      const errorData = await response.json();
      alert("Signup failed: " + errorData.message);
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again later.");
  }
});





