// Данные для главной страницы

// Данные для слайдера "Кому подходит" (Slider.vue)
export interface TargetAudienceItem {
  title: string
  href: string
  description: string
  image: string
}

export const targetAudienceItems: TargetAudienceItem[] = [
  {
    title: "Бизнес и корпорации",
    href: "#",
    description: "Надёжная видеосвязь, корпоративный чат и AI-ассистент в единой защищённой платформе.",
    image: "/img/CardTwo-1.png"
  },
  {
    title: "Образовательные учреждения",
    href: "#",
    description: "Интерактивные вебинары, онлайн-лекции и сопровождение студентов — современная цифровая среда для обучения.",
    image: "/img/CardTwo-2.png"
  },
  {
    title: "Госучреждения",
    href: "#",
    description: "Безопасная коммуникация и совместная работа — на российских серверах и в соответствии с требованиями по защите данных.",
    image: "/img/CardTwo-3.png"
  },
]

// Данные для дополнительных возможностей (AdditionalFeatures.vue)
export interface AdditionalFeatureItem {
  title: string
  href: string
  description: string
  image: string
}

export const additionalFeatureItems: AdditionalFeatureItem[] = [
  {
    title: "Искусственный интеллект внутри",
    href: "#",
    description: "Автоматические протоколы встреч, напоминания и поддержка задач – прямо во время работы.",
    image: "/img/CardFive-1.png"
  },
  {
    title: "Стабильная работа даже при слабом интернете",
    href: "#",
    description: "Оптимизированные технологии передачи данных обеспечивают устойчивую видеосвязь даже в удаленных регионах.",
    image: "/img/CardFive-2.png"
  },
  {
    title: "Совместимость с профессиональным видеооборудованием",
    href: "#",
    description: "Поддержка современных стандартов связи и интеграция с камерами и переговорными – для бизнеса любого масштаба.",
    image: "/img/CardFive-3.png"
  },
]

// Данные для блока "Почему выбирают IVA360" (WhyChooseIva360.vue)
export interface WhyChooseItem {
  title: string
  href: string
  description: string
  image: string
  isReverse: boolean
}

export const whyChooseItems: WhyChooseItem[] = [
  {
    title: "Одна платформа вместо&nbsp;6+ отдельных сервисов",
    href: "#",
    description: "Все инструменты для коммуникации и организации рабочего процесса собраны в одном пространстве – без переключений и потерь данных.",
    image: "/img/CardImageVideo.png",
    isReverse: true
  },
  {
    title: "Российская разработка, соответствующая требованиям безопасности",
    href: "#",
    description: "Собственная инфраструктура, сертифицированные серверы и контроль доступа в соответствии с корпоративными и государственными стандартами.",
    image: "/img/CardImageChat.png",
    isReverse: false
  },
  {
    title: "Простой интерфейс, не&nbsp;требующий обучения",
    href: "#",
    description: "Интуитивно понятная среда – сотрудники начинают пользоваться сервисами сразу, без долгого онбординга и обучения.",
    image: "/img/CardImageVideo.png",
    isReverse: true
  },
]

// Данные для блока "Продукты в одном приложении" (ProductsInOneApp.vue)
export interface ProductInAppItem {
  title: string
  href: string
  description: string
  titleColor: string
  bgColor: string
  iconBgColor: string
  icon: string
  image: string
}

export const productsInAppItems: ProductInAppItem[] = [
  {
    title: "Видеовстречи",
    href: "#",
    description: "Проводите встречи до 300 участников с сохранением записи в облако. Пользуйтесь встроенным чатом и онлайн-доской. Демонстрируйте экран или отдельные файлы",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Meetings",
    image: "/img/CardImageVideo.png"
  },
  {
    title: "Вебинары",
    href: "#",
    description: "Проводите масштабные мероприятия и включайте интерактивные опросы. Отслеживайте реакции участников и посещаемость. Сохраняйте записи, стенограммы и файлы",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Webinar",
    image: "/img/CardImageChat.png"
  },
  {
    title: "Мессенджер",
    href: "#",
    description: "Управляйте защищёнными чатами в мессенджере для компаний и рабочих групп. Включайте поддержку синхронизации с Active Directory и Exchange",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Messenger",
    image: "/img/CardImageChat.png"
  },
  {
    title: "AI-ассистент",
    href: "#",
    description: "Субтитры в реальном времени, онлайн-перевод на 22 языка. Автоматическое резюме встречи, формирование поручений, фиксация принятых решений",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Ai",
    image: "/img/CardImageVideo.png"
  },
  {
    title: "Почта и календарь",
    href: "#",
    description: "Безопасная почта на вашем домене. Делегируйте папки и работайте со встроенным календарем. Планирование встреч, автоматический поиск свободного времени и интеграция с сервисами IVA 360",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Mail",
    image: "/img/CardImageChat.png"
  },
  {
    title: "Диск и совместная работа с файлами",
    href: "#",
    description: "Сервис для совместной работы с файлами: загружайте документы, создавайте папки, настраивайте доступ и делитесь документами",
    bgColor: "bg-muted",
    iconBgColor: "bg-background",
    titleColor: "text-foreground",
    icon: "Disc",
    image: "/img/CardImageVideo.png"
  },
]
