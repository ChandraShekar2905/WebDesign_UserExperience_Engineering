
HTML Structure :
------------------

* Heading <h1> and <h2>: Displays the Name and NUID.

* Table <table id="myTable">: Contains student data.

* <th>: Table headers including Student, Advisor, Award Status, etc.

* <td>: Table data with checkboxes, student details, and buttons.

* <tr class="dropDownTextArea">: Collapsible detailed student information.

* <button id="button">: Disabled by default; enabled when a checkbox is selected.

* <button id="add">: Adds a new student row dynamically.

* <script src="script.js">: Links JavaScript functionality.



CSS Styling (style.css and table.css) :
----------------------------------------

* #myTable: Styled with borders and padding.

* .dropDownTextArea: Initially hidden, displayed on toggle.

* #button: Orange by default, changes color when enabled.



JavaScript (script.js) :
------------------------

* document.addEventListener - Ensures script runs after page load.

* addButton.addEventListener - Adds a new student with sequential numbering.

* table.addEventListener - Handles checkbox selection, row highlighting, and button activation.

* table.addEventListener - Manages row expansion and deletion.