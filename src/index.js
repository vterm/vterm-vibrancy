import Store              from 'vterm/store'
import { styleComponent } from 'vterm/extend'
import { BACKGROUND }     from 'vterm/variables'

import color              from 'color'
import { remote }         from 'electron'

export default class Plugin {
  // In the constructor we do several things:
  // - Define wich should be the normal
  //   background color value
  // -
  constructor() {
    // Get currentWindow object
    const __window = remote.getCurrentWindow()

    // Extract values from the Store's config
    const {
      background,
      vibrancy,
      opacity
    } = Store.config

    // We extract the rgb values from
    // the parsed current color
    const { r, g, b }  = color(background || BACKGROUND).object()

    // Define the value for the vibrancy parameter
    const __vibrancy   = vibrancy || 'dark'

    // Define the value for the opacity parameter
    const __opacity    = opacity || .5

    // And then we save the lighter background
    // value as an `rgba` string
    const __background = `rgba(${r}, ${g}, ${b}, ${__opacity})`

    // Set vibrancy and background value
    __window.setVibrancy(__vibrancy)
    Store.config.background = __background
  }
}
