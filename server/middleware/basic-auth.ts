export default defineEventHandler(async (event) => {
  // Проверяем, что мы в Production
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  // Получаем заголовок Authorization
  const authorization = getHeader(event, 'authorization')

  if (!authorization || !authorization.startsWith('Basic ')) {
    // Если нет заголовка авторизации, возвращаем 401
    setResponseStatus(event, 401)
    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Secure Area"')
    return {
      error: 'Пожалуйста, введите учетные данные'
    }
  }

  try {
    // Извлекаем base64 часть
    const base64Credentials = authorization.split(' ')[1]
    
    // Декодируем base64
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
    const [username, password] = credentials.split(':')

    // Получаем логин и пароль из переменных окружения
    const validUsername = process.env.BASIC_AUTH_USERNAME || 'login'
    const validPassword = process.env.BASIC_AUTH_PASSWORD || 'password'

    // Проверяем учетные данные
    if (username === validUsername && password === validPassword) {
      // Авторизация успешна, пропускаем запрос дальше
      return
    }

    // Неверные учетные данные
    setResponseStatus(event, 401)
    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Secure Area"')
    return {
      error: 'Неверные учетные данные'
    }
  } catch {
    // Ошибка при декодировании
    setResponseStatus(event, 401)
    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Secure Area"')
    return {
      error: 'Ошибка авторизации'
    }
  }
})
