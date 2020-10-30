
exports.up = knex => {
    return knex.schema.createTable('login', table =>{
        table.increments();
        table.text('hash').notNullable();
        table.text('email').notNullable().unique();
    });
};

exports.down = knex => {
  return knex.scheme.dropTable('login');
};
