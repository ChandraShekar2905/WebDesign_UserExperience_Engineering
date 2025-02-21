$(document).ready(function () {
    // Display the User Name at the Top of the Page
    $("#displayUsername").text(sessionStorage.getItem("username") || "User");
  
    // Single Arrow function to perform all the calculations.
    const calculate = (num1, num2, op) => {
      switch(op) {
        case "add":      return num1 + num2;
        case "subtract": return num1 - num2;
        case "multiply": return num1 * num2;
        case "divide":   return num2 === 0 ? "Error: Division by zero" : num1 / num2;
        default:         return null;
      }
    };

    // Validation function for numbers.
    function validateNumber(value) {
      const val = value.trim();
      if(val === "") {
        return { valid: false, message: "Field cannot be empty." };
      }
      const numberRegex = /^-?\d+(\.\d+)?$/;
      if(!numberRegex.test(val)) {
        return { valid: false, message: "Only numeric values are allowed." };
      }
      const num = Number(val);
      if(!isFinite(num)) {
        return { valid: false, message: "Value is not finite." };
      }
      return { valid: true, value: num };
    }
  
    // Binding the click event to all operation buttons.
    $(".calcBtn").click(function(){ 
        
      // Clearing any previous error messages.
      $("#num1Error, #num2Error").text("");
      $("#result").val("");
  
      const op = $(this).data("op");
      console.log("Operation:", op);
  
      const num1Input = $("#number1").val();
      const num2Input = $("#number2").val();
  
      // Validating both input fields.
      const num1Validation = validateNumber(num1Input);
      const num2Validation = validateNumber(num2Input);
      let errorOccurred = false;
  
      if(!num1Validation.valid) {
        $("#num1Error").text(num1Validation.message);
        errorOccurred = true;
      }
      if(!num2Validation.valid) {
        $("#num2Error").text(num2Validation.message);
        errorOccurred = true;
      }
      
      // Checking for division by zero.
      if(op === "divide" && num2Validation.valid && Number(num2Input.trim()) === 0) {
        $("#num2Error").text("Cannot divide by zero.");
        errorOccurred = true;
      }
  
      if(errorOccurred) {
        console.log("Validation failed");
        return;
      }
  
      // Parsing the validated numbers.
      const num1 = num1Validation.value;
      const num2 = num2Validation.value;
      console.log("Numbers:", num1, num2);
  
      // Calculating the result using the arrow function.
      const result = calculate(num1, num2, op);
      console.log("Result:", result);
      $("#result").val(result);
    });
  });
  