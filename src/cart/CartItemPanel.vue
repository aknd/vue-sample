<template>
  <li class="cart-item-panel">
    {{ cartItem.productName }}: {{ cartItem.unitPrice }}円
    <div :style="itemImageStyle" />
    <div>
      <button @click="handleRemove">
        カートから取り除く
      </button>
      <button v-if="active" @click="handleToggleActive">
        後で買う
      </button>
      <button v-else @click="handleToggleActive">
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
    return this.cartItem.willPurchase
  }

  get itemImageStyle(): object {
    return _.pickBy(
      {
        width: '300px',
        height: '300px',
        'background-color': !this.active && 'lightgray',
        'background-image': `url(${this.cartItem.imageUrl})`,
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-size': 'contain',
        'background-blend-mode': !this.active && 'multiply'
      },
      _.isString
    )
  }

  handleRemove() {
    this.$emit('remove', this.cartItem.id)
  }

  handleToggleActive() {
    const { id, willPurchase } = this.cartItem
    this.$emit('update', id, { willPurchase: !willPurchase })
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
