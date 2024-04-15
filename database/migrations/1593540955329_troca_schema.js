'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TrocaSchema extends Schema {
  up() {
    this.create('trocas', (table) => {
      table.increments()
      table
        .integer('loja_id')
        .unsigned() //Diz que o valor não pode ser abaixo de 0
        .notNullable() //Obrigatoriedade de se ter um usuário
        .references('id') // Id da tabela lojas
        .inTable('lojas') // 
        .onUpdate('CASCADE') // Quando um usuário for atualizado/deletado, será atualizado automaticamente em todas as tabelas.
        .onDelete('CASCADE');
      table.string('pedido', 20).notNullable()
      table.string('descricao', 240)
      table.enu('tipo', ['Reembolso', 'Troca']).notNullable()
      table.boolean('concluido').defaultTo(false).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('trocas')
  }
}

module.exports = TrocaSchema
