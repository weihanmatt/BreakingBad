<template>
  <div class="container">
    <div class="house">
      <div class="houses-content" v-for="(item,index) in houses" :key="index" @click="focusHouse(item)">
        <div class="house-desc">
          <div class="words">{{item.words}}</div>
          <div class="cname">{{item.cname}}</div>
          <div class="name">{{item.name}}</div>         
        </div>
      </div>
    </div>
    <div class="characters">
      <div class="title">主要人物</div>
      <div class="characters-container">
        <div class="characters-content" v-for="(item,index) in characters" :key="index" @click="showCharacter(item)">
          <img :src="item.profile" alt="">
          <div class="characters-desc">
            <div class="playBy">{{item.playBy}}</div>
            <div class="cname">{{item.cname}}</div>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cities">
      <div class="title">维斯特洛大陆</div>
      <div class="cities-item" v-for="(item,index) in cities" :key="index">
        <div class="cities">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  head() {
    return {
      title: 'Game of Thrones'
    }
  },
  computed: {
    ...mapState([
      'houses',
      'characters',
      'cities'
    ])
  },
  methods: {
    showHouse(item) {
      this.$router.push({
        path: '/house',
        query: {
          id: item._id
        }
      })
    },
    showCharacter(item) {
      this.$router.push({
        path: '/characters',
        query: {
          id: item._id
        }
      })
    }
  },
  beforeCreate() {
    this.$store.dispatch('fetchHouses')
    this.$store.dispatch('fetchCharacters')
    this.$store.dispatch('fetchCities')
  }
}
</script>

<style scoped lang="sass" src="~static/sass/index.sass">
</style>
