import configFile from './config/config.json'
import { Sequelize } from 'sequelize'

let config = configFile.development

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
)

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully')
} catch(error) {
    console.error('Unable to connect to the database')
}

export {sequelize}