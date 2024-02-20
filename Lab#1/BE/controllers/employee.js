const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  const index = employee.findIndex((emp) => emp.id === id);
  console.log(index);
  employee.splice(index, 1);
  res.status(200).json({ data: employee });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const name = req.body.name;
  const id = req.body.id;

  // Check if id already exists
  const existingEmployee = employee.find((emp) => emp.id === id);
  if (existingEmployee) {
    return res.status(400).json({ error: 'Employee with the same id already exists' });
  }

  employee.push({ id, name });
  res.status(201).json({ data: employee });
};
