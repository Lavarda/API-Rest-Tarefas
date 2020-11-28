module.exports = {
    render (user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    },

    renderMany(user) {
        return user.map(user => this.render(user))
    },
}