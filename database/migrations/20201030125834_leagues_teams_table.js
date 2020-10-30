
exports.up = knex => {
    return knex.schema.createTable('followed_leagues', table =>{
        table.increments();
        table.integer('user_id').notNullable();
        table.string('league',50).notNullable();

        table.foreign('user_id').references('id').inTable('users');
    })
    .createTable('followed_teams', table =>{
        table.increments();
        table.integer('user_id').notNullable();
        table.string('team',50).notNullable();

        table.foreign('user_id').references('id').inTable('users');
    });
  
};

exports.down = knex => {
    return knex.schema.dropTable('followed_leagues').dropTable('followed_teams');

  
};
