import {
  mdiAccountCircle,
  mdiAccountSupervisorCircle,
  mdiAccountCog,
  mdiDesktopMac,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiMonitorShimmer,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiCalendar,
  mdiCalendarSearch,
  mdiCalendarClock,
  mdiWrenchClock
} from '@mdi/js'

export default [
  [
    {
      to: '/dashboard',
      icon: mdiDesktopMac,
      label: 'Startsidan'
    }
  ],
  'Bokningar',
  [
    {
      to: '/bookings',
      label: 'Se bokningar',
      icon: mdiCalendar
    },
    {
      to: '/timeslots',
      label: 'Boka tid',
      icon: mdiCalendarSearch
    },
    // mdiTelevisionGuide - Config
    // mdiResponsive - Assistants
    // mdiPalette
    // mdiAccountCircle
    // mdiAlertCircle
    // mdiLock
    // mdiSquareEditOutline
  ],
  // 'Admin',
  // [
  //   {
  //     to: '/users',
  //     label: 'Användare',
  //     icon: mdiAccountCircle
  //   },
  //   {
  //     to: '/assistants',
  //     label: 'Assistenter',
  //     icon: mdiAccountSupervisorCircle
  //   },
  //   {
  //     to: '/config',
  //     label: 'Konfigurering',
  //     icon: mdiSquareEditOutline
  //   },
  //   {
  //     to: '/period',
  //     label: 'Period',
  //     icon: mdiWrenchClock
  //   },
  //   {
  //     to: '/schedule',
  //     label: 'Schema',
  //     icon: mdiCalendarClock
  //   },
  // ],
]

export const adminMenu = [
  'Admin',
  [
    {
      to: '/users',
      label: 'Användare',
      icon: mdiAccountCircle
    },
    {
      to: '/assistants',
      label: 'Assistenter',
      icon: mdiAccountSupervisorCircle
    },
    {
      to: '/config',
      label: 'Konfigurering',
      icon: mdiSquareEditOutline
    },
    {
      to: '/period',
      label: 'Period',
      icon: mdiWrenchClock
    },
    {
      to: '/schedule',
      label: 'Schema',
      icon: mdiCalendarClock
    },
  ],
]
