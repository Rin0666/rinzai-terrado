import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
export { pageMeta, notFoundMeta, profile, siteSections, legacySections, projects } from './content'

export function render(path: string) {
  return renderToString(<StaticRouter location={path}><App /></StaticRouter>)
}
