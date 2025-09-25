// Данные для навигационного меню dashboard (SidebarNav.vue)
export interface DashboardMenuItem {
  title: string
  url: string
  icon: string // Название иконки (будет маппиться на компонент)
  target: boolean
  alert: boolean
  hasSubmenu?: boolean
  submenu?: Array<{
    title: string
    url: string
    target?: boolean
  }>
}

// Основные продукты IVA360
export const dashboardProductItems: DashboardMenuItem[] = [
  {
    title: "Встречи",
    url: "/dashboard/meet",
    icon: "Meetings",
    target: false,
    alert: false,
  },
  {
    title: "Мессенджер",
    url: "https://meet.iva360.ru",
    icon: "Messenger",
    target: true,
    alert: false,
  },
  {
    title: "Почта и Календарь",
    url: "#",
    icon: "Calendar",
    target: false,
    alert: false,
  },
  {
    title: "Диск и Документы",
    url: "#",
    icon: "Disc",
    target: false,
    alert: false,
    hasSubmenu: true,
    submenu: [
      { title: "Все файлы", url: "/dashboard/disc" },
      { title: "Мои файлы", url: "#/disk/my" },
      { title: "Есть доступ", url: "#/disk/shared" },
      { title: "Избранное", url: "#/disk/favorites" },
      { title: "Корзина", url: "#/disk/trash" },
    ]
  },
]

// Административные функции
export const dashboardAdminItems: DashboardMenuItem[] = [
  {
    title: "Дашборд",
    url: "/dashboard",
    icon: "LayoutPanelLeft",
    target: false,
    alert: false,
  },
  {
    title: "Пользователи",
    url: "/dashboard/users",
    icon: "Users",
    target: false,
    alert: true,
  },
  {
    title: "Моя компания",
    url: "#",
    icon: "BriefcaseBusiness",
    target: false,
    alert: false,
  },
  {
    title: "Мои продукты",
    url: "#",
    icon: "Blocks",
    target: false,
    alert: false,
  },
  {
    title: "Управление API",
    url: "#",
    icon: "FileCode2",
    target: false,
    alert: false,
  },
  {
    title: "Статистика",
    url: "#",
    icon: "ChartBarStacked",
    target: false,
    alert: false,
  },
  {
    title: "Тарифы",
    url: "#",
    icon: "CreditCard",
    target: false,
    alert: false,
  },
]

// Справка и поддержка
export const dashboardSupportItems: DashboardMenuItem[] = [
  {
    title: "Подсказки",
    url: "#",
    icon: "MessageCircleQuestionMark",
    target: false,
    alert: false,
  },
  {
    title: "База знаний",
    url: "https://help.iva360.ru",
    icon: "BookMarked",
    target: true,
    alert: false,
  },
  {
    title: "Дорожная карта",
    url: "#",
    icon: "ListTodo",
    target: false,
    alert: false,
  },
  {
    title: "Документы платформы",
    url: "#",
    icon: "SquareLibrary",
    target: false,
    alert: false,
  },
]
