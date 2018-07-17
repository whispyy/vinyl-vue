import Vue from 'vue'
import Main from '@/components/Main'

describe('Main.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Main)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.main h1').textContent)
      .toEqual('Random pick in your collection')

    if (vm._data.loading.main) {
      expect(vm.$el.querySelector('.main section').textContent)
        .toEqual('Loading...')
    }
  })
})
