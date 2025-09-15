<script setup lang="ts">
import { Button } from "@/components/ui/button"
// Убрали импорт BaseCard
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Eye, EyeOff, Loader2 } from "lucide-vue-next"
import Logo from "@/components/Logo.vue"
import AuthCarousel from "@/components/auth/AuthCarousel.vue"

// Состояние загрузки
const isLoading = ref(false)

// Состояние для табов (телефон или email)
const loginMethod = ref('phone')

// Состояние для телефонного номера
const phoneNumber = ref('')

// Состояние для email
const email = ref('')

// Состояние для показа пароля
const showPassword = ref(false)

// Функция переключения видимости пароля
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Функция для форматирования телефонного номера
const formatPhoneNumber = (value: string) => {
  // Убираем все нецифровые символы
  const cleaned = value.replace(/\D/g, '')
  
  // Если номер начинается с 8, заменяем на 7
  let digits = cleaned
  if (digits.startsWith('8')) {
    digits = '7' + digits.slice(1)
  }
  
  // Форматируем номер
  if (digits.startsWith('7')) {
    const match = digits.match(/^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
    if (match) {
      let formatted = '+7'
      if (match[1]) formatted += ` (${match[1]}`
      if (match[1] && match[1].length === 3) formatted += ')'
      if (match[2]) formatted += ` ${match[2]}`
      if (match[3]) formatted += `-${match[3]}`
      if (match[4]) formatted += `-${match[4]}`
      return formatted
    }
  }
  
  // Если номер не начинается с 7, просто добавляем +7
  if (digits.length === 0) return '+7 ('
  if (digits.length <= 10) {
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
    if (match) {
      let formatted = '+7'
      if (match[1]) formatted += ` (${match[1]}`
      if (match[1] && match[1].length === 3) formatted += ')'
      if (match[2]) formatted += ` ${match[2]}`
      if (match[3]) formatted += `-${match[3]}`
      if (match[4]) formatted += `-${match[4]}`
      return formatted
    }
  }
  
  return value
}

// Обработчик нажатия клавиш
const handlePhoneKeydown = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement
  const cursorPosition = target.selectionStart || 0
  const currentValue = phoneNumber.value
  
  if (event.key === 'Backspace') {
    event.preventDefault()
    
    // Если курсор в начале или значение пустое, не делаем ничего
    if (cursorPosition <= 3 || currentValue.length <= 3) {
      phoneNumber.value = '+7 ('
      nextTick(() => {
        target.setSelectionRange(4, 4)
      })
      return
    }
    
    // Находим позицию последней цифры перед курсором
    let newValue = currentValue
    let newCursorPos = cursorPosition
    
    // Идем назад от курсора и ищем цифру для удаления
    for (let i = cursorPosition - 1; i >= 0; i--) {
      const char = currentValue[i]
      if (char && /\d/.test(char)) {
        // Нашли цифру - удаляем её
        const digits = currentValue.replace(/\D/g, '')
        const digitIndex = currentValue.slice(0, i + 1).replace(/\D/g, '').length - 1
        const newDigits = digits.slice(0, digitIndex) + digits.slice(digitIndex + 1)
        
        // Форматируем новое значение
        if (newDigits.length === 0) {
          newValue = '+7 ('
          newCursorPos = 4
        } else {
          newValue = formatPhoneNumber('+7' + newDigits.slice(1))
          // Вычисляем новую позицию курсора
          const digitsBeforeCursor = Math.max(0, digitIndex)
          newCursorPos = calculateCursorPosition(newValue, digitsBeforeCursor)
        }
        break
      }
    }
    
    phoneNumber.value = newValue
    nextTick(() => {
      target.setSelectionRange(newCursorPos, newCursorPos)
    })
  }
}

// Функция для вычисления позиции курсора
const calculateCursorPosition = (formattedValue: string, digitsBefore: number) => {
  let position = 0
  let digitCount = 0
  
  for (let i = 0; i < formattedValue.length; i++) {
    const char = formattedValue[i]
    if (char && /\d/.test(char)) {
      if (digitCount >= digitsBefore) {
        break
      }
      digitCount++
    }
    position++
  }
  
  return position
}

// Обработчик ввода телефона
const handlePhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const oldValue = phoneNumber.value
  const newValue = target.value
  
  // Подсчитываем количество цифр в старом и новом значении
  const oldDigits = oldValue.replace(/\D/g, '')
  const newDigits = newValue.replace(/\D/g, '')
  
  // Ограничиваем длину до 11 цифр (включая код страны)
  if (newDigits.length > 11) {
    target.value = oldValue
    return
  }
  
  // Форматируем значение
  const formatted = formatPhoneNumber(newValue)
  phoneNumber.value = formatted
  target.value = formatted
  
  // Восстанавливаем позицию курсора
  nextTick(() => {
    const digitsDiff = newDigits.length - oldDigits.length
    if (digitsDiff > 0) {
      // Если добавили цифры, перемещаем курсор после них
      const digitsInFormatted = formatted.replace(/\D/g, '').length
      const newCursorPos = calculateCursorPosition(formatted, digitsInFormatted)
      target.setSelectionRange(newCursorPos, newCursorPos)
    }
  })
}

// Функция валидации телефона
const isValidPhone = computed(() => {
  const digits = phoneNumber.value.replace(/\D/g, '')
  return digits.length === 11 && digits.startsWith('7')
})

// Функция валидации email
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

// Проверка валидности текущего метода входа
const isValidLoginCredentials = computed(() => {
  if (loginMethod.value === 'phone') {
    return isValidPhone.value
  } else {
    return isValidEmail.value
  }
})

