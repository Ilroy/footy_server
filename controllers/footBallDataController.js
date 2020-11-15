import footBallService from "../services/footBallService.js";

const footBallDataController = {
  async getCountries(req, res) {
    try {
      const listOfCountries = await footBallService.getListOfCountries();
      return res.status(200).json(listOfCountries);
    } catch (err) {
      res.status(500).json("Error Retrieving Countries");
    }
  },
  async getLeagues(req, res) {
    try {
      const { country } = req.body;
      const listOfLeagues = await footBallService.getListOfLeagues(country);
      return res.status(200).json(listOfLeagues);
    } catch (err) {
      res.status(500).json("Error Retrieving Leagues");
    }
  },
  async getTeams(req, res) {
      try{
        const {leagueId} = req.body;
        const listOfTeams = await footBallService.getListOfTeams(leagueId);
        return res.status(200).json(listOfTeams);
      }catch (err){
          res.status(500).json("Error Retrieving Teams");
      }
  },
};

export default footBallDataController;
