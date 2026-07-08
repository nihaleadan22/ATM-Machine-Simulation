//==============================
// ATM Dashboard 
//==============================

// Buttons
const checkBalanceBtn = document.querySelector("#checkBalance");
const depositBtn = document.querySelector("#depositMoney");
const withdrawBtn = document.querySelector("#withdrawMoney");
const changePinBtn = document.querySelector("#changePin");
const exitBtn = document.querySelector("#exit");
const confirmBtn = document.querySelector("#confirmBtn");
const historyBtn = document.querySelector("#historyBtn");
// Input
const amountInput = document.querySelector("#amount");
// Display
const balanceAmount = document.querySelector("#balanceAmount");
const statusText = document.querySelector("#status");
const transactionList = document.querySelector("#transactionList");
// Variables
let balance = 50000;
let correctPin = "1234";
let transactionHistory = [];
let currentOperation = "";
// Event Listeners
checkBalanceBtn.addEventListener("click", checkBalance);
depositBtn.addEventListener("click", showDepositSection);
withdrawBtn.addEventListener("click", showWithdrawSection);
confirmBtn.addEventListener("click", confirmTransaction);
changePinBtn.addEventListener("click", changePin);
historyBtn.addEventListener("click", displayTransactions);
exitBtn.addEventListener("click", exitATM);

// Check Balance
function checkBalance() {
balanceAmount.textContent = `Rs. ${balance}`;
statusText.textContent = "Current balance displayed successfully.";
}

// Deposit
function showDepositSection() {
currentOperation = "deposit";
statusText.textContent = "Enter amount and click Confirm.";
}

// Withdraw
function showWithdrawSection() {
currentOperation = "withdraw";
statusText.textContent = "Enter amount and click Confirm.";
}
// Confirm Transaction
function confirmTransaction() {
let enteredAmount = Number(amountInput.value);
if (amountInput.value === "") {
        statusText.textContent = "Please enter an amount.";
        return;
    }
if (enteredAmount <= 0) {
statusText.textContent = "Amount must be greater than zero.";
return;
    }
if (!Number.isInteger(enteredAmount)) {
statusText.textContent = "Decimal values are not allowed.";
return;
    }
if (currentOperation === "") {
statusText.textContent = "Please select Deposit or Withdraw first.";
return;
    }
 if (currentOperation === "withdraw") {
        // 1. Minimum withdrawal
        if (enteredAmount < 500) {
            statusText.textContent = "Minimum withdrawal amount is Rs. 500.";
            return;
        }

        // 2. Must be multiple of 500
        if (enteredAmount % 500 !== 0) {
            statusText.textContent = "Amount must be in multiples of Rs. 500.";
            return;
        }

        // 3. Maximum withdrawal
        if (enteredAmount > 500) {
            statusText.textContent = "Maximum withdrawal limit is Rs. 500 per transaction.";
            return;
        }

        // 4. Check balance
        if (enteredAmount > balance) {
            statusText.textContent = "Insufficient Balance!";
            return;
        }
        balance -= enteredAmount;
        transactionHistory.push(`Withdrawn Rs. ${enteredAmount}`);
        statusText.textContent = "✅ Please collect your cash.";

    } else if (currentOperation === "deposit") {
        balance += enteredAmount;
        transactionHistory.push(`Deposited Rs. ${enteredAmount}`);
        statusText.textContent = "Money deposited successfully."; 
    }
balanceAmount.textContent = `Rs. ${balance}`;
saveData();
//display function
displayTransactions();
amountInput.value = "";
}
function displayTransactions() {
transactionList.innerHTML = "";
transactionHistory.forEach(function(transaction) {
transactionList.innerHTML += `<li>${transaction}</li>`;
    });
 if (transactionList.style.display === "none") {
transactionList.style.display = "block";
    } else {
transactionList.style.display = "none";
    }
}
//change pin
function changePin() {
let newPin = prompt("Enter New 4-digit PIN");
if (newPin === null) {
        return;
    }
if (newPin.length !== 4 || isNaN(newPin)) {
statusText.textContent = "PIN must be exactly 4 digits.";
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


// Save Data
function saveData() {
localStorage.setItem("balance", balance);
localStorage.setItem("pin", correctPin);
localStorage.setItem("history", JSON.stringify(transactionHistory));
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
transactionList.style.display = "none";
}
loadData();


