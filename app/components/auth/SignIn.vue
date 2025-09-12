<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Eye, EyeOff, Loader2 } from "lucide-vue-next"

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
  const cursorPosition = target.selectionStart || 0
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
    <Card class="overflow-hidden p-0 shadow-none border-none">
      <CardContent class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8" @submit="handleSubmit">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center text-center gap-y-4">
              <Logo />
              <p class="font-semibold">
                Войти в панель управления
              </p>
            </div>
            <Tabs v-model="loginMethod" default-value="phone" class="w-full">
              <TabsList
                class="flex justify-start w-full mb-4 h-auto bg-transparent border-b rounded-none p-0 gap-8">
                <div class="space-x-4">
                  <TabsTrigger value="phone"
                    class="rounded-none border-0 bg-transparent pb-3 pt-2 px-4 text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-px data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:content-['']">
                    Телефон
                  </TabsTrigger>
                  <TabsTrigger value="email"
                    class="rounded-none border-01 bg-transparent pb-3 pt-2 px-4 text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-px data-[state=active]:after:left-0 data-[state=active]:after:w-full data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:content-['']">
                    Email
                  </TabsTrigger>
                </div>
              </TabsList>

              <TabsContent value="phone" class="space-y-0">
                <div class="grid gap-2">
                  <Label for="phone">Телефон</Label>
                  <Input id="phone" type="tel" v-model="phoneNumber" placeholder="+7 (" autocomplete="tel" required
                    @input="handlePhoneInput" @keydown="handlePhoneKeydown" maxlength="18" class="shadow-none" />
                </div>
              </TabsContent>

              <TabsContent value="email" class="space-y-0">
                <div class="grid gap-2">
                  <Label for="email">Email</Label>
                  <Input id="email" type="email" v-model="email" placeholder="your@email.com" autocomplete="email"
                    required class="shadow-none" />
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
                <Input id="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" required
                  class="pr-10 shadow-none" />
                <button type="button" @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground transition-colors"
                  :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'">
                  <EyeOff v-if="showPassword" :size="16" />
                  <Eye v-else :size="16" />
                </button>
              </div>
            </div>
            <Button size="lg" type="submit" class="w-full" :disabled="isLoading">
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading ? 'Вход...' : 'Войти' }}
            </Button>
            <div
              class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span class="relative z-10 bg-background px-2 text-muted-foreground">
                Или продолжить с
              </span>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <Button variant="outlineDark" class="w-full" :disabled="isLoading" @click="handleSocialLogin('Apple')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor" />
                </svg>
                <span class="sr-only">Войти через Apple</span>
              </Button>
              <Button variant="outlineDark" class="w-full" :disabled="isLoading" @click="handleSocialLogin('Google')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor" />
                </svg>
                <span class="sr-only">Войти через Google</span>
              </Button>
              <Button variant="outlineDark" class="w-full" :disabled="isLoading" @click="handleSocialLogin('Meta')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                    fill="currentColor" />
                </svg>
                <span class="sr-only">Войти через Meta</span>
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

        <div class="relative hidden bg-muted md:block">
          <NuxtImg src="/img/placeholder.svg" alt="Image"
            class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
        </div>
      </CardContent>
    </Card>
    <div
      class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
      Нажимая "Продолжить", вы соглашаетесь с нашими <a href="#">Условиями использования</a>
      и <a href="#">Политикой конфиденциальности</a>.
    </div>
  </div>
</template>