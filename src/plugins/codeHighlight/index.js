import { defineOptions } from '@acnb/core'
import { getCurrentPage, isMd } from '../../utils/cnblog'
import themes from './themes.js'

export const highlightConfig = defineOptions('codeHighlight', {
  dark: 'atomOneDark',
  light: 'atomOneLight',
})

/**
 * 构建 Markdown 代码块高亮
 * @param {*} light
 * @param {*} dark
 */
function buildMarkdownHighlight(light, dark) {
  let style
  if (!isMd()) {
    style = `<style>
        :root{${themes['github']}}
        </style>`
  } else {
    style = `<style>
        :root{${themes[light]}}
        :root[theme="dark"]{${themes[dark]}}
        </style>`
  }
  $('head').append(style)
}

export const codeHighlight = (theme, devOptions) => {
  if (getCurrentPage() !== 'post') return
  if ($('pre').length === 0) return

  const { light, dark } = highlightConfig(devOptions)
  buildMarkdownHighlight(light, dark)
}
