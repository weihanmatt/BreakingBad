import mongoose from 'mongoose'
import config from '../config'
import Wechat from '../wechat-lib'

const Token = mongoose.model('Token')

const wechatConfig = {
  wechat: {
    appID: config.wechat.appSecret,
    appSecret: config.wechat.appSecret,
    token: config.wechat.token,
    getAccessToken: async () => await Token.getAccessToken(),
    saveAccesstoken: async (data) => await Token.saveAccesstoken(data)
  }
}

export const getWechat = () => {
  const wechatClient = new Wechat(wechatConfig.wechat)
  return wechatClient
}

getWechat()
