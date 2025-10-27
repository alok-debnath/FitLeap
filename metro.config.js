const { getDefaultConfig } = require('expo/metro-config')
const { withTamagui } = require('@tamagui/metro-plugin')

const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS output by defaulting to web.
  isCSSEnabled: true,
})

module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: process.env.NODE_ENV === 'production' ? './tamagui-web.css' : null,
})