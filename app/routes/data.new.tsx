import type { DataFunctionArgs } from '@remix-run/node'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import {
  Button,
  ButtonGroup,
  FormGroup,
  Grid,
  GridContainer,
  Icon,
  Label,
  Select,
  TextInput,
  Textarea,
} from '@trussworks/react-uswds'
import { getUserId } from 'lib/utils'
import { useEffect, useRef, useState } from 'react'

import { createNewNote, getInstrumentData, getNotes } from './data/data.server'
import { tableOptions } from './data/data.table-options'

function validateResultCountInput(input: string) {
  const numericalInput = parseFloat(input)
  return numericalInput.toString() === input && numericalInput <= 100
}

export async function loader({ request }: DataFunctionArgs) {
  const userID = getUserId()
  return await getNotes(userID)
}

export async function action({ request }: DataFunctionArgs) {
  const userID = getUserId()
  const data = await request.formData()
  const intent = data.get('intent')?.toString()

  if (intent === 'get-data') {
    const format = data.get('format')?.toString()
    const resultCount = data.get('resultCount')?.toString()
    const instrument = data.get('instrument')?.toString()
    const ra = data.get('ra')?.toString()
    const dec = data.get('dec')?.toString()
    const radius = data.get('radius')?.toString()

    if (!instrument || !format || !resultCount || !ra || !dec || !radius)
      return null
    const res = await getInstrumentData(
      instrument,
      format,
      parseInt(resultCount),
      parseFloat(ra),
      parseFloat(dec),
      parseInt(radius)
    )
    return res
  } else if (intent === 'new-note') {
    const noteTitle = data.get('title')?.toString()
    const noteBody = data.get('notes')?.toString()
    if (!noteBody || !noteTitle) {
      return null
    }
    await createNewNote(noteTitle, noteBody, userID)

    return null
  } else {
    return null
  }
}

export default function () {
  const [instrument, setInstrument] = useState('')
  const [format, setFormat] = useState('')
  const [ra, setRa] = useState('')
  const [dec, setDec] = useState('')
  const [radius, setRadius] = useState('')
  const [resultCount, setResultCount] = useState('')
  const isValid = validateResultCountInput(resultCount)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteBody, setNoteBody] = useState('')

  const noteRef = useRef<HTMLFormElement>(null)

  const fetcher = useFetcher()
  const results = fetcher.data
  const fetchNotes = useFetcher()
  const notes = useLoaderData<typeof loader>()
  const resultArray = results?.request || ['no results']

  const shouldDisableForm =
    !instrument || !format || !resultCount || !isValid || !ra || !dec || !radius
  const shouldDisableNotes = !noteTitle || !noteBody

  useEffect(() => {
    if (
      fetchNotes.state === 'idle' &&
      fetchNotes.data === null &&
      noteRef.current
    ) {
      noteRef.current.reset()
    }
  }, [fetchNotes.state, fetchNotes.data])

  return (
    <div>
      <h1 className="text-center">Instrument Data Form</h1>
      <GridContainer>
        <Grid row>
          <Grid tablet={{ col: true }} className="bg-base-lightest">
            <h2 className="text-center">Get data by instrument</h2>
            <fetcher.Form method="POST" className="margin-2">
              <input hidden name="intent" defaultValue="get-data" />
              <Label htmlFor="instruments">Choose Instrument</Label>
              <Select
                id="instrument"
                name="instrument"
                value={instrument}
                onChange={(e) => {
                  setInstrument(e.target.value)
                }}
              >
                <option value="">Select instrument</option>
                {tableOptions.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </Select>
              <ButtonGroup className="margin-top-2">
                <Label htmlFor="ra">RA:</Label>
                <TextInput
                  type="text"
                  id="ra"
                  name="ra"
                  placeholder="0"
                  className="width-10 margin-right-5"
                  onChange={(e) => {
                    setRa(e.target.value)
                  }}
                ></TextInput>
                <Label htmlFor="dec">DEC:</Label>
                <TextInput
                  type="text"
                  id="dec"
                  name="dec"
                  placeholder="0"
                  className="width-10"
                  onChange={(e) => {
                    setDec(e.target.value)
                  }}
                ></TextInput>
              </ButtonGroup>
              <Label htmlFor="radius">Radius (arcmin)</Label>
              <TextInput
                type="text"
                id="radius"
                name="radius"
                placeholder="0"
                className="width-10"
                onChange={(e) => {
                  setRadius(e.target.value)
                }}
              ></TextInput>
              <Label htmlFor="format">Choose result format</Label>
              <Select
                id="format"
                name="format"
                value={format}
                onChange={(e) => {
                  setFormat(e.target.value)
                }}
              >
                <option value="">Select format</option>
                <option value="json">json</option>
                <option value="txt">txt</option>
              </Select>
              <Label htmlFor="resultCount">Result Count</Label>
              <TextInput
                type="text"
                id="resultCount"
                name="resultCount"
                placeholder="0-100"
                className="width-10"
                onChange={(e) => {
                  setResultCount(e.target.value)
                }}
              ></TextInput>
              <FormGroup>
                <Button type="submit" disabled={shouldDisableForm}>
                  Submit
                </Button>

                {fetcher.state !== 'idle' && (
                  <>
                    <Icon.Autorenew className="text-middle" /> Loading...
                  </>
                )}
                {fetcher.state === 'idle' &&
                  fetcher.data === null &&
                  !shouldDisableForm && (
                    <>
                      <Icon.Check className="text-middle" color="green" /> Saved
                    </>
                  )}
              </FormGroup>
            </fetcher.Form>
          </Grid>
          <Grid tablet={{ col: true }} className="bg-primary-lighter">
            <h2 className="text-center">Take Notes:</h2>
            <fetchNotes.Form method="POST" className="margin-2" ref={noteRef}>
              <input hidden name="intent" defaultValue="new-note" />
              <Label htmlFor="title">Title</Label>
              <TextInput
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                onChange={(e) => {
                  setNoteTitle(e.target.value)
                }}
              />
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Notes"
                onChange={(e) => {
                  setNoteBody(e.target.value)
                }}
              />
              <FormGroup>
                <Button type="submit" disabled={shouldDisableNotes}>
                  Submit
                </Button>
              </FormGroup>
            </fetchNotes.Form>
          </Grid>
        </Grid>
        <hr></hr>
        <Grid row>
          <Grid
            tablet={{ col: true }}
            className="bg-primary-lighter margin-bottom-5"
          >
            <h2 className="margin-left-2">Results</h2>
            {resultArray.map((x: object, index: number) => {
              return (
                <GridContainer key={index} className="margin-bottom-2">
                  {JSON.stringify(x, null, 2)}
                </GridContainer>
              )
            })}
          </Grid>
          <Grid
            tablet={{ col: true }}
            className="bg-base-lightest margin-bottom-5"
          >
            <h2 className="margin-left-2">Notes:</h2>
            <ul>
              {notes &&
                notes.map((x) => (
                  <li key={x.noteId}>
                    <Link to={`/notes/${x.noteId}`}>{x.noteTitle}</Link>
                  </li>
                ))}
            </ul>
          </Grid>
        </Grid>
      </GridContainer>
    </div>
  )
}
