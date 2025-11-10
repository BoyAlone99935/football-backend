const axios = require("axios");
require("dotenv").config();
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600}); // cache for 1 minute

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://v3.football.api-sports.io";
const headers = {
  "x-apisports-key": API_KEY,
  'x-rapidapi-host': 'v3.football.api-sports.io'
};

    const getSingleMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const cacheKey = `single-match-${id}`;
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return res.status(200).json(cachedResponse);
    }

    // Fetch full fixture info
    const response = await axios.get(`${BASE_URL}/fixtures?id=${id}`, { headers });
    const matchData = response.data.response[0];

    if (!matchData) {
      return res.status(404).json({ msg: "Match not found" });
    }

    // Build structured match object
    const match = {
      id: matchData.fixture.id,
      date: matchData.fixture.date,
      venue: matchData.fixture.venue?.name || null,
      referee: matchData.fixture.referee || null,
      league: matchData.league.name,
      status: matchData.fixture.status.short,
      elapsed: matchData.fixture.status.elapsed,
      homeTeam: {
        id: matchData.teams.home.id,
        name: matchData.teams.home.name,
        logo: matchData.teams.home.logo,
        goals: matchData.goals.home,
      },
      awayTeam: {
        id: matchData.teams.away.id,
        name: matchData.teams.away.name,
        logo: matchData.teams.away.logo,
        goals: matchData.goals.away,
      },

      // Events: goals, cards, substitutions, etc.
      events: matchData.events?.map(e => ({
        time: e.time,
        team: e.team,
        player: e.player,
        assist: e.assist,
        type: e.type,
        detail: e.detail,
        comments: e.comments,
      })) || [],

      // Statistics for both teams
      statistics: matchData.statistics?.map(stat => ({
        team: stat.team,
        statistics: stat.statistics,
      })) || [],

      // Lineups (formations, startXI, subs, coach)
      lineups: matchData.lineups?.map(line => ({
        team: line.team,
        formation: line.formation,
        startXI: line.startXI,
        substitutes: line.substitutes,
        coach: line.coach,
      })) || [],
    };

    cache.set(cacheKey, match);
    res.status(200).json(match);
  } catch (error) {
    console.error("Error fetching single match:", error.message);
    res.status(500).json({ msg: "Failed to fetch match" });
  }
};

    const getLiveMatches = async (req, res) => {
      try {
        const cacheKey = 'live-matches';
        const cachedResponse = cache.get(cacheKey);
        if (cachedResponse) {
          return res.status(200).json(cachedResponse);
        }

        const response = await axios.get(`${BASE_URL}/fixtures?live=all`, { headers });
        const matches = response.data.response.map((m) => ({
      id: m.fixture.id,
      date: m.fixture.date,
      league: m.league.name,
      elapsed: m.fixture.status.elapsed, // ⏱️ Elapsed time in minutes
      homeTeam: {
        id: m.teams.home.id, //Home team ID
        name: m.teams.home.name,
        logo: m.teams.home.logo,
        goals: m.goals.home,
      },
      awayTeam: {
        id: m.teams.away.id, //Away team ID
        name: m.teams.away.name,
        logo: m.teams.away.logo,
        goals: m.goals.away,
      },
      status: m.fixture.status.short,
    }));

    cache.set(cacheKey, matches);
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching live matches:", error.message);
    res.status(500).json({ msg: "Failed to fetch live matches" });
  }
};




const getMatchesByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const cacheKey = `matches-by-date-${date}`;
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return res.status(200).json(cachedResponse);
    }

    const response = await axios.get(`${BASE_URL}/fixtures?date=${date}&status=FT`, { headers });
    const matches = response.data.response.map((m) => ({
      id: m.fixture.id,
      date: m.fixture.date,
      league: m.league.name,
      homeTeam: {
        name: m.teams.home.name,
        logo: m.teams.home.logo,
         goals: m.goals.home
      },
      awayTeam: {
        name: m.teams.away.name,
        logo: m.teams.away.logo,
        goals: m.goals.away
      },
      status: m.fixture.status.short,
    }));

    cache.set(cacheKey, matches);
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches by date:", error.message);
    res.status(500).json({ msg: "Failed to fetch matches" });
  }
};




module.exports = {
  getLiveMatches,
  getMatchesByDate,
  getSingleMatch , 
  
};


