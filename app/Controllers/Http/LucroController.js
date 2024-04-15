'use strict'

const Lucro = use('App/Models/Lucro')
const Loja = use('App/Models/Loja')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with lucros
 */
class LucroController {
  /**
   * Show a list of all lucros.
   * GET lucros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new lucro.
   * GET lucros/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new lucro.
   * POST lucros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data = request.only(['valor', 'loja_id', 'mes_ano']);
    const loja = await Loja.findOrFail(data.loja_id);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    const lucro = await Lucro.findBy({ 'loja_id': data.loja_id, 'mes_ano': data.mes_ano });

    if (!lucro) {
      const lucroCreate = await Lucro.create({ ...data });

      return lucroCreate;
    } else {
      lucro.merge(data);
      lucro.save();

      return lucro;
    }
  }

  /**
   * Display a single lucro.
   * GET lucros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, auth }) {
    const loja = await Loja.findOrFail(params.id);

    if (loja.user_id !== auth.user.id) {
      return response.status(401);
    }

    const sub = request.get().sub;
    const month = request.get().month;
    const year = request.get().year;
    const from = request.get().from;
    const to = request.get().to;
    const ano = request.get().ano;

    if (sub == "Dashboard") {
      if (from != null && to != null) {
        const lucro = await Lucro.query()
          .where('loja_id', params.id)
          .whereBetween('mes_ano', [`${from}-01`, `${to}-31`])
          .fetch(); //Retorna gastos de uma loja

        return lucro;
      } else if (month != null && year != null) {
        const lucro = await Lucro.query()
          .where('loja_id', params.id)
          .whereBetween('mes_ano', [`${year}-${month}-01`, `${year}-${month}-31`])
          .fetch(); //Retorna gastos de uma loja

        return lucro;
      } else if (ano != null) {
        const lucro = await Lucro.query()
          .where('loja_id', params.id)
          .whereBetween('mes_ano', [`${ano}-01-01`, `${ano}-12-31`])
          .fetch(); //Retorna gastos de uma loja

        return lucro;
      } else {
        const lucro = await Lucro.query()
          .where('loja_id', params.id)
          .fetch(); //Retorna gastos de uma loja
        return lucro;
      }
    } else {
      const month = (new Date().getMonth() + 1);
      const year = new Date().getFullYear();

      const lucro = await Lucro.query()
        .where('loja_id', params.id)
        .where('mes_ano', '<', `${year}-${month}-01`)
        .fetch(); //Retorna gastos de uma loja
      return lucro;
    }
  }

  /**
   * Render a form to update an existing lucro.
   * GET lucros/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update lucro details.
   * PUT or PATCH lucros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a lucro with id.
   * DELETE lucros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = LucroController
