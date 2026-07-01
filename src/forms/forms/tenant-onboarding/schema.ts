import type { FormStep } from '../../schema/types';

export const schema: FormStep[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: "Let's get you settled.",
    subtitle:
      "We need a few details to make your move-in smooth. Keep your documents handy.",
    meta: {
      overline: 'Welcome Home',
      ctaLabel: "Let's Go",
      estimatedTime: '~10 min',
      audience: 'tenant',
      documentsRequired: ['Aadhaar Card', 'PAN Card', 'UAN Number'],
      successTitle: 'Welcome to Flent.',
      successSubtitle:
        "Your home is ready for you. We'll handle the rest.",
      hiddenFields: [
        { name: 'hubspot_utk', source: 'url' },
        { name: 'hubspot_page_name', source: 'url' },
        { name: 'hubspot_page_url', source: 'url' },
      ],
    },
  },

  // The basics
  {
    id: 'contact-basics',
    type: 'field-group',
    title: 'Tell us about yourself',
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

  {
    id: 'company',
    type: 'text-input',
    title: 'Where do you work?',
    validation: [{ type: 'required', message: 'Please enter your company name' }],
    meta: { fieldName: 'company' },
  },

  // Referral / voucher
  {
    id: 'has-referral',
    type: 'single-select',
    title: 'Do you have a referral or a voucher code?',
    options: [
      { label: 'Yes, I have a referral', value: 'referral' },
      { label: 'Yes, I have a voucher code', value: 'voucher' },
      { label: 'No', value: 'no' },
    ],
    meta: { fieldName: 'hasReferral' },
  },
  {
    id: 'referral-info',
    type: 'field-group',
    title: 'Tell us about your referral',
    condition: { field: 'hasReferral', operator: 'eq', value: 'referral' },
    fields: [
      { name: 'referralFriendName', type: 'text', label: "Friend's name", required: true },
      { name: 'referralFriendContact', type: 'text', label: "Friend's contact details", required: true },
    ],
  },
  {
    id: 'voucher-code',
    type: 'text-input',
    title: 'Enter your voucher code',
    condition: { field: 'hasReferral', operator: 'eq', value: 'voucher' },
    meta: { fieldName: 'voucherCode' },
  },

  // Social & role
  {
    id: 'linkedin',
    type: 'text-input',
    title: 'Can you paste your LinkedIn profile URL here?',
    validation: [{ type: 'required', message: 'We need your LinkedIn profile' }],
    meta: { fieldName: 'linkedin' },
  },
  {
    id: 'twitter-handle',
    type: 'text-input',
    title: 'Do you mind sharing your X handle?',
    meta: { fieldName: 'twitterHandle' },
  },
  {
    id: 'role',
    type: 'text-input',
    title: "What's your role at {{field:company}}?",
    validation: [{ type: 'required', message: 'Please enter your role' }],
    meta: { fieldName: 'role' },
  },

  // Identity section
  {
    id: 'identity-info',
    type: 'info-screen',
    title: 'A couple more about you',
    subtitle: 'Quick identity details to help us set things up.',
  },

  {
    id: 'gender',
    type: 'single-select',
    title: 'How do you identify yourself?',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Others', value: 'others' },
    ],
    validation: [{ type: 'required', message: 'Please select an option' }],
    meta: { fieldName: 'gender' },
  },

  {
    id: 'age',
    type: 'text-input',
    title: "What's your age?",
    validation: [{ type: 'required', message: 'Please enter your age' }],
    meta: { fieldName: 'age' },
  },

  // Discovery
  {
    id: 'discovery-source',
    type: 'single-select',
    title: 'How did you first hear about Flent?',
    options: [
      { label: 'Instagram', value: 'instagram' },
      { label: 'LinkedIn', value: 'linkedin' },
      { label: 'Google', value: 'google' },
      { label: 'Friend referral', value: 'friend' },
      { label: 'Broker', value: 'broker' },
      { label: 'Facebook', value: 'facebook' },
      { label: 'Twitter/X', value: 'twitter' },
      { label: 'OLX / NoBroker', value: 'olx-nobroker' },
      { label: 'Other', value: 'other' },
    ],
    meta: { fieldName: 'discoverySource' },
  },

  // Documents section
  {
    id: 'docs-info',
    type: 'info-screen',
    title: 'Get your Aadhaar, PAN & UAN ready',
    subtitle: "You'll need them in the next steps.",
    meta: { icon: '📋' },
  },

  {
    id: 'aadhaar-front',
    type: 'file-upload',
    title: 'Upload your Aadhaar (front)',
    fileUpload: {
      accept: ['.jpg', '.jpeg', '.png', '.pdf'],
      maxSizeMB: 5,
      label: 'Upload Aadhaar front',
    },
    validation: [{ type: 'required', message: 'Aadhaar front is required' }],
    meta: { fieldName: 'aadhaarFront' },
  },
  {
    id: 'aadhaar-back',
    type: 'file-upload',
    title: 'Upload your Aadhaar (back)',
    fileUpload: {
      accept: ['.jpg', '.jpeg', '.png', '.pdf'],
      maxSizeMB: 5,
      label: 'Upload Aadhaar back',
    },
    validation: [{ type: 'required', message: 'Aadhaar back is required' }],
    meta: { fieldName: 'aadhaarBack' },
  },
  {
    id: 'aadhaar-number',
    type: 'text-input',
    title: 'Enter your Aadhaar number',
    validation: [{ type: 'required', message: 'Aadhaar number is required' }],
    meta: { fieldName: 'aadhaarNumber' },
  },
  {
    id: 'pan-upload',
    type: 'file-upload',
    title: 'Upload your PAN card (front)',
    fileUpload: {
      accept: ['.jpg', '.jpeg', '.png', '.pdf'],
      maxSizeMB: 5,
      label: 'Upload PAN card',
    },
    validation: [{ type: 'required', message: 'PAN card upload is required' }],
    meta: { fieldName: 'panCard' },
  },

  // Verification details
  {
    id: 'verification-details',
    type: 'field-group',
    title: 'Verification details',
    fields: [
      {
        name: 'panNumber',
        type: 'text',
        label: 'PAN number',
        required: true,
        validation: [{ type: 'pan', message: 'Please enter a valid PAN number' }],
      },
      { name: 'uanNumber', type: 'text', label: 'UAN number', required: true },
      { name: 'dateOfBirth', type: 'text', label: 'Date of birth', required: true },
    ],
  },

  // Final personal details
  {
    id: 'final-details',
    type: 'field-group',
    title: 'A few final details',
    fields: [
      { name: 'fatherName', type: 'text', label: "Father's name", required: true },
      { name: 'permanentAddress', type: 'textarea', label: 'Permanent address', required: true },
    ],
  },

  // Preferences section
  {
    id: 'preferences-info',
    type: 'info-screen',
    title: 'Onto the fun stuff',
    subtitle: "Tell us about your food, smoking, and living preferences.",
  },

  {
    id: 'food-prefs',
    type: 'single-select',
    title: 'What are your food preferences?',
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
    title: 'Are you ok with non-veg in the house?',
    options: [
      { label: 'Yes, absolutely', value: 'yes' },
      { label: "No, I'd prefer a vegetarian household", value: 'no' },
    ],
    meta: { fieldName: 'nonVegOk' },
  },

  {
    id: 'smoking-status',
    type: 'single-select',
    title: 'Do you smoke?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: 'Occasionally', value: 'occasionally' },
    ],
    meta: { fieldName: 'smokingStatus' },
  },
  {
    id: 'smoking-flatmates-ok',
    type: 'single-select',
    title: 'Are you okay with flatmates who smoke?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
      { label: "Doesn't matter", value: 'doesnt-matter' },
    ],
    meta: { fieldName: 'smokingFlatmatesOk' },
  },

  {
    id: 'parking',
    type: 'single-select',
    title: 'Do you need parking?',
    options: [
      { label: 'Yes, 2-wheeler', value: '2-wheeler' },
      { label: 'Yes, 4-wheeler', value: '4-wheeler' },
      { label: 'Yes, both', value: 'both' },
      { label: 'No', value: 'none' },
    ],
    meta: { fieldName: 'parking' },
  },

  // Room & lease
  {
    id: 'room-id',
    type: 'text-input',
    title: "What's your Room ID?",
    validation: [{ type: 'required', message: 'Room ID is required' }],
    meta: { fieldName: 'roomId' },
  },
  {
    id: 'lock-in-period',
    type: 'single-select',
    title: "What's your lock-in period?",
    options: [
      { label: '6 months', value: '6' },
      { label: '11 months', value: '11' },
      { label: 'Other', value: 'other' },
    ],
    meta: { fieldName: 'lockInPeriod' },
  },
  {
    id: 'moving-from',
    type: 'single-select',
    title: 'Where are you moving from?',
    options: [
      { label: 'Another city', value: 'another-city' },
      { label: 'Within Bangalore', value: 'bangalore' },
      { label: "Parents' home", value: 'parents-home' },
      { label: 'Another Flent home', value: 'another-flent' },
      { label: 'Other', value: 'other' },
    ],
    meta: { fieldName: 'movingFrom' },
  },

  // Consents
  {
    id: 'consent-website',
    type: 'yes-no',
    title: 'Are you ok with your info being used on our website in a masked manner?',
    validation: [{ type: 'required', message: 'Please select yes or no' }],
    meta: { fieldName: 'consentWebsite' },
  },
  {
    id: 'consent-bg-check',
    type: 'checkbox',
    title: 'One last thing',
    checkboxItems: [
      'I consent to a background verification check and to sharing my contact details with confirmed housemates, the landlord, and parties associated with Flent.',
    ],
    validation: [{ type: 'required', message: 'You must consent to proceed' }],
    meta: { fieldName: 'consentBgCheck' },
  },

  {
    id: 'agreement-start-date',
    type: 'date',
    title: 'Agreement start date',
    validation: [{ type: 'required', message: 'Please select a date' }],
    meta: { fieldName: 'agreementStartDate' },
  },
];
