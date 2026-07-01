import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: "We're sorry to see you go.",
    subtitle:
      "A few things to wrap up before you leave. We'll make this as smooth as possible.",
    meta: {
      overline: 'Move-Out',
      ctaLabel: 'Start Process',
      estimatedTime: '~5 min',
      audience: 'tenant',
      successTitle: 'All wrapped up.',
      successSubtitle:
        "We'll confirm your inspection date shortly. Thank you for being part of Flent.",
    },
  },

  // Contact
  {
    id: 'contact',
    type: 'field-group',
    title: 'Your contact details',
    fields: [
      { name: 'firstName', type: 'text', label: 'First name', required: true },
      { name: 'lastName', type: 'text', label: 'Last name', required: true },
      {
        name: 'phone',
        type: 'tel',
        label: 'Phone',
        required: true,
        validation: [{ type: 'phone', message: 'Please enter a valid phone number' }],
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true,
        validation: [{ type: 'email', message: 'Please enter a valid email address' }],
      },
    ],
  },

  // Move-out date
  {
    id: 'move-out-date',
    type: 'date',
    title: 'What date are you moving out?',
    meta: { fieldName: 'moveOutDate' },
  },

  // Experience info screen
  {
    id: 'experience-info',
    type: 'info-screen',
    title: 'How was your experience in your Flent home?',
    meta: { icon: '🏠' },
  },

  // Reason for leaving
  {
    id: 'leaving-reason',
    type: 'single-select',
    title: "Why's it time to say goodbye?",
    options: [
      { label: 'Relocating to another city', value: 'relocating' },
      { label: 'Found a cheaper option', value: 'cheaper' },
      { label: 'Lease ending', value: 'lease-ending' },
      { label: 'Personal reasons', value: 'personal' },
      { label: 'Unhappy with the home', value: 'unhappy' },
      { label: 'Other', value: 'other' },
    ],
    meta: { fieldName: 'leavingReason' },
  },

  // NPS
  {
    id: 'nps',
    type: 'nps',
    title: 'Would you send a friend our way?',
    npsLabels: { low: 'Definitely not', high: 'Absolutely' },
    meta: { fieldName: 'npsScore' },
  },

  // Overall experience
  {
    id: 'overall-experience',
    type: 'long-text',
    title: 'Tell us about your overall Flenting experience',
    meta: { fieldName: 'overallExperience' },
  },

  // Experience matrix
  {
    id: 'experience-matrix',
    type: 'matrix',
    title: 'How was your experience with:',
    matrix: {
      rows: [
        { id: 'flatmates', label: 'Flatmates' },
        { id: 'neighbours', label: 'Neighbours' },
        { id: 'society', label: 'Society' },
        { id: 'locality', label: 'Locality' },
      ],
      columns: [
        { label: 'Great', value: 'great' },
        { label: 'Good', value: 'good' },
        { label: 'Average', value: 'average' },
        { label: 'Poor', value: 'poor' },
      ],
    },
    meta: { fieldName: 'experienceMatrix' },
  },

  // Inspection info
  {
    id: 'inspection-info',
    type: 'info-screen',
    title: 'Inspection Guidelines',
    subtitle: 'Please review the following before your move-out inspection.',
    meta: { icon: '📋' },
  },

  // Inspection acknowledgment
  {
    id: 'inspection-acknowledge',
    type: 'checkbox',
    title: 'Inspection acknowledgment',
    checkboxItems: [
      'I will ensure the property is clean and in the same condition as move-in',
      'All personal belongings will be removed before the inspection date',
      'Any damages beyond normal wear and tear may be deducted from the security deposit',
      'Keys and access cards will be returned during the inspection',
    ],
    meta: { fieldName: 'inspectionAcknowledge' },
  },

  // Inspection date
  {
    id: 'inspection-date',
    type: 'date',
    title: 'Please select your preferred inspection date',
    meta: { fieldName: 'inspectionDate' },
  },

  // Known damages
  {
    id: 'known-damages',
    type: 'long-text',
    title: 'Know of any damages?',
    meta: { fieldName: 'knownDamages' },
  },

  // Deposit info
  {
    id: 'deposit-info',
    type: 'info-screen',
    title: 'Last step: Security Deposit Settlement',
    meta: { icon: '💰' },
  },

  // Deposit acknowledgment
  {
    id: 'deposit-acknowledge',
    type: 'checkbox',
    title: 'Deposit settlement acknowledgment',
    checkboxItems: [
      'The security deposit refund will be processed within 30 days of move-out',
      'Any outstanding dues or damage costs will be adjusted against the deposit',
      'The refund will be credited to the bank account on file',
    ],
    meta: { fieldName: 'depositAcknowledge' },
  },
];
