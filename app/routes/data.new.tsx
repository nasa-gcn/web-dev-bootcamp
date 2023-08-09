import type { DataFunctionArgs } from '@remix-run/node'
import { Form } from '@remix-run/react'
import {
  Button,
  FormGroup,
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

  if (!instrument || !format || !resultCount) return null

  const res = await getInstrumentData(instrument, format, parseInt(resultCount))
  console.log(res)
  return null
}

export default function () {
  const [instrument, setInstrument] = useState('')
  const [format, setFormat] = useState('')
  const [resultCount, setResultCount] = useState('')
  const isValid = validateResultCountInput(resultCount)

  const shouldDisable = !instrument || !format || !resultCount || !isValid

  return (
    <div>
      <h1>Instrument Data Form</h1>
      <Form method="POST">
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
        <Label htmlFor="resultCount">How many results do you want?</Label>

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
          <Button type="submit" disabled={shouldDisable}>
            Submit
          </Button>
        </FormGroup>
      </Form>
    </div>
  )
}
