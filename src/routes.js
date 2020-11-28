const express = require('express')

const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')
const IndicatorController = require('./controllers/IndicatorsControllers')

const routes = express.Router();

routes.post('/users', UserController.create)
routes.get('/users/list', UserController.list)

routes.post('/users/:user_id/tasks', TaskController.create)
routes.post('/tasks/search_all', TaskController.searchAll)
routes.post('/tasks/:id', TaskController.findTask)
routes.post('/tasks/search/filtered', TaskController.search)

routes.post('/indicators', IndicatorController.data)

module.exports = routes