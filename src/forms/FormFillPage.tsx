import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import './forms.css';

const formComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {
  'homeowner-onboarding': lazy(() => import('./forms/homeowner/index')),
  'landlord-onboarding-basic': lazy(() => import('./forms/landlord-onboarding-basic/index')),
  'landlord-onboarding': lazy(() => import('./forms/landlord-onboarding/index')),
  'property-lead-capture-v1': lazy(() => import('./forms/property-lead-capture-v1/index')),
  'nps-feedback': lazy(() => import('./forms/nps-feedback/index')),
  'secured-feedback': lazy(() => import('./forms/secured-feedback/index')),
  'home-visit-feedback': lazy(() => import('./forms/home-visit-feedback/index')),
  'post-movein-feedback': lazy(() => import('./forms/post-movein-feedback/index')),
  'tenant-onboarding': lazy(() => import('./forms/tenant-onboarding/index')),
  'landlord-inbound': lazy(() => import('./forms/landlord-inbound/index')),
  'landlord-property-details': lazy(() => import('./forms/landlord-property-details/index')),
  'supply-property-details': lazy(() => import('./forms/supply-property-details/index')),
  'supply-product-handover': lazy(() => import('./forms/supply-product-handover/index')),
  'property-info-capture': lazy(() => import('./forms/property-info-capture/index')),
  'property-lead-capture': lazy(() => import('./forms/property-lead-capture/index')),
  'contract-creation': lazy(() => import('./forms/contract-creation/index')),
  'mygate-referrals': lazy(() => import('./forms/mygate-referrals/index')),
  'flent-vs-rent': lazy(() => import('./forms/flent-vs-rent/index')),
  'waitlist': lazy(() => import('./forms/waitlist/index')),
  'unoccupied-invite': lazy(() => import('./forms/unoccupied-invite/index')),
  'moveout': lazy(() => import('./forms/moveout/index')),
  'reserve-intent': lazy(() => import('./forms/reserve-intent/index')),
};

export const FormFillPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const FormComponent = formId ? formComponents[formId] : undefined;

  if (!FormComponent) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: '#8C8C8C',
        }}
      >
        Form not found.
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: '#8C8C8C',
          }}
        >
          Loading...
        </div>
      }
    >
      <FormComponent />
    </Suspense>
  );
};
