const { returnResponse } = require('./utils')
const axios = require('axios')
const translate = require('translate')

const translateText = async (str, to) => {
  if (!str) throw 'No se esta enviando el texto a traducir.'
  if (!to) throw 'No se esta enviando el lenguaje de destino.'

  try {
    translate.engine = 'google'
    const result = await translate(str, to)
    return result.toLowerCase()
  } catch (error) {
    throw 'Ocurrió un error inesperado.'
  }
}

const types = ['films', 'people', 'planets', 'species', 'starships', 'vehicles']

const fetchDataSwapi = async (type, id) => {
  if (!type) throw 'No se esta enviando el type.'
  if (!types.includes(type))
    throw `No se esta enviando un type válido. Los tipos validos son ${types.join(
      ' | '
    )}`

  if (!id) throw 'No se esta enviando el id.'
  if (!Number.isInteger(id)) throw 'No se esta enviando un id de tipo número.'

  try {
    const { data } = await axios.get(
      `https://swapi.py4e.com/api/${type}/${id}/`
    )

    return data
  } catch (error) {
    throw error
  }
}

const joinWordsAndRemoveAccent = (textEntry) => {
  if (!textEntry) throw 'No se esta enviando el textEntry para procesarlo.'

  const textInitial = textEntry.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const parts = textInitial.toLowerCase().split(' ')
  const text = parts.join('_')
  return text
}

const getDataFromSwapiApi = async (event) => {
  const { type, id } = event.pathParameters

  try {
    const data = await fetchDataSwapi(type, Number(id))

    const promises = Object.entries(data).map((ev) => {
      return translateText(ev[0], 'es')
    })

    const result = await Promise.all(promises)

    const newKeys = result.map((ev) => {
      if (ev.startsWith('Película')) return 'peliculas'
      return joinWordsAndRemoveAccent(ev)
    })

    const dataFinal = {}
    Object.entries(data).forEach((ev, index) => {
      dataFinal[newKeys[index]] = ev[1]
    })

    return returnResponse(200, dataFinal)
  } catch (error) {
    if (error.code === 'ERR_BAD_REQUEST') {
      return returnResponse(400, {
        error: `No es encontró información para la consulta de ${type} con el id ${id}`
      })
    }
    return returnResponse(400, { error })
  }
}

module.exports = {
  getDataFromSwapiApi,
  translateText,
  fetchDataSwapi,
  joinWordsAndRemoveAccent
}
