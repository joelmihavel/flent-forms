import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Your home. Our standards.',
    subtitle:
      "We'd love to learn about your property. A quick introduction is all it takes.",
    meta: {
      overline: 'Homeowner Enquiry',
      ctaLabel: 'Tell Us More',
      estimatedTime: '~2 min',
      audience: 'landlord',
      successTitle: "We've received your details.",
      successSubtitle:
        'A property specialist will reach out within 24 hours.',
    },
  },
  {
    id: 'contact-info',
    type: 'field-group',
    title: 'Tell us about yourself.',
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
      },
      {
        name: 'phone',
        type: 'tel',
        label: 'Phone',
        placeholder: 'e.g. 9876543210',
        required: true,
        validation: [
          { type: 'phone', message: 'Please enter a valid phone number' },
        ],
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'you@example.com',
        validation: [
          { type: 'email', message: 'Please enter a valid email' },
        ],
      },
    ],
  },
  {
    id: 'property-details',
    type: 'long-text',
    title: 'Tell us more about your property.',
    subtitle:
      'Location, layout, current state, anything you think is relevant.',
    meta: { fieldName: 'propertyDetails' },
  },
];
