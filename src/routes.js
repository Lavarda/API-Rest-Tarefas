const express = require('express')

const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')
const IndicatorController = require('./controllers/IndicatorsControllers')

const routes = express.Router();

routes.post('/users', UserController.create)
routes.get('/users/list', UserController.list)
routes.delete('/users/delete/:id', UserController.delete)

routes.post('/users/:user_id/tasks', TaskController.create)
routes.get('/tasks/search_all', TaskController.searchAll)
routes.post('/tasks/user/:id', TaskController.taskByUser)
routes.post('/tasks/:id', TaskController.findTask)
routes.post('/tasks/search/filtered', TaskController.search)
routes.delete('/tasks/delete/:id', TaskController.delete)

routes.post('/indicators', IndicatorController.show)

module.exports = routes