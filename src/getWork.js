const { obtainItemById } = require('./db')
const { returnResponse, nameTable } = require('./utils')

const getWork = async (event) => {
  try {
    const { id } = event.pathParameters

    const task = await obtainItemById(nameTable, id)

    if (!task)
      return returnResponse(404, {
        msg: `El work con el ID ${id}, no se encuentra registrado en la BD.`
      })

    return returnResponse(200, task)
  } catch (error) {
    return returnResponse(400, {
      error: 'Ocurrió un error inesperado.'
    })
  }
}

module.exports = {
  getWork
}
