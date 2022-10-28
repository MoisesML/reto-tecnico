const { deleteItemById } = require('./db')
const { returnResponse, nameTable } = require('./utils')

const deleteWork = async (event) => {
  try {
    const { id } = event.pathParameters

    const result = await deleteItemById(nameTable, id)
    console.log('result:', result)

    return returnResponse(200, result)
  } catch (error) {
    return returnResponse(400, { msg: 'Ocurrió un error inesperado.' })
  }
}

module.exports = {
  deleteWork
}
