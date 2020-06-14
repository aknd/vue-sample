<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './HelloWorld.vue'

@Component({
  components: {
    HelloWorld
  }
})
export default class TopPage extends Vue {}
</script>
