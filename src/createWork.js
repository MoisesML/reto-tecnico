const { registerWork } = require('./db')
const { returnResponse, nameTable } = require('./utils')

const createWork = async (event) => {
  try {
    const { name, description } = JSON.parse(event.body)
    if (!name) throw 'No se esta enviando el nombre de la work.'
    if (!description) throw 'No se esta enviando la descripción del work.'
    if (typeof description !== 'object') {
      throw 'La información enviado no es un tipo objeto.'
    }

    const newWork = {
      name,
      description,
      experience: 2,
      isAvailable: true,
      id: new Date().getTime().toString()
    }

    await registerWork(nameTable, newWork)

    return returnResponse(200, newWork)
  } catch (error) {
    return returnResponse(400, { msg: error || 'Error creando el work' })
  }
}

module.exports = {
  createWork
}
