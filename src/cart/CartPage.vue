<template>
  <div>
    <p>cart</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { _, API, RawCartItem, CartItem } from '@/common'

@Component({
  components: {
  }
})
export default class CartPage extends Vue {
  cartItems: CartItem[] = []

  async created() {
    await this.handleGetCartItems()
  }

  async handleGetCartItems() {
    const rawItems = await API.get('/cart_items') as RawCartItem[]
    const items = _.camelCaseObject(rawItems) as CartItem[]
    this.cartItems = items
  }
}
</script>
