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

form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from submitting normally

    checkInputs();
});

function checkInputs() {
    // get input values
    const emailValue = email.value.trim();
    const fullnameValue = fullname.value.trim();
    const commentValue = comment.value.trim();
    let genderValue = '';
    var certificateValue = certificate.options[certificate.selectedIndex].value;
    let checkedSkills = 0;

    // get checked boxes for skills
    for (let i = 0; i < skill.length; i++) {
        if (skill[i].checked) {
            checkedSkills++;
        }
    }
    

    // Get the checked radio button for gender
    for (let i = 0; i < gender.length; i++) {
      if (gender[i].checked) {
        genderValue = gender[i].value;
        break;
      }
    }


    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regular expression for fullname validation
    const fullnameRegex = /^([a-zA-Z]{3,}\s[a-zA-Z]{3,})$/;

    if(fullnameValue === ''){
        // show error & add error class
        setErrorFor(fullname, 'Name cant be blank');
    } else if (!fullnameRegex.test(fullnameValue)) {
        setErrorFor(fullname, 'Invalid name format');
    } else {
        // add success class
        setSuccessFor(fullname);
    }  

    if(emailValue === ''){
        setErrorFor(email, 'Email cant be blank');
    } else if (!emailRegex.test(emailValue)) {
        setErrorFor(email, 'Invalid email format');
    } else {
        setSuccessFor(email);
    }

    if(commentValue === ''){
        setErrorFor(comment, 'Comment cant be blank');
    } else if (commentValue.length < 20) {
        setErrorFor(comment, 'Comment should be minimum of 20 characters');
    } else {
        setSuccessFor(comment);
    }

    if (genderValue === '') {
        setErrorFor(male, 'Please select your gender');
      } else {
        setSuccessFor(male);
      }

      if (certificateValue == "") {
        setErrorFor(certificate, 'Please select your highest qualification');
    } else {
      setSuccessFor(certificate);
    }

    if (checkedSkills < 2) {
        setErrorFor(skill[0], "Please select at least 2 skills");
    } else {
        setSuccessFor(skill[0]);
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