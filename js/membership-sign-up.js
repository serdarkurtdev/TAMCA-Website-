const addFamilyButton = document.getElementById("addFamilyButton");
const additionalFormsContainer = document.getElementById("additionalFormsContainer");
const maxFamilyMembers = 6; // Adjust this value as needed
let familyMemberCount = 1; // Keep track of added family members

addFamilyButton.addEventListener("click", function() {
  if (familyMemberCount >= maxFamilyMembers) {
    alert("Maximum number of family members reached.");
    return;
  }
  // Create a new form element for the family member
  const newForm = document.createElement("form");
  newForm.classList.add("family-member-form"); // Add a class for styling

  // Create the HTML structure for the new form
  const formContent = `
    <h2>Additional Family Member ${familyMemberCount}</h2>

    <div class="form-row">
    <div class="form-column">
      <label for="relationship-${familyMemberCount}">Relationship:</label>
      <select id="relationship-${familyMemberCount}" name="relationship-${familyMemberCount}" required>
        <option value="">Select Relationship</option>
        <option value="spouse">Spouse</option>
        <option value="child">Child</option>
        <option value="parent">Parent</option>
        <option value="sibling">Sibling</option>
        <option value="other">Other</option>
      </select>
    </div>
  </div>

    <div class="form-row">
      <div class="form-column">
        <label for="firstName-${familyMemberCount}">First Name:</label>
        <input type="text" id="firstName-${familyMemberCount}" name="firstName-${familyMemberCount}" required>
      </div>

      <div class="form-column">
        <label for="lastName-${familyMemberCount}">Last Name:</label>
        <input type="text" id="lastName-${familyMemberCount}" name="lastName-${familyMemberCount}" required>
      </div>
    </div>

    <div class="form-row">
      <div class="form-column">
        <label for="phone-${familyMemberCount}">Phone:</label>
        <input type="tel" id="phone-${familyMemberCount}" name="phone-${familyMemberCount}">
      </div>

      <div class="form-column">
        <label for="email-${familyMemberCount}">Email:</label>
        <input type="email" id="email-${familyMemberCount}" name="email-${familyMemberCount}" required>
      </div>
    </div>

    <div class="form-row">
      <div class="form-column">
        <label for="dob-${familyMemberCount}">Date of Birth:</label>
        <input type="date" id="dob-${familyMemberCount}" name="dob-${familyMemberCount}">
      </div>

      <div class="form-column">
        <label for="gender-${familyMemberCount}">Gender:</label>
        <select id="gender-${familyMemberCount}" name="gender-${familyMemberCount}">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>

    <button type="button" class="remove-family-member-button">Remove</button>

  `;

  // Set the HTML content of the new form
  newForm.innerHTML = formContent;

  // Add the new form to the container
  additionalFormsContainer.appendChild(newForm);

  // Increment the family member count
  familyMemberCount++;

    // Disable button if limit is reached (optional)
    if (familyMemberCount >= maxFamilyMembers) {
      addFamilyButton.disabled = true;
    }
});

additionalFormsContainer.addEventListener("click", function(event) {
  const target = event.target;

  if (target.classList.contains("remove-family-member-button")) {
    const formToRemove = target.closest(".family-member-form");
    additionalFormsContainer.removeChild(formToRemove);
    familyMemberCount--;

    // Re-enable add button if limit is no longer reached
    if (familyMemberCount < maxFamilyMembers) {
      addFamilyButton.disabled = false;
    }
  }
});

function formatPhoneNumber(input) {
  // Remove non-numeric characters from the input
  const phoneNumber = input.value.replace(/\D/g, '');

  // Check if the input is not empty
  if (phoneNumber.length > 0) {
    // Format the phone number as (xxx) xxx-xxxx
    const formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;

    // Set the formatted value back to the input
    input.value = formattedPhoneNumber;
  }
}

function formatEmail(input) {
  // Remove leading and trailing whitespaces
  const trimmedEmail = input.value.trim();

  // Convert the email to lowercase
  const formattedEmail = trimmedEmail.toLowerCase();

  // Set the formatted value back to the input
  input.value = formattedEmail;
}

function formatState(input) {
  // Remove non-alphabetic characters from the input
  const state = input.value.replace(/[^A-Za-z]/g, '');

  // Limit the state input to 2 characters
  const formattedState = state.slice(0, 2).toUpperCase();

  // Set the formatted value back to the input
  input.value = formattedState;
}

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", function(event) {
  // Get all visible input and select elements
  const visibleFields = document.querySelectorAll("input, select:not([hidden])");

  // Log the information and IDs
  visibleFields.forEach(field => {
    console.log(`ID: ${field.id}, Name: ${field.name}, Value: ${field.value}`);
  });

  // Check if any required field is empty
  for (const field of visibleFields) {
    if (field.hasAttribute('required') && field.value.trim() === "") {
      alert("Please fill out all required fields.");
      event.preventDefault(); // Prevent form submission
      return;
    }
  }

  // Submit the form if all required fields are filled
  alert("Form submitted!"); // Replace with actual form submission logic
});