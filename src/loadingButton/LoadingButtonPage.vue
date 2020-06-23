<template>
  <div>
    <div>LoadingButtonPage</div>
    <btn>loading button</btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Button } from '@/common'

@Component({
  components: {
    btn: Button
  }
})
export default class LoadingButtonPage extends Vue {
}
</script>
