import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'The city is better together.',
    subtitle:
      'Join a community of people who believe good neighbours make great neighbourhoods.',
    meta: {
      overline: '[un]occupied',
      ctaLabel: 'Count Me In',
      estimatedTime: '~3 min',
      audience: 'prospect',
      successTitle: "You're on the list.",
      successSubtitle:
        "We'll reach out when something's happening in your neighbourhood.",
    },
  },
  {
    id: 'contact-details',
    type: 'field-group',
    title: 'Tell us a bit about yourself.',
    fields: [
      {
        name: 'firstName',
        type: 'text',
        label: 'First name',
        placeholder: 'First name',
        required: true,
        validation: [{ type: 'required', message: 'First name is required' }],
      },
      {
        name: 'lastName',
        type: 'text',
        label: 'Last name',
        placeholder: 'Last name',
        required: true,
        validation: [{ type: 'required', message: 'Last name is required' }],
      },
      {
        name: 'phone',
        type: 'tel',
        label: 'Phone',
        placeholder: 'Your phone number',
        required: true,
        validation: [
          { type: 'phone', message: 'Enter a valid phone number' },
        ],
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'you@example.com',
        required: true,
        validation: [
          { type: 'email', message: 'Enter a valid email address' },
        ],
      },
    ],
  },
  {
    id: 'workplace',
    type: 'text-input',
    title: 'Where do you currently work?',
    fields: [
      {
        name: 'workplace',
        type: 'text',
        label: 'Company',
        placeholder: 'e.g. Razorpay, Swiggy, freelance...',
        required: true,
        validation: [{ type: 'required', message: 'Workplace is required' }],
      },
    ],
  },
  {
    id: 'job-title',
    type: 'text-input',
    title: 'What is your current job title?',
    fields: [
      {
        name: 'jobTitle',
        type: 'text',
        label: 'Job title',
        placeholder: 'e.g. Product Designer, Backend Engineer...',
      },
    ],
  },
  {
    id: 'neighbourhood',
    type: 'dropdown',
    title: 'Pick your current neighbourhood.',
    options: [
      { label: 'Koramangala', value: 'koramangala' },
      { label: 'Indiranagar', value: 'indiranagar' },
      { label: 'HSR Layout', value: 'hsr_layout' },
      { label: 'BTM Layout', value: 'btm_layout' },
      { label: 'Whitefield', value: 'whitefield' },
      { label: 'Marathahalli', value: 'marathahalli' },
      { label: 'Jayanagar', value: 'jayanagar' },
      { label: 'JP Nagar', value: 'jp_nagar' },
      { label: 'Sarjapur Road', value: 'sarjapur_road' },
      { label: 'Hebbal', value: 'hebbal' },
    ],
    validation: [{ type: 'required', message: 'Pick a neighbourhood' }],
    meta: { fieldName: 'neighbourhood' },
  },
  {
    id: 'interests',
    type: 'multi-select',
    title: 'What gets you out of the house?',
    options: [
      { label: 'Art & Design', value: 'art_design' },
      { label: 'Music', value: 'music' },
      { label: 'Sports & Fitness', value: 'sports_fitness' },
      { label: 'Food & Cooking', value: 'food_cooking' },
      { label: 'Reading', value: 'reading' },
      { label: 'Travel', value: 'travel' },
      { label: 'Photography', value: 'photography' },
      { label: 'Gaming', value: 'gaming' },
      { label: 'Startups & Tech', value: 'startups_tech' },
    ],
    meta: { fieldName: 'interests' },
  },
  {
    id: 'invite-friend',
    type: 'yes-no',
    title: 'Got a friend who should be here too?',
    meta: { fieldName: 'inviteFriend' },
  },
  {
    id: 'friend-details',
    type: 'field-group',
    title: "Drop your friend's details. We'll take it from here.",
    condition: { field: 'inviteFriend', operator: 'eq', value: 'yes' },
    fields: [
      {
        name: 'friendFirstName',
        type: 'text',
        label: 'First name',
        placeholder: 'First name',
        required: true,
        validation: [{ type: 'required', message: 'First name is required' }],
      },
      {
        name: 'friendLastName',
        type: 'text',
        label: 'Last name',
        placeholder: 'Last name',
        required: true,
        validation: [{ type: 'required', message: 'Last name is required' }],
      },
      {
        name: 'friendPhone',
        type: 'tel',
        label: 'Phone',
        placeholder: 'Their phone number',
        required: true,
        validation: [
          { type: 'phone', message: 'Enter a valid phone number' },
        ],
      },
      {
        name: 'friendEmail',
        type: 'email',
        label: 'Email',
        placeholder: 'Their email',
        required: true,
        validation: [
          { type: 'email', message: 'Enter a valid email address' },
        ],
      },
      {
        name: 'friendCompany',
        type: 'text',
        label: 'Company',
        placeholder: 'Where do they work?',
      },
    ],
  },
];
