export default function normalizeItem(item) {
  return Object.assign(
    {},
    {
      itemID: item.sale_item_id,
      typeID: item.sale_item_type,
      name: item.sale_name,
      description: item.sale_description,
      owner: item.sale_item_owner,
      price: item.sale_price,
      txID: item.transaction_id,
    }
  )
}
