
export async function seed(knex) {
  // Deletes ALL existing entries

  const dummyTeams = [
    {
      team: 'Manchester United'
    },
    {
      team: 'FC Barcelona'
    },
    {
      team: 'Real Madrid'
    }
  ];

  const dummyLeagues = [
    {
      league: 'Premier League'
    },
    {
      league: 'La Liga'
    },
    {
      league: 'La Liga'
    }
  ];

  const userIds = await knex.select('id').table('users');

  const teamData = userIds.map((user, i) =>{
    return {...dummyTeams[i] ,user_id: user.id}
  });

  const leagueData = userIds.map((user,i)=>{
    return {...dummyLeagues[i], user_id: user.id}
  });

  await knex('followed_teams').del();

  await knex('followed_teams').insert(teamData);

  await knex('followed_leagues').del();

  return await knex('followed_leagues').insert(leagueData);
}
