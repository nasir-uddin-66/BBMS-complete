//emergency blood request form

document.getElementById("ebr-form").addEventListener("submit", (event) => {
  event.preventDefault();

  let fName = document.getElementById("ebr-fName");
  let lName = document.getElementById("ebr-lName");
  let age = document.getElementById("ebr-age");
  let gender = document.querySelector('input[name="ebr-gender"]:checked');
  let bloodGrp = document.getElementById("ebr-bloodGrp");
  let email = document.getElementById("ebr-email");
  let reason = document.getElementById("ebr-reason");
  let quantity = document.getElementById("ebr-quantity");
  let address = document.getElementById("ebr-address");
  let phone = document.getElementById("ebr-phone");
  let description = document.getElementById("ebr-description");

  if (bloodGrp !== "Enter Blood Group") {
    //will be stored in db
    console.log(`Name: ${fName.value} ${lName.value}`);
    console.log(`Age: `, age.value);
    console.log("Gender: ", gender.value);
    console.log(`Blood Group: `, bloodGrp.value);
    console.log(`Reason: `, reason.value);
    console.log(`Quantity: `, quantity.value);
    console.log(`Address: `, address.value);
    console.log(`Email: `, email.value);
    console.log(`Phone: `, phone.value);
    console.log(`Description: `, description.value);
    alert("Emergency Blood Request Submitted!");

    fName.value = "";
    age.value = "";
    gender.value = "";
    lName.value = "";
    bloodGrp.value = "";
    email.value = "";
    reason.value = "";
    quantity.value = "";
    address.value = "";
    phone.value = "";
    description.value = "";
  } else {
    alert("Input All Fields!");
  }
});
