type Brand<K, T> = K & { __brand: T }

export type TodoId = Brand<number, 'TodoId'>

export interface RawTodo {
  readonly id: TodoId
  readonly content: string
  readonly limit_at: string
  readonly completed: boolean
}

export interface Todo {
  readonly id: TodoId
  readonly content: string
  readonly limitAt: string
  readonly completed: boolean
}

export type CartItemId = Brand<string, 'CartItemId'>

export interface RawCartItem {
  readonly id: CartItemId
  readonly image_url: string
  readonly product_name: string
  readonly unit_price: number
  readonly will_purchase: boolean
}

export interface CartItem {
  readonly id: CartItemId
  readonly imageUrl: string
  readonly productName: string
  readonly unitPrice: number
  readonly willPurchase: boolean
}
