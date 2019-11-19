import Router from 'koa-router'
import { resolve } from 'path'
import glob from 'glob'
import { isArray } from 'util'

export let routersMap = new Map()

export const symbolPrefix = Symbol('prefix')

export class Route {
  constructor(app, apiPath) {
    this.app = app
    this.router = new Router()
    this.apiPath = apiPath
  }
  init() {
    global.sync(resolve(this.apiPath, './*.js')).forEach(require)
    for (let [conf, controller ] of routesMap) {
      const controllers = isArray(controller)
      let prefixPath = conf.target(symbolPrefix)
    }
  }
}
