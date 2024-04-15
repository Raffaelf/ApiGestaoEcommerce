'use strict'

const Loja = use('App/Models/Loja'); //Começa importando o Model

const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with lojas
 */
class LojaController {
  /**
   * Show a list of all lojas.
   * GET lojas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request }) {
    //const user = auth.user.id;
    /*const lojas = await Loja.query()
      .where('user_id', auth.user.id)
      //.with('user')
      .fetch().paginate(2, 10);*/ //Retorna lojas do usuário
    const page = request.get().page || 1;

    //console.log(params.id);

    const users = await Database
      .from('lojas')
      .where('user_id', auth.user.id)
      .paginate(page, 10);

    return users;
  }

  /**
   * Render a form to be used for creating a new loja.
   * GET lojas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, auth }) {

  }

  /**
   * Create/save a new loja.
   * POST lojas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(['nomeloja']); //Pega dados específicos da requisição POST
    //Cria a loja na tabela
    const loja = await Loja.create({ user_id: auth.user.id, ...data }); //auth.user.id Pega o id do usuário logado na app.

    return loja; //Retorna a loja criada
  }

  /**
   * Display a single loja.
   * GET lojas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, auth, response }) { //Params pega os parametros da URL

    const loja = await Loja.findOrFail(params.id); //Pegando o parametro da URL

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    return loja;
  }

  /**
   * Render a form to update an existing loja.
   * GET lojas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update loja details.
   * PUT or PATCH lojas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, auth, params, response }) {
    const loja = await Loja.findOrFail(params.id);
    const data = request.only(['nomeloja', 'valor_disponivel_gateway', 'taxa_gateway', 'taxa_checkout', 'taxa_impostos']);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    loja.merge(data);
    await loja.save();

    return data;
  }

  /**
   * Delete a loja with id.
   * DELETE lojas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const loja = await Loja.findOrFail(params.id);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    await loja.delete();//Deleta
  }
}

module.exports = LojaController
