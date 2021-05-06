import bcrypt from 'bcrypt';
export async function seed(knex){ 
  const dummyUsers = [
    {
      email: 'yorli@gmail.com',
      password: 'apples1'
    },
    {
      email: 'lucero@gmail.com',
      password: 'oranges1'
    },
    {
      email: 'john@gmail.com',
      password: 'mangos1'
    },
  ];
  const saltRounds = 10;

  const dbUsers = await Promise.all(dummyUsers.map(async (user) => {
    const userHash = await bcrypt.hash(user.password,saltRounds);
    return {email: user.email,  hash: userHash};
  }));

 // Deletes ALL existing entries
  return knex('login').del()
    .then(() => {
      // Inserts seed entries
      return knex('login').insert(dbUsers);
    });
};
