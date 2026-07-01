import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: "How's your Flent experience?",
    subtitle:
      'A few quick questions to help us do better by you.',
    meta: {
      overline: 'Your Voice Matters',
      ctaLabel: 'Share Feedback',
      estimatedTime: '~2 min',
      audience: 'tenant',
      successTitle: 'Thank you for your honesty.',
      successSubtitle:
        'We take every word to heart. Your feedback shapes what we build next.',
      hiddenFields: [
        { name: 'first_name', source: 'url' },
        { name: 'last_name', source: 'url' },
        { name: 'user_id', source: 'url' },
      ],
    },
  },
  {
    id: 'rating',
    type: 'rating',
    title: 'How would you rate your experience with Flent?',
    ratingMax: 5,
    meta: { fieldName: 'rating' },
  },
  {
    id: 'positive-influence',
    type: 'single-select',
    title: 'What influenced your rating the most?',
    condition: { field: 'rating', operator: 'gte', value: 4 },
    options: [
      { label: 'Service quality', value: 'service_quality' },
      { label: 'Home aesthetics', value: 'home_aesthetics' },
      { label: 'Value for money', value: 'value_for_money' },
      { label: 'Community experience', value: 'community_experience' },
      { label: 'Maintenance response', value: 'maintenance_response' },
    ],
    meta: { fieldName: 'positiveInfluence' },
  },
  {
    id: 'positive-focus',
    type: 'single-select',
    title: 'We want to make your stay even better. What should we focus on next?',
    condition: { field: 'rating', operator: 'gte', value: 4 },
    options: [
      { label: 'Faster maintenance', value: 'faster_maintenance' },
      { label: 'Better amenities', value: 'better_amenities' },
      { label: 'More community events', value: 'more_community_events' },
      { label: 'Home upgrades', value: 'home_upgrades' },
      { label: 'Lower costs', value: 'lower_costs' },
    ],
    meta: { fieldName: 'positiveFocus' },
  },
  {
    id: 'negative-shortfall',
    type: 'single-select',
    title:
      "We're sorry your experience hasn't felt right. Where did things fall short?",
    condition: { field: 'rating', operator: 'lte', value: 3 },
    options: [
      { label: 'Maintenance delays', value: 'maintenance_delays' },
      { label: 'Home quality', value: 'home_quality' },
      { label: 'Communication gaps', value: 'communication_gaps' },
      { label: 'Value concerns', value: 'value_concerns' },
      { label: 'Move-in experience', value: 'move_in_experience' },
    ],
    meta: { fieldName: 'negativeShortfall' },
  },
  {
    id: 'improvement-suggestion',
    type: 'long-text',
    title: 'Is there anything specific we could improve right away?',
    meta: { fieldName: 'improvement_suggestion' },
  },
];
