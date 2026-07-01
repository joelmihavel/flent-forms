import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: "How's your new home treating you?",
    subtitle:
      "It's been a month. We'd love to hear how things are going.",
    meta: {
      overline: 'One Month Check-in',
      ctaLabel: 'Share Feedback',
      estimatedTime: '~5 min',
      audience: 'tenant',
      successTitle: 'Thanks for the honest take.',
      successSubtitle:
        'Your feedback directly shapes how we improve. We read every response.',
    },
  },

  // Contact
  {
    id: 'contact',
    type: 'field-group',
    title: 'Your details',
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
    ],
  },

  // Overall rating
  {
    id: 'overall-rating',
    type: 'opinion-scale',
    title: 'Rate your overall living experience so far',
    npsLabels: { low: 'Terrible', high: 'Excellent' },
    meta: { fieldName: 'overallRating' },
  },

  // Top reasons
  {
    id: 'top-reasons',
    type: 'multi-select',
    title: 'Two reasons why...',
    maxSelections: 2,
    options: [
      { label: 'Home aesthetics', value: 'home-aesthetics' },
      { label: 'Furnished quality', value: 'furnished-quality' },
      { label: 'Neighbourhood', value: 'neighbourhood' },
      { label: 'Flatmate compatibility', value: 'flatmate-compatibility' },
      { label: 'Maintenance speed', value: 'maintenance-speed' },
      { label: 'Value for money', value: 'value-for-money' },
      { label: 'Customer support', value: 'customer-support' },
      { label: 'Community feel', value: 'community-feel' },
    ],
    meta: { fieldName: 'topReasons' },
  },

  // Specific aspects info
  {
    id: 'specific-info',
    type: 'info-screen',
    title: 'Now onto some specific aspects of your experience so far.',
    meta: { icon: '🔍' },
  },

  // Furnishings matrix
  {
    id: 'furnishings-matrix',
    type: 'matrix',
    title: 'How would you rate our Furnishings?',
    matrix: {
      rows: [
        { id: 'design', label: 'Design & Aesthetics' },
        { id: 'utility', label: 'Utility & Usability' },
        { id: 'quality', label: 'Quality & Durability' },
      ],
      columns: [
        { label: 'Excellent', value: 'excellent' },
        { label: 'Good', value: 'good' },
        { label: 'Average', value: 'average' },
        { label: 'Poor', value: 'poor' },
      ],
    },
    meta: { fieldName: 'furnishingsMatrix' },
  },

  // Appliances matrix
  {
    id: 'appliances-matrix',
    type: 'matrix',
    title: 'How would you rate the quality of our Appliances?',
    matrix: {
      rows: [
        { id: 'tv', label: 'Television' },
        { id: 'washing-machine', label: 'Washing Machine' },
        { id: 'microwave', label: 'Microwave' },
        { id: 'refrigerator', label: 'Refrigerator' },
        { id: 'other', label: 'Other Appliances' },
      ],
      columns: [
        { label: 'Excellent', value: 'excellent' },
        { label: 'Good', value: 'good' },
        { label: 'Average', value: 'average' },
        { label: 'Poor', value: 'poor' },
        { label: 'N/A', value: 'na' },
      ],
    },
    meta: { fieldName: 'appliancesMatrix' },
  },

  // Service matrix
  {
    id: 'service-matrix',
    type: 'matrix',
    title: 'How would you rate our customer service?',
    matrix: {
      rows: [
        { id: 'reporting', label: 'Ease of reporting' },
        { id: 'response', label: 'Response time' },
        { id: 'quality', label: 'Service Quality' },
      ],
      columns: [
        { label: 'Excellent', value: 'excellent' },
        { label: 'Good', value: 'good' },
        { label: 'Average', value: 'average' },
        { label: 'Poor', value: 'poor' },
      ],
    },
    meta: { fieldName: 'serviceMatrix' },
  },

  // Flatmate comfort
  {
    id: 'flatmate-comfort',
    type: 'opinion-scale',
    title: 'How would you rate the comfort level between you and your flatmates?',
    npsLabels: { low: 'Very uncomfortable', high: 'Very comfortable' },
    meta: { fieldName: 'flatmateComfort' },
  },

  // NPS
  {
    id: 'nps',
    type: 'nps',
    title: 'Now, time for the BIG question',
    npsLabels: { low: 'Not at all likely', high: 'Extremely likely' },
    meta: { fieldName: 'npsScore' },
  },

  // Additional feedback
  {
    id: 'additional-feedback',
    type: 'long-text',
    title: 'Great! Anything else you would like us to know...',
    meta: { fieldName: 'additionalFeedback' },
  },
];
