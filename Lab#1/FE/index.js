function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit', function(event){
  event.preventDefault();
  createEmployee();
}); 

// TODO
// add event listener to delete button
document.getElementById('dataTable').addEventListener('click', function(event) {
  if (event.target && event.target.nodeName == 'BUTTON' && event.target.textContent == 'Delete') {
    const id = event.target.parentElement.parentElement.firstChild.textContent;
    deleteEmployee(id);
  }
});

// TODO
function createEmployee (){
  // get name
  // send name to BE
  // call fetchEmployees
  const name = document.getElementById('name').value;
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name })
  })
  .then(response => response.json())
  .then(data => {
    fetchEmployees();
  })
  .catch(error => console.error(error));

}

// TODO
function deleteEmployee (){
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    fetchEmployees();
  })
  .catch(error => console.error(error));
}

fetchEmployees()

