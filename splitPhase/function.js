 /** 
  * @description 支払い金額を計算する
  * @param {Object} product - 商品情報
  * @param {Number} quantity - 数量
  * @param {Object} shippingMethod - 配送方法
  * @returns {Number} - 支払い金額
  */ 
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}

/**
 * @description 価格計算に必要なデータを計算する
 * @param {Object} product - 商品情報
 * @param {Number} quantity - 数量
 * @returns 
 */
function calculatePricingData(product, quantity){
  // basePrice(価格)
  const basePrice = product.basePrice * quantity;
  // discount(値引き額)
  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;

  return {basePrice: basePrice, quantity: quantity, discount: discount};

}

/**
 * @description 注文商品の合計金額を計算する
 * @param {Object} priceData - 価格計算に必要なデータ
 * @param {Object} shippingMethod - 配送方法
 * @returns 注文商品の合計金額
 */
function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return  priceData.basePrice - priceData.discount + shippingCost;
}
