'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LojasSchema extends Schema {
  up() {
    this.create('lojas', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned() //Diz que o valor não pode ser abaixo de 0
        .notNullable() //Obrigatoriedade de se ter um usuário
        .references('id') // Id da tabela users
        .inTable('users') // 
        .onUpdate('CASCADE') // Quando um usuário for atualizado/deletado, será atualizado automaticamente em todas as tabelas.
        .onDelete('CASCADE');
      table.string('nomeloja', 35).notNullable();
      table.double('valor_disponivel_gateway').defaultTo(0);
      table.double('taxa_gateway').defaultTo(4.49);
      table.double('taxa_checkout').defaultTo(2.5);
      table.double('taxa_impostos').defaultTo(6.0);
      table.timestamps()
    })
  }

  down() {
    this.drop('lojas')
  }
}

module.exports = LojasSchema
