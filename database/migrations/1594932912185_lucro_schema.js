'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LucroSchema extends Schema {
  up() {
    this.create('lucros', (table) => {
      table.increments()
      table
        .integer('loja_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('lojas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.date('mes_ano').notNullable();
      table.double('valor').notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('lucros')
  }
}

module.exports = LucroSchema
