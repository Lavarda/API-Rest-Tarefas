const { Model, DataTypes } = require('sequelize')

class Task extends Model {
    static init(connection) {
        super.init({
            description: DataTypes.STRING,
            responsable: DataTypes.STRING,
            status: DataTypes.STRING,
            dateStart: DataTypes.DATE,
            dateFinish: DataTypes.DATE,
        }, {
            sequelize: connection,
        })
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'Responsável',
        })
    }
}

module.exports = Task;