//Packages
const parse = require("date-fns/parse");
const isAfter = require("date-fns/isAfter");
const increaseSalary = (data, value) =>
  data.map((item) => {
    return { ...item, salary: item.salary + value };
  });

const filterEmployeesByDateOfBirth = (data, value) => {
  const date = parse(value, "yyyy-mm-dd", new Date()); //Year/Month/Date

  const result = data.filter((value) =>
    isAfter(new Date(value.DATE_OF_BIRTH), date)
  );

  return result;
};
const averageSalary = (data) =>
  data.reduce((sum, f) => +sum + +f.SALARY, 0) / data.length;
module.exports = {
  increaseSalary,
  filterEmployeesByDateOfBirth,
  averageSalary,
};
