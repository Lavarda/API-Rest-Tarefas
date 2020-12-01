const { Op, Sequelize, QueryTypes } = require("sequelize");
const moment = require("moment");

const User = require('../models/User')
const Task = require('../models/Task')

const UserView = require('../views/UserView')

const IndicatorsView = require('../views/IndicatorsView')

const databaseConfig = require('../database/config/config')
const connection = new Sequelize(databaseConfig);


module.exports = {
    async calculatePerformance(formatedDateStart, formatedDateFinish, tasks_length) {
        if ( formatedDateStart &&  formatedDateFinish) {
            const tasks_period_of_time = await Task.findAll({
                where: {
                    dateStart: {
                        [Op.lte]: formatedDateStart,
                    },
                    dateFinish: {
                        [Op.gte]: formatedDateFinish,
                    },
                    status: {
                        [Op.like]: "%Finalizado%"
                    }
                },
            })

            return Number(((tasks_period_of_time.length/tasks_length) * 100).toFixed(2))
        }

        return ""
    },

    async averageTasksPerUsers(users) {
        const tasks_completed_by_user = {}
    
        for ( const user of users) {
            const tasks_by_user = await User.findByPk(UserView.render(user).id, {
                include: { 
                    association : 'responsable_task'
                }
            })
            const tasks_finished = tasks_by_user.responsable_task.filter( (task) => {
                return task.status == "Finalizado"
            })
            const name_user = UserView.render(user).name 
            const length_tasks = tasks_finished.length
            
            tasks_completed_by_user[name_user] = length_tasks
        }
    
        return tasks_completed_by_user
    },

    async numberOfTasksCompleteds() {
        const tasks_completed = await Task.findAll({
            where: {
                status: {
                    [Op.like]: "%Finalizado%"
                }
            }
        })

        return tasks_completed.length
    },

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


        const query = await connection.query("SELECT AVG((TIMEDIFF(date_finish, date_start))) / 86400 FROM tasks WHERE status='Aberto';", { type: QueryTypes.SELECT });
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
        
        const performance = await module.exports.calculatePerformance(formatedDateStart, formatedDateFinish, tasks.length)

        const tasks_completed = await module.exports.numberOfTasksCompleteds()

        const tasks_completed_by_user = await module.exports.averageTasksPerUsers(users);

        const data = {
            performance,
            tasks_completed,
            average_tasks_per_user: tasks_completed_by_user,
            average_time,
        }

        if ( !data ) {
            return res.status(400).json({ error: 'No data available'})
        }

        return res.status(200).json(IndicatorsView.render(data))

    }
}