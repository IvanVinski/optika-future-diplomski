export const useCart = () => {
  const cart = useState<Product[]>("cart", () => []);

  const addItem = (item: Product) => {
    const existingItem = cart.value.find((i) => i.uid === item.uid);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.sumPrice =
        existingItem.discountPrice * existingItem.quantity;
    } else
      cart.value.push({ ...item, quantity: 1, sumPrice: item.discountPrice });
  };

  const removeItem = (itemId: string) => {
    const existingItem = cart.value.find((i) => i.uid === itemId);
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      existingItem.sumPrice =
        existingItem.discountPrice * existingItem.quantity;
    } else deleteItem(itemId);
  };

  const deleteItem = (itemId: string) => {
    const index = cart.value.findIndex((i) => i.uid === itemId);
    console.log(index);
    if (index !== -1) cart.value.splice(index, 1);
  };

  const total = computed(() => {
    let price = 0;
    let quantity = 0;
    cart.value.forEach((item) => {
      price += item.sumPrice;
      quantity += item.quantity;
    });

    return { price: price.toFixed(2), quantity };
  });

  return {
    cart: cart.value,
    total,
    addItem,
    removeItem,
    deleteItem,
  };
};
