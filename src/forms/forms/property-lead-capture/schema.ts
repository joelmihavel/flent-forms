import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  // No welcome screen — internal form. Success configured in meta of first step.
  {
    id: 'agent-name',
    type: 'text-input',
    title: 'Your name',
    validation: [{ type: 'required', message: 'Agent name is required' }],
    meta: {
      fieldName: 'agentName',
      audience: 'internal',
      successTitle: 'Lead captured.',
      successSubtitle: 'The supply team will review and follow up.',
    },
  },

  {
    id: 'maps-link',
    type: 'text-input',
    title: 'Google Maps link',
    validation: [{ type: 'required', message: 'Maps link is required' }],
    meta: { fieldName: 'mapsLink' },
  },

  {
    id: 'property-type',
    type: 'single-select',
    title: 'Property type',
    options: [
      { label: 'Apartment Complex', value: 'apartment-complex' },
      { label: 'Standalone Building', value: 'standalone' },
      { label: 'Villa', value: 'villa' },
      { label: 'Independent House', value: 'independent-house' },
    ],
    meta: { fieldName: 'propertyType' },
  },

  {
    id: 'construction-stage',
    type: 'dropdown',
    title: 'Stage of construction',
    options: [
      { label: 'Ready to Move', value: 'ready' },
      { label: 'Under Construction', value: 'under-construction' },
      { label: 'Pre-launch', value: 'pre-launch' },
    ],
    meta: { fieldName: 'constructionStage' },
  },

  {
    id: 'society-name',
    type: 'text-input',
    title: 'Society / building name',
    meta: { fieldName: 'societyName' },
  },

  {
    id: 'lead-type',
    type: 'single-select',
    title: 'What kind of lead?',
    options: [
      { label: 'Direct Landlord', value: 'direct-landlord' },
      { label: 'Broker', value: 'broker' },
      { label: 'Society Management', value: 'society-management' },
      { label: 'Resident', value: 'resident' },
    ],
    meta: { fieldName: 'leadType' },
  },

  // ── Lead 1 ──
  {
    id: 'lead-1',
    type: 'field-group',
    title: 'Lead 1 — Residence details',
    fields: [
      { name: 'l1LandlordName', type: 'text', label: 'Landlord name' },
      {
        name: 'l1Phone',
        type: 'tel',
        label: 'Landlord phone',
        validation: [{ type: 'phone', message: 'Please enter a valid phone number' }],
      },
      {
        name: 'l1LandlordInBuilding',
        type: 'select',
        label: 'Landlord lives in building?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      {
        name: 'l1Configuration',
        type: 'select',
        label: 'Configuration',
        options: [
          { label: '1 BHK', value: '1bhk' },
          { label: '2 BHK', value: '2bhk' },
          { label: '3 BHK', value: '3bhk' },
          { label: '4 BHK', value: '4bhk' },
          { label: 'Studio', value: 'studio' },
          { label: 'Duplex', value: 'duplex' },
          { label: 'Penthouse', value: 'penthouse' },
        ],
      },
      { name: 'l1UnitType', type: 'text', label: 'Unit type' },
      {
        name: 'l1Furnishing',
        type: 'select',
        label: 'Furnishing status',
        options: [
          { label: 'Fully Furnished', value: 'fully-furnished' },
          { label: 'Semi Furnished', value: 'semi-furnished' },
          { label: 'Unfurnished', value: 'unfurnished' },
        ],
      },
      { name: 'l1ApartmentNo', type: 'text', label: 'Apartment no' },
      { name: 'l1FloorNo', type: 'number', label: 'Floor no' },
      {
        name: 'l1Parking',
        type: 'select',
        label: 'Car parking?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      { name: 'l1AvailableFrom', type: 'text', label: 'Available from (date)' },
      { name: 'l1ExpectedRent', type: 'number', label: 'Expected rent' },
      { name: 'l1Comments', type: 'textarea', label: 'General comments' },
    ],
  },

  // Another lead?
  {
    id: 'has-more-leads',
    type: 'yes-no',
    title: 'Is there another lead in the same building?',
    validation: [{ type: 'required', message: 'Please select yes or no' }],
    meta: { fieldName: 'hasMoreLeads' },
  },

  // ── Lead 2 ──
  {
    id: 'lead-2',
    type: 'field-group',
    title: 'Lead 2 — Residence details',
    condition: { field: 'hasMoreLeads', operator: 'eq', value: 'yes' },
    fields: [
      { name: 'l2LandlordName', type: 'text', label: 'Landlord name' },
      {
        name: 'l2Phone',
        type: 'tel',
        label: 'Landlord phone',
        validation: [{ type: 'phone', message: 'Please enter a valid phone number' }],
      },
      {
        name: 'l2LandlordInBuilding',
        type: 'select',
        label: 'Landlord lives in building?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      {
        name: 'l2Configuration',
        type: 'select',
        label: 'Configuration',
        options: [
          { label: '1 BHK', value: '1bhk' },
          { label: '2 BHK', value: '2bhk' },
          { label: '3 BHK', value: '3bhk' },
          { label: '4 BHK', value: '4bhk' },
          { label: 'Studio', value: 'studio' },
          { label: 'Duplex', value: 'duplex' },
          { label: 'Penthouse', value: 'penthouse' },
        ],
      },
      { name: 'l2UnitType', type: 'text', label: 'Unit type' },
      {
        name: 'l2Furnishing',
        type: 'select',
        label: 'Furnishing status',
        options: [
          { label: 'Fully Furnished', value: 'fully-furnished' },
          { label: 'Semi Furnished', value: 'semi-furnished' },
          { label: 'Unfurnished', value: 'unfurnished' },
        ],
      },
      { name: 'l2ApartmentNo', type: 'text', label: 'Apartment no' },
      { name: 'l2FloorNo', type: 'number', label: 'Floor no' },
      {
        name: 'l2Parking',
        type: 'select',
        label: 'Car parking?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      { name: 'l2AvailableFrom', type: 'text', label: 'Available from (date)' },
      { name: 'l2ExpectedRent', type: 'number', label: 'Expected rent' },
      { name: 'l2Comments', type: 'textarea', label: 'General comments' },
    ],
  },

  // Third lead?
  {
    id: 'has-third-lead',
    type: 'yes-no',
    title: 'Is there a 3rd lead?',
    condition: { field: 'hasMoreLeads', operator: 'eq', value: 'yes' },
    validation: [{ type: 'required', message: 'Please select yes or no' }],
    meta: { fieldName: 'hasThirdLead' },
  },

  // ── Lead 3 ──
  {
    id: 'lead-3',
    type: 'field-group',
    title: 'Lead 3 — Residence details',
    condition: { field: 'hasThirdLead', operator: 'eq', value: 'yes' },
    fields: [
      { name: 'l3LandlordName', type: 'text', label: 'Landlord name' },
      {
        name: 'l3Phone',
        type: 'tel',
        label: 'Landlord phone',
        validation: [{ type: 'phone', message: 'Please enter a valid phone number' }],
      },
      {
        name: 'l3LandlordInBuilding',
        type: 'select',
        label: 'Landlord lives in building?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      {
        name: 'l3Configuration',
        type: 'select',
        label: 'Configuration',
        options: [
          { label: '1 BHK', value: '1bhk' },
          { label: '2 BHK', value: '2bhk' },
          { label: '3 BHK', value: '3bhk' },
          { label: '4 BHK', value: '4bhk' },
          { label: 'Studio', value: 'studio' },
          { label: 'Duplex', value: 'duplex' },
          { label: 'Penthouse', value: 'penthouse' },
        ],
      },
      { name: 'l3UnitType', type: 'text', label: 'Unit type' },
      {
        name: 'l3Furnishing',
        type: 'select',
        label: 'Furnishing status',
        options: [
          { label: 'Fully Furnished', value: 'fully-furnished' },
          { label: 'Semi Furnished', value: 'semi-furnished' },
          { label: 'Unfurnished', value: 'unfurnished' },
        ],
      },
      { name: 'l3ApartmentNo', type: 'text', label: 'Apartment no' },
      { name: 'l3FloorNo', type: 'number', label: 'Floor no' },
      {
        name: 'l3Parking',
        type: 'select',
        label: 'Car parking?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      { name: 'l3AvailableFrom', type: 'text', label: 'Available from (date)' },
      { name: 'l3ExpectedRent', type: 'number', label: 'Expected rent' },
      { name: 'l3Comments', type: 'textarea', label: 'General comments' },
    ],
  },

  // ── POC & Building ──
  {
    id: 'poc-type',
    type: 'dropdown',
    title: 'Point of contact type',
    options: [
      { label: 'Security Guard', value: 'security-guard' },
      { label: 'Society Manager', value: 'society-manager' },
      { label: 'Broker', value: 'broker' },
      { label: 'Resident', value: 'resident' },
      { label: 'Other', value: 'other' },
    ],
    meta: { fieldName: 'pocType' },
  },
  {
    id: 'poc-name',
    type: 'text-input',
    title: 'POC name',
    meta: { fieldName: 'pocName' },
  },
  {
    id: 'poc-phone',
    type: 'phone',
    title: 'POC phone number',
    meta: { fieldName: 'pocPhone' },
  },

  {
    id: 'confirmation',
    type: 'yes-no',
    title: 'Confirmed the lead details are accurate?',
    validation: [{ type: 'required', message: 'Please confirm' }],
    meta: { fieldName: 'confirmation' },
  },

  {
    id: 'building-configs',
    type: 'multi-select',
    title: 'Configurations available in the building',
    options: [
      { label: '1 BHK', value: '1bhk' },
      { label: '2 BHK', value: '2bhk' },
      { label: '3 BHK', value: '3bhk' },
      { label: '4 BHK', value: '4bhk' },
      { label: 'Studio', value: 'studio' },
      { label: 'Penthouse', value: 'penthouse' },
    ],
    meta: { fieldName: 'buildingConfigs' },
  },

  {
    id: 'family-only',
    type: 'yes-no',
    title: 'Family-only building?',
    meta: { fieldName: 'familyOnly' },
  },

  {
    id: 'other-availability',
    type: 'date',
    title: 'When will other residences be available?',
    meta: { fieldName: 'otherAvailabilityDate' },
  },

  {
    id: 'building-details',
    type: 'field-group',
    title: 'Building details',
    fields: [
      { name: 'numberOfFloors', type: 'number', label: 'Number of floors' },
      {
        name: 'liftPresent',
        type: 'select',
        label: 'Lift present?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
    ],
  },

  {
    id: 'amenities',
    type: 'multi-select',
    title: 'Available amenities',
    options: [
      { label: 'Gym', value: 'gym' },
      { label: 'Swimming Pool', value: 'swimming-pool' },
      { label: 'Club House', value: 'club-house' },
      { label: 'Power Backup', value: 'power-backup' },
      { label: 'Security', value: 'security' },
      { label: 'Parking', value: 'parking' },
      { label: 'Garden', value: 'garden' },
      { label: 'Play Area', value: 'play-area' },
      { label: 'Intercom', value: 'intercom' },
    ],
    meta: { fieldName: 'amenities' },
  },

  {
    id: 'exterior-photo',
    type: 'file-upload',
    title: 'Upload exterior photo',
    fileUpload: {
      accept: ['.jpg', '.jpeg', '.png'],
      maxSizeMB: 10,
      label: 'Upload exterior photo',
    },
    validation: [{ type: 'required', message: 'Exterior photo is required' }],
    meta: { fieldName: 'exteriorPhoto' },
  },

  {
    id: 'drive-link',
    type: 'text-input',
    title: 'Google Drive link for photos/videos',
    validation: [{ type: 'required', message: 'Drive link is required' }],
    meta: { fieldName: 'driveLink' },
  },

  {
    id: 'general-building-info',
    type: 'long-text',
    title: 'Building info',
    meta: { fieldName: 'buildingInfo' },
  },

  {
    id: 'neighbourhood-info',
    type: 'long-text',
    title: 'Neighbourhood info',
    meta: { fieldName: 'neighbourhoodInfo' },
  },
];
