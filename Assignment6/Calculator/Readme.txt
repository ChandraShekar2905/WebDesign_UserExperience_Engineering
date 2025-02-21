# Assignment6: Calculator & Stopwatch Application

This project consists of two separate application components:

1. **Calculator App**  
2. **Stopwatch App**

-----------------------------------

## Table of Contents

- [Overview](#overview)
- [Calculator App](#calculator-app)
- [Stopwatch App](#stopwatch-app)
- [Usage](#usage)
- [Technologies](#technologies)
-----------------------------------

## Overview

This Project demonstrates practical applications using HTML, CSS, JS/jQuery and integrates form validations and asynchronous operations. 
The project has two main parts: a Calculator App with a user login and arithmetic operations, and a Stopwatch App with time tracking and date selection.

------------------------------------

## Calculator App

The Calculator App is comprised of two HTML pages:

- **Login Page**

  - [Calculator/loginPage.html](Calculator/loginPage.html)  
    A login form that validates:
    - Email (must be a Northeastern email ending with @northeastern.edu)
    - Username (only letters allowed)
    - Password (between 6 and 20 characters)
    - Confirm Password (must match the password)

  - [Calculator/scriptLogin.js](Calculator/scriptLogin.js)  
    Uses jQuery for handling events and input validations. Successful login stores the username using sessionStorage and redirects to the calculator.

  - [Calculator/styleLoginPage.css](Calculator/styleLoginPage.css)  
    Styles for the login page.

- **Calculator Page**

  - [Calculator/calculator.html](Calculator/calculator.html)  
    Displays the logged-in username and provides an interface to perform arithmetic operations.

  - [Calculator/scriptCalculator.js](Calculator/scriptCalculator.js)  
    Provides the logic for the arithmetic operations (addition, subtraction, multiplication, division) with validations.

  - [Calculator/styleCalculator.css](Calculator/styleCalculator.css)  
    Styles for the calculator page.

---------------------------------------

## Stopwatch App

The Stopwatch App provides a simple stopwatch with date selection:

- [Stopwatch/stopwatch.html](Stopwatch/stopwatch.html)  
  Main HTML file containing the stopwatch interface, including:
  - A Flatpickr date picker.
  - A digital time display.

- [Stopwatch/scriptStopwatch.js](Stopwatch/scriptStopwatch.js)  
  Uses jQuery for DOM interactions and manages:
  - Starting, stopping, and resetting the stopwatch.
  - Updating the time display in HH:MM:SS format.
  - Using Flatpickr for a user-friendly date picker.

- [Stopwatch/styleStopwatch.css](Stopwatch/styleStopwatch.css)  
  Provides the styles for the stopwatch UI.

----------------------------------------

## Usage

1. **Calculator App:**
   - Open `Calculator/loginPage.html` in your browser.
   - Complete the login form and click on the **Login** button.
   - Upon successful login, you will be redirected to `Calculator/calculator.html` where you can perform arithmetic operations.

2. **Stopwatch App:**
   - Open `Stopwatch/stopwatch.html` in your browser.
   - Select a date if needed using the date picker.
   - Use the **Start**, **Stop**, and **Reset** buttons to control the stopwatch.

----------------------------------------

## Technologies

- **HTML5** and **CSS3**
- **JavaScript/jQuery**
- **Bootstrap 5**
- **Flatpickr** (for date selection)

----------------------------------------

