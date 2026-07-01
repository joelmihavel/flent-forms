import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Help us set up your home the right way.',
    subtitle:
      'A few details about utilities, parking, and house rules so we can manage your property to our standards.',
    meta: {
      overline: 'Property Details',
      ctaLabel: "Let's Begin",
      estimatedTime: '~8 min',
      audience: 'landlord',
      successTitle: "We've got everything we need.",
      successSubtitle:
        "Your property specialist will take it from here. We manage to our standards, not the market's.",
    },
  },
  {
    id: 'email',
    type: 'text-input',
    title: 'Your email address',
    meta: { fieldName: 'email' },
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email address',
        required: true,
        validation: [
          { type: 'email', message: 'Enter a valid email address' },
        ],
      },
    ],
  },
  {
    id: 'configuration',
    type: 'single-select',
    title: 'Configuration',
    options: [
      { label: '1 BHK', value: '1bhk' },
      { label: '2 BHK', value: '2bhk' },
      { label: '3 BHK', value: '3bhk' },
      { label: '4 BHK', value: '4bhk' },
      { label: 'Studio', value: 'studio' },
      { label: 'Villa', value: 'villa' },
    ],
    meta: { fieldName: 'configuration' },
  },
  {
    id: 'apartment-number',
    type: 'text-input',
    title: 'House/apartment number',
    meta: { fieldName: 'apartmentNumber' },
    fields: [
      {
        name: 'apartmentNumber',
        type: 'text',
        label: 'House/Apartment Number',
        placeholder: 'e.g. A-301, Villa 12',
      },
    ],
  },
  {
    id: 'postal-address',
    type: 'long-text',
    title: 'Postal address',
    meta: { fieldName: 'postalAddress' },
  },
  {
    id: 'electricity-method',
    type: 'single-select',
    title: 'Electricity access method',
    options: [
      { label: 'I have my account details', value: 'account' },
      { label: "I'll upload a bill copy", value: 'bill' },
    ],
    meta: { fieldName: 'electricityMethod' },
  },
  {
    id: 'electricity-provider',
    type: 'dropdown',
    title: 'Electricity provider',
    condition: { field: 'electricityMethod', operator: 'eq', value: 'account' },
    options: [
      { label: 'BESCOM', value: 'bescom' },
      { label: 'TPDDL', value: 'tpddl' },
      { label: 'BSES Rajdhani', value: 'bses_rajdhani' },
      { label: 'BSES Yamuna', value: 'bses_yamuna' },
      { label: 'MSEDCL', value: 'msedcl' },
      { label: 'KSEB', value: 'kseb' },
      { label: 'TANGEDCO', value: 'tangedco' },
      { label: 'Other', value: 'other' },
    ],
    meta: { fieldName: 'electricityProvider' },
  },
  {
    id: 'electricity-account-id',
    type: 'text-input',
    title: 'Electricity account ID',
    condition: { field: 'electricityMethod', operator: 'eq', value: 'account' },
    meta: { fieldName: 'electricityAccountId' },
    fields: [
      {
        name: 'electricityAccountId',
        type: 'text',
        label: 'Account ID',
        placeholder: 'Enter your electricity account ID',
      },
    ],
  },
  {
    id: 'electricity-portal-id',
    type: 'text-input',
    title: 'Electricity portal ID',
    condition: { field: 'electricityMethod', operator: 'eq', value: 'account' },
    meta: { fieldName: 'electricityPortalId' },
    fields: [
      {
        name: 'electricityPortalId',
        type: 'text',
        label: 'Portal ID',
        placeholder: 'Enter your portal login ID',
      },
    ],
  },
  {
    id: 'electricity-portal-password',
    type: 'text-input',
    title: 'Electricity portal password',
    condition: { field: 'electricityMethod', operator: 'eq', value: 'account' },
    meta: { fieldName: 'electricityPortalPassword' },
    fields: [
      {
        name: 'electricityPortalPassword',
        type: 'password',
        label: 'Portal Password',
        placeholder: 'Enter your portal password',
      },
    ],
  },
  {
    id: 'electricity-bill-upload',
    type: 'file-upload',
    title: 'Upload electricity bill',
    condition: { field: 'electricityMethod', operator: 'eq', value: 'bill' },
    fileUpload: {
      accept: ['.jpg', '.jpeg', '.png', '.pdf'],
      maxSizeMB: 10,
      label: 'Upload a recent electricity bill',
    },
    meta: { fieldName: 'electricityBill' },
  },
  {
    id: 'power-backup',
    type: 'yes-no',
    title: 'Power backup?',
    meta: { fieldName: 'hasPowerBackup' },
  },
  {
    id: 'gas-type',
    type: 'single-select',
    title: 'Cooking gas type',
    options: [
      { label: 'Piped gas', value: 'piped' },
      { label: 'LPG cylinder', value: 'cylinder' },
      { label: 'Both', value: 'both' },
      { label: 'None', value: 'none' },
    ],
    meta: { fieldName: 'gasType' },
  },
  {
    id: 'piped-gas-provider',
    type: 'dropdown',
    title: 'Piped gas provider',
    condition: { field: 'gasType', operator: 'in', value: ['piped', 'both'] },
    options: [
      { label: 'Indraprastha Gas', value: 'indraprastha_gas' },
      { label: 'Mahanagar Gas', value: 'mahanagar_gas' },
      { label: 'GAIL', value: 'gail' },
      { label: 'Adani Gas', value: 'adani_gas' },
      { label: 'Other', value: 'other' },
    ],
    meta: { fieldName: 'pipedGasProvider' },
  },
  {
    id: 'gas-account-id',
    type: 'text-input',
    title: 'Gas account ID',
    condition: { field: 'gasType', operator: 'in', value: ['piped', 'both'] },
    meta: { fieldName: 'gasAccountId' },
    fields: [
      {
        name: 'gasAccountId',
        type: 'text',
        label: 'Gas Account ID',
        placeholder: 'Enter your gas account ID',
      },
    ],
  },
  {
    id: 'lpg-vendor-contact',
    type: 'text-input',
    title: 'LPG vendor contact',
    condition: {
      field: 'gasType',
      operator: 'in',
      value: ['cylinder', 'both'],
    },
    meta: { fieldName: 'lpgVendorContact' },
    fields: [
      {
        name: 'lpgVendorContact',
        type: 'text',
        label: 'LPG Vendor Contact',
        placeholder: 'Enter vendor name and phone number',
      },
    ],
  },
  {
    id: 'water-source',
    type: 'single-select',
    title: 'Water source',
    options: [
      { label: 'Municipal/Corporation', value: 'municipal' },
      { label: 'Borewell', value: 'borewell' },
      { label: 'Tanker', value: 'tanker' },
      { label: 'Mixed', value: 'mixed' },
    ],
    meta: { fieldName: 'waterSource' },
  },
  {
    id: 'separate-water-meter',
    type: 'yes-no',
    title: 'Separate water meter?',
    condition: { field: 'waterSource', operator: 'neq', value: 'tanker' },
    meta: { fieldName: 'separateWaterMeter' },
  },
  {
    id: 'monthly-water-bill',
    type: 'yes-no',
    title: 'Monthly water bill provided?',
    condition: { field: 'waterSource', operator: 'neq', value: 'tanker' },
    meta: { fieldName: 'monthlyWaterBill' },
  },
  {
    id: 'parking-spaces',
    type: 'number-picker',
    title: 'Parking spaces',
    meta: { fieldName: 'parkingSpaces' },
    fields: [
      {
        name: 'parkingSpaces',
        type: 'number',
        label: 'Number of Parking Spaces',
        validation: [
          { type: 'min', params: { min: 0 }, message: 'Minimum is 0' },
          { type: 'max', params: { max: 4 }, message: 'Maximum is 4' },
        ],
      },
    ],
  },
  {
    id: 'parking-location',
    type: 'text-input',
    title: 'Parking location',
    condition: { field: 'parkingSpaces', operator: 'gt', value: 0 },
    meta: { fieldName: 'parkingLocation' },
    fields: [
      {
        name: 'parkingLocation',
        type: 'text',
        label: 'Parking Location',
        placeholder: 'e.g. Basement Level 2, Slot A-15',
      },
    ],
  },
  {
    id: 'house-rules',
    type: 'long-text',
    title: 'House rules or special instructions',
    meta: { fieldName: 'houseRules' },
  },
];
