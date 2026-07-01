import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  // No welcome screen — start directly. Success configured in meta of first step.
  {
    id: 'pid',
    type: 'text-input',
    title: 'PID number',
    meta: {
      fieldName: 'pid',
      audience: 'internal',
      successTitle: 'Handover details captured.',
      successSubtitle: 'The product team can now plan the setup.',
    },
  },

  {
    id: 'property-type',
    type: 'single-select',
    title: 'Property type',
    options: [
      { label: 'Apartment', value: 'apartment' },
      { label: 'Villa', value: 'villa' },
      { label: 'Independent House', value: 'independent-house' },
      { label: 'Penthouse', value: 'penthouse' },
    ],
    meta: { fieldName: 'propertyType' },
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
    ],
    meta: { fieldName: 'configuration' },
  },

  {
    id: 'society-name',
    type: 'text-input',
    title: 'Society / building name',
    meta: { fieldName: 'societyName' },
  },

  {
    id: 'address',
    type: 'text-input',
    title: 'Full address / Google Maps link',
    meta: { fieldName: 'address' },
  },

  {
    id: 'flat-number',
    type: 'text-input',
    title: 'Apartment number',
    meta: { fieldName: 'flatNumber' },
  },

  {
    id: 'floor',
    type: 'text-input',
    title: 'Floor',
    meta: { fieldName: 'floor' },
  },

  {
    id: 'key-holder',
    type: 'single-select',
    title: 'Who holds the keys?',
    options: [
      { label: 'Landlord', value: 'landlord' },
      { label: 'Society office', value: 'society-office' },
      { label: 'Flent team', value: 'flent-team' },
      { label: 'Broker', value: 'broker' },
      { label: 'Tenant', value: 'tenant' },
    ],
    meta: { fieldName: 'keyHolder' },
  },

  {
    id: 'access-date',
    type: 'date',
    title: 'Product team access date',
    meta: { fieldName: 'accessDate' },
  },

  {
    id: 'occupancy-status',
    type: 'single-select',
    title: 'Occupancy status',
    options: [
      { label: 'Vacant', value: 'vacant' },
      { label: 'Occupied by owner', value: 'occupied-owner' },
      { label: 'Occupied by tenant', value: 'occupied-tenant' },
      { label: 'Under renovation', value: 'under-renovation' },
    ],
    meta: { fieldName: 'occupancyStatus' },
  },

  {
    id: 'electricity-active',
    type: 'yes-no',
    title: 'Electricity active?',
    meta: { fieldName: 'electricityActive' },
  },

  {
    id: 'water-active',
    type: 'yes-no',
    title: 'Water supply active?',
    meta: { fieldName: 'waterActive' },
  },

  {
    id: 'has-backup',
    type: 'yes-no',
    title: 'Inverter / generator backup?',
    meta: { fieldName: 'hasBackup' },
  },

  {
    id: 'media-link',
    type: 'text-input',
    title: 'Photos / videos link',
    meta: { fieldName: 'mediaLink' },
  },

  {
    id: 'access-hours',
    type: 'text-input',
    title: 'Daily access hours',
    meta: { fieldName: 'accessHours' },
  },

  {
    id: 'inventory-link',
    type: 'text-input',
    title: 'Inventory list link',
    meta: { fieldName: 'inventoryLink' },
  },

  {
    id: 'has-service-lift',
    type: 'yes-no',
    title: 'Service lift available?',
    meta: { fieldName: 'hasServiceLift' },
  },

  {
    id: 'lift-access',
    type: 'text-input',
    title: 'Can product team access lift? (details)',
    meta: { fieldName: 'liftAccess' },
  },

  {
    id: 'stairway-video',
    type: 'file-upload',
    title: 'Upload stairway video',
    fileUpload: {
      accept: ['.mp4', '.mov', '.jpg', '.png'],
      maxSizeMB: 50,
      label: 'Upload stairway video',
    },
    meta: { fieldName: 'stairwayVideo' },
  },

  {
    id: 'trucks-allowed',
    type: 'yes-no',
    title: 'Trucks allowed inside?',
    meta: { fieldName: 'trucksAllowed' },
  },

  {
    id: 'truck-unloading-photos',
    type: 'file-upload',
    title: 'Upload truck unloading area photos',
    condition: { field: 'trucksAllowed', operator: 'eq', value: 'yes' },
    fileUpload: {
      accept: ['.jpg', '.jpeg', '.png'],
      maxSizeMB: 10,
      label: 'Upload truck unloading photos',
    },
    meta: { fieldName: 'truckUnloadingPhotos' },
  },

  {
    id: 'truck-to-entrance',
    type: 'text-input',
    title: 'Distance from truck unloading to entrance (meters)',
    condition: { field: 'trucksAllowed', operator: 'eq', value: 'yes' },
    meta: { fieldName: 'truckToEntrance' },
  },

  {
    id: 'entrance-to-lift',
    type: 'text-input',
    title: 'Distance from entrance to lift (meters)',
    meta: { fieldName: 'entranceToLift' },
  },

  {
    id: 'delivery-timings',
    type: 'text-input',
    title: 'Allowed timings for delivery vehicles',
    meta: { fieldName: 'deliveryTimings' },
  },

  {
    id: 'has-movement-charges',
    type: 'yes-no',
    title: 'Material movement / renovation charges?',
    meta: { fieldName: 'hasMovementCharges' },
  },

  {
    id: 'movement-charges-details',
    type: 'long-text',
    title: 'Charges details',
    condition: { field: 'hasMovementCharges', operator: 'eq', value: 'yes' },
    meta: { fieldName: 'movementChargesDetails' },
  },

  {
    id: 'society-informed',
    type: 'yes-no',
    title: 'Society informed?',
    meta: { fieldName: 'societyInformed' },
  },

  {
    id: 'permissions-secured',
    type: 'yes-no',
    title: 'Permissions secured?',
    meta: { fieldName: 'permissionsSecured' },
  },

  {
    id: 'waste-disposal',
    type: 'long-text',
    title: 'Waste disposal route',
    meta: { fieldName: 'wasteDisposal' },
  },

  {
    id: 'society-rules',
    type: 'long-text',
    title: 'Society rules to follow',
    meta: { fieldName: 'societyRules' },
  },
];
