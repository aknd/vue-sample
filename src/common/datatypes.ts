export interface RawItem {
  readonly id: string
  readonly image_url: string
  readonly product_name: string
  readonly unit_price: string
}

export interface RawCartItem extends RawItem {
  readonly will_purchase: boolean
}

export interface Item {
  readonly id: string
  readonly imageUrl: string
  readonly productName: string
  readonly unitPrice: string
}

export interface CartItem extends Item {
  readonly willPurchase: boolean
}
