const { Op } = require("sequelize");

const User = require('../models/User')
const Task = require('../models/Task')

const IndicatorsView = require('../views/IndicatorsView')

module.exports = {
    async data(req, res) {
        const { dateStart, dateFinish } = req.body

        const formatedDateStart = new Date(dateStart)
        const formatedDateFinish = new Date(dateFinish)

        const users = await User.findAll()
        const tasks = await Task.findAll()

        let average_time = {
            open_and_finishing: '',
            doing_and_finishing: '',
        }

        let performance;

        if ( formatedDateStart && formatedDateFinish ) {
            const tasks_period_of_time = await Task.findAll({
                where: {
                    dateStart: {
                        [Op.lte]: formatedDateStart,
                    },
                    dateFinish: {
                        [Op.gte]: formatedDateFinish,
                    }
                },
            })

            performance =  (tasks.length/tasks_period_of_time.length) * 100
        }

        const tasks_completed = tasks.length
        const average_tasks_per_user = Math.abs((tasks.length/users.length).toFixed(2))

        const data = {
            performance,
            tasks_completed,
            average_tasks_per_user,
            average_time,
        }

        if ( !data ) {
            return res.status(400).json({ error: 'No data available'})
        }

        return res.status(200).json(IndicatorsView.render(data))

    }
}