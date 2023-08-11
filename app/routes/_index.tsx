import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div>
      <h1>Welcome to the Web Dev Tutorial</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://designsystem.digital.gov"
            rel="noreferrer"
          >
            US Web Design System (USWDS)
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://trussworks.github.io/react-uswds/"
            rel="noreferrer"
          >
            USWDS React Components (<code>@trussworks/react-uswds</code>)
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  )
}
