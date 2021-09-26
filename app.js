//Packages
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvParser = require("csv-parser");
const fs = require("fs");

//Constants
const requests = require("./src/requests.js");
const services = require("./src/services.js");
const constants = require("./src/constants.js");
const csvWriter = createCsvWriter({
  path: constants.path,
  header: constants.header,
});

//Implementation
const getEmployeesFromApi = async (params) => {
  //Get employees
  const employees = await requests.getEmployees();
  //Update
  const updatedEmployees = services.increaseSalary(employees, params);
  csvWriter.writeRecords(updatedEmployees).then(() => {
    console.log("CSV File has been written successfuly");
  });
};

const postDataToApi = (params) => {
  const results = [];
  //Read data from File
  fs.createReadStream(constants.path)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      //Filter employees by dateOfBirth
      const filteredResult = services.filterEmployeesByDateOfBirth(
        results,
        params
      );
      //Calculate Average Salary
      const avgSalary = services.averageSalary(filteredResult);

      console.log("Average Salary of Employees is : " + avgSalary);
      //Post employees
      requests.postEmployees({ results, avgSalary });
    });
};

//Exports
module.exports = { getEmployeesFromApi, postDataToApi };
require("make-runnable");
