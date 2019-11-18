import rp from 'request-promise'
import _ from 'lodash'
import { writeFileSync } from 'fs'

let characters = []
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
export const getApiCharacters = async (page = 1) => {
  const url = `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=50`
  let body = await rp(url)
  body = JSON.parse(body)

  characters = _.union(characters, body)

  if (body.length < 50) {
    console.log('done')
  } else {
    writeFileSync('./characters.json', JSON.stringify(characters, null, 2), 'utf8')
    await sleep(1000)
    page++
    getApiCharacters(page)
  }
}
getApiCharacters()
