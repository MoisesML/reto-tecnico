const { obtainItemsByTable } = require('./db')
const { nameTable, returnResponse } = require('./utils')

const getWorks = async (event) => {
  try {
    const items = await obtainItemsByTable(nameTable)
    return returnResponse(200, {
      tasks: items
    })
  } catch (error) {
    return returnResponse(400, {
      error
    })
  }
}

module.exports = {
  getWorks
}
