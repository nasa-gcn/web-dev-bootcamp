import { Link } from '@remix-run/react'

export default function () {
  return (
    <div>
      <h1>Instrument Data</h1>
      <div>
        <Link to="/data/new" className="usa-button">
          Create New Instrument Data
        </Link>
      </div>
    </div>
  )
}
