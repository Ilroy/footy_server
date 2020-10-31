
exports.seed = async knex=> {
  // Deletes ALL existing entries

  const dummyUsers = [
   {
     firstName: 'Yorli',
     lastName: 'Sienfeld'
   },
    {
     firstName: 'Lucero',
     lastName: 'Costanza'
   },
    {
     firstName: 'John',
     lastName: 'Kramer'
   }  
  ];


  const loginData = await knex.select('email').table('login');
  const usersData = loginData.map((record, i) =>{
    return {...record, ...dummyUsers[i]}
  });

  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert(usersData);
    });
};
