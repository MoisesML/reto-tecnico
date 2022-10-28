const {
  obtainItemsByTable,
  obtainItemById,
  deleteItemById,
  registerWork
} = require('./db')
const { nameTable } = require('./utils')

describe('obtainItemsByTable Testing', () => {
  test('Debe fallar si no es envía el nombre de la tabla', async () => {
    expect.assertions(1)
    try {
      await obtainItemsByTable()
    } catch (error) {
      expect(error).toMatch('No se esta enviando el nombre de la tabla.')
    }
  })

  test('Debe retornar un error si la tabla no existe', async () => {
    expect.assertions(1)
    try {
      await obtainItemsByTable('ErrorTable')
    } catch (error) {
      expect(error).toMatch('El registro indicado no se encuentra.')
    }
  })

  test('Debe retornar un arreglo si la tabla existe', async () => {
    const data = await obtainItemsByTable(nameTable)
    expect(data.length).toBeGreaterThan(-1)
  })
})

describe('obtainItemById Testing', () => {
  test('Debe fallar si no es envía el nombre de la tabla', async () => {
    expect.assertions(1)
    try {
      await obtainItemById()
    } catch (error) {
      expect(error).toMatch('No se esta enviando el nombre de la tabla.')
    }
  })

  test('Debe fallar si no es envía el id del item', async () => {
    expect.assertions(1)
    try {
      await obtainItemById('ErrorTable')
    } catch (error) {
      expect(error).toMatch('No se esta enviando el id del registro.')
    }
  })

  test('Debe retornar un error si la tabla no existe', async () => {
    expect.assertions(1)
    try {
      await obtainItemById('ErrorTable', 1)
    } catch (error) {
      expect(error).toMatch('La tabla indicada no existe.')
    }
  })

  test('Debe retornar un objeto si el ID existe', async () => {
    const data = await obtainItemById(nameTable, '1666942281995')
    expect(typeof data).toMatch('object')
    expect(data.id).toBe('1666942281995')
  })
})

describe('deleteItemById Testing', () => {
  test('Debe fallar si no es envía el nombre de la tabla', async () => {
    expect.assertions(1)
    try {
      await deleteItemById()
    } catch (error) {
      expect(error).toMatch('No se esta enviando el nombre de la tabla.')
    }
  })

  test('Debe fallar si no es envía el id del item', async () => {
    expect.assertions(1)
    try {
      await deleteItemById('ErrorTable')
    } catch (error) {
      expect(error).toMatch('No se esta enviando el id del registro.')
    }
  })

  test('Debe retornar un error si la tabla no existe', async () => {
    expect.assertions(1)
    try {
      await deleteItemById('ErrorTable', 1)
    } catch (error) {
      expect(error).toMatch('El registro indicado no se encuentra.')
    }
  })

  test('Debe retornar mensaje de eliminado correctamente', async () => {
    const data = await deleteItemById(nameTable, 1666943622748)
    expect(data.msg).toMatch('Work eliminado correctamente')
  })
})

describe('registerWork Testing', () => {
  test('Debe fallar si no es envía el nombre de la tabla', async () => {
    expect.assertions(1)
    try {
      await registerWork()
    } catch (error) {
      expect(error).toMatch('No se esta enviando el nombre de la tabla.')
    }
  })

  test('Debe fallar si no se envía el objeto con la información del registro', async () => {
    expect.assertions(1)
    try {
      await registerWork('ErrorTable')
    } catch (error) {
      expect(error).toMatch('No se esta enviando la información del registro.')
    }
  })

  test('Debe retornar un error si la tabla no existe', async () => {
    expect.assertions(1)
    try {
      await deleteItemById('ErrorTable', 1)
    } catch (error) {
      expect(error).toMatch('El registro indicado no se encuentra.')
    }
  })

  test('Debe retornar un error si como información no se esta enviando un objeto.', async () => {
    expect.assertions(1)
    try {
      await registerWork(nameTable, 1)
    } catch (error) {
      expect(error).toMatch('La información enviada no es de tipo objeto.')
    }
  })

  test('Debe retornar un error si el objeto no cuenta con información', async () => {
    expect.assertions(1)
    try {
      await registerWork(nameTable, {})
    } catch (error) {
      expect(error).toMatch('El objeto no cuenta con información.')
    }
  })

  test('Debe crear un registro con la información enviada', async () => {
    const data = await registerWork(nameTable, { name: 'Pepe' })
    expect(typeof data).toMatch('object')
  })
})
