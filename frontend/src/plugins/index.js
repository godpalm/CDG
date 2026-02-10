/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import route from '../router'

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(route)
}

