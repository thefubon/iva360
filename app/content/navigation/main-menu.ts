// Данные для главного меню продуктов (Navbar.vue)
export interface MainMenuItem {
  title: string
  href: string
  description: string
  icon: string
  bannerImage: string
  bannerTitle: string
  bannerDescription: string
}

export const mainMenuItems: MainMenuItem[] = [
  {
    title: "Встречи",
    href: "#",
    description: "Стабильная и защищенная коммуникация для вашей команды",
    icon: "Meetings",
    bannerImage: "/img/CardImageVideo.png",
    bannerTitle: "Видеовстречи нового поколения",
    bannerDescription: "Проводите профессиональные видеоконференции с HD-качеством, записью и интеллектуальными функциями"
  },
  {
    title: "Вебинары",
    href: "#",
    description: "Обучение и презентации, доступные каждому",
    icon: "Webinar",
    bannerImage: "/img/CardTwo-1.png",
    bannerTitle: "Масштабные вебинары",
    bannerDescription: "Организуйте обучающие мероприятия для больших аудиторий с интерактивными возможностями"
  },
  {
    title: "Онлайн-трансляции",
    href: "#",
    description: "Онлайн-события под ключ для вашего бизнеса",
    icon: "Online",
    bannerImage: "/img/CardFive-1.png",
    bannerTitle: "Профессиональные трансляции",
    bannerDescription: "Стримьте события в реальном времени с высоким качеством и надежностью"
  },
  {
    title: "Мессенджер",
    href: "#",
    description: "Защищенное общение внутри команды и с клиентами",
    icon: "Messenger",
    bannerImage: "/img/CardImageChat.png",
    bannerTitle: "Корпоративный мессенджер",
    bannerDescription: "Безопасное общение с шифрованием, групповыми чатами и интеграцией с рабочими процессами"
  },
  {
    title: "Календарь",
    href: "#",
    description: "Планируйте встречи и события без хаоса",
    icon: "Calendar",
    bannerImage: "/img/CardTwo-2.png",
    bannerTitle: "Умное планирование",
    bannerDescription: "Синхронизируйте расписания команды, создавайте встречи и получайте напоминания"
  },
  {
    title: "Почта",
    href: "#",
    description: "Корпоративная электронная почта в защищенной экосистеме",
    icon: "Mail",
    bannerImage: "/img/CardFive-2.png",
    bannerTitle: "Корпоративная почта",
    bannerDescription: "Профессиональная электронная почта с защитой от спама и интеграцией с другими сервисами"
  },
  {
    title: "Диск",
    href: "#",
    description: "Удобное хранение и совместная работы с файлами.",
    icon: "Disc",
    bannerImage: "/img/CardTwo-3.png",
    bannerTitle: "Облачное хранилище",
    bannerDescription: "Безопасное хранение файлов с возможностью совместной работы и синхронизации"
  },
  {
    title: "ИИ-ассистент",
    href: "#",
    description: "Ваш ИИ-помощник для рабочих встреч и задач",
    icon: "Ai",
    bannerImage: "/img/CardFive-3.png",
    bannerTitle: "Искусственный интеллект",
    bannerDescription: "Автоматизируйте рутинные задачи, получайте аналитику встреч и умные рекомендации"
  }
]
