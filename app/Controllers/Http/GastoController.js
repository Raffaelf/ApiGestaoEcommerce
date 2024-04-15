'use strict'

const Gasto = use('App/Models/Gasto');
const Loja = use('App/Models/Loja');
const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with gastos
 */
class GastoController {
  /**
   * Show a list of all gastos.
   * GET gastos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

  }

  /**
   * Render a form to be used for creating a new gasto.
   * GET gastos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new gasto.
   * POST gastos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data = request.only(['tipo_gasto', 'valor', 'descricao', 'loja_id', 'created_date']);
    const loja = await Loja.findOrFail(data.loja_id);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    const gasto = await Gasto.create({ ...data });

    return gasto;
  }

  /**
   * Display a single gasto.
   * GET gastos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, auth }) {
    const loja = await Loja.findOrFail(params.id);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    const sub = request.get().sub;
    const type = request.get().type;
    const month = request.get().month;
    const year = request.get().year;
    const from = request.get().from;
    const to = request.get().to;
    const ano = request.get().ano;

    const page = request.get().page || 1;

    if (sub == "Dashboard") {
      if (type != null) {
        if (from != null && to != null) {
          const gastos = await Gasto.query()
            .where('loja_id', params.id)
            .where('tipo_gasto', type)
            .whereBetween('created_date', [`${from}-01`, `${to}-31`])
            .fetch(); //Retorna gastos de uma loja

          return gastos;
        } else if (month != null && year != null) {
          const gastos = await Gasto.query()
            .where('loja_id', params.id)
            .where('tipo_gasto', type)
            .whereBetween('created_date', [`${year}-${month}-01`, `${year}-${month}-31`])
            .fetch(); //Retorna gastos de uma loja

          return gastos;
        } else if (ano != null) {
          const gastos = await Gasto.query()
            .where('loja_id', params.id)
            .where('tipo_gasto', type)
            .whereBetween('created_date', [`${ano}-01-01`, `${ano}-12-31`])
            .fetch(); //Retorna gastos de uma loja

          return gastos;
        } else {
          const gastos = await Gasto.query()
            .where('loja_id', params.id)
            .where('tipo_gasto', type)
            .fetch(); //Retorna gastos de uma loja
          return gastos;
        }
      } else {
        if (from != null && to != null) {
          const gastos = await Gasto.query()
            .where('loja_id', params.id)
            .whereBetween('created_date', [`${from}-01`, `${to}-31`])
            .fetch(); //Retorna gastos de uma loja

          return gastos;
        } else if (month != null && year != null) {
          const gastos = await Gasto.query()
            .where('loja_id', params.id)
            .whereBetween('created_date', [`${year}-${month}-01`, `${year}-${month}-31`])
            .fetch(); //Retorna gastos de uma loja

          return gastos;
        } else if (ano != null) {
          const gastos = await Gasto.query()
            .where('loja_id', params.id)
            .whereBetween('created_date', [`${ano}-01-01`, `${ano}-12-31`])
            .fetch(); //Retorna gastos de uma loja

          return gastos;
        } else {
          const gastos = await Gasto.query()
            .where('loja_id', params.id)
            .fetch(); //Retorna gastos de uma loja
          return gastos;
        }
      }
    } else {
      const gastos = await Gasto.query()
        .where('loja_id', params.id)
        .orderBy('created_date', 'desc')
        .paginate(page, 10);
      return gastos;
    }

  }

  /**
   * Render a form to update an existing gasto.
   * GET gastos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {

  }

  /**
   * Update gasto details.
   * PUT or PATCH gastos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const data = request.only(['valor', 'descricao', 'tipo_gasto', 'created_date']);
    const gastos = await Gasto.findOrFail(params.id);
    const loja = await Loja.findOrFail(gastos.loja_id);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    gastos.merge(data);
    gastos.save();

    return gastos;
  }

  /**
   * Delete a gasto with id.
   * DELETE gastos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    const gastos = await Gasto.findOrFail(params.id);
    const loja = await Loja.findOrFail(gastos.loja_id);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    gastos.delete();
  }
}

module.exports = GastoController
