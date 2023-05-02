const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const male = document.getElementById('male');
const female = document.getElementById('female');
const gender = document.getElementsByName('gender')
const certificate = document.getElementById('certificate');
const skill = document.getElementsByName('skill');
const skill1 = document.getElementById('skill1');
const skill2 = document.getElementById('skill2');
const skill3 = document.getElementById('skill3');
const comment = document.getElementById('comment');

window.addEventListener('load', function(event) {
    event.preventDefault(); // prevent the form from submitting normally
  
    // Add event listeners for input validation
    fullname.addEventListener('blur', checkFullName);
    email.addEventListener('blur', checkEmail);
    male.addEventListener('blur', checkGender);
    female.addEventListener('blur', checkGender);
    certificate.addEventListener('blur', checkCertificate);
    skill1.addEventListener('blur', checkSkills);
    skill2.addEventListener('blur', checkSkills);
    skill3.addEventListener('blur', checkSkills);
    comment.addEventListener('blur', checkComment);
  
    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // prevent the form from submitting normally
  
      const isFormValid = checkInputs();
  
      if (isFormValid) {
        // Get form field values
        const name = document.querySelector('#fullname').value;
        const email = document.querySelector('#email').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const certificate = document.querySelector('#certificate').value;
        const skills = Array.from(document.querySelectorAll('input[name="skill"]:checked')).map(input => input.value);
        const comment = document.querySelector('#comment').value;
  
        // Create an object with the form field values
        const formData = {
          name,
          email,
          gender,
          certificate,
          skills,
          comment
        };
  
        // Store the form data as a JSON string in local storage
        localStorage.setItem('formData', JSON.stringify(formData));
  
        window.location.href = 'display.html';
      }
    });
  });

function checkInputs() {

      // Check if each input is valid
  checkFullName();
  checkEmail();
  checkGender();
  checkCertificate();
  checkSkills();
  checkComment();

  // Check if all inputs have the success class
  const inputs = [fullname, email, male, female, skill1, skill2, skill3, certificate, comment];
  const isValid = inputs.every(input => input.parentElement.classList.contains('success'));

  return isValid;
}


    function checkFullName() {
    const fullnameValue = fullname.value.trim();
    const fullnameRegex = /^([a-zA-Z]{3,}\s[a-zA-Z]{3,})$/;
    const fullnameRegex2 = /^[A-Za-z]+( [A-Za-z]+)+$/;


    if(fullnameValue === ''){
        setErrorFor(fullname, 'Name cant be blank');
    } else if (!fullnameRegex.test(fullnameValue) & !fullnameRegex2.test(fullnameValue)) {
        setErrorFor(fullname, 'Invalid name format. Should contain 2 names with at least 3 letters and a space to separate them');
    } else if (!fullnameRegex.test(fullnameValue) & fullnameRegex2.test(fullnameValue)){
        setErrorFor(fullname, 'both names should have a minimum of 3 letters')
    }
    else {
        setSuccessFor(fullname);
    }
}

function checkEmail() {
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailValue === ''){
        setErrorFor(email, 'Email cant be blank');
    } else if (!emailRegex.test(emailValue)) {
        setErrorFor(email, 'Invalid email format');
    } else {
        setSuccessFor(email);
    }
}

function checkGender() {
    const genderValue = document.querySelector('input[name="gender"]:checked');

    if (!genderValue) {
        setErrorFor(male, 'Please select your gender');
        setErrorFor(female, 'Please select your gender');
    } else {
        setSuccessFor(male);
        setSuccessFor(female);
    }
}

function checkCertificate() {
    const certificateValue = certificate.options[certificate.selectedIndex].value;

    if (certificateValue == "") {
        setErrorFor(certificate, 'Please select your highest qualification');
    } else {
        setSuccessFor(certificate);
    }
}

function checkSkills() {
    let checkedSkills = 0;

    for (let i = 0; i < skill.length; i++) {
        if (skill[i].checked) {
            checkedSkills++;
        }
    }

    if (checkedSkills < 2) {
        setErrorFor(skill[0], "Please select at least 2 skills");
    } else {
        setSuccessFor(skill[0]);
    }
}

function checkComment() {
    const commentValue = comment.value.trim();

    if(commentValue === ''){
        setErrorFor(comment, 'Comment cant be blank');
    } else if (commentValue.length < 20) {
        setErrorFor(comment, 'Comment should be minimum of 20 characters');
    } else {
        setSuccessFor(comment);
    }
}





// creating functions for error & success
function setErrorFor(input, message) {
    const formdiv = input.parentElement;
    const small = formdiv.querySelector('small')

    // change small to error message
    small.innerText = message;

    // changing the class name
    formdiv.className = 'formdiv error';
}

function setSuccessFor(input) {
    const formdiv = input.parentElement;
    formdiv.className = 'formdiv success';
  }