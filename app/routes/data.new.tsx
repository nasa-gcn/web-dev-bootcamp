import type { DataFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
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
} from '@trussworks/react-uswds'
import { useState } from 'react'

import { getInstrumentData } from './data/data.server'
import { tableOptions } from './data/data.table-options'

function validateResultCountInput(input: string) {
  const numericalInput = parseFloat(input)
  return numericalInput.toString() === input && numericalInput <= 100
}

export async function action({ request }: DataFunctionArgs) {
  const data = await request.formData()
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
}

export default function () {
  const [instrument, setInstrument] = useState('')
  const [format, setFormat] = useState('')
  const [ra, setRa] = useState('')
  const [dec, setDec] = useState('')
  const [radius, setRadius] = useState('')
  const [resultCount, setResultCount] = useState('')
  const isValid = validateResultCountInput(resultCount)

  const fetcher = useFetcher()
  const results = fetcher.data
  const resultArray = results?.request || ['no results']

  const shouldDisableForm =
    !instrument || !format || !resultCount || !isValid || !ra || !dec || !radius

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
        </Grid>
      </GridContainer>
    </div>
  )
}
