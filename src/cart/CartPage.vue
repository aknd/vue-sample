<template>
  <div>
    <div class="cart-summary">
      <div class="cart-summary__item-count">
        商品数: {{ totalCount }}点
      </div>
      <div class="cart-summary__price">
        合計金額: {{ totalPrice }}円
      </div>
    </div>
    <ul class="cart-item-list">
      <cart-item-panel
        v-for="item in cartItems"
        :key="item.id"
        :cartItem="item"
        @remove="handleDeleteCartItem"
        @update="handlePatchCartItem"
        class="cart-item-list__item"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { _, API, CartItemId, RawCartItem, CartItem } from '@/common'
import CartItemPanel from './CartItemPanel.vue'

@Component({
  components: {
    CartItemPanel
  }
})
export default class CartPage extends Vue {
  cartItems: CartItem[] = []

  get activeCartItems(): CartItem[] {
    return _.filter(this.cartItems, { willPurchase: true })
  }

  get totalCount(): number {
    return this.activeCartItems.length
  }

  get totalPrice(): number {
    return _.sumBy(this.activeCartItems, 'unitPrice')
  }

  async created() {
    await this.handleGetCartItems()
  }

  async handleGetCartItems() {
    const rawItems = await API.get('/cart_items') as RawCartItem[]
    this.cartItems = _.camelCaseObject(rawItems) as CartItem[]
  }

  async handleDeleteCartItem(id: CartItemId) {
    await API.delete(`/cart_items/${id}`)
    this.cartItems = _.reject(this.cartItems, { id })
  }

  async handlePatchCartItem(id: CartItemId, partialItem: Partial<CartItem>) {
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

<style scoped>
.cart-summary {
  width: 600px;
  margin-top: 10px;
  margin-right: auto;
  margin-bottom: 30px;
  margin-left: auto;
  border-style: solid;
  border-width: 3px;
}
.cart-summary__item-count {
  font-size: 24px;
}
.cart-summary__price {
  font-size: 24px;
}
.cart-item-list {
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  margin: 0 auto;
}
.cart-item-list__item {
  margin-bottom: 20px;
}
</style>
