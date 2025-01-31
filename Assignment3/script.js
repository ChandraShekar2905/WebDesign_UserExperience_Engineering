document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("myTable");
  const addButton = document.getElementById("add");
  const submitButton = document.getElementById("button");
  

  submitButton.disabled = true;
  submitButton.style.backgroundColor = "gray";
  
  let Counter = 1;
  
  addButton.addEventListener("click", 
      function () {

         // Adding new row to the table
          const newRow = table.insertRow(-1);
          Counter++;
          newRow.innerHTML = `
          <td><input type="checkbox" /><br /><br /><img src="down.png" width="25px" /></td>
          <td>Student ${Counter}</td>
          <td>Teacher ${Counter}</td>
          <td>Approved</td>
          <td>Fall</td>
          <td>TA</td>
          <td>${Math.floor(Math.random() * 100000)}</td>
          <td>100%</td>
          <td></td>
          <td></td>`;
        // Adding drop down row to the table
          const dropDownRow = table.insertRow(-1);
          dropDownRow.classList.add('dropDownTextArea');
          dropDownRow.style.display = 'none';  
          dropDownRow.innerHTML = `
          <td colspan="8">
            Advisor:<br /><br />
            Award Details<br />
            Summer 1-2014(TA)<br />
            Budget Number: <br />
            Tuition Number: <br />
            Comments:<br /><br /><br />
            Award Status:<br /><br /><br />
           </td>
          `;
            alert(`Student ${Counter} Record added successfully`);
           }
  );
       // Submit button functionality
  table.addEventListener("change", function (e) {
      if (e.target.type === "checkbox") {
          const row = e.target.closest("tr");
          if (e.target.checked) 
           {
              row.style.backgroundColor = "yellow";
              submitButton.disabled = false;
              submitButton.style.backgroundColor = "orange";

              // Adding delete and edit buttons
              let deleteButton = document.createElement("button");
              deleteButton.textContent = "Delete";
              deleteButton.onclick = 
              
             function () 
              {
                  alert(`${row.cells[1].textContent} Record deleted successfully`);
                  table.deleteRow(row.rowIndex);
              };
              row.cells[8].appendChild(deleteButton);
              
              let editButton = document.createElement("button");
              editButton.textContent = "Edit";
              editButton.onclick = 
              
            function () 
              {
               // Edit the details of the student
                  let newValue = prompt(`Edit the details of student ${row.cells[1].textContent} `, "");
                  if (newValue && newValue.trim() !== "") 
                 {
                   alert(`Student 2 data updated successfully`);
                 }

              };
              row.cells[9].appendChild(editButton);
           } 
          
          else 
          
           {
              row.style.backgroundColor = "white";
              row.cells[8].innerHTML = "";
              row.cells[9].innerHTML = "";
              if ([table.querySelectorAll("input[type=checkbox]")].every(cb => !cb.checked)) {
                  submitButton.disabled = true;
                  submitButton.style.backgroundColor = "gray";
              }
           }
      }
  });
   // Drop down functionality
  
  table.addEventListener("click", function (e) {
      if (e.target.tagName === "IMG") {
          const row = e.target.closest("tr").nextElementSibling;
          if (row.classList.contains("dropDownTextArea")) 
          {
              row.style.display = row.style.display === "none" ? "table-row" : "none";
          }
      }
  });


});
