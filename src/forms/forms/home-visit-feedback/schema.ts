import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'How was the viewing?',
    subtitle:
      'Your honest take helps us find you the right home faster.',
    meta: {
      overline: 'Home Visit',
      audience: 'prospect',
      successTitle: 'Got it, thanks.',
      successSubtitle: 'This helps us fine-tune your shortlist.',
      hiddenFields: [
        { name: 'home1', source: 'url' },
        { name: 'home2', source: 'url' },
        { name: 'home3', source: 'url' },
        { name: 'firstname', source: 'url' },
        { name: 'lead_id', source: 'url' },
      ],
    },
  },
  {
    id: 'rejected-home',
    type: 'single-select',
    title: "Which home didn't click for you, {{hidden:firstname}}?",
    options: [
      { label: '{{hidden:home1}}', value: 'home1' },
      { label: '{{hidden:home2}}', value: 'home2' },
      { label: '{{hidden:home3}}', value: 'home3' },
      { label: 'None — all were great', value: 'none' },
    ],
    meta: { fieldName: 'rejectedHome' },
  },
  {
    id: 'rejection-reasons',
    type: 'multi-select',
    title: "Why didn't it work for you?",
    condition: { field: 'rejectedHome', operator: 'neq', value: 'none' },
    options: [
      { label: 'Too expensive', value: 'too_expensive' },
      { label: "Layout didn't suit me", value: 'layout' },
      { label: "Neighbourhood wasn't right", value: 'neighbourhood' },
      {
        label: "Furnishing didn't match expectations",
        value: 'furnishing',
      },
      { label: 'Felt too small', value: 'too_small' },
      { label: 'Other', value: 'other' },
    ],
    meta: { fieldName: 'rejectionReasons' },
  },
];
