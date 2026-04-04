import { CARE_PLANS_MODULE } from '../shared/modules/care-plans.js'

/**
 * Mapu Maia uses the same Salesforce Nonprofit Cloud platform
 * but with their own branding, org context, and some terminology differences.
 *
 * To customise a specific unit for Mapu Maia, import the shared unit,
 * spread it, and override only what differs. The rest stays in sync
 * with the shared module automatically.
 */

// Example of a client-level unit override — Mapu Maia has additional
// context on their intake process that PGF doesn't, so unit 1 gets a note.
const mapuMaiaGetStarted = {
  ...CARE_PLANS_MODULE.units[0],
  // Mapu Maia-specific addition to the summary
  summary: CARE_PLANS_MODULE.units[0].summary + '\n\nAt Mapu Maia, care plans are typically initiated within the first whānau hui. Make sure the whānau lead is added as a case participant before starting the care plan flow.',
  // Extra Mapu Maia-specific watch-out
  watchouts: [
    ...CARE_PLANS_MODULE.units[0].watchouts,
    {
      title: 'Add the whānau lead as a case participant first',
      detail: 'Mapu Maia care plans often involve multiple whānau members. Add all key participants to the session record before starting the care plan creation flow — it\'s much easier than adding them later.',
    },
  ],
}

const mapuMaiaCarePlansModule = {
  ...CARE_PLANS_MODULE,
  units: [
    mapuMaiaGetStarted,
    ...CARE_PLANS_MODULE.units.slice(1), // rest are shared as-is
  ],
}

const config = {
  slug: 'mapumaia',
  name: 'Mapu Maia',
  shortName: 'Mapu Maia',
  systemName: 'Tō Pikitanga',

  brand: {
    primary: '#1a4731',     // Mapu Maia deep green
    accent: '#2d9e6b',      // Mapu Maia mid green
    emoji: '🌿',
  },

  terminology: {
    'Program': 'Program',       // Mapu Maia keeps Salesforce default
    'Case': 'Session',
    'Benefits': 'Service',      // Mapu Maia calls them Services, not Specifications
    'Campaign': 'Events',
    'Care Plan': 'Care Plan',
  },

  aiContext: `
Mapu Maia provides kaupapa Māori mental health and addiction support services.
Services are delivered through a whānau-centred model, often involving multiple
family members in the care planning process.

The system (Tō Pikitanga) is built on Salesforce Nonprofit Cloud.
Mapu Maia staff include kaiāwhina (support workers), clinicians, and administrators.

Key Mapu Maia differences from other PGF services:
- "Benefits" in Salesforce are referred to as "Services" at Mapu Maia (not Specifications)
- Care plans frequently have multiple enrollees from the same whānau
- Interaction summaries often cover whānau hui (group sessions), not just 1:1 contacts
- Te reo Māori terms may appear in goal names and notes — this is expected and correct
- Care plans typically run for 6-12 months given the depth of whānau engagement

Common staff questions: adding multiple whānau members to a care plan, recording
whānau hui as interaction summaries, and understanding the difference between
individual and whānau-level goals.
  `.trim(),

  tutorStarters: [
    "How do I add multiple whānau members to a single care plan?",
    "What's the difference between a top goal and an intermediate goal?",
    "Can I record a whānau hui as an interaction summary?",
    "Why must I publish an action plan template before linking it?",
  ],

  modules: [mapuMaiaCarePlansModule],
}

export default config
