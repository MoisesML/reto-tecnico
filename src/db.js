const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })

const validateParams = (table, id) => {
  if (!table) throw 'No se esta enviando el nombre de la tabla.'
  if (!id) throw 'No se esta enviando el id del registro.'
}

const validateError = (error) => {
  if (error?.code === 'ResourceNotFoundException') {
    throw 'El registro indicado no se encuentra.'
  }

  throw 'Ocurrió un error inesperado.'
}

const obtainItemsByTable = async (table) => {
  if (!table) throw 'No se esta enviando el nombre de la tabla.'

  try {
    const result = await dynamodb.scan({ TableName: table }).promise()

    return result.Items
  } catch (error) {
    validateError(error)
  }
}

const obtainItemById = async (table, id) => {
  validateParams(table, id)

  try {
    const result = await dynamodb
      .get({
        TableName: table,
        Key: { id }
      })
      .promise()

    return result.Item
  } catch (error) {
    throw 'La tabla indicada no existe.'
  }
}

const deleteItemById = async (table, id) => {
  validateParams(table, id)

  try {
    await dynamodb
      .delete({
        TableName: table,
        Key: { id: id.toString() }
      })
      .promise()

    return { msg: 'Work eliminado correctamente' }
  } catch (error) {
    validateError(error)
  }
}

const registerWork = async (table, objWork) => {
  if (!table) throw 'No se esta enviando el nombre de la tabla.'
  if (!objWork) throw 'No se esta enviando la información del registro.'
  if (typeof objWork !== 'object') {
    throw 'La información enviada no es de tipo objeto.'
  }
  if (Object.keys(objWork).length === 0) {
    throw 'El objeto no cuenta con información.'
  }

  try {
    const data = await dynamodb
      .put({
        TableName: table,
        Item: { ...objWork, id: new Date().getTime().toString() }
      })
      .promise()

    return data
  } catch (error) {
    validateError(error)
  }
}

module.exports = {
  obtainItemsByTable,
  obtainItemById,
  deleteItemById,
  registerWork
}
