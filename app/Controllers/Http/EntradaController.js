'use strict'

const Saque = use('App/Models/Entrada');
const Loja = use('App/Models/Loja');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with saques
 */
class EntradaController {
  /**
   * Show a list of all saques.
   * GET saques
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, auth }) {

    //const lojas = await Loja.findByOrFail('user_id', auth.user.id);

    //const saques = await Saque.query()
    //.where('gateway_id', lojas.)
    //.with('user')
    //.fetch(); //Retorna lojas do usuário

  }

  /**
   * Render a form to be used for creating a new saque.
   * GET saques/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new saque.
   * POST saques
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data = request.only(['loja_id', 'valores', 'descricao', 'tipo_entrada', 'created_date']);
    const loja = await Loja.findOrFail(data.loja_id);

    if (loja.user_id !== auth.user.id) {
      return response.status(401);
    }

    const saques = await Saque.create({ ...data });

    return saques;
  }

  /**
   * Display a single saque.
   * GET saques/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response, auth, request }) {
    const loja = await Loja.findOrFail(params.id);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    const sub = request.get().sub;
    const month = request.get().month;
    const year = request.get().year;
    const from = request.get().from;
    const to = request.get().to;
    const ano = request.get().ano;

    const page = request.get().page || 1;

    if (sub == "Dashboard") {
      if (from != null && to != null) {
        const saques = await Saque.query()
          .where('loja_id', params.id)
          .whereBetween('created_date', [`${from}-01`, `${to}-31`])
          .fetch(); //Retorna saques de uma loja

        return saques;
      } else if (month != null && year != null) {
        const saques = await Saque.query()
          .where('loja_id', params.id)
          .whereBetween('created_date', [`${year}-${month}-01`, `${year}-${month}-31`])
          .fetch(); //Retorna saques de uma loja

        return saques;
      } else if (ano != null) {
        const saques = await Saque.query()
          .where('loja_id', params.id)
          .whereBetween('created_date', [`${ano}-01-01`, `${ano}-12-31`])
          .fetch(); //Retorna saques de uma loja

        return saques;
      } else {
        const saques = await Saque.query()
          .where('loja_id', params.id)
          .fetch(); //Retorna saques de uma loja
        return saques;
      }
    } else {
      const saques = await Saque.query()
        .where('loja_id', params.id)
        .orderBy('created_date', 'desc')
        .paginate(page, 10);
      return saques;
    }
  }

  /**
   * Render a form to update an existing saque.
   * GET saques/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update saque details.
   * PUT or PATCH saques/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const data = request.only(['valores', 'descricao', 'tipo_entrada', 'created_date']);
    const saques = await Saque.findOrFail(params.id);
    const loja = await Loja.findOrFail(saques.loja_id);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    saques.merge(data);
    saques.save();

    return saques;
  }

  /**
   * Delete a saque with id.
   * DELETE saques/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth }) {
    const saques = await Saque.findOrFail(params.id);
    const loja = await Loja.findOrFail(saques.loja_id);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    saques.delete();
  }
}

module.exports = EntradaController
