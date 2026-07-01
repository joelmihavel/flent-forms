import type { ComponentType } from 'react';
import type { FormStep } from './schema/types';
import { onboardingSchema } from './schema/onboarding.schema';
import { schema as supplyPropertyDetailsSchema } from './forms/supply-property-details/schema';
import { schema as propertyLeadCaptureSchema } from './forms/property-lead-capture/schema';
import { schema as npsFeedbackSchema } from './forms/nps-feedback/schema';
import { schema as tenantOnboardingSchema } from './forms/tenant-onboarding/schema';
import { schema as securedFeedbackSchema } from './forms/secured-feedback/schema';
import { schema as propertyInfoCaptureSchema } from './forms/property-info-capture/schema';
import { schema as landlordPropertyDetailsSchema } from './forms/landlord-property-details/schema';
import { schema as unoccupiedInviteSchema } from './forms/unoccupied-invite/schema';
import { schema as contractCreationSchema } from './forms/contract-creation/schema';
import { schema as supplyProductHandoverSchema } from './forms/supply-product-handover/schema';
import { schema as mygateReferralsSchema } from './forms/mygate-referrals/schema';
import { schema as landlordInboundSchema } from './forms/landlord-inbound/schema';
import { schema as reserveIntentSchema } from './forms/reserve-intent/schema';
import { schema as moveoutSchema } from './forms/moveout/schema';
import { schema as homeVisitFeedbackSchema } from './forms/home-visit-feedback/schema';
import { schema as postMoveinFeedbackSchema } from './forms/post-movein-feedback/schema';
import { schema as waitlistSchema } from './forms/waitlist/schema';
import { schema as flentVsRentSchema } from './forms/flent-vs-rent/schema';
import { schema as landlordOnboardingBasicSchema } from './forms/landlord-onboarding-basic/schema';
import { schema as landlordOnboardingSchema } from './forms/landlord-onboarding/schema';
import { schema as propertyLeadCaptureV1Schema } from './forms/property-lead-capture-v1/schema';

