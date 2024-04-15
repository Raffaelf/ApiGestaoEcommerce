'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Loja extends Model {
    //Dizendo que uma loja pertence a um usuário
    /*user() {
        return this.belongsTo('App/Models/User');
    }*/

    /*gateway() {
        return this.hasOne('App/Models/Gateway');
    }*/

    gastos() {
        return this.hasMany('App/Models/Gasto');
    }

    saques() {
        return this.hasMany('App/Models/Saque');
    }

    produtos() {
        return this.hasMany('App/Models/Produto');
    }

    images() {
        return this.hasMany('App/Models/Image');
    }

    trocas() {
        return this.hasMany('App/Models/Troca');
    }


    static get hidden() {
        return ['password'];
    }

}

module.exports = Loja
