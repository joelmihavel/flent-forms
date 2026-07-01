import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Know a landlord who deserves better?',
    subtitle:
      "Refer them to Flent. If their home joins our portfolio, we'll make it worth your while.",
    meta: {
      overline: 'MyGate × Flent',
      audience: 'prospect',
      successTitle: 'Referral received.',
      successSubtitle:
        "We'll reach out to them shortly. Thanks for the tip.",
    },
  },
  {
    id: 'your-name',
    type: 'text-input',
    title: 'Your name',
    fields: [
      {
        name: 'yourName',
        type: 'text',
        label: 'Name',
        placeholder: 'Your full name',
        required: true,
      },
    ],
  },
  {
    id: 'your-email',
    type: 'text-input',
    title: 'Your email',
    fields: [
      {
        name: 'yourEmail',
        type: 'email',
        label: 'Email',
        placeholder: 'you@example.com',
        required: true,
        validation: [{ type: 'email', message: 'Please enter a valid email' }],
      },
    ],
  },
  {
    id: 'your-phone',
    type: 'text-input',
    title: 'Your phone number',
    fields: [
      {
        name: 'yourPhone',
        type: 'text',
        label: 'Phone',
        placeholder: 'e.g. 9876543210',
        required: true,
      },
    ],
  },
  {
    id: 'landlord-name',
    type: 'text-input',
    title: 'Name of the landlord you’re referring',
    fields: [
      {
        name: 'landlordName',
        type: 'text',
        label: 'Landlord name',
        placeholder: 'Their full name',
        required: true,
      },
    ],
  },
  {
    id: 'landlord-phone',
    type: 'text-input',
    title: 'Phone of the landlord',
    fields: [
      {
        name: 'landlordPhone',
        type: 'text',
        label: 'Phone',
        placeholder: 'e.g. 9876543210',
        required: true,
      },
    ],
  },
  {
    id: 'property-map-pin',
    type: 'text-input',
    title: 'Google map pin of the property',
    fields: [
      {
        name: 'propertyMapPin',
        type: 'text',
        label: 'Google Maps link',
        placeholder: 'https://maps.google.com/...',
        required: true,
      },
    ],
  },
  {
    id: 'property-type',
    type: 'single-select',
    title: 'Type of property',
    options: [
      { label: 'Apartment', value: 'apartment' },
      { label: 'Villa', value: 'villa' },
      { label: 'Independent House', value: 'independent_house' },
    ],
    meta: { fieldName: 'propertyType' },
  },
];
