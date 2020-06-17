<template>
  <div>
    <p>{{ cartItem.id }}</p>
    <p>{{ cartItem.productName }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { _, CartItem } from '@/common'

@Component
export default class CartItemPanel extends Vue {
  @Prop() cartItem!: CartItem
}
</script>
