const checkBalanceBtn = document.querySelector("#checkBalance");
const depositBtn = document.querySelector("#depositMoney");
const withdrawBtn = document.querySelector("#withdrawMoney");
const changePinBtn = document.querySelector("#changePin");
const exitBtn = document.querySelector("#exit");

//input
const amountInput = document.querySelector("#amount");
const confirmBtn = document.querySelector("#confirmBtn");
// display values
const balanceAmount = document.querySelector("#balanceAmount");
const statusText = document.querySelector("#status");
const historyBtn = document.querySelector("#historyBtn");
const transactionList = document.querySelector("#transactionList");


let correctPin = "1234";
let cardInserted = false;
let balance = 50000;
let transactionHistory = [];


//check  balaance
function checkBalance(){
balanceAmount.textContent = 'Rs ${balance}';
statusText.textContent = "Current balance displayed successfully.";
}

//event listner
checkBalanceBtn.addEventListener("click",checkBalance);
depositBtn.addEventListener("click", showDepositSection);
withdrawBtn.addEventListener("click", showWithdrawSection);
changePinBtn.addEventListener("click", changePin);
confirmBtn.addEventListener("click", confirmTransaction);
exitBtn.addEventListener("click", exitATM);
historyBtn.addEventListener("click", displayTransactions);
historyBtn.addEventListener("click", displayTransactions);

//deposit money function
function depositMoney(){
let amount = Number(amountInput.value);
if(amount <= 0){
statusText.textContent = "Please enter a valid amount.";
return;
}
balance += amount;
balanceAmount.textContent = `Rs. ${balance}`;
statusText.textContent = "Money deposited successfully.";
transactionHistory.push(`Deposited Rs. ${amount}`);
saveData();
amountInput.value= "";
}
depositMoney();

//withdraw money
function showWithdrawSection() {
let enteredAmount = Number(amountInput.value);
if (enteredAmount <= 0) {
statusText.textContent = "Please enter a valid amount.";
saveData();
return;
    }
if (enteredAmount <= balance) {
balance -= enteredAmount;
balanceAmount.textContent = `Rs. ${balance}`;
statusText.textContent = "Please collect your cash.";
amountInput.value = "";
}
else {
statusText.textContent = "Insufficient Balance!";
}
}

//transaction history
function confirmTransaction() {
let enteredAmount=Number(amountInputvalue);
if(enteredAmount<=0){
statusText.textContent = "Please enter a valid amount."
return;
}
}
function displayTransactions() {
transactionList.innerHTML = "";
transactionHistory.forEach(function(transaction) {
transactionList.innerHTML += `
<li>${transaction}</li>
 `;
});
}

//change pin
function changePin() {
let newPin = prompt("Enter New PIN");
if (newPin.length !== 4) {
statusText.textContent = "PIN must be 4 digits.";
return;
}
correctPin = newPin;
saveData();
statusText.textContent = "PIN changed successfully.";
}
function exitATM() {
alert("Thank you for using our ATM.");
window.location.href = "index.html";
}

//save function // Save Data
function saveData() {
localStorage.setItem("balance", balance);
localStorage.setItem("pin", correctPin);
localStorage.setItem(
     "history",
JSON.stringify(transactionHistory)
);
}
// Load Data
function loadData() {
const savedBalance = localStorage.getItem("balance");
const savedPin = localStorage.getItem("pin");
const savedHistory = localStorage.getItem("history");
if (savedBalance !== null) {
balance = Number(savedBalance);
    }
if (savedPin !== null) {
correctPin = savedPin;
    }
if (savedHistory !== null) {
transactionHistory = JSON.parse(savedHistory);
    }
balanceAmount.textContent = `Rs. ${balance}`;
displayTransactions();
}
//display transaction
function displayTransactions() {
transactionList.innerHTML = "";
transactionHistory.forEach(function(transaction) {
transactionList.innerHTML += `
<li>${transaction}</li>
        `;
    });
}

let currentOperation = "";
function showDepositSection() {
    currentOperation = "deposit";
    statusText.textContent = "Enter amount and click Confirm.";
}
function showWithdrawSection() {
    currentOperation = "withdraw";
    statusText.textContent = "Enter amount and click Confirm.";
}
function confirmTransaction() {
let enteredAmount = Number(amountInput.value);
// Validate amount
if (enteredAmount <= 0) {
        statusText.textContent = "Please enter a valid amount.";
        return;
    }
// Deposit
if (currentOperation === "deposit") {
balance += enteredAmount;
transactionHistory.push(`Deposited Rs. ${enteredAmount}`);
statusText.textContent = "Money deposited successfully.";
    }
// Withdraw
else if (currentOperation === "withdraw") {
if (enteredAmount > balance) {
statusText.textContent = "Insufficient Balance!";
return;
        }
balance -= enteredAmount;
transactionHistory.push(`Withdrawn Rs. ${enteredAmount}`);
statusText.textContent = "Please collect your cash.";
    }
 // No operation selected
else {
statusText.textContent = "Please select Deposit or Withdraw first.";
return;
    }
balanceAmount.textContent = `Rs. ${balance}`;
saveData();
displayTransactions();
amountInput.value = "";
}
loadData();


