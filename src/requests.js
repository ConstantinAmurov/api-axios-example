//Constants
const axios = require("axios").default;

//Implementation
const getEmployees = async () => {
  try {
    const employeesRequest = await axios.get(
      "https://61503c37a706cd00179b73c6.mockapi.io/api/employees"
    );
  } catch (error) {
    console.error(error);
  }

  return employeesRequest.data;
};
const postEmployees = async (data) => {
  try {
    await axios.post(
      "https://webhook.site/8313a787-c2e6-4e69-9c38-f09cf9802725",
      {
        ...data,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

//Declaration
module.exports = {
  getEmployees,
  postEmployees,
};
