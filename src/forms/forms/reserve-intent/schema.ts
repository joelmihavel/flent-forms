import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Reserve your spot in a Flent home.',
    subtitle:
      'Pay ₹5,000 to lock in your next home. Fully refundable. No strings.',
    meta: {
      overline: 'Flent Reserve',
      ctaLabel: 'Reserve Now',
      estimatedTime: '~7 min',
      audience: 'prospect',
      successTitle: "You're in.",
      successSubtitle:
        "We'll match you with a home that fits. Expect to hear from us within 48 hours.",
      hiddenFields: [
        { name: 'hubspot_page_name', source: 'url' },
        { name: 'hubspot_page_url', source: 'url' },
        { name: 'campaign', source: 'url' },
        { name: 'hubspot_utk', source: 'url' },
      ],
    },
  },

  // How it works
  {
    id: 'how-it-works',
    type: 'info-screen',
    title: 'How we make it happen',
    subtitle:
      'Pay a fully-refundable ₹5,000 to reserve your spot. We find you a home that fits. You move in. Done.',
  },

  // Contact
  {
    id: 'contact',
    type: 'field-group',
    title: "Let's start with the basics",
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

  // Work info
  {
    id: 'work-info',
    type: 'field-group',
    title: 'Tell us about your work, {{field:firstName}}.',
    fields: [
      { name: 'workplace', type: 'text', label: 'Workplace name', required: true },
      { name: 'linkedinUrl', type: 'text', label: 'LinkedIn URL' },
    ],
  },

  // Gender
  {
    id: 'gender',
    type: 'single-select',
    title: 'How do you identify yourself?',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Non-binary', value: 'non-binary' },
      { label: 'Prefer not to say', value: 'prefer-not-to-say' },
    ],
    meta: { fieldName: 'gender' },
  },

  // Discovery
  {
    id: 'discovery',
    type: 'single-select',
    title: 'How did you first hear about Flent?',
    options: [
      { label: 'Instagram', value: 'instagram' },
      { label: 'LinkedIn', value: 'linkedin' },
      { label: 'Google', value: 'google' },
      { label: 'Friend', value: 'friend' },
      { label: 'Broker', value: 'broker' },
      { label: 'Facebook', value: 'facebook' },
      { label: 'Twitter/X', value: 'twitter' },
      { label: 'NoBroker / OLX', value: 'nobroker-olx' },
      { label: 'Other', value: 'other' },
    ],
    meta: { fieldName: 'discoverySource' },
  },

  // Preferred areas
  {
    id: 'preferred-areas',
    type: 'multi-select',
    title: 'What areas are you considering?',
    options: [
      { label: 'Koramangala', value: 'koramangala' },
      { label: 'Indiranagar', value: 'indiranagar' },
      { label: 'HSR Layout', value: 'hsr' },
      { label: 'BTM Layout', value: 'btm' },
      { label: 'Whitefield', value: 'whitefield' },
      { label: 'Marathahalli', value: 'marathahalli' },
      { label: 'Sarjapur Road', value: 'sarjapur' },
      { label: 'Hebbal', value: 'hebbal' },
      { label: 'JP Nagar', value: 'jp-nagar' },
    ],
    meta: { fieldName: 'preferredAreas' },
  },

  // Location pin & radius
  {
    id: 'location-details',
    type: 'field-group',
    title: 'Drop a pin where you want your next home.',
    fields: [
      { name: 'locationPin', type: 'text', label: 'Google Maps pin', placeholder: 'Paste a Google Maps link' },
      { name: 'radiusKm', type: 'number', label: 'Radius in KMs' },
    ],
  },

  // Occupancy type
  {
    id: 'occupancy-type',
    type: 'single-select',
    title: 'Full house or just a room?',
    options: [
      { label: 'Full house', value: 'full' },
      { label: 'Just a room', value: 'room' },
    ],
    meta: { fieldName: 'occupancyType' },
  },

  // House type (full house only)
  {
    id: 'house-type',
    type: 'single-select',
    title: 'What kind of house?',
    condition: { field: 'occupancyType', operator: 'eq', value: 'full' },
    options: [
      { label: '1 BHK', value: '1bhk' },
      { label: '2 BHK', value: '2bhk' },
      { label: '3 BHK', value: '3bhk' },
      { label: '4 BHK', value: '4bhk' },
      { label: 'Studio', value: 'studio' },
      { label: 'Villa', value: 'villa' },
    ],
    meta: { fieldName: 'houseType' },
  },

  // Budget (room)
  {
    id: 'budget-room',
    type: 'single-select',
    title: "What's your monthly budget?",
    condition: { field: 'occupancyType', operator: 'eq', value: 'room' },
    options: [
      { label: '₹8K – ₹12K', value: '8k-12k' },
      { label: '₹12K – ₹18K', value: '12k-18k' },
      { label: '₹18K – ₹25K', value: '18k-25k' },
      { label: '₹25K+', value: '25k-plus' },
    ],
    meta: { fieldName: 'budgetRoom' },
  },

  // Budget (full house)
  {
    id: 'budget-full',
    type: 'single-select',
    title: "What's your monthly budget for the {{field:houseType}}?",
    condition: { field: 'occupancyType', operator: 'eq', value: 'full' },
    options: [
      { label: '₹15K – ₹25K', value: '15k-25k' },
      { label: '₹25K – ₹40K', value: '25k-40k' },
      { label: '₹40K – ₹60K', value: '40k-60k' },
      { label: '₹60K+', value: '60k-plus' },
    ],
    meta: { fieldName: 'budgetFull' },
  },

  // Priorities
  {
    id: 'priorities',
    type: 'multi-select',
    title: 'Pick your top 3 priorities',
    maxSelections: 3,
    options: [
      { label: 'Location', value: 'location' },
      { label: 'Price', value: 'price' },
      { label: 'Furnished quality', value: 'furnished-quality' },
      { label: 'Flatmate compatibility', value: 'flatmate-compatibility' },
      { label: 'House aesthetics', value: 'aesthetics' },
      { label: 'Natural light', value: 'natural-light' },
      { label: 'Balcony', value: 'balcony' },
      { label: 'Parking', value: 'parking' },
      { label: 'Pet-friendly', value: 'pet-friendly' },
    ],
    meta: { fieldName: 'priorities' },
  },

  // Flatmate matching (room only)
  {
    id: 'flatmate-info',
    type: 'info-screen',
    title: 'A few quick ones to match you with the right flatmates.',
    condition: { field: 'occupancyType', operator: 'eq', value: 'room' },
  },

  {
    id: 'opposite-gender',
    type: 'single-select',
    title: 'Comfortable sharing with the opposite gender?',
    condition: { field: 'occupancyType', operator: 'eq', value: 'room' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: "Doesn't matter", value: 'doesnt-matter' },
    ],
    meta: { fieldName: 'oppositeGenderOk' },
  },

  {
    id: 'food-prefs',
    type: 'single-select',
    title: 'What are your food preferences?',
    condition: { field: 'occupancyType', operator: 'eq', value: 'room' },
    options: [
      { label: 'Vegetarian', value: 'vegetarian' },
      { label: 'Non-vegetarian', value: 'non-vegetarian' },
      { label: 'Eggetarian', value: 'eggetarian' },
      { label: 'Vegan', value: 'vegan' },
    ],
    meta: { fieldName: 'foodPrefs' },
  },

  {
    id: 'non-veg-ok',
    type: 'single-select',
    title: 'OK with non-veg at home?',
    condition: { field: 'occupancyType', operator: 'eq', value: 'room' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    meta: { fieldName: 'nonVegOk' },
  },

  {
    id: 'smoking-ok',
    type: 'single-select',
    title: 'OK with flatmates who smoke?',
    condition: { field: 'occupancyType', operator: 'eq', value: 'room' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: "Doesn't matter", value: 'doesnt-matter' },
    ],
    meta: { fieldName: 'smokingOk' },
  },

  {
    id: 'pets-ok',
    type: 'single-select',
    title: 'OK with pets in the house?',
    condition: { field: 'occupancyType', operator: 'eq', value: 'room' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: "Doesn't matter", value: 'doesnt-matter' },
    ],
    meta: { fieldName: 'petsOk' },
  },

  // Parking (all)
  {
    id: 'parking',
    type: 'single-select',
    title: 'Need parking?',
    options: [
      { label: '2-wheeler', value: '2-wheeler' },
      { label: '4-wheeler', value: '4-wheeler' },
      { label: 'Both', value: 'both' },
      { label: 'No', value: 'none' },
    ],
    meta: { fieldName: 'parking' },
  },

  // Additional info
  {
    id: 'additional-info',
    type: 'long-text',
    title: 'Anything else we should know?',
    meta: { fieldName: 'additionalInfo' },
  },

  // Move-in date
  {
    id: 'move-in-date',
    type: 'date',
    title: "When are you looking to move in, {{field:firstName}}?",
    validation: [{ type: 'required', message: 'Please pick a date' }],
    meta: { fieldName: 'moveInDate' },
  },
];
