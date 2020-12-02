const User = require('../models/User')

const UserView = require('../views/UserView')

module.exports = {
    async create(req, res) {
        const { name, email } = req.body

        if ( name != "" && email != "" ) {
            const user = await User.create({ name, email })

            if(!user) {
                return res.status(400).json({ 
                    status: 400,
                    message: 'Error to create user'
                })
            }

            return res.status(201).json({
                status: 201,
                message: 'User created successfully',
                value: UserView.render(user)
             })
        } else {
            return res.status(422).json({ 
                status: 422,
                message: 'Error to create user, please fill name and email field'
            })
        }
    },

    async list(req, res) {
        const user = await User.findAll()

        if(!user) {
            return res.status(200).json({ 
                status: 200,
                message: 'No users available',
                value: [],
            })
        }

        return res.status(200).json({
            status: 200,
            message: 'List of users',
            value: UserView.renderMany(user)
        })
    },

    async edit(req, res) {
        const { id } = req.params

        const { name, email } = req.body

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(204).json({ 
                status: 204,
                message: 'User not found',
            })
        }

        user.name = name ? name : user.name
        user.email = email ? email : user.email

        await user.save()

        return res.status(200).json({
            status: 200,
            message: 'User edited successfully',
            value : UserView.render(user),
        })
    },

    async delete(req, res) {
        const { id } = req.params

        if ( id ) {
            const user = await User.findByPk(id)
            
            user.destroy({
                truncate: true,
            })
    
            return res.status(200).json({
                status: 200,
                message: 'User deleted successfully',
                value: UserView.render(user)
            })
        } else {
            return res.status(204).json({ 
                status: 204,
                message: 'User not found',
            })
        }
    }
}