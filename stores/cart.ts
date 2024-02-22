import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const items = ref<ProductCart[]>([]);
  const itemsInCart = ref(0);
  const totalPrice = ref(0);

  function add(item: ProductType) {
    const existingItem = items.value.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.sumPrice += Number(item.finalPrice);
      itemsInCart.value += 1;
      totalPrice.value += Number(item.finalPrice);
    } else {
      itemsInCart.value += 1;
      totalPrice.value += Number(item.finalPrice);
      items.value.push({
        ...item,
        quantity: 1,
        sumPrice: Number(item.finalPrice),
      });
    }
  }

  function remove(id: string) {
    const existingItem = items.value.find((i) => i.id === id);
    if (existingItem && existingItem.quantity > 1) {
      itemsInCart.value -= 1;
      existingItem.quantity -= 1;
      totalPrice.value -= Number(existingItem.finalPrice);
      existingItem.sumPrice -= Number(existingItem.finalPrice);
    } else deleteItem(id);
  }

  function deleteItem(id: string) {
    const index = items.value.findIndex((i) => i.id === id);
    if (index !== -1) {
      itemsInCart.value -= items.value[index].quantity;
      totalPrice.value -= items.value[index].sumPrice;
      items.value.splice(index, 1);
    }
  }

  return { items, itemsInCart, totalPrice, add, remove, deleteItem };
});
