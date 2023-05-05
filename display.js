// Retrieve the form data from local storage
const formData = JSON.parse(localStorage.getItem('formData'));

// Display the form data on the page
document.querySelector('#name').textContent = formData.name;
document.querySelector('#email').textContent = formData.email;
document.querySelector('#number').textContent = formData.number;
document.querySelector('#gender').textContent = formData.gender;
document.querySelector('#certificate').textContent = formData.certificate;
document.querySelector('#skills').textContent = formData.skills.join(', ');
document.querySelector('#comment').textContent = formData.comment;
