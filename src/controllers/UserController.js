const User = require('../models/User')

const UserView = require('../views/UserView')

module.exports = {
    async create(req, res) {
       const { name, email } = req.body

       const user = await User.create({ name, email })

       if(!user) {
        return res.status(400).json({ error: 'Error to create user'})
    }

       return res.json(UserView.render(user))
    },

    async list(req, res) {
        const user = await User.findAll()

        if(!user) {
            return res.status(400).json({ error: 'No users available'})
        }

        return res.status(200).json(UserView.renderMany(user))
    }
}