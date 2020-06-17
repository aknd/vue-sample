<template>
  <li class="cart-item-panel">
    <div :style="itemImageStyle" />
    <div>
      <p>{{ cartItem.id }}</p>
      <p>{{ cartItem.productName }}</p>
    </div>
    <div>
      <button @click="handleRemove">
        カートから取り除く
      </button>
      <button v-if="active" @click="handleInactivate">
        後で買う
      </button>
      <button v-else @click="handleActivate">
        今すぐ買う
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { _, CartItem } from '@/common'

@Component
export default class CartItemPanel extends Vue {
  @Prop() cartItem!: CartItem

  get active(): boolean {
    return !this.cartItem.willPurchase
  }

  get itemImageStyle(): object {
    return _.pickBy({
      width: '300px',
      height: '300px',
      'background-image': `url(${this.cartItem.imageUrl})`,
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': 'contain',
      'background-color': !this.active && 'lightgray',
      'background-blend-mode': !this.active && 'multiply'
    }, _.isString)
  }

  handleRemove() {
    this.$emit('delete', this.cartItem.id)
  }

  handleInactivate() {
    this.$emit('patch', this.cartItem.id, { willPurchase: true })
  }

  handleActivate() {
    this.$emit('patch', this.cartItem.id, { willPurchase: false })
  }
}
</script>

<style scoped>
.cart-item-panel {
  width: 300px;
  font-size: 24px;
  list-style: none;
}
button {
  width: 220px;
  font-size: 20px;
}
</style>
