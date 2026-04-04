import { CARE_PLANS_MODULE } from '../shared/modules/care-plans.js'

const config = {
  slug: 'pgf',
  name: 'Problem Gambling Foundation',
  shortName: 'PGF',
  systemName: 'Tō Pikitanga',

  brand: {
    primary: '#0f1f4b',     // PGF navy
    accent: '#f47320',      // PGF orange
    emoji: '🏮',
  },

  terminology: {
    'Program': 'Contract',
    'Case': 'Session',
    'Benefits': 'Specification',
    'Campaign': 'Events',
    'Care Plan': 'Care Plan',
  },

  aiContext: `
PGF delivers gambling harm reduction services across New Zealand, including counselling,
family support, financial mentoring, and helpline services.

The system (Tō Pikitanga) is built on Salesforce Nonprofit Cloud. PGF staff include
practitioners (case workers), team leaders, and administrators across multiple regional offices.

Key PGF processes:
- Clients come in via referral (phone, email, website, or self-referral)
- Intake creates the session record and triggers an intake action plan
- Care plans are typically created within the first 1-2 sessions
- Most care plans use one of several standard templates (e.g. Gambling Awareness Skills,
  Financial Recovery, Family Support)
- Interaction summaries are recorded after every client contact
- Care plans are typically closed after 3-6 months of active engagement

Common practitioner questions centre on: template setup sequence, participant dropdown issues,
adding tasks mid-program, and interaction summary privacy settings.
  `.trim(),

  tutorStarters: [
    "What's the difference between a top goal and an intermediate goal?",
    "Why must I publish an action plan template before linking it?",
    "What happens if I publish a care plan template before adding goals?",
    "A participant isn't showing in the dropdown — what do I do?",
  ],

  // Modules for this client — uses shared content directly
  modules: [CARE_PLANS_MODULE],
}

export default config
