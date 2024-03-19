const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active'); 
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active'); 
});

const signUpButton = document.getElementById('signUp');
const requiredFieldIds = ['signUpfirstName', 'signUplastName', 'signUpEmail', 'signUpPassword'];

// Check if all of the required fields are empty.
function areAllRequiredFieldsFilled() {
  for (const fieldId of requiredFieldIds) {
    const field = document.getElementById(fieldId);

    if (field.value === '') {
      return false;
    }
  }

  return true;
}

// Disable the sign up button if any of the required fields are empty.
signUpButton.disabled = !areAllRequiredFieldsFilled();

// Update the disabled state of the sign up button whenever a required field changes.
for (const fieldId of requiredFieldIds) {
  const field = document.getElementById(fieldId);

  field.addEventListener('change', function() {
    signUpButton.disabled = !areAllRequiredFieldsFilled();
  });
}
