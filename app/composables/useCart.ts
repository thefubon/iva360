import { ref, computed } from 'vue'

// Глобальное состояние корзины
const cartItems = ref<number>(0)

export const useCart = () => {
  // Добавить тариф в корзину
  const addToCart = (quantity: number) => {
    cartItems.value = quantity
  }

  // Убрать тариф из корзины
  const removeFromCart = () => {
    cartItems.value = 0
  }

  // Проверка, есть ли тариф в корзине
  const hasItems = computed(() => cartItems.value > 0)

  // Общее количество тарифов
  const totalItems = computed(() => cartItems.value)

  return {
    cartItems,
    addToCart,
    removeFromCart,
    hasItems,
    totalItems
  }
}
