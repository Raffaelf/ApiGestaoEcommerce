'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register');
Route.post('/authenticate', 'AuthController.authenticate');

Route.group(() => {
    Route.resource('lojas', 'LojaController')
        .apiOnly() //Somente os métodos que existem
        .except(['create', 'edit']); //Recebe qual método não queremos utilizar
}).middleware('auth'); //Obrigatório estar autenticado

Route.group(() => {
    Route.resource('lucro', 'LucroController')
        .apiOnly() //Somente os métodos que existem
        .except(['edit', 'destroy', 'create', 'index', 'update']); //Recebe qual método não queremos utilizar
}).middleware('auth'); //Obrigatório estar autenticado

Route.group(() => {
    Route.resource('saque', 'EntradaController')
        .apiOnly() //Somente os métodos que existem
        .except(['edit', 'create', 'index']); //Recebe qual método não queremos utilizar
}).middleware('auth'); //Obrigatório estar autenticado

Route.group(() => {
    Route.resource('gasto', 'GastoController')
        .apiOnly() //Somente os métodos que existem
        .except(['create', 'edit']); //Recebe qual método não queremos utilizar
}).middleware('auth'); //Obrigatório estar autenticado

Route.group(() => {
    Route.resource('user', 'UserController')
        .apiOnly() //Somente os métodos que existem
        .except(['create', 'edit', 'destroy', 'store', 'show', 'update']); //Recebe qual método não queremos utilizar
}).middleware('auth'); //Obrigatório estar autenticado

Route.group(() => {
    Route.resource('products', 'ProdutoController')
        .apiOnly() //Somente os métodos que existem
        .except(['edit']); //Recebe qual método não queremos utilizar
}).middleware('auth'); //Obrigatório estar autenticado

Route.group(() => {
    Route.resource('trocas', 'TrocaController')
        .apiOnly() //Somente os métodos que existem
        .except(['edit']); //Recebe qual método não queremos utilizar
}).middleware('auth'); //Obrigatório estar autenticado

Route.get('images/:id', 'ImageController.show');