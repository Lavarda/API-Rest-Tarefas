module.exports = {
    render (indicators) {
        return {
            performance: indicators.performance,
            tasks_completed: indicators.tasks_completed,
            average_tasks_completed_per_user: indicators.average_tasks_per_user,
            average_time: indicators.average_time,
        }
    },

    renderMany(indicators) {
        return indicators.map(indicators => this.render(indicators))
    },
}