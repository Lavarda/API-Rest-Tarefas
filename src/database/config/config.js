module.exports = {
    dialect: 'mysql',
    host: 'host.docker.internal',
    username: 'root',
    password: 'root',
    database: 'database_desafio',
    define: {
        timestamps: true,
        underscored: true,
    },
}