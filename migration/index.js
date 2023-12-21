require('module-alias/register')
require('dotenv').config()
const { authService, facebookService } = require('@model')

const syncModels = async (req, res) => {
  try {
    await authService.syncModel()
    await facebookService.syncModel()
    console.log('Message: Models are successfully sync.')
    return true
  } catch (error) {
    console.log('Message: An error occured during sync models, Error: ', error)
    return error
  }
}

syncModels()