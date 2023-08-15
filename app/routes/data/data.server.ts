import { tables } from '@architect/functions'
import { v4 as uuidv4 } from 'uuid'

async function fetchData(
  instrument: string,
  format: string,
  resultCount: number,
  ra: number,
  dec: number,
  radius: number
) {
  const heasarc_api_url = 'https://heasarc.gsfc.nasa.gov/xamin/QueryServlet'
  const formData = new FormData()

  formData.append('table', instrument)
  formData.append('format', format)
  formData.append('resultmax', resultCount.toString())
  formData.append('radius', radius.toString())
  formData.append('position[]', ra.toString())
  formData.append('position[]', dec.toString())

  try {
    const response = await fetch(heasarc_api_url, {
      method: 'POST',
      body: formData,
    })
    const data =
      format === 'json' ? await response.json() : await response.text()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getInstrumentData(
  instrument: string,
  format: string,
  resultCount: number,
  ra: number,
  dec: number,
  radius: number
) {
  try {
    const response = await fetchData(
      instrument,
      format,
      resultCount,
      ra,
      dec,
      radius
    )
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function createNewNote(
  noteTitle: string,
  noteBody: string,
  userId: string
) {
  const db = await tables()
  const noteId = uuidv4()

  await db.notes.put({
    userId,
    noteId,
    noteTitle,
    noteBody,
  })
}

export async function getNotes(userId: string) {
  const db = await tables()
  const results = await db.notes.query({
    KeyConditionExpression: '#userId = :userId',
    ExpressionAttributeNames: {
      '#userId': 'userId',
    },
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  })
  return results.Items
}

export async function getNote(noteId: string, userId: string) {
  const db = await tables()
  const result = await db.notes.get({ userId, noteId })

  return result
}

export async function updateNote(
  userId: string,
  noteId: string,
  noteBody: string
) {
  const db = await tables()
  const result = await db.notes.update({
    Key: {
      userId,
      noteId,
    },
    UpdateExpression: 'set noteBody = :noteBody',
    ExpressionAttributeValues: {
      ':noteBody': noteBody,
    },
  })
  return result
}

export async function deleteNote(userId: string, noteId: string) {
  const db = await tables()
  await db.notes.delete({
    userId,
    noteId,
  })
}
