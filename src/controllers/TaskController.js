const { Op } = require("sequelize");
const moment = require('moment');

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

        const user = await User.findByPk(user_id);
        
        if (!user) {
            return res.status(400).json({ error: 'Error to create task' });
        }

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

        return res.status(200).json(TaskView.render(task))
    },

    async findTask(req, res) {
        const { id } = req.params;

        const task = await Task.findByPk(id)

        if (!task) {
            return res.status(400).json({ error: 'Task not found' }); 
        }

        return res.status(200).json(TaskView.render(task))
    },

    async searchAll(req, res) {
        const task = await Task.findAll()

        if (!task) {
            return res.status(400).json({ error: 'Task not found' }); 
        }


        return res.status(200).json(TaskView.renderMany(task))
    },

    async search(req, res) {
       const { 
            responsable,
            status,
            dateStart
        } = req.body

        const dateStartFormated = new Date(dateStart)

        const tasks = await Task.findAll({
            where: {
                [Op.or]: [
                    responsable != '' ? {
                        responsable: {
                            [Op.like]: `%${responsable}%`
                        },
                    } : {},
                    status != '' ? {
                        status: {
                            [Op.like]: `%${status}%`,
                        }
                    } : {},
                    dateStart != '' ? {
                        dateStart: {
                            [Op.like]: `%${dateStartFormated}%`
                        },
                    } : {}
                ]
            },
        })

        if (!tasks) {
            return res.status(400).json({ error: 'Task not found' }); 
        }

        return res.status(200).json(TaskView.renderMany(tasks))
    }
};