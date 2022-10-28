const {
  getDataFromSwapiApi,
  translateText,
  fetchDataSwapi,
  joinWordsAndRemoveAccent
} = require('./swapi')

describe('Testing Translate Text', () => {
  test('translateText debe de ser una función', () => {
    expect(typeof translateText).toMatch('function')
  })

  test('Debe fallar si no se envía el texto a traducir', async () => {
    expect.assertions(1)

    try {
      await translateText()
    } catch (e) {
      expect(e).toMatch('No se esta enviando el texto a traducir.')
    }
  })

  test('Debe fallar si no se envía el lenguaje de traducción', async () => {
    expect.assertions(1)

    try {
      await translateText('hello')
    } catch (e) {
      expect(e).toMatch('No se esta enviando el lenguaje de destino.')
    }
  })

  test('Debe devolver la traducción de hello en español, es decir, hola.', async () => {
    const data = await translateText('hello', 'es')
    expect(data).toMatch('hola')
  })

  test('Debe devolver la traducción de hello. how are you? en español, es decir, hola. ¿como estas?', async () => {
    const data = await translateText('hello. how are you?', 'es')
    expect(data).toMatch('hola. ¿cómo estás?')
  })
})

describe('Testing fetchDataSwapi', () => {
  test('fetchDataSwapi debe de ser una función', () => {
    expect(typeof fetchDataSwapi).toMatch('function')
  })

  test('Debe fallar si no se envía el type', async () => {
    expect.assertions(1)

    try {
      await fetchDataSwapi()
    } catch (e) {
      expect(e).toMatch('No se esta enviando el type.')
    }
  })

  test('Debe fallar si no se envía los type válidos', async () => {
    expect.assertions(1)

    try {
      await fetchDataSwapi('casa')
    } catch (e) {
      expect(e).toMatch('No se esta enviando un type válido.')
    }
  })

  test('Debe fallar si no se envía el id', async () => {
    expect.assertions(1)

    try {
      await fetchDataSwapi('films')
    } catch (e) {
      expect(e).toMatch('No se esta enviando el id.')
    }
  })

  test('Debe fallar si el id no es número', async () => {
    expect.assertions(1)

    try {
      await fetchDataSwapi('films', 'casa')
    } catch (e) {
      expect(e).toMatch('No se esta enviando un id de tipo número.')
    }
  })

  test('Debe retorna la película número 1', async () => {
    const data = await fetchDataSwapi('films', 1)
    expect(typeof data).toMatch('object')
    expect(data.title).toMatch('A New Hope')
  }, 10000)
})

describe('Testing joinWordsAndRemoveAccent', () => {
  test('joinWordsAndRemoveAccent debe de ser una función', () => {
    expect(typeof joinWordsAndRemoveAccent).toMatch('function')
  })

  test('Debe fallar si no se envía el texto a traducir', async () => {
    expect.assertions(1)

    try {
      joinWordsAndRemoveAccent()
    } catch (e) {
      expect(e).toMatch('No se esta enviando el textEntry para procesarlo.')
    }
  })

  test('Debe devolver test_en_evaluacion si envio TeSt En EvaLUACIÓn', () => {
    const data = joinWordsAndRemoveAccent('TeSt En EvaLUACIÓn')
    expect(data).toMatch('test_en_evaluacion')
  })
})

describe('Testing getDataFromSwapiApi', () => {
  test('getDataFromSwapiApi debe de ser una función', () => {
    expect(typeof getDataFromSwapiApi).toMatch('function')
  })

  test('Debe devolver un statusCode 400 si no se envía el type', async () => {
    const data = await getDataFromSwapiApi({
      pathParameters: { type: null, id: null }
    })

    expect(data.statusCode).toBe(400)
  })

  test('Debe devolver un statusCode 400 si no se envía el id', async () => {
    const data = await getDataFromSwapiApi({
      pathParameters: { type: 'films', id: null }
    })

    expect(data.statusCode).toBe(400)
  })

  test('Debe devolver un statusCode 200 enviando el type films y el id 1', async () => {
    const data = await getDataFromSwapiApi({
      pathParameters: { type: 'films', id: 1 }
    })

    expect(data.statusCode).toBe(200)
  })
})
