const { Op, Sequelize, QueryTypes } = require("sequelize");
const moment = require("moment");

const User = require('../models/User')
const Task = require('../models/Task')

const IndicatorsView = require('../views/IndicatorsView')

const databaseConfig = require('../database/config/config')
const connection = new Sequelize(databaseConfig);

module.exports = {
    async show(req, res) {
        const { dateStart, dateFinish } = req.body

        const formatedDateStart = new Date(dateStart)
        const formatedDateFinish = new Date(dateFinish)

        const users = await User.findAll()
        const tasks = await Task.findAll()


        let average_time = {
            tasks_open_and_doing: '',
            tasks_doing_and_finishing: '',
        }

        let tasks_open_and_doing = await Task.findAll({
            where: {
                [Op.or]: [
                    {
                        status: {
                            [Op.like]: '%Aberto%'
                        },
                    },
                    {
                        status: {
                            [Op.like]: '%Fazendo%'
                        }
                    },
                ]
            }
        })

        let tasks_doing_and_finishing =await Task.findAll({
            where: {
                [Op.or]: [
                    {
                        status: {
                            [Op.like]: '%Fazendo%'
                        },
                    },
                    {
                        status: {
                            [Op.like]: '%Finalizado%'
                        }
                    },
                ]
            }
        })


        const query = await connection.query("SELECT AVG(TIME_TO_DAYS(TIMEDIFF(task.dateStart, t.dateFinish))) FROM tasks t", { type: QueryTypes.SELECT });
        console.log("query", query)

        // console.log("TESTE ABERT - FAZENDO", tasks_open_and_doing.length, tasks_doing_and_finishing.length)
        // console.log("Teste sequelize", teste, teste.length)

        // let x = tasks.filter( (task) => {
        //     let tasks_by_user = await User.findByPk(task.user_id, {
        //         include: { 
        //             association : 'responsable_task'
        //         }
        //     })

        //     tasks_by_user.forEach( (user_task) => {

        //     })


        //     console.log('Date Start', moment(task.dateStart).isSameOrBefore(formatedDateStart), moment(task.dateFinish).isSameOrAfter(formatedDateFinish))
        //     if ( moment(task.dateStart).isSameOrBefore(formatedDateStart) && moment(task.dateFinish).isSameOrAfter(formatedDateFinish) ) {
        //         console.log('Task', task)
        //         return task
        //     }

        // })

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

            performance =  Number(((tasks_period_of_time.length/tasks.length) * 100).toFixed(2))
        }

        const tasks_completed = await Task.findAll({
            where: {
                status: {
                    [Op.like]: "%Finalizado%"
                }
            }
        })

        const number_tasks_completed = tasks_completed.length

        const average_tasks_per_user = Math.abs((tasks.length/users.length).toFixed(2))

        const data = {
            performance,
            tasks_completed: number_tasks_completed,
            average_tasks_per_user,
            average_time,
        }

        if ( !data ) {
            return res.status(400).json({ error: 'No data available'})
        }

        return res.status(200).json(IndicatorsView.render(data))

    }
}