 /** 
  * @description 支払い金額を計算する
  * @param {Object} product - 商品情報
  * @param {Number} quantity - 数量
  * @param {Object} shippingMethod - 配送方法
  * @returns {Number} price - 支払い金額
  */ 
function priceOrder(product, quantity, shippingMethod) {
  // basePrice(価格)
  const basePrice = product.basePrice * quantity;
  // discount(値引き額)
  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  // shippingPerCase(1ケースあたりの送料)　※料金が送料の割引適用基準を超えている場合は、割引適用後の送料を使用する
  const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}
