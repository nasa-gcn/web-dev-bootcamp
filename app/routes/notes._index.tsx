import type { DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getUserId } from 'app/lib/utils'
import { useState } from 'react'

import { getNotes } from './data/data.server'

export async function loader({ request }: DataFunctionArgs) {
  const userID = getUserId()
  return await getNotes(userID)
}
export default function () {
  const notes = useLoaderData<typeof loader>()
  const [selected, setSelected] = useState('')
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <h1>Notes</h1>
      {notes &&
        notes.map((x) => (
          <div className="usa-accordion" key={x.noteId}>
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-controls={x.noteId}
                aria-expanded={false}
                onClick={() => {
                  if (expanded) setSelected('')
                  if (!expanded) setSelected(x.noteId)
                  setExpanded(!expanded)
                }}
              >
                {x.noteTitle}
              </button>
            </h4>
            <div
              id={x.noteId}
              className="usa-accordion__content usa-prose border"
              hidden={selected !== x.noteId}
            >
              <p>{x.noteBody}</p>
              <Link to={`/notes/${x.noteId}`}>details page</Link>
            </div>
          </div>
        ))}
    </div>
  )
}
