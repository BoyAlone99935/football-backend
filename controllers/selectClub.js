const axios = require('axios');
const { BadRequest } = require('../Errors/index');
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const NodeCache = require('node-cache');

const cachedData = new NodeCache({ stdTTL: 86400 }); // cache for 1 day

const getTeamsByLeague = async (req, res) => { 
  const leagueId = req.params.id;

  if (!leagueId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'league id is required' });
  }

  try {
    // check cache
    if (cachedData.has(`league_${leagueId}`)) {
      const cachedTeams = cachedData.get(`league_${leagueId}`);
      console.log('fetched teams from cache');
      return res.status(StatusCodes.OK).json(cachedTeams);
    }

    //fetch from API
    const apiRes = await axios.get('https://v3.football.api-sports.io/teams', {
      headers: {
        'x-apisports-key': process.env.API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
      params: {
        league: leagueId,
        season: 2023,
      },
    });

    const response = apiRes.data.response;
    console.log(apiRes.data)
   
    const teams = response.map((teamObj) => ({
      id: teamObj.team.id,
      name: teamObj.team.name,
      logo: teamObj.team.logo,
      country: teamObj.team.country,
      founded: teamObj.team.founded,
      stadium: teamObj.venue.name,
    }));

    
    cachedData.set(`league_${leagueId}`, teams);
    console.log(`cached teams for league ${leagueId}`);

 
    return res.status(StatusCodes.OK).json(teams);
  } catch (err) {
    console.error(' Error:', err.message);
    throw new BadRequest('Error fetching teams for this league');
  }
};

module.exports = getTeamsByLeague;
