//  Regular Expressions for Name, Email, Phone Number, Zip Code Validation.
const studentNameFormat  = /^[a-zA-Z0-9 ]+$/;
const studentEmailFormat = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
const phoneNumberFormat  = /^\(\d{3}\) \d{3}-\d{4}$/;
const zipCodeFormat      = /^\d{5}$/;

// Gathering all the elements from the form here
const registrationForm     = document.getElementById("Registration-Form");
const studentName          = document.getElementById("studentName");
const studentEmailId       = document.getElementById("emailAddress");
const studentPhoneNumber   = document.getElementById("phoneNumber");
const studentAddressField1 = document.getElementById("addressField1");
const studentZipCode       = document.getElementById("zipCode");
const addressField2        = document.getElementById("addressField2");
const addressField2Counter = document.getElementById("addressField2Counter");
const mealOption           = document.getElementById("mealOption");
const checkboxContainer    = document.getElementById("checkboxContainer");
const submitButton         = document.getElementById("submitButton");
const registeredStudents   = document.getElementById("registeredStudents");

let isNameValid = false; isEmailAddressValid = false; isPhoneNumberValid = false; isZipCodeValid = false; isAddressValid = false;

// The Main Function to validate the form
function validateStudentDetails(event) {
     isNameValid      = validateTextField("studentName", studentNameFormat, "Name must be alphanumeric.");
     isEmailAddressValid     = validateTextField("emailAddress", studentEmailFormat, "Email must be in the format username@northeastern.edu.");
     isPhoneNumberValid     = validateTextField("phoneNumber", phoneNumberFormat, "Enter a valid phone number.");
     isZipCodeValid       = validateTextField("zipCode", zipCodeFormat, "Enter valid 5-digit zip code.");
     isAddressValid  = validateRequiredField("addressField1");
    
    let mealOptionsValid = true;
    
    const isFormValid = isNameValid && isEmailAddressValid && isPhoneNumberValid && isZipCodeValid && isAddressValid && mealOptionsValid;
    submitButton.disabled = !isFormValid;
    return isFormValid;
  }
  
// Validating the Text Field with Regex and Error Message
function validateTextField(detailsID, dataFormat, errorMessage) {
  const field = document.getElementById(detailsID);
  const errorSpan = getErrorElement(detailsID);
  const isTouched = field.dataset.touched === "true";
  const value = field.value.trim();
  
  if (value === "") {
    if (isTouched && errorSpan) {
      errorSpan.textContent = "This field is Mandatory.";
    } else if (errorSpan) {
      errorSpan.textContent = "";
    }
    return false;
  }
  
  if (!dataFormat.test(value)) {
    if (isTouched && errorSpan) {
      errorSpan.textContent = errorMessage;
    } else if (errorSpan) {
      errorSpan.textContent = "";
    }
    return false;
  }
  
  if (errorSpan) errorSpan.textContent = "";
  return true;
}

// Getting the Error Element based on the ID
function getErrorElement(detailsID) {
    if (detailsID === "studentName") return document.getElementById("nameError");
    if (detailsID === "emailAddress") return document.getElementById("emailError");
    if (detailsID === "phoneNumber") return document.getElementById("phoneNumberError");
    if (detailsID === "addressField1") return document.getElementById("addressField1Error");
    if (detailsID === "zipCode") return document.getElementById("zipError");
    if (detailsID === "extraField") return document.getElementById("extraFieldError");
    return null;
  }

// Validating the Required Field with Error Message
function validateRequiredField(detailsID) {
  const field = document.getElementById(detailsID);
  const errorSpan = getErrorElement(detailsID);
  const isTouched = field.dataset.touched === "true";
  const value = field.value.trim();
  
  if (value === "") {
    if (isTouched && errorSpan) {
      errorSpan.textContent = "This field is Mandatory.";
    } else if (errorSpan) {
      errorSpan.textContent = "";
    }
    return false;
  }
  if (errorSpan) errorSpan.textContent = "";
  return true;
}

// Masking the Phone Number Field
studentPhoneNumber.addEventListener("input", 
    function() {
  let input = this;
  let numbers = input.value.replace(/\D/g, "");
  let formattedNumber = "";
  if (numbers.length > 0) {
    formattedNumber = "(" + numbers.substring(0, 3);
  }
  if (numbers.length >= 4) {
    formattedNumber += ") " + numbers.substring(3, 6);
  }
  if (numbers.length >= 7) {
    formattedNumber += "-" + numbers.substring(6, 10);
  }

  input.value = formattedNumber;
  validateStudentDetails();
});

// Adding Event Listeners for the form fields
document.querySelectorAll("#Registration-Form input").forEach((input) => {
  input.addEventListener("input", validateStudentDetails);
  input.addEventListener("blur", function() {
    input.dataset.touched = "true";
    validateStudentDetails();
  });
});

//  Address Field Counter
addressField2.addEventListener("input", function () {
  const currentLength = this.value.length;
  addressField2Counter.textContent = `${currentLength}/20 characters used`;
  validateStudentDetails();
});

