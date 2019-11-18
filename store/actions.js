import Services from './services'

export default {
  getWechatSignature({ commit }, url) {
    return Services.getWechatSignature(url)
  },

  getUserByAuth({ commit }, url) {
    return Services.getUserByAuth(url)
  },

  async fetchHouses({ state }) {
    const res = await Services.fetchHouses()
    state.houses = res.data
    return res
  },

  async fetchCharacters({ state }) {
    const res = await Services.fetchCharacters()
    state.characters = res.data
  },

  async fetchCities({ state }) {
    const res = await Services.fetchCities()
    state.cities = res.data
  }
}
