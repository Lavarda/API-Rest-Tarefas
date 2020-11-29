const moment = require('moment');

module.exports = {
    render (task) {
        return {
            id: task.id,
            user_id: task.user_id,
            description: task.description,
            responsable: task.responsable,
            status: task.status,
            dateStart: moment(task.dateStart).format('YYYY-MM-DD HH:mm:ss'),
            dateFinish: moment(task.dateStart).format('YYYY-MM-DD HH:mm:ss'),
            createdAt: moment(task.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        }
    },

    renderMany(task) {
        return task.map(task => this.render(task))
    },
}