// Checkbox for Meal Options
mealOption.addEventListener("change", function () {
    // Clear any previous dynamic elements.
    checkboxContainer.innerHTML = "";
    
    // Validate meal option selection.
    const mealOptionError = getErrorElement("mealOption");
    if (mealOption.value === "") {
      if (mealOptionError) {
        mealOptionError.textContent = "Please select a meal option.";
      }
    } else {
      if (mealOptionError) {
        mealOptionError.textContent = "";
      }
      
      // Determining the drink label based on the selected meal option.
      let drinkLabel = "";
      switch (mealOption.value) {
        
        case "Veg-Meal":
          drinkLabel = "Lemon Soda";
          break;
        case "Non-Veg Meal":
          drinkLabel = "Large Coke";
          break;
        case "Sandwich":
          drinkLabel = "Ice Tea";
          break;
        case "Pizza":
          drinkLabel = "Chocolate Cake";
          break;
        case "Burger":
          drinkLabel = "Pepsi";
          break;
        default:
          drinkLabel = "";
      }
      
      // Creating the dynamic checkbox.
      const dynamicCheckbox = document.createElement("input");
      dynamicCheckbox.type = "checkbox";
      dynamicCheckbox.id = "dynamicCheckbox";
      
      const checkboxLabel = document.createElement("label");
      checkboxLabel.htmlFor = "dynamicCheckbox";
      checkboxLabel.textContent = " " + drinkLabel;
      
      checkboxContainer.appendChild(dynamicCheckbox);
      checkboxContainer.appendChild(checkboxLabel);
      
    // Monitoring changes to the dynamic checkbox.
      dynamicCheckbox.addEventListener("change", function () {
        let extraField = document.getElementById("extraField");
        if (dynamicCheckbox.checked) {
          if (!extraField) {
            extraField = document.createElement("input");
            extraField.type = "text";
            extraField.id = "extraField";
            extraField.placeholder =  drinkLabel + " Quantity ";
            
            // Create an error span for the extra field.
            const extraError = document.createElement("span");
            extraError.className = "error";
            extraError.id = "extraFieldError";
            
            checkboxContainer.appendChild(document.createElement("br"));
            checkboxContainer.appendChild(extraField);
            checkboxContainer.appendChild(extraError);
            
            extraField.addEventListener("input", validateStudentDetails);
            extraField.addEventListener("blur", function () {
              extraField.dataset.touched = "true";
              if (extraField.value.trim() === "") {
                extraError.textContent = "This field is Mandatory.";
              } else {
                extraError.textContent = "";
              }
              validateStudentDetails();
            });
          }
        } else {
          if (extraField) {
            const extraError = document.getElementById("extraFieldError");
            if (extraError) extraError.remove();
            extraField.remove();
          }
        }
        validateStudentDetails();
      });
    }
    validateStudentDetails();
  });
  
  

registrationForm.addEventListener("submit", function(e) {
    e.preventDefault();
    if (validateStudentDetails()) {
      // Taking input values for the table.
      const nameVal      = studentName.value.trim();
      const emailVal     = studentEmailId.value.trim();
      const phoneVal     = studentPhoneNumber.value.trim();
      const address1Val  = studentAddressField1.value.trim();
      const address2Val  = addressField2.value.trim();
      const zipVal       = studentZipCode.value.trim();
      const mealOptionVal = mealOption.value;
      
      // Changing the Checkbox value based on the meal option selected.
      let drinkVal = "";
      const dynamicCheckbox = document.getElementById("dynamicCheckbox");
      if (dynamicCheckbox && dynamicCheckbox.checked) {
        switch (mealOption.value) {
        
          case "Veg-Meal":
            drinkVal = "Lemon Soda";
            break;
          case "Non-Veg Meal":
            drinkVal = "Large Coke";
            break;
          case "Sandwich":
            drinkVal = "Ice Tea";
            break;
          case "Pizza":
            drinkVal = "Chocolate Cake";
            break;
          case "Burger":
            drinkVal = "Pepsi";
            break;
          default:
            drinkVal = "";
        }
      }
      
    // Get the extra field value if it's there.
      let extraFieldVal = "";
      const extraField = document.getElementById("extraField");
      if (extraField) {
        extraFieldVal = extraField.value.trim();
      }
      
      // Addind a new row to the table
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${nameVal}</td>
        <td>${emailVal}</td>
        <td>${phoneVal}</td>
        <td>${address1Val}</td>
        <td>${address2Val}</td>
        <td>${zipVal}</td>
        <td>${mealOptionVal}</td>
        <td>${drinkVal}</td>
        <td>${extraFieldVal}</td>
      `;
      registeredStudents.appendChild(newRow);
      
      alert("Form Submitted Successfully!");
      registrationForm.reset();
      
        // Reseting form validation state.
      document.querySelectorAll("#Registration-Form input").forEach((input) => {
        delete input.dataset.touched;
      });
      
      submitButton.disabled = true;
      addressField2Counter.textContent = "0/20 characters used";
      checkboxContainer.innerHTML = "";
      
      validateStudentDetails();
    } else {
      alert("Please enter valid details.");
    }
  });
  
