import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { GovBanner, GridContainer, PrimaryNav } from '@trussworks/react-uswds'

import theme from './theme.css'
import favicon_16 from '~/../node_modules/@uswds/uswds/dist/img/favicons/favicon-16.png'
import favicon_40 from '~/../node_modules/@uswds/uswds/dist/img/favicons/favicon-40.png'
import favicon_57 from '~/../node_modules/@uswds/uswds/dist/img/favicons/favicon-57.png'
import favicon_72 from '~/../node_modules/@uswds/uswds/dist/img/favicons/favicon-72.png'
import favicon_114 from '~/../node_modules/@uswds/uswds/dist/img/favicons/favicon-114.png'
import favicon_144 from '~/../node_modules/@uswds/uswds/dist/img/favicons/favicon-144.png'
import favicon_192 from '~/../node_modules/@uswds/uswds/dist/img/favicons/favicon-192.png'
import favicon_240 from '~/../node_modules/@uswds/uswds/dist/img/favicons/favicon.png'

const favicons = {
  16: favicon_16,
  40: favicon_40,
  57: favicon_57,
  72: favicon_72,
  114: favicon_114,
  144: favicon_144,
  192: favicon_192,
  240: favicon_240,
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: theme },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  ...Object.entries(favicons).map(([size, href]) => ({
    rel: 'icon',
    href: href,
    sizes: `${size}x${size}`,
  })),
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PrimaryNav
          className="margin-top-1"
          items={[
            <NavLink className="" to="/data" key="/data">
              Data
            </NavLink>,
            <NavLink className="" to="/" key="/">
              Home
            </NavLink>,
          ]}
        ></PrimaryNav>
        <a className="usa-skipnav" href="#main-content">
          Skip to main content
        </a>
        <GovBanner />
        <GridContainer>
          <Outlet />
        </GridContainer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
