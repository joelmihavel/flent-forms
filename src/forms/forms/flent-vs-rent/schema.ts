import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Still renting the old way?',
    subtitle:
      "We've got questions. You've got answers. Let's see if Flent is your kind of home.",
    meta: {
      overline: 'Flent vs Rent',
      audience: 'prospect',
      ctaLabel: "Let's Go",
      successTitle: 'Interesting.',
      successSubtitle:
        "We're building something you'll want to see. We'll be in touch.",
    },
  },
  {
    id: 'name',
    type: 'text-input',
    title: "Hello, what's your name?",
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'Your name',
        required: true,
      },
    ],
    meta: { fieldName: 'name' },
  },
  {
    id: 'workplace',
    type: 'text-input',
    title: 'Where do you work, {{field:name}}?',
    fields: [
      {
        name: 'workplace',
        type: 'text',
        label: 'Workplace',
        placeholder: 'Company or organisation',
        required: true,
      },
    ],
    meta: { fieldName: 'workplace' },
  },
  {
    id: 'seeking',
    type: 'single-select',
    title: 'Seeking new home? Moving soon?',
    options: [
      { label: 'Yes, actively looking', value: 'yes' },
      { label: 'Just exploring', value: 'exploring' },
      { label: 'Helping someone else', value: 'helping' },
    ],
    meta: { fieldName: 'seeking' },
  },
  {
    id: 'location',
    type: 'dropdown',
    title: 'Where are you thinking about getting your new place?',
    options: [
      { label: 'Koramangala', value: 'koramangala' },
      { label: 'Indiranagar', value: 'indiranagar' },
      { label: 'HSR Layout', value: 'hsr_layout' },
      { label: 'Whitefield', value: 'whitefield' },
      { label: 'Marathahalli', value: 'marathahalli' },
      { label: 'JP Nagar', value: 'jp_nagar' },
      { label: 'Jayanagar', value: 'jayanagar' },
      { label: 'Hebbal', value: 'hebbal' },
      { label: 'Yelahanka', value: 'yelahanka' },
      { label: 'Sarjapur Road', value: 'sarjapur_road' },
      { label: 'Electronic City', value: 'electronic_city' },
      { label: 'Other', value: 'other' },
    ],
    meta: { fieldName: 'location' },
  },
  {
    id: 'house-style',
    type: 'single-select',
    title: 'Let’s understand the kind of house you aspire to live in',
    options: [
      { label: 'Minimal & functional', value: 'minimal' },
      { label: 'Aesthetic & curated', value: 'aesthetic' },
      { label: 'Over-the-top luxury', value: 'luxury' },
    ],
    condition: { field: 'seeking', operator: 'in', value: ['yes', 'exploring'] },
    meta: { fieldName: 'houseStyle' },
  },
  {
    id: 'appliance-preference',
    type: 'single-select',
    title:
      'Are you a utilitarian or over-the-top person when it comes to appliances?',
    options: [
      { label: 'Utilitarian', value: 'utilitarian' },
      { label: 'Over-the-top premium', value: 'premium' },
    ],
    condition: { field: 'seeking', operator: 'in', value: ['yes', 'exploring'] },
    meta: { fieldName: 'appliancePreference' },
  },
  {
    id: 'phone',
    type: 'phone',
    title: 'Oh btw, {{field:name}}, do you mind sharing your contact?',
    meta: { fieldName: 'phone' },
  },
  {
    id: 'unfurnished-reason',
    type: 'single-select',
    title:
      'Why would you prefer an unfurnished house vs a luxurious turn-key home?',
    options: [
      { label: "It's cheaper", value: 'cheaper' },
      { label: 'I have my own furniture', value: 'own_furniture' },
      { label: 'I like to set up my own place', value: 'own_setup' },
      { label: "I haven't thought about it", value: 'not_considered' },
    ],
    meta: { fieldName: 'unfurnishedReason' },
  },
];
