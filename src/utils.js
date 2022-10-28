const returnResponse = (
  code = 200,
  object = { msg: 'Ejecución exitosa-' }
) => ({
  statusCode: code,
  body: JSON.stringify(object, null, 2)
})

const nameTable = 'TestTable'

module.exports = { returnResponse, nameTable }