import {
  IconBuildingSkyscraper,
  IconChartBar,
  IconDoorEnter,
  IconFileCheck,
  IconFileText,
  IconFlag,
  IconHeart,
  IconHome,
  IconKey,
  IconListCheck,
  IconLogout,
  IconMail,
  IconMessage,
  IconMoodSmile,
  IconNotes,
  IconSearch,
  IconSend,
  IconShield,
  IconStar,
  IconTarget,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';

export type FormCategory = 'Supply' | 'Demand';

export type FormEntry = {
  id: string;
  name: string;
  description: string;
  category: FormCategory;
  tag: string;
  steps: FormStep[];
  formUrl: string;
  icon: ComponentType<{ size?: number }>;
};

export const FORM_REGISTRY: FormEntry[] = [
  // ── Supply ──────────────────────────────────────────────
  {
    id: 'supply-property-details',
    name: 'Supply Property Details',
    description: 'Internal property audit form for listing preparation.',
    category: 'Supply',
    tag: 'Operations',
    steps: supplyPropertyDetailsSchema,
    formUrl: '/forms/supply-property-details',
    icon: IconBuildingSkyscraper,
  },
  {
    id: 'property-lead-capture',
    name: 'Property Lead Capture',
    description: 'Multi-lead capture with L1/L2/L3 sections and building details.',
    category: 'Supply',
    tag: 'Lead Capture',
    steps: propertyLeadCaptureSchema,
    formUrl: '/forms/property-lead-capture',
    icon: IconSearch,
  },
  {
    id: 'property-lead-capture-v1',
    name: 'Property Lead Capture (V1)',
    description: 'Older single-lead property capture with construction status and availability.',
    category: 'Supply',
    tag: 'Lead Capture',
    steps: propertyLeadCaptureV1Schema,
    formUrl: '/forms/property-lead-capture-v1',
    icon: IconNotes,
  },
  {
    id: 'landlord-onboarding-basic',
    name: 'Landlord Onboarding (Basic)',
    description: 'Multi-homeowner onboarding with Aadhaar, PAN, bank accounts, and POC details.',
    category: 'Supply',
    tag: 'Onboarding',
    steps: landlordOnboardingBasicSchema,
    formUrl: '/forms/landlord-onboarding-basic',
    icon: IconShield,
  },
  {
    id: 'homeowner-onboarding',
    name: 'Homeowner Onboarding',
    description: 'Captures property details, PAN/Aadhaar, and bank account details for security deposit and rent processing.',
    category: 'Supply',
    tag: 'Onboarding',
    steps: onboardingSchema,
    formUrl: '/forms/homeowner-onboarding',
    icon: IconKey,
  },
  {
    id: 'landlord-onboarding',
    name: 'Landlord Onboarding',
    description: 'Single-homeowner onboarding with identity docs, utilities, and bank details.',
    category: 'Supply',
    tag: 'Onboarding',
    steps: landlordOnboardingSchema,
    formUrl: '/forms/landlord-onboarding',
    icon: IconFileCheck,
  },
  {
    id: 'landlord-inbound',
    name: 'Landlord Inbound',
    description: 'Lead capture for landlords interested in Flent property management.',
    category: 'Supply',
    tag: 'Lead Capture',
    steps: landlordInboundSchema,
    formUrl: '/forms/landlord-inbound',
    icon: IconMail,
  },
  {
    id: 'landlord-property-details',
    name: 'Landlord Property Details',
    description: 'Detailed utility, parking, and house rules collection from landlords.',
    category: 'Supply',
    tag: 'Onboarding',
    steps: landlordPropertyDetailsSchema,
    formUrl: '/forms/landlord-property-details',
    icon: IconHome,
  },
  {
    id: 'property-info-capture',
    name: 'Property Info Capture',
    description: 'Internal ops form for capturing detailed property and society information.',
    category: 'Supply',
    tag: 'Operations',
    steps: propertyInfoCaptureSchema,
    formUrl: '/forms/property-info-capture',
    icon: IconListCheck,
  },
  {
    id: 'contract-creation',
    name: 'Contract Creation',
    description: 'Contract details intake for rental agreement generation.',
    category: 'Supply',
    tag: 'Operations',
    steps: contractCreationSchema,
    formUrl: '/forms/contract-creation',
    icon: IconFileText,
  },
  {
    id: 'supply-product-handover',
    name: 'Supply → Product Handover',
    description: 'Internal handover checklist from supply to operations.',
    category: 'Supply',
    tag: 'Operations',
    steps: supplyProductHandoverSchema,
    formUrl: '/forms/supply-product-handover',
    icon: IconSend,
  },
  {
    id: 'mygate-referrals',
    name: 'MyGate Referrals',
    description: 'MyGate partnership referral capture form.',
    category: 'Supply',
    tag: 'Lead Capture',
    steps: mygateReferralsSchema,
    formUrl: '/forms/mygate-referrals',
    icon: IconUsers,
  },

  // ── Demand ──────────────────────────────────────────────
  {
    id: 'tenant-onboarding',
    name: 'Tenant Onboarding',
    description: 'Comprehensive tenant profile, identity, and preference collection.',
    category: 'Demand',
    tag: 'Onboarding',
    steps: tenantOnboardingSchema,
    formUrl: '/forms/tenant-onboarding',
    icon: IconDoorEnter,
  },
  {
    id: 'reserve-intent',
    name: 'Flent Reserve — Intent',
    description: 'Captures prospect intent to reserve a home before move-in.',
    category: 'Demand',
    tag: 'Lead Capture',
    steps: reserveIntentSchema,
    formUrl: '/forms/reserve-intent',
    icon: IconTarget,
  },
  {
    id: 'waitlist',
    name: 'Waitlist',
    description: 'Prospect waitlist with flatmate compatibility questionnaire.',
    category: 'Demand',
    tag: 'Lead Capture',
    steps: waitlistSchema,
    formUrl: '/forms/waitlist',
    icon: IconUser,
  },
  {
    id: 'flent-vs-rent',
    name: 'Flent vs Rent',
    description: 'Comparison calculator capturing current rent vs Flent offering.',
    category: 'Demand',
    tag: 'Lead Capture',
    steps: flentVsRentSchema,
    formUrl: '/forms/flent-vs-rent',
    icon: IconChartBar,
  },
  {
    id: 'unoccupied-invite',
    name: '[un]occupied Invite',
    description: 'Event invite form for prospects to visit unoccupied homes.',
    category: 'Demand',
    tag: 'Events',
    steps: unoccupiedInviteSchema,
    formUrl: '/forms/unoccupied-invite',
    icon: IconFlag,
  },
  {
    id: 'home-visit-feedback',
    name: 'Home Visit Feedback',
    description: 'Post-viewing feedback capturing prospect impressions and objections.',
    category: 'Demand',
    tag: 'Feedback',
    steps: homeVisitFeedbackSchema,
    formUrl: '/forms/home-visit-feedback',
    icon: IconMessage,
  },
  {
    id: 'nps-feedback',
    name: 'NPS Feedback',
    description: 'Tenant experience rating with conditional follow-up based on score.',
    category: 'Demand',
    tag: 'Feedback',
    steps: npsFeedbackSchema,
    formUrl: '/forms/nps-feedback',
    icon: IconStar,
  },
  {
    id: 'secured-feedback',
    name: 'Secured Feedback',
    description: 'Post-move-in feedback for the Secured tier experience.',
    category: 'Demand',
    tag: 'Feedback',
    steps: securedFeedbackSchema,
    formUrl: '/forms/secured-feedback',
    icon: IconHeart,
  },
  {
    id: 'post-movein-feedback',
    name: '1-Month Post Move-in',
    description: 'Captures tenant satisfaction after move-in across multiple dimensions.',
    category: 'Demand',
    tag: 'Feedback',
    steps: postMoveinFeedbackSchema,
    formUrl: '/forms/post-movein-feedback',
    icon: IconMoodSmile,
  },
  {
    id: 'moveout',
    name: 'Move-out',
    description: 'Tenant move-out survey capturing reasons and feedback.',
    category: 'Demand',
    tag: 'Offboarding',
    steps: moveoutSchema,
    formUrl: '/forms/moveout',
    icon: IconLogout,
  },
];
