/* script.js - Frontend Logic & API Connection */

// PASTE YOUR URL HERE
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzIwzxLOsMJm28hxFQkY22aPBZKlP0J2Nfr_65gww88JhnEUcpz6BNWFxzerro1-CS3UA/exec";

// Navigation Logic
function showSection(id) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Registration Handler
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const data = {
        action: "register",
        name: document.getElementById('regName').value,
        phone: document.getElementById('regPhone').value,
        email: document.getElementById('regEmail').value,
        course: document.getElementById('regCourse').value,
        referredBy: document.getElementById('regRef').value,
        mpesa: document.getElementById('mpesaMsg').value
    };

    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        alert(response.data);
        if(response.status === "Success") location.reload();
    });
});

// Access Check (Unlocks gated content)
function checkAccess() {
    const phone = document.getElementById('loginPhone').value;
    
    fetch(`${WEB_APP_URL}?action=getContent&phone=${phone}`)
    .then(res => res.json())
    .then(response => {
        if(response.status === "Success") {
            document.getElementById('auth-check').style.display = 'none';
            document.getElementById('gated-content').style.display = 'block';
            displayContent(response.data);
        } else {
            alert(response.data);
        }
    });
}

function displayContent(data) {
    // Logic to render books, trends, and minds into the HTML grids
    console.log("Data Received:", data);
}
