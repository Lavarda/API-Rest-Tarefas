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
    },

    async edit(req, res) {
        const { id } = req.params

        const { name, email } = req.body

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(400).json({ error: 'User not found'})
        }

        user.name = name ? name : user.name
        user.email = email ? email : user.email

        await user.save()

        return res.status(200).json({
            message: 'User edited successfully',
            user : UserView.render(user),
        })
    },

    async delete(req, res) {
        const { id } = req.params

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(400).json({ error: 'User not found'})
        }

        user.destroy({
            truncate: true,
        })

        return res.status(200).json({
            message: 'User deleted successfully',
        })
    }
}