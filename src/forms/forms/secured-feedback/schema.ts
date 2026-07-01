import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: "We'd love your honest take.",
    subtitle:
      'Your experience shapes what we build next. This takes about 5 minutes.',
    meta: {
      overline: 'Flent Secured',
      audience: 'tenant',
      estimatedTime: '5 min',
      successTitle: 'Thank you for sharing.',
      successSubtitle: 'We read every response. Yours matters.',
    },
  },
  {
    id: 'full-name',
    type: 'text-input',
    title: 'What is your full name?',
    fields: [
      {
        name: 'fullName',
        type: 'text',
        label: 'Full name',
        placeholder: 'Your full name',
        required: true,
      },
    ],
  },
  {
    id: 'email',
    type: 'text-input',
    title: 'What is your email?',
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'you@example.com',
        required: true,
        validation: [{ type: 'email', message: 'Please enter a valid email' }],
      },
    ],
  },
  {
    id: 'phone',
    type: 'phone',
    title: 'Your phone number',
    meta: { fieldName: 'phone' },
  },
  {
    id: 'improve-app',
    type: 'long-text',
    title: 'If you could improve one thing in the app, what would it be?',
    meta: { fieldName: 'improveApp' },
  },
  {
    id: 'landlord-invite',
    type: 'long-text',
    title:
      'Did you invite your landlord, and if yes how was the experience?',
    meta: { fieldName: 'landlordInvite' },
  },
  {
    id: 'credit-card',
    type: 'long-text',
    title: 'Did you use a credit card to pay rent?',
    meta: { fieldName: 'creditCard' },
  },
  {
    id: 'recommended',
    type: 'long-text',
    title: 'Have you recommended Secured to anyone?',
    meta: { fieldName: 'recommended' },
  },
];
