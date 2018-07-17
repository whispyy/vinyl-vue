<template>
  <div class="main">
    <h1>Random pick in your collection</h1>
    <section v-if="errored.main">
      <p>Unable to load collection</p>
    </section>

    <section v-else>
      <div v-if="loading.main">Loading...</div>
      <div v-else>
        <div>Collection size : {{ length }}</div>
        <button v-on:click="randomPick()" class="action">Pick randomly</button>
        <div v-if="!loading.detail" class="box">
          <p>Tile : <strong>{{ info.title }}</strong></p>
          <p>Artist : <strong>{{ info.artists | artists }}</strong></p>
          <p>Year : <strong>{{ info.year }}</strong></p>
          <p>Available formats : 
            <strong v-for="format in info.formats">
            {{ format.name }}
            <span v-if="format.text">{{ format.text }}</span>
          </strong>
          </p>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Main',
  data () {
    return {
      info: {},
      length: 0,
      loading: {
        main: true,
        detail: true
      },
      errored: {
        main: false,
        detail: false
      }
    }
  },
  mounted () {
    axios
      .get('https://api.discogs.com/users/ausamerika/collection/folders/0/releases')
      .then(response => { this.length = response.data.pagination.items })
      .catch(err => {
        console.log(err)
        this.errored.main = true
      })
      .finally(() => { this.loading.main = false })
  },
  filters: {
    artists (array) {
      let name = ''
      if (array && array.length === 1 && array[0].name) {
        name += array[0].name
      }
      if (array && array.length > 1) {
        for (let i = array.length - 1; i >= 0; i--) {
          name += array[i].join + ' ' + array[i].name
        }
      }
      return name
    }
  },
  methods: {
    randomPick () {
      this.loading.detail = true
      const random = Math.floor(Math.random() * Math.floor(this.length))
      axios
        .get('https://api.discogs.com/users/ausamerika/collection/folders/0/releases', {
          params: {
            per_page: 1,
            page: random
          }
        })
        .then(response => {
          const data = response.data.releases[0]
          this.info.title = data.basic_information.title
          this.info.artists = data.basic_information.artists
          this.info.year = data.basic_information.year
          this.info.formats = data.basic_information.formats
          console.log(this.info.formats)
        })
        .catch(err => {
          console.log(err)
          this.errored.detail = true
        })
        .finally(() => { this.loading.detail = false })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.action {
  margin: 2em;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.box::before {
  content: "—";
  color: #42b983;
}
/*.box {
  margin: 2em;
}*/
</style>
