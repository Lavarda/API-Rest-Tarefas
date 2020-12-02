const { Op } = require("sequelize");

const Task = require('../models/Task');
const User = require('../models/User');

const TaskView = require('../views/TaskView')

module.exports = {
    async create(req, res) {
        const { user_id } = req.params;

        const { 
            description,
            status,
            dateStart,
            dateFinish,
        } = req.body

        if (description && status && dateStart && dateFinish) {
            const user = await User.findByPk(user_id);

            const dateStartFormated = new Date(dateStart)
            const dateFinishFormated = new Date(dateFinish)
    
            const task = await Task.create({
                description,
                responsable: user.name,
                status,
                dateStart: dateStartFormated,
                dateFinish: dateFinishFormated,
                user_id,
            });
    
            if (!task) {
                return res.status(422).json({ 
                    status: 422,
                    message: 'Error to create task'
                });
            }
    
            return res.status(200).json({
                status: 200,
                message: 'Task created successfully',
                value: TaskView.render(task)
            })
        } else {
            return res.status(422).json({ 
                status: 422,
                message: 'Please fill all fields, description, status, dateStart and dateFinish',
            });
        }
    },

    async taskByUser(req, res) {
        const { id } = req.params

        if ( id ) {
            const user = await User.findByPk(id, {
                include: { 
                    association : 'responsable_task'
                }
            })

            return res.status(200).json({
                status: 200,
                message: 'User listed successfully',
                value: user,
            })
        } else {
            return res.status(404).json({ 
                status: 404,
                message: 'User not found',
            });
        }
    },

    async findTask(req, res) {
        const { id } = req.params;

        const task = await Task.findByPk(id)

        if ( id ) {
            return res.status(200).json({
                status: 200,
                message: 'Task finded successfully',
                value: TaskView.render(task)
            })
        } else {
            return res.status(404).json({ 
                status: 404,
                message: 'Task not found',
            }); 
        }
    },

    async searchAll(req, res) {
        const task = await Task.findAll()

        if (!task) {
            return res.status(200).json({ 
                status: 200,
                message: 'Tasks are not available',
                value: []
            }); 
        }

        return res.status(200).json({
            status: 200,
            message: 'Tasks found successfully',
            value: TaskView.renderMany(task)
        })
    },

    async search(req, res) {
       const { 
            description,
            responsable,
            status,
            createdAt
        } = req.body

        let order_list;

        responsable.order != '' ? order_list = ['responsable', `${responsable.order}`] : null
        status.order != '' ? order_list = ['status', `${status.order}`] : null
        createdAt.order != '' ? order_list = ['createdAt', `${createdAt.order}`] : null

        const tasks = await Task.findAll({
            where: {
                [Op.or]: [
                    description.filter != '' ? {
                        description: {
                            [Op.like]: `%${description.filter}%`
                        },
                    } : {},
                    status.filter != '' ? {
                        status: {
                            [Op.like]: `%${status.filter}%`,
                        }
                    } : {},
                ],
            },
            order: !!order_list ? [
                order_list
            ] : '',
        })

        if (!tasks) {
            return res.status(200).json({
                status: 200,
                message: 'Tasks not found',
                value: [],
            }); 
        }

        return res.status(200).json({
            status: 200,
            message: 'Tasks found successfully',
            value: TaskView.renderMany(tasks)
        })
    },

    async edit(req, res) {
        const { id } = req.params

        const { status, dateStart, dateFinish } = req.body

        if ( status || dateStart || dateFinish ) { 
            const dateStartFormated = new Date(dateStart)
            const dateFinishFormated = new Date(dateFinish)
    
            const task = await Task.findByPk(id)

            task.status = status ? status : task.status
            task.dateStart = dateStart ? dateStartFormated : task.dateStart
            task.dateFinish = dateFinish ? dateFinishFormated : task.dateFinish
    
            await task.save()
    
            return res.status(200).json({ 
                message: 'Taks edit successfully',
                status: 200,
                value: TaskView.render(task)
            })
        } else {
            return res.status(422).json({ 
                status: 422,
                message: 'Please fill field status or dateStart or DateFinish',
            }); 
        }
    },

    async delete(req, res) {
        const { id } = req.params 

        if ( id ) {
            const task = await Task.findByPk(id)
    
            task.destroy()
    
            return res.status(200).json({
                status: 200,
                message: 'Task deleted successfully',
                value: TaskView.render(task)
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: 'Task not found'
            }); 
        }
    }
};