import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
import config from '../config'
import R from 'ramda'

const models = resolve(__dirname, '../database/schema')

fs.readFileSync(models)
  .filter(file => ~file.search(/^[^\.].*js$/))
  .forEach(file => require(resolve(models, file)))

const formatData = R.map(i => {
  i._id = i.nmId
  return i
})

let wikiCharacters = require(resolve(__dirname, '../../completeCharacters.json'))
let wikiHouses = require(resolve(__dirname, '../../completeHouses.json'))

wikiCharacters = formatData(wikiCharacters)

export const database = app => {
  mongoose.set('debug', true)
  mongoose.connect(config.db)
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.db)
  })
  mongoose.connection.on('error', err => {
    console.log(err)
  })
  mongoose.connection.on('open', async => {
    console.log('Connected to MongoDB', config.db)
    const wikiHouse = mongoose.model('WikiHouse')
    const wikiCharacter = mongoose.model('WikeCharacter')
    const existWikiHouses = await wikiHouse.find({}).exec()
    const existWikiCharacters = await wikiCharacter.find({}).exec()
    if (!existWikiHouses.length) wikiHouse.insertMany(wikiHouse)
    if (!existWikiCharacters.length) wikiCharacter.insertMany(wikiCharacter)
  })
}
