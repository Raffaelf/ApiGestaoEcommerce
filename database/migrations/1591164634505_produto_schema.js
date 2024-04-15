'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  up() {
    this.create('produtos', (table) => {
      table.increments()
      table
        .integer('loja_id')
        .unsigned() //Diz que o valor não pode ser abaixo de 0
        .notNullable() //Obrigatoriedade de se ter um usuário
        .references('id') // Id da tabela lojas
        .inTable('lojas') // 
        .onUpdate('CASCADE') // Quando um usuário for atualizado/deletado, será atualizado automaticamente em todas as tabelas.
        .onDelete('CASCADE');
      table.string('imagePath');
      table.string('nome_produto', 50).notNullable();
      table.double('preco_custo').notNullable();
      table.double('preco_venda').notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('produtos')
  }
}

module.exports = ProdutoSchema
