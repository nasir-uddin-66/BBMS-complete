const aLoginForm = document.querySelector("#aLoginForm");

aLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const aLoginEmail = document.querySelector("#aLoginEmail").value;
  // const aUsername = document.querySelector("#aUsername").value;
  const aLoginPassword = document.querySelector("#aLoginPassword").value;
 
  //printing data
   console.log({
    email: aLoginEmail,
    //username: aUsername,
    password: aLoginPassword
  });

  try {
    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: aLoginEmail,
        //username: aUsername,
        password: aLoginPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "../admin/a_dashboard.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    alert("Server error");
    console.error(error);
  }
});
