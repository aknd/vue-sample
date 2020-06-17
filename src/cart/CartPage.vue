<template>
  <ul style="list-style-type:none">
    <cart-item-panel
      v-for="item in cartItems"
      :key="item.id"
      :cartItem="item"
      @delete="handleDeleteCartItem"
      @patch="handlePatchCartItem"
    />
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { _, API, RawCartItem, CartItem } from '@/common'
import CartItemPanel from './CartItemPanel.vue'

@Component({
  components: {
    CartItemPanel
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

  async handleDeleteCartItem(id: string) {
    await API.delete(`/cart_items/${id}`)
    this.cartItems = _.reject(this.cartItems, { id })
  }

  async handlePatchCartItem(id: string, partialItem: Partial<CartItem>) {
    const requestData = _.snakeCaseObject(partialItem) as Partial<RawCartItem>
    await API.patch(`/cart_items/${id}`, requestData)
    this.cartItems = this.cartItems.map(item =>
      item.id === id
        ? {
            ...item,
            ...partialItem
          }
        : item
    )
  }
}
</script>
