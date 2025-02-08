# Planetarium Trip Registration

This project is a web-based registration form for a planetarium trip organized by SEDS Northeastern. The form collects student details and validates the input before submission. The registered students' information is displayed in a table.

## Project Structure

### Files

 PlanetariumTrip.html : The main HTML file containing the structure of the registration form and the table for displaying registered students.
 script.js : The JavaScript file containing the form validation logic and dynamic behavior for the form fields.
 styling.css : The CSS file containing the styles for the form, table, and other elements on the page.

## Features

** Form Validation : The form validates the following fields:
  * Student Name: Must be alphanumeric.
  * Email: Must be in the format `username@northeastern.edu`.
  * Phone Number: Must be in the format `(XXX) XXX-XXXX`.
  * Zip Code: Must be a 5-digit number.
  * Address Field 1: Required field.
  * Meal Option: Required field with dynamic drink options based on the selected meal.

* Dynamic Behavior :
  * Phone number input is automatically formatted.
  * Character counter for Address Field 2.
  * Dynamic checkbox and input field for drink quantity based on the selected meal option.

** Table of Registered Students : Displays the details of registered students in a table format.

## Usage

1. Open `PlanetariumTrip.html` in a web browser.
2. Fill out the registration form with the required details.
3. The form will validate the input fields and enable the submit button if all fields are valid.
4. Click the submit button to register. The registered student's details will be displayed in the table below the form.

## Development

### Prerequisites

- A web browser (e.g., Chrome, Firefox, Safari)
- A code editor (e.g., Visual Studio Code)

### Customization

* Background Image : Change the background image by updating the `background-image` property in `styling.css`.
* Form Fields : Add or remove form fields by editing `PlanetariumTrip.html` and updating the validation logic in `script.js`.
* Styles : Customize the styles by editing `styling.css`.