// Получение чистого номера телефона для отправки
const getCleanPhoneNumber = () => {
  return phoneNumber.value.replace(/\D/g, '')
}

// Инициализация значения телефона
onMounted(() => {
  phoneNumber.value = '+7 ('
})

// Функция для обработки отправки формы
const handleSubmit = async (event: Event) => {
  event.preventDefault()
  
  // Проверяем валидность данных для входа
  if (!isValidLoginCredentials.value) {
    if (loginMethod.value === 'phone') {
      console.error('Некорректный номер телефона')
    } else {
      console.error('Некорректный email адрес')
    }
    return
  }
  
  try {
    isLoading.value = true
    
    // Получаем данные для отправки в зависимости от метода входа
    const loginData = loginMethod.value === 'phone' 
      ? { phone: getCleanPhoneNumber() }
      : { email: email.value }
    
    console.log('Данные для входа:', loginData)
    
    // Здесь можно добавить логику аутентификации
    // Например, отправка данных на сервер, проверка токена и т.д.
    
    // Имитация запроса на сервер
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // После успешной аутентификации переходим на Dashboard
    await navigateTo('/dashboard')
  } catch (error) {
    console.error('Ошибка авторизации:', error)
  } finally {
    isLoading.value = false
  }
}

// Функция для обработки входа через социальные сети
const handleSocialLogin = async (provider: string) => {
  try {
    isLoading.value = true
    
    // Здесь можно добавить логику аутентификации через соцсети
    console.log(`Вход через ${provider}`)
    
    // Имитация запроса
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Переход на Dashboard
    await navigateTo('/dashboard')
  } catch (error) {
    console.error(`Ошибка авторизации через ${provider}:`, error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div
      class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm overflow-hidden p-0 border-none"
    >
      <div class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8" @submit="handleSubmit">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center text-center gap-y-4">
              <Logo />
              <p class="font-semibold">
                Войти в панель управления
              </p>
            </div>
            <Tabs v-model="loginMethod" default-value="phone" class="w-full">
              <TabsList class="flex justify-start w-full mb-4 h-auto bg-transparent border-b rounded-none p-0 gap-8">
                <div class="space-x-4">
                  <TabsTrigger
                    value="phone"
                    class="rounded-none border-0 bg-transparent pb-3 pt-2 px-4 text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-px data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:content-['']"
                  >
                    Телефон
                  </TabsTrigger>
                  <TabsTrigger
                    value="email"
                    class="rounded-none border-01 bg-transparent pb-3 pt-2 px-4 text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-px data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:content-['']"
                  >
                    Email
                  </TabsTrigger>
                </div>
              </TabsList>

              <TabsContent value="phone" class="space-y-0">
                <div class="grid gap-2">
                  <Label for="phone">Телефон</Label>
                  <Input
                    id="phone"
                    v-model="phoneNumber"
                    type="tel"
                    placeholder="+7 ("
                    autocomplete="tel"
                    required
                    maxlength="18"
                    class="shadow-none"
                    @input="handlePhoneInput"
                    @keydown="handlePhoneKeydown"
                  />
                </div>
              </TabsContent>

              <TabsContent value="email" class="space-y-0">
                <div class="grid gap-2">
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="your@email.com"
                    autocomplete="email"
                    required
                    class="shadow-none"
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Пароль</Label>
                <a href="#" class="ml-auto text-sm underline-offset-2 hover:underline">
                  Забыли пароль?
                </a>
              </div>
              <div class="relative">
                <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  class="pr-10 shadow-none"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground transition-colors"
                  :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
                  @click="togglePasswordVisibility"
                >
                  <EyeOff v-if="showPassword" :size="16" />
                  <Eye v-else :size="16" />
                </button>
              </div>
            </div>
            <Button
              size="lg"
              type="submit"
              class="w-full"
              :disabled="isLoading"
            >
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading ? 'Вход...' : 'Войти' }}
            </Button>
            <div
              class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
            >
              <span class="relative z-10 bg-background px-2 text-muted-foreground">
                Или продолжить с
              </span>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <Button
                variant="outlineDark"
                class="w-full cursor-pointer"
                :disabled="isLoading"
                @click="handleSocialLogin('vk')"
              >
                <NuxtImg src="/img/vk.svg" alt="" class="h-5" />
                <span class="sr-only">Войти через VK ID</span>
              </Button>
              <Button
                variant="outlineDark"
                class="w-full cursor-pointer"
                :disabled="isLoading"
                @click="handleSocialLogin('yandex')"
              >
                <NuxtImg src="/img/mailru.svg" alt="" class="h-5" />
                <span class="sr-only">Войти через Mail.ru ID</span>
              </Button>
              <Button
                variant="outlineDark"
                class="w-full cursor-pointer"
                :disabled="isLoading"
                @click="handleSocialLogin('Meta')"
              >
                <NuxtImg src="/img/yandex.svg" alt="" class="h-5" />
                <span class="sr-only">Войти через Yandex ID</span>
              </Button>
            </div>
            <div class="text-center text-sm">
              Нет аккаунта?
              <a href="#" class="underline underline-offset-4">
                Зарегистрироваться
              </a>
            </div>
          </div>
        </form>

        <div class="hidden md:block">
          <AuthCarousel />
        </div>
      </div>
    </div>
    <div class="text-xs text-center">
      &copy; 2021—{{ new Date().getFullYear() }} IVA 360. Все права защищены.
    </div>
  </div>
</template>