document.addEventListener("DOMContentLoaded", function() {
  loadPayments(); // Load payment history when the page loads
});

document.getElementById("payment-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let amount = document.getElementById("amount").value.trim();
  let message = document.getElementById("message");

  if (name === "" || phone === "" || amount === "") {
      message.textContent = "All fields are required!";
      message.style.color = "red";
      return;
  }

  if (!/^\d{10}$/.test(phone)) {
      message.textContent = "Enter a valid 10-digit phone number!";
      message.style.color = "red";
      return;
  }

  let paymentData = {
      name: name,
      phone: phone,
      amount: amount,
      date: new Date().toLocaleString()
  };

  savePayment(paymentData);
  appendPaymentToTable(paymentData);

  message.textContent = `Payment of KES ${amount} for ${name} recorded successfully!`;
  message.style.color = "green";

  // Clear the form after submission
  document.getElementById("payment-form").reset();
});

// Function to save payment data to Local Storage
function savePayment(payment) {
  let payments = JSON.parse(localStorage.getItem("payments")) || [];
  payments.push(payment);
  localStorage.setItem("payments", JSON.stringify(payments));
}

// Function to load payment history from Local Storage
function loadPayments() {
  let payments = JSON.parse(localStorage.getItem("payments")) || [];
  payments.forEach(payment => appendPaymentToTable(payment));
}

// Function to add a new row in the payment table
function appendPaymentToTable(payment) {
  let tableBody = document.getElementById("payment-table-body");
  let row = document.createElement("tr");

  row.innerHTML = `
      <td>${payment.name}</td>
      <td>${payment.phone}</td>
      <td>KES ${payment.amount}</td>
      <td>${payment.date}</td>
  `;

  tableBody.appendChild(row);
}
