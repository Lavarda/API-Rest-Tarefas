module.exports = {
    dialect: 'mysql',
    // host: 'host.docker.internal',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'database_desafio',
    define: {
        timestamps: true,
        underscored: true,
    },
}