'use strict'

const Loja = use('App/Models/Loja');
const Helpers = use('Helpers');
const Produto = use('App/Models/Produto')

//const sharp = use('sharp');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new produto.
   * GET produtos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data = request.only(['loja_id', 'nome_produto', 'preco_custo', 'preco_venda', 'imagePath']);
    const loja = await Loja.findOrFail(data.loja_id);

    if (loja.user_id !== auth.user.id) {
      return response.status(401);
    }

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    });

    /*const image1 = sharp(image)
      .resize({ width: 100 })
      .toBuffer();*/

    if (image != null) {
      await image.move(Helpers.tmpPath('uploads'), {
        name: `${Date.now()}-products.jpg`
      })

      if (!image.moved()) {
        return images.errors()
      }

      await Produto.create({ ...data, imagePath: image.fileName });
    } else {
      await Produto.create({ ...data });
    }
  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view, auth }) {
    const loja = await Loja.findOrFail(params.id); //Pegando o parametro da URL

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    const page = request.get().page || 1;

    const produto = Produto.query()
      .where('loja_id', params.id)
      .orderBy('nome_produto', 'asc')
      .paginate(page, 10)

    return produto;
    //return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  /**
   * Render a form to update an existing produto.
   * GET produtos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const produto = await Produto.findOrFail(params.id);
    const loja = await Loja.findOrFail(produto.loja_id);

    if (loja.user_id !== auth.user.id) {
      return response.status(401);
    }

    const data = request.only(['nome_produto', 'preco_custo', 'preco_venda']);

    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    });

    if (image != null) {
      await image.move(Helpers.tmpPath('uploads'), {
        name: `${Date.now()}-products.jpg`
      })

      if (!image.moved()) {
        return images.errors()
      }

      produto.merge({ ...data, imagePath: image.fileName })
      produto.save()
    } else {
      produto.merge(data)
      produto.save()
    }
  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    const produto = await Produto.findOrFail(params.id);
    const loja = await Loja.findOrFail(produto.loja_id);

    if (loja.user_id != auth.user.id) {
      return response.status(401);
    }

    produto.delete();
  }
}

module.exports = ProdutoController
