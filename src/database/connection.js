const { Sequelize } = require('sequelize');
const databaseConfig = require('./config/config')

const user = require('../models/User')
const tasks = require('../models/Task')

const connection = new Sequelize(databaseConfig);

user.init(connection)
tasks.init(connection)

tasks.associate(connection.models)
user.associate(connection.models)

module.exports = connection
