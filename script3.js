//==================================
//============== ATM =================
//==================================

// DOM Selection
const loginForm = document.querySelector("#loginForm");
const insertCardBtn = document.querySelector("#insertCard");
const pinInput = document.querySelector("#pin");
const statusText = document.querySelector("#status");
const submitBtn = document.querySelector("#submitBtn");

// variables
let correctPin = "1234";
let cardInserted = false;
let balance = 50000;

//disable pin
pinInput.disabled = true;
submitBtn.disabled = true;

//insertCard
function insertCard() {
cardInserted = true;
statusText.textContent = "ATM card inserted successfully.";
pinInput.disabled = false;
submitBtn.disabled = false;
pinInput.focus();
}

//event listener
insertCardBtn.addEventListener("click", insertCard);
loginForm.addEventListener("submit", function(event) {
event.preventDefault();
if (!cardInserted) {
statusText.textContent = "Please insert your ATM card first!";
return;
}
const enteredPin = pinInput.value.trim();
if (enteredPin === "") {
statusText.textContent = "Please enter your PIN.";
return;
}
 if (enteredPin.length !== 4) {
statusText.textContent = "PIN must be exactly 4 digits.";
return;
}
if (enteredPin === correctPin) {
statusText.textContent = "Login Successful!";
setTimeout(function () {
window.location.href = "dashboard.html";//load to the dashboard if there is success.
}, 1000);
} else {
statusText.textContent = "Invalid PIN!";
pinInput.value = "";
pinInput.focus();
    }

});

