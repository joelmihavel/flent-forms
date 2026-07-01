import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Contract Creation',
    subtitle: 'Fill in the contract details for a new property.',
    meta: {
      overline: 'Internal Ops',
      audience: 'internal',
      successTitle: 'Contract details submitted.',
    },
  },
  {
    id: 'pid',
    type: 'text-input',
    title: 'PID number',
    fields: [
      {
        name: 'pid',
        type: 'text',
        label: 'PID',
        placeholder: 'Enter Property ID',
        required: true,
      },
    ],
  },
  {
    id: 'rent-start-date',
    type: 'date',
    title: 'Rent start date',
    meta: { fieldName: 'rentStartDate' },
  },
  {
    id: 'security-deposit',
    type: 'text-input',
    title: 'Security deposit amount',
    fields: [
      {
        name: 'securityDeposit',
        type: 'number',
        label: 'Security deposit',
        prefix: '₹',
        placeholder: 'e.g. 100000',
        required: true,
      },
    ],
  },
  {
    id: 'base-rent',
    type: 'text-input',
    title: 'Base rent',
    fields: [
      {
        name: 'baseRent',
        type: 'number',
        label: 'Base rent',
        prefix: '₹',
        placeholder: 'e.g. 25000',
        required: true,
      },
    ],
  },
  {
    id: 'maintenance',
    type: 'text-input',
    title: 'Maintenance amount',
    fields: [
      {
        name: 'maintenanceAmount',
        type: 'number',
        label: 'Maintenance',
        prefix: '₹',
        placeholder: 'e.g. 5000',
        required: true,
      },
    ],
  },
  {
    id: 'percentage-hike',
    type: 'text-input',
    title: 'Percentage hike',
    fields: [
      {
        name: 'percentageHike',
        type: 'number',
        label: 'Hike %',
        placeholder: 'e.g. 5',
        required: true,
      },
    ],
  },
  {
    id: 'pm-charges',
    type: 'text-input',
    title: 'PM charges',
    fields: [
      {
        name: 'pmCharges',
        type: 'number',
        label: 'PM charges',
        prefix: '₹',
        placeholder: 'e.g. 2000',
        required: true,
      },
    ],
  },
];
