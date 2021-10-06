// 弹幕
import { defineOptions } from '@acnb/core'
import { getCurrentPage } from '../../utils/cnblog'
import {
  getClientRect,
  randomNum,
  randomColor,
  sleep,
} from '../../utils/helpers'

export const barrageConfig = defineOptions({
  enable: false,
  opacity: 0.6,
  fontSize: '20px',
  colors: [
    '#FE0302',
    '#FF7204',
    '#FFAA02',
    '#FFD302',
    '#FFFF00',
    '#A0EE00',
    '#00CD00',
    '#019899',
    '#4266BE',
    '#89D5FF',
    '#CC0273',
    '#CC0273',
  ],
  barrages: [],
  indexBarrages: [],
  postPageBarrages: [],
})

/**
 * @description 发送弹幕
 * @param {Array} textList 弹幕列表
 */
async function shootBarrage(textList, enable, opacity, colors, fontSize) {
  if (!enable) return
  if (!document.querySelector('#barrage-wrap')) {
    $('body').append(`<div id='barrage-wrap'></div>`)
  }

  const $wrap = document.querySelector('#barrage-wrap')
  const rect = getClientRect($wrap)
  const wrapWidth = rect.right - rect.left
  const wrapHeight = rect.bottom - rect.top

  for (let i = 0; i < textList.length; i++) {
    const text = textList[i]
    const $barrage = document.createElement('span')
    const barrageStyle = `
									left: ${wrapWidth}px;
									top: ${randomNum(wrapHeight - 30, 1)}px;
									color: ${randomColor(colors)};
									opacity: ${opacity};
									font-size: ${fontSize};
								`

    $barrage.style.cssText = barrageStyle
    $barrage.innerText = text
    $wrap.appendChild($barrage)

    const roll = timer => {
      const now = +new Date()
      const rect = getClientRect($barrage)
      let left = $barrage.offsetLeft

      roll.last = roll.last || now
      roll.timer = roll.timer || timer

      if (left < rect.left - rect.right) {
        $($barrage).remove()
      } else {
        if (now - roll.last >= roll.timer) {
          roll.last = now
          left -= 3
          $barrage.style.left = `${left}px`
        }
        window.requestAnimationFrame(roll)
      }
    }

    roll(randomNum(30, 1))
    await sleep(1000)
  }
}

export const barrage = (theme, devOptions) => {
  const {
    enable,
    opacity,
    colors,
    fontSize,
    barrages,
    indexBarrages,
    postPageBarrages,
  } = barrageConfig(devOptions)
  const page = getCurrentPage()

  if (barrages.length) {
    setTimeout(() => {
      shootBarrage(barrages, enable, opacity, colors, fontSize)
    }, 3000)
  }

  // if (page === 'post' && postPageBarrages.length) {
  //   setTimeout(() => {
  //     shootBarrage(postPageBarrages, enable, opacity, colors, fontSize)
  //   }, 3000)
  // }

  // if (page === 'index' && indexBarrages.length) {
  //   setTimeout(() => {
  //     shootBarrage(indexBarrages, enable, opacity, colors, fontSize)
  //   }, 3000)
  // }
}
