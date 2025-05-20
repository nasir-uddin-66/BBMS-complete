const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = function () {
  let confirmLogout = confirm("You will be logged out!");

  if (confirmLogout === true) {
    // Clear all relevant localStorage data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");

    // Optionally clear all localStorage (careful: removes everything)
    // localStorage.clear();

    // Redirect to login page
    window.location.href = "../patient/p_login.html";
  }
};
