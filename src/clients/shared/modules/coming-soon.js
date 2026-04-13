/**
 * Placeholder module definitions for curriculum areas not yet built.
 * These appear on the home page as "Coming Soon" cards so users can
 * see the full training scope. Import into any client config and append
 * to the modules array — they render as disabled cards with no navigation.
 */

export const COMING_SOON_MODULES = [
  {
    id: 'stakeholder-management',
    title: 'Stakeholder Management',
    emoji: '👥',
    totalDuration: '~80 mins',
    totalUnits: 4,
    description: 'Set up and manage person accounts, business accounts, households, and client relationships.',
    comingSoon: true,
  },
  {
    id: 'programs-cases-referrals',
    title: 'Programs, Cases & Referrals',
    emoji: '📋',
    totalDuration: '~2.5 hrs',
    totalUnits: 5,
    description: 'Configure programs and benefits, manage the referral and intake process, run case records, and conduct assessments.',
    comingSoon: true,
  },
  {
    id: 'attendance-tracking',
    title: 'Attendance & Benefit Tracking',
    emoji: '📅',
    totalDuration: '~70 mins',
    totalUnits: 4,
    description: 'Record enrolments and deliveries, manage schedules, track participant attendance, and process ad hoc disbursements.',
    comingSoon: true,
  },
]
