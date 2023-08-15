import { type DataFunctionArgs, redirect } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import {
  Button,
  ButtonGroup,
  GridContainer,
  Icon,
  Textarea,
} from '@trussworks/react-uswds'
import { getUserId } from 'app/lib/utils'
import { useState } from 'react'

import { deleteNote, getNote, updateNote } from './data/data.server'

export async function loader({ params: { noteId } }: DataFunctionArgs) {
  if (!noteId) return null
  const userID = getUserId()
  const result = await getNote(noteId, userID)
  return result
}

export async function action({ request }: DataFunctionArgs) {
  const userID = getUserId()
  const data = await request.formData()
  const intent = data.get('intent')?.toString()
  const noteId = data.get('noteId')?.toString()
  if (!noteId) return null
  if (intent === 'delete') {
    if (!noteId) return null
    await deleteNote(userID, noteId)
    return redirect('/notes')
  } else if (intent === 'edit') {
    const noteBody = data.get('noteBody')?.toString()
    if (!noteBody) return null
    await updateNote(userID, noteId, noteBody)
    const updatedNote = await getNote(noteId, userID)
    return updatedNote
  } else {
    return null
  }
}

export default function () {
  const note = useLoaderData<typeof loader>()
  const fetcherEdit = useFetcher()
  const fetcherDelete = useFetcher()

  const [edit, setEdit] = useState(false)

  return (
    <div>
      {note && (
        <>
          <h1 className="text-center">
            {note.noteTitle}
            <ButtonGroup className="float-right">
              <fetcherDelete.Form method="POST">
                <input hidden name="intent" defaultValue="delete" />
                <input hidden name="noteId" defaultValue={note.noteId} />
                <Button type="submit">
                  <Icon.Delete></Icon.Delete>
                </Button>
              </fetcherDelete.Form>

              <Button
                type="button"
                onClick={() => {
                  setEdit(!edit)
                }}
              >
                <Icon.Edit></Icon.Edit>
              </Button>
            </ButtonGroup>
          </h1>
          {!edit && (
            <GridContainer className="border">
              <p>{note.noteBody}</p>
            </GridContainer>
          )}
          {edit && (
            <>
              <fetcherEdit.Form className="text-center" method="POST">
                <input hidden name="intent" defaultValue="edit" />
                <input hidden name="noteId" defaultValue={note.noteId} />
                <Textarea
                  id="noteBody"
                  name="noteBody"
                  defaultValue={note.noteBody}
                ></Textarea>
                <Button type="submit" className="float-left margin-1">
                  <Icon.SaveAlt></Icon.SaveAlt> Save
                </Button>
              </fetcherEdit.Form>
            </>
          )}
        </>
      )}
    </div>
  )
}
