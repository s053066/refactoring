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

  const priceData = {basePrice: basePrice, quantity: quantity, discount: discount};
  const price = applyShipping(priceData, shippingMethod)
  return price;
}

/**
 * @description 配送料を計算する
 * @param {*} basePrice 
 * @param {*} shippingMethod 
 * @param {*} quantity 
 * @param {*} discount 
 * @returns 
 */
function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  const price = priceData.basePrice - priceData.discount + shippingCost
  return price;
}
