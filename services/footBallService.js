import apiOperations from "../api_helpers/apiOperations.js";

const footBallService = {
  async getListOfCountries() {
    try {
      return await apiOperations.getCountries();
    } catch (err) {
      console.log("error calling api");
      throw err;
    }
  },
  async getListOfLeagues(country) {
    try {
      const year = new Date().getFullYear();
      return await apiOperations.getLeagues(country, year);
    } catch (err) {
      console.log("Error fetching leagues");
      throw err;
    }
  },
  async getListOfTeams(leagueId) {
   try {
      const year = new Date().getFullYear();
      return await apiOperations.getTeams(leagueId, year);
    } catch (err) {
      console.log("Error fetching teams");
      throw err;
    }
  },
};

export default footBallService;
