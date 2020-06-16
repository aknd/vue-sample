<template>
  <div>
    <p>cart</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { _, API, RawItem, Item } from '@/common'

@Component({
  components: {
  }
})
export default class CartPage extends Vue {
  async created() {
    const rawItems = await API.get('/items') as RawItem[]
    const items = _.camelCaseObject(rawItems) as Item[]
    console.dir(items)
  }
}
</script>
