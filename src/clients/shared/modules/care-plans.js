/**
 * Shared Care Plan Management module content.
 * Both PGF and Mapu Maia use this as a base.
 * Client configs can override any unit by including a matching id
 * in their own modules array — the client-level override wins.
 *
 * Terminology placeholders (e.g. {{case}}, {{benefit}}) are resolved
 * at render time from the client config's terminology map.
 * For simplicity we write content in plain English and each client
 * config applies terminology overrides in their own module file
 * by re-exporting modified versions of these units.
 */

export const CARE_PLANS_MODULE = {
  id: 'care-plans',
  title: 'Care Plan Management',
  description: 'Set up templates, create care plans, and manage client progress from intake to closure.',
  units: [
    {
      id: 'get-started',
      title: 'Get Started with Care Plans',
      duration: '5 mins',
      emoji: '🗺️',
      tagline: 'Understand the big picture before you dive in',
      scribeUrl: null,   // e.g. 'https://scribehow.com/embed/Care_Plan_Overview__xxxx'
      scribeTitle: 'Navigating to a care plan in Tō Pikitanga',
      summary: `Care plans are the central record for all active client work in the system. They bring together goals, services, tasks, and session notes — all connected to a single client record.\n\nBefore a care plan exists, a client will have already come through referral and intake. A session record is created automatically at the end of intake, and it's from that session that you create the care plan.\n\nCare plans are built on templates, which set out the most common goals and services for a given program type — saving time and keeping things consistent across your team.`,
      concepts: [
        { term: 'Care Plan', definition: 'The central working record — links a client\'s goals, services, tasks, and notes in one place' },
        { term: 'Care Plan Template', definition: 'A reusable blueprint with pre-set goals, services, and tasks for a program type' },
        { term: 'Top Goal', definition: 'The ultimate outcome the client is working toward (e.g. increasing gambling awareness)' },
        { term: 'Intermediate Goal', definition: 'A smaller milestone on the path to the top goal — automatically included when its parent is added' },
        { term: 'Session', definition: 'The record created after intake that tracks the client\'s full relationship with your organisation' },
      ],
      watchouts: [
        { title: 'Always start from the session record', detail: 'Create care plans from the session record (Services tab → Care Plans → Add), not from the Care Plans list in the App Launcher. This ensures everything is correctly linked.' },
        { title: 'Know the terminology mapping', detail: 'Standard Salesforce labels differ from your organisation\'s labels. Check your organisation\'s terminology guide if you\'re unsure which terms map to what.' },
      ],
      quiz: [
        {
          question: 'Where do you create a care plan for a client?',
          options: [
            'From the referral record',
            'From the Care Plans list in the App Launcher',
            'From the Services tab on the client\'s session record',
            'From the person account record',
          ],
          correct: 2,
          explanation: 'Care plans are always created from within the session record — on the Services tab, in the Care Plans related list. This ensures the care plan is correctly linked to the client\'s history from the start.',
        },
        {
          question: 'What are the three elements that make up a care plan template?',
          options: [
            'Referrals, assessments, and programs',
            'Goals, services (benefits), and action plan templates',
            'Tasks, notes, and disbursements',
            'Top goals, intermediate goals, and sessions',
          ],
          correct: 1,
          explanation: 'Care plan templates consist of Goals (top and intermediate), Benefits/Services (what the client receives), and Action Plan Templates (sets of repeatable tasks). All three combine to form the template.',
        },
        {
          question: 'What is a care plan template?',
          options: [
            'A locked record that cannot be changed once applied',
            'A reusable blueprint with pre-set goals, services, and tasks for a program type',
            'A form the client fills out at intake',
            'A report showing all active care plans',
          ],
          correct: 1,
          explanation: 'Care plan templates are reusable blueprints. They set up the common goals, services, and tasks for a type of program so case workers don\'t start from scratch with every client. Each template can be customised for the individual once applied.',
        },
      ],
    },

    {
      id: 'goals-and-action-plans',
      title: 'Create Goal Definitions & Action Plan Templates',
      duration: '20 mins',
      emoji: '🎯',
      tagline: 'Build the building blocks before you build the template',
      scribeUrl: null,   // e.g. 'https://scribehow.com/embed/Create_Goal_Definitions__xxxx'
      scribeTitle: 'Creating goal definitions and publishing an action plan template',
      summary: `Before creating a care plan template, you need its building blocks: goal definitions and action plan templates.\n\nGoal definitions describe what a client is working toward. There are two types — top goals (the big-picture outcome) and intermediate goals (smaller steps along the way). Intermediate goals always sit under a parent top goal.\n\nAction plan templates are reusable sets of tasks. Each task has a subject, a priority, a days-to-complete window, and an assignment rule. Once your tasks are in place, you must publish the action plan template before it can be linked to a care plan template.`,
      concepts: [
        { term: 'Goal Definition', definition: 'A reusable goal record (top or intermediate) that can be included in multiple care plan templates' },
        { term: 'Action Plan Template', definition: 'A set of repeatable tasks automatically created when a care plan is built from a template' },
        { term: 'Days to Complete', definition: 'How many days after the care plan is created the assigned person has to finish the task' },
        { term: 'Publish Template', definition: 'Required step — action plan templates must be published before linking to a care plan template' },
        { term: 'Action Plan Creator', definition: 'Task assignment setting that assigns the task to whoever creates the care plan' },
      ],
      watchouts: [
        { title: 'Publish before you try to link', detail: 'Action plan templates in Draft status won\'t appear when you search during care plan template setup. Publish Template → Publish before moving on.' },
        { title: 'Intermediate goals follow automatically', detail: 'When you add a top goal to a care plan template, its intermediate goals come with it. You don\'t add them separately — they\'ll appear when the template is applied to a client.' },
        { title: 'Think carefully about "Let users add items"', detail: 'This checkbox lets case workers add extra tasks when creating a care plan. Leave it off unless you genuinely want that flexibility — consistency is usually more valuable.' },
      ],
      quiz: [
        {
          question: 'What must happen before an action plan template can be linked to a care plan template?',
          options: [
            'Assign it to a specific case worker',
            'Get manager approval',
            'Publish it',
            'Add at least three tasks',
          ],
          correct: 2,
          explanation: 'An action plan template must be published (Publish Template → Publish) before it can be associated with a care plan template. Draft templates simply won\'t appear in the search results during setup.',
        },
        {
          question: '"Days to Complete" is set to 10. The care plan is created on 1 April. When is the task due?',
          options: ['1 April', '10 April', '11 April', '15 April'],
          correct: 2,
          explanation: 'Days to Complete counts from the day the care plan is created. 1 April + 10 days = due 11 April. The due date is calculated automatically when the care plan is saved.',
        },
        {
          question: 'When you add a top goal to a care plan template, what happens to its intermediate goals?',
          options: [
            'They must be added separately to the template',
            'They are automatically included behind the scenes',
            'They are excluded by default',
            'They appear as separate top goals',
          ],
          correct: 1,
          explanation: 'Intermediate goals automatically follow their parent top goal into the template. You won\'t see them in the selection screen — they\'re pulled in behind the scenes and appear when the template is applied to a real client.',
        },
      ],
    },

    {
      id: 'configure-template',
      title: 'Configure Care Plan Templates',
      duration: '15 mins',
      emoji: '📋',
      tagline: 'The correct sequence saves you from starting over',
      scribeUrl: null,   // e.g. 'https://scribehow.com/embed/Configure_Care_Plan_Template__xxxx'
      scribeTitle: 'Setting up a care plan template from Draft to Published',
      summary: `With goal definitions and action plan templates ready, you can now build the care plan template itself — the reusable blueprint case workers apply when creating a care plan for a new client.\n\nThe sequence matters: create the template in Draft status first, add your goals and services, then publish it. Only after publishing can you add action plan templates. Goals and services can only be edited before publishing — once the template is live, those elements are locked.\n\nCreate a separate care plan template for each distinct service type or program scenario.`,
      concepts: [
        { term: 'Draft Status', definition: 'The required starting status — goals and services can only be added while the template is in Draft' },
        { term: 'Published Status', definition: 'Makes the template usable by case workers. Goals and services lock at this point; action plan templates can now be added' },
        { term: 'Preview Tab', definition: 'Shows exactly what a case worker will see when applying the template — use this before publishing' },
        { term: 'Setup Sequence', definition: 'Draft → add goals → add services → Publish → add action plan templates. Always in this order' },
      ],
      watchouts: [
        { title: 'Publishing is irreversible for goals and services', detail: 'Once you publish, goals and services are locked. If you publish too early, create a new template from scratch. Set the habit: Draft → goals → services → preview → Publish → action plan templates.' },
        { title: 'Always use the Preview tab before publishing', detail: 'The Preview tab shows the full template as a case worker sees it — goals, services, and hierarchy. Catch mistakes before they\'re locked in.' },
        { title: 'One template per program type', detail: 'Resist the urge to create one mega-template. A focused template per program type is easier to maintain and reduces the number of items case workers need to deselect per client.' },
      ],
      quiz: [
        {
          question: 'Why must you keep a care plan template in Draft while adding goals and services?',
          options: [
            'Draft templates are only visible to administrators',
            'Goals and services can only be edited before publishing — they lock once published',
            'Draft templates auto-expire after 30 days',
            'The system can\'t calculate due dates in Draft',
          ],
          correct: 1,
          explanation: 'Goals and services lock the moment you publish. If you publish before adding them, you\'ll need to create a new template. Always follow the sequence: Draft → goals and services → Publish → action plan templates.',
        },
        {
          question: 'What is the correct sequence for setting up a care plan template?',
          options: [
            'Add action plan templates → publish → add goals and services',
            'Publish → add goals → add action plan templates → add services',
            'Create in Draft → add goals and services → publish → add action plan templates',
            'Create in Draft → add action plan templates → add goals → publish',
          ],
          correct: 2,
          explanation: 'Create in Draft, add all goal definitions and services while still in Draft, publish it, then add action plan templates. Deviating from this order creates problems that can only be fixed by starting the template again.',
        },
        {
          question: 'Before publishing a care plan template, what should you do to verify it looks right?',
          options: [
            'Run a validation report from Setup',
            'Check the Preview tab on the template record',
            'Ask a supervisor to review it',
            'Apply it to a test client record',
          ],
          correct: 1,
          explanation: 'The Preview tab shows exactly what a case worker sees when applying the template — goals, services, and their hierarchy. It\'s your quality check before clicking Publish.',
        },
      ],
    },

    {
      id: 'create-care-plan',
      title: 'Create a Care Plan',
      duration: '15 mins',
      emoji: '✨',
      tagline: 'Apply the template and tailor it for the individual',
      scribeUrl: 'https://scribehow.com/embed/How_to_Preview_Treatment_Plan_Templates_in_Salesforce__Hj4TZgPxTTy55dFqqQLpnA',
      scribeTitle: 'Creating a care plan from a template for a client',
      summary: `Creating a care plan is a three-step flow launched from the client's session record. Step one: name the plan, set it to Draft, choose the template, and select the participant. Step two: review the pre-populated goals and services — deselect anything that doesn't apply or add extras for this client's specific needs. Step three: final review, set enrollees and dates for each element, then save.\n\nOnce saved, the care plan record opens with goal assignments, service assignments, and action plan tasks already in place and ready to work with.\n\nKeep the care plan in Draft until you've discussed and agreed it with the client, then move it to Active.`,
      concepts: [
        { term: 'Case Participant', definition: 'A person linked to a session record — must exist before they can be selected as a care plan participant' },
        { term: 'Enrollee', definition: 'The person assigned to receive a specific goal or service within the care plan' },
        { term: 'Draft Care Plan', definition: 'The recommended starting status — use until the plan is discussed and agreed with the client' },
        { term: 'Create Care Plan Flow', definition: 'The three-step wizard launched from: session record → Services tab → Care Plans → Add' },
      ],
      watchouts: [
        { title: 'Check the participant list before starting', detail: 'If the person you need isn\'t in the participant dropdown, cancel the flow, add them as a case participant on the session record, then restart. Takes 30 seconds to check upfront.' },
        { title: 'Step 3 is where you set dates — don\'t skip it', detail: 'The final review screen lets you set start and end dates for each goal and service. It\'s easy to rush through and just hit Save, but dates make reporting much more useful.' },
        { title: 'Draft until agreed with the client', detail: 'Keep care plans in Draft while you\'re setting up and reviewing. Moving to Active before the client has agreed to the plan can cause confusion if changes are needed.' },
      ],
      quiz: [
        {
          question: 'A participant isn\'t appearing in the dropdown during care plan creation. Most likely cause?',
          options: [
            'They don\'t have an active goal definition',
            'They haven\'t been added as a case participant on the session record',
            'The care plan template hasn\'t been published',
            'Their person account is inactive',
          ],
          correct: 1,
          explanation: 'The participant dropdown is populated from the Case Participant related list on the session record. Cancel the flow, add the person as a case participant on the session record, then restart the care plan creation flow.',
        },
        {
          question: 'What status should you set a newly created care plan to, and why?',
          options: [
            'Active — so tasks are immediately assigned to the case worker',
            'Completed — the template is already fully configured',
            'Draft — to allow review and agreement with the client before activating',
            'Proposed — to send it for supervisor approval',
          ],
          correct: 2,
          explanation: 'Keep care plans in Draft status until you\'ve discussed and agreed the plan with the client. This signals to the team that the plan hasn\'t been confirmed yet. Move to Active once you\'re ready to begin working through it together.',
        },
        {
          question: 'On which step of the care plan creation flow can you set start and end dates?',
          options: [
            'Step 1 — template and participant selection',
            'Step 2 — goals and services selection',
            'Step 3 — the final review screen',
            'After saving, from the care plan record directly',
          ],
          correct: 2,
          explanation: 'Step 3 (the final review screen) is where you click into each goal, service, and task to set dates. Easy to rush past — but entering dates here makes progress tracking and reporting significantly more useful.',
        },
      ],
    },

    {
      id: 'manage-and-close',
      title: 'Manage and Close a Care Plan',
      duration: '20 mins',
      emoji: '✅',
      tagline: 'Day-to-day management and graceful closure',
      scribeUrl: null,   // e.g. 'https://scribehow.com/embed/Manage_and_Close__xxxx'
      scribeTitle: 'Updating tasks, recording interaction summaries, and closing a care plan',
      summary: `Once active, the care plan becomes the hub for all ongoing client work. Tasks appear in the Activity panel and can be marked complete from there, or updated in bulk using the Quick Update button — which shows all tasks and goal assignments in one place.\n\nInteraction Summaries are the structured note-taking tool — each one links automatically to the care plan, session, and person account record, giving a complete view across the system. They have built-in privacy controls so sensitive notes stay visible only to the right people.\n\nWhen the work is done — goals achieved, tasks complete, services delivered — close the care plan by changing its status to Completed on the Details tab. This formally ends active engagement without deleting any history.`,
      concepts: [
        { term: 'Quick Update', definition: 'A button on the care plan record that shows all tasks and goal assignments for bulk status updates in one place' },
        { term: 'Interaction Summary', definition: 'A structured session note linked to the care plan, session, and person account — with built-in privacy controls' },
        { term: 'Edit Care Plan', definition: 'Reopens the care plan flow — the correct way to add new tasks, goals, or services after the initial setup' },
        { term: 'Completed Status', definition: 'The final care plan status — set on the Details tab when the client has finished their program' },
      ],
      watchouts: [
        { title: 'Use Edit Care Plan to add tasks, not direct record creation', detail: 'If new actions come up mid-program, always use the Edit Care Plan button. Creating task records directly from the related list can break the connections to the care plan.' },
        { title: 'Check task statuses before closing', detail: 'Before setting a care plan to Completed, use Quick Update to review all tasks and goal assignments. Update each to reflect the actual outcome — completed, cancelled, or not applicable.' },
        { title: 'Interaction Summary privacy settings matter', detail: 'When you create an interaction summary, check who can see it. For sensitive clinical notes, make sure the visibility settings match your organisation\'s privacy requirements.' },
      ],
      quiz: [
        {
          question: 'A case worker needs to update the status of several tasks at once. What\'s the quickest approach?',
          options: [
            'Open each task record individually and update them one by one',
            'Use the Quick Update button on the care plan record',
            'Edit the care plan template to change the task statuses',
            'Contact an administrator for a bulk update',
          ],
          correct: 1,
          explanation: 'Quick Update opens a single view of all tasks and goal assignments, allowing status updates in one place. Much faster than navigating to individual task records, and it also lets you update goal assignment statuses at the same time.',
        },
        {
          question: 'A new action comes up mid-program that wasn\'t in the original care plan. How do you add it correctly?',
          options: [
            'Create a task record directly from the related list',
            'Use the Edit Care Plan button to re-open the flow and add from there',
            'Create a brand new care plan',
            'Add it to the care plan template and re-apply',
          ],
          correct: 1,
          explanation: 'Always use Edit Care Plan to add new tasks, goals, or services. This re-opens the same flow used during setup and keeps everything correctly linked. Creating records directly from related lists can break the connections.',
        },
        {
          question: 'How do you formally close a care plan when a client has completed their program?',
          options: [
            'Delete the care plan record',
            'Archive the session record and all related records',
            'Change the Status to Completed on the Details tab and save',
            'Click a Close button in the care plan header',
          ],
          correct: 2,
          explanation: 'Go to the Details tab on the care plan record, edit the Status field to Completed, and save. This formally marks the end of active engagement while preserving the full history of goals, notes, tasks, and services.',
        },
      ],
    },
  ],
}
