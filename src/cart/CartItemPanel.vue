<template>
  <li>
    <div>
      <p>{{ cartItem.id }}</p>
      <p>{{ cartItem.productName }}</p>
      <p>{{ active ? '' : '後'}}</p>
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
import { CartItem } from '@/common'

@Component
export default class CartItemPanel extends Vue {
  @Prop() cartItem!: CartItem

  get active(): boolean {
    return !this.cartItem.willPurchase
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
