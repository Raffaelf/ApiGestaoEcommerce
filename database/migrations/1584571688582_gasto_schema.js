'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GastoSchema extends Schema {
  up() {
    this.create('gastos', (table) => {
      table.increments()
      table
        .integer('loja_id')
        .unsigned() //Diz que o valor não pode ser abaixo de 0
        .notNullable() //Obrigatoriedade de se ter um usuário
        .references('id') // Id da tabela lojas
        .inTable('lojas') // 
        .onUpdate('CASCADE') // Quando um usuário for atualizado/deletado, será atualizado automaticamente em todas as tabelas.
        .onDelete('CASCADE');
      table.double('valor').notNullable()
      table.string('descricao', 240)
      table.enu('tipo_gasto', ['Marketing', 'Produto', 'Checkout', 'Plataforma', 'Imposto', 'Aplicativo', 'Outros']).notNullable()
      table.date('created_date').notNullable()
    })
  }

  down() {
    this.drop('gastos')
  }
}

module.exports = GastoSchema
