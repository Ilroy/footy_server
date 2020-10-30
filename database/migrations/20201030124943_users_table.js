
exports.up = knex => {
    return knex.schema.createTable('users', table =>{
        table.increments();
        table.text('email').notNullable().unique();
        table.string('firstName',30).notNullable();
        table.string('lastName',30).notNullable();

        table.foreign('email').references('email').inTable('login');
    }) ; 
};

exports.down = knex => {
    return knex.schema.dropTable('users');
  
};
