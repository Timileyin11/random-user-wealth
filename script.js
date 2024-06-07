// Selecting DOM elements
const addUserBtn = document.getElementById("add-user-btn");
const doubleWealthBtn = document.getElementById("double-wealth-btn");
const sortWealthBtn = document.getElementById("sort-wealth-btn");
const showMillionairesBtn = document.getElementById("show-millionaires-btn");
const calculateWealthBtn = document.getElementById("calculate-wealth-btn");
const userList = document.getElementById("user-list");
const totalWealth = document.getElementById("total-wealth");

// Array to store user data
let userData = [];

// Fetch random user from API and add to userData array
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        wealth: Math.floor(Math.random() * 1000000),
    };

    addUser(newUser);
    displayButtonOutput(addUserBtn, "User Added");
}

// Add new user to userData array and update DOM
function addUser(user) {
    userData.push(user);
    updateDOM();
}

// Double wealth of all users
function doubleMoney() {
    userData = userData.map((user) => ({
        ...user,
        wealth: user.wealth * 2,
    }));
    updateDOM();
}

// Sort users by wealth
function sortByRichest() {
    userData.sort((a, b) => b.wealth - a.wealth);
    updateDOM();
}

// Filter millionaires
function showMillionaires() {
    const millionaires = userData.filter((user) => user.wealth >= 1000000);
    updateDOM(millionaires);
}

// Calculate total wealth
function calculateWealth() {
    const wealth = userData.reduce((acc, user) => (acc += user.wealth), 0);
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    totalWealth.innerHTML = "";
    totalWealth.appendChild(wealthEl);
}

// Update DOM with user data
function updateDOM(providedData = userData) {
    userList.innerHTML = "";

    providedData.forEach((user) => {
        const userEl = document.createElement("div");
        userEl.classList.add("user");
        userEl.innerHTML = `<strong>${user.name}</strong> - ${formatMoney(user.wealth)}`;
        userList.appendChild(userEl);
    });
}

// Format wealth as currency
function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Display button output
function displayButtonOutput(button, message) {
    button.textContent = message;
    setTimeout(() => {
        button.textContent = button.id.replace(/-/g, " ").toUpperCase();
    }, 2000); // Reset to default text after 2 seconds
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleWealthBtn.addEventListener("click", () => {
    doubleMoney();
    displayButtonOutput(doubleWealthBtn, "Wealth Doubled");
});
sortWealthBtn.addEventListener("click", () => {
    sortByRichest();
    displayButtonOutput(sortWealthBtn, "Sorted by Wealth");
});
showMillionairesBtn.addEventListener("click", () => {
    showMillionaires();
    displayButtonOutput(showMillionairesBtn, "Showing Millionaires");
});
calculateWealthBtn.addEventListener("click", () => {
    calculateWealth();
    displayButtonOutput(calculateWealthBtn, "Total Wealth Calculated");
});
