'use strict'

const { returnResponse } = require('./utils')

module.exports.hello = async (event) => {
  return returnResponse(200, {
    message: 'Welcome to TEST API',
    author: 'Moises Lazaro'
  })
}
