import cheerio from 'cheerio'
import rp from 'request-promise'
import R from 'ramda'
// eslint-disable-next-line standard/object-curly-even-spacing
import {writeFileSync } from 'fs'
import { resolve } from 'any-promise'

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export const getIMDBCharacters = async () => {
  const options = {
    uri: 'https://www.imdb.com/title/tt0944947/?ref_=nv_sr_1?ref_=nv_sr_1',
    transform: body => cheerio.load(body)
  }

  let photos = []
  const $ = await rp(options)
  $('td.primary_photo a img').each(function () {
    const name = $(this).attr('title')
    const nameId = $(this).parent().attr('href')
    photos.push({
      name,
      nameId
    })
  })
  writeFileSync('./imdb.json', JSON.stringify(photos, null, 2), 'utf8')
}
// getIMDBCharacters()

cosnt fetchIMDBProfile = async (url) => {
  const option = {
    uri: url,
    transform: body => cheerio.load(body)
  }
  const $ = await rp(option)

  const img = $('a[name="headshot"] img')
  let src = img.attr('src')
  if (src) {
    src = src.split('_v1').shift()
    src += '_V1.jpg'
  }
  return src
}



export const getIMDBProfile = async () => {
  const characters = require(resolve(__dirname, '../../imdb.json'))

  for (let i = 0; i < characters.length; i++) {
    if (!characters[i].profile) {
      const url = `https://www.imdb.com/character/${characters[i].chID}/`
      console.log("crawling!!!")
      const data = await fetchIMDBProfile(url)
      const src = await fetchIMDBProfile(url)
      characters[i].profile = src
      await sleep(500)
    }
  }
  writeFileSync('./imdbCharacters.json', JSON.stringify(characters, null, 2), 'utf-8')
}
