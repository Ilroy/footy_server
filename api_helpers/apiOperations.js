import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiOperations = {
  async getCountries() {
    try {
      const response = await axios.get(
        "https://api-football-beta.p.rapidapi.com/countries",
        {
          headers: {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": process.env.API_HOST,
          },
        }
      );

      return response.data.response;
    } catch (err) {
      console.log("Error Calling Api");
      throw err;
    }
  },
  async getLeagues(country, year) {
    try {
      const response = await axios.get(
        "https://api-football-beta.p.rapidapi.com/leagues",
        {
          params: {
            country: country,
            season: year,
          },
          headers: {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": process.env.API_HOST,
          },
        }
      );
      return response.data.response.map((leagueObj) => leagueObj.league);
    } catch (err) {
      console.log("error calling api");
      throw err;
    }
  },
  async getTeams(leagueId,year){
    try {
        const response = await axios.get(
          "https://api-football-beta.p.rapidapi.com/teams",
          {
            params: {
              league: leagueId,
              season: year,
            },
            headers: {
              "x-rapidapi-key": process.env.API_KEY,
              "x-rapidapi-host": process.env.API_HOST,
            },
          }
        );
        return response.data.response.map((teamObj) => teamObj.team);
      } catch (err) {
        console.log("error calling api");
        throw err;
      }
  }
};

export default apiOperations;
