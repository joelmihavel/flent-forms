import { create } from 'zustand';
import type { FormStep, StepType } from '../../schema/types';

export interface CustomFormData {
  id: string;
  name: string;
  description: string;
  category: 'Custom';
  steps: FormStep[];
  successTitle: string;
  successSubtitle: string;
  webhookUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface BuilderState {
  formId: string;
  formName: string;
  formDescription: string;
  steps: FormStep[];
  selectedStepIndex: number | null;
  isDirty: boolean;
  successTitle: string;
  successSubtitle: string;
  webhookUrl: string;

  addStep: (type: StepType, afterIndex?: number) => void;
  removeStep: (index: number) => void;
  moveStep: (from: number, to: number) => void;
  duplicateStep: (index: number) => void;
  updateStep: (index: number, updates: Partial<FormStep>) => void;
  selectStep: (index: number | null) => void;
  setFormName: (name: string) => void;
  setFormDescription: (desc: string) => void;
  setSuccessTitle: (title: string) => void;
  setSuccessSubtitle: (subtitle: string) => void;
  setWebhookUrl: (url: string) => void;
  saveForm: () => string;
  loadForm: (formId: string) => boolean;
  newForm: () => void;
  reset: () => void;
}

function generateId() {
  return `step_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function generateFormId() {
  return `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

const DEFAULT_STEP_CONFIGS: Record<StepType, () => Partial<FormStep>> = {
  'welcome': () => ({
    title: 'Welcome!',
    subtitle: 'Tell us about yourself.',
    meta: { ctaLabel: 'Get Started', estimatedTime: '~5 min' },
  }),
  'text-input': () => ({
    title: 'Your answer',
    fields: [{ name: `field_${generateId()}`, type: 'text', label: 'Answer', placeholder: 'Type your answer...', required: false }],
  }),
  'long-text': () => ({
    title: 'Tell us more',
    meta: { fieldName: `longtext_${generateId()}` },
  }),
  'single-select': () => ({
    title: 'Choose one',
    options: [
      { label: 'Option 1', value: 'option_1' },
      { label: 'Option 2', value: 'option_2' },
    ],
    meta: { fieldName: `select_${generateId()}` },
  }),
  'multi-select': () => ({
    title: 'Choose all that apply',
    options: [
      { label: 'Option 1', value: 'option_1' },
      { label: 'Option 2', value: 'option_2' },
    ],
    meta: { fieldName: `multiselect_${generateId()}` },
  }),
  'dropdown': () => ({
    title: 'Select from list',
    options: [
      { label: 'Option 1', value: 'option_1' },
      { label: 'Option 2', value: 'option_2' },
    ],
    meta: { fieldName: `dropdown_${generateId()}` },
  }),
  'yes-no': () => ({
    title: 'Yes or no?',
    meta: { fieldName: `yesno_${generateId()}` },
  }),
  'number-picker': () => ({
    title: 'Pick a number',
    fields: [{ name: `number_${generateId()}`, type: 'number', label: 'Number', validation: [{ type: 'min', params: { min: 0 }, message: 'Minimum is 0' }] }],
  }),
  'field-group': () => ({
    title: 'Your details',
    fields: [
      { name: 'firstName', type: 'text', label: 'First name', placeholder: 'Enter first name', required: true },
      { name: 'lastName', type: 'text', label: 'Last name', placeholder: 'Enter last name', required: true },
    ],
  }),
  'file-upload': () => ({
    title: 'Upload a file',
    fileUpload: { accept: ['.jpg', '.jpeg', '.png', '.pdf'], maxSizeMB: 10, label: 'Upload file' },
    meta: { fieldName: `file_${generateId()}` },
  }),
  'info-screen': () => ({
    title: 'Information',
    subtitle: 'Here is some important information.',
    meta: { icon: '📋' },
  }),
  'review': () => ({
    title: 'Review Your Details',
    subtitle: 'Please review all information before submitting.',
  }),
  'rating': () => ({
    title: 'Rate your experience',
    ratingMax: 5,
    meta: { fieldName: `rating_${generateId()}` },
  }),
  'nps': () => ({
    title: 'How likely are you to recommend us?',
    npsLabels: { low: 'Not at all likely', high: 'Extremely likely' },
    meta: { fieldName: `nps_${generateId()}` },
  }),
  'opinion-scale': () => ({
    title: 'Rate on a scale',
    npsLabels: { low: 'Strongly disagree', high: 'Strongly agree' },
    meta: { fieldName: `opinion_${generateId()}` },
  }),
  'date': () => ({
    title: 'Select a date',
    meta: { fieldName: `date_${generateId()}` },
  }),
  'matrix': () => ({
    title: 'Rate each item',
    matrix: {
      rows: [
        { id: 'row_1', label: 'Item 1' },
        { id: 'row_2', label: 'Item 2' },
      ],
      columns: [
        { label: 'Poor', value: 'poor' },
        { label: 'Average', value: 'average' },
        { label: 'Good', value: 'good' },
        { label: 'Excellent', value: 'excellent' },
      ],
    },
    meta: { fieldName: `matrix_${generateId()}` },
  }),
  'phone': () => ({
    title: 'Your phone number',
    meta: { fieldName: `phone_${generateId()}` },
  }),
  'checkbox': () => ({
    title: 'Please acknowledge',
    checkboxItems: ['I agree to the terms and conditions'],
    meta: { fieldName: `checkbox_${generateId()}` },
  }),
};

function createStep(type: StepType): FormStep {
  const defaults = DEFAULT_STEP_CONFIGS[type]();
  return {
    id: generateId(),
    type,
    title: '',
    ...defaults,
  };
}

const STORAGE_KEY = 'flent-custom-forms';

function loadCustomForms(): CustomFormData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustomForms(forms: CustomFormData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}

export function getCustomForms(): CustomFormData[] {
  return loadCustomForms();
}

export function deleteCustomForm(formId: string) {
  const forms = loadCustomForms().filter(f => f.id !== formId);
  saveCustomForms(forms);
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  formId: '',
  formName: 'Untitled Form',
  formDescription: '',
  steps: [],
  selectedStepIndex: null,
  isDirty: false,
  successTitle: "You're all set!",
  successSubtitle: 'Thanks for your submission.',
  webhookUrl: '',

  addStep: (type, afterIndex) => {
    const step = createStep(type);
    set((state) => {
      const newSteps = [...state.steps];
      const insertAt = afterIndex !== undefined ? afterIndex + 1 : newSteps.length;
      newSteps.splice(insertAt, 0, step);
      return { steps: newSteps, selectedStepIndex: insertAt, isDirty: true };
    });
  },

  removeStep: (index) => {
    set((state) => {
      const newSteps = state.steps.filter((_, i) => i !== index);
      let newSelected = state.selectedStepIndex;
      if (newSelected !== null) {
        if (newSelected === index) {
          newSelected = newSteps.length > 0 ? Math.min(index, newSteps.length - 1) : null;
        } else if (newSelected > index) {
          newSelected--;
        }
      }
      return { steps: newSteps, selectedStepIndex: newSelected, isDirty: true };
    });
  },

  moveStep: (from, to) => {
    set((state) => {
      if (to < 0 || to >= state.steps.length) return state;
      const newSteps = [...state.steps];
      const [moved] = newSteps.splice(from, 1);
      newSteps.splice(to, 0, moved);
      return { steps: newSteps, selectedStepIndex: to, isDirty: true };
    });
  },

  duplicateStep: (index) => {
    set((state) => {
      const original = state.steps[index];
      const copy: FormStep = {
        ...structuredClone(original),
        id: generateId(),
        title: `${original.title} (copy)`,
      };
      const newSteps = [...state.steps];
      newSteps.splice(index + 1, 0, copy);
      return { steps: newSteps, selectedStepIndex: index + 1, isDirty: true };
    });
  },

  updateStep: (index, updates) => {
    set((state) => {
      const newSteps = [...state.steps];
      newSteps[index] = { ...newSteps[index], ...updates };
      return { steps: newSteps, isDirty: true };
    });
  },

  selectStep: (index) => set({ selectedStepIndex: index }),

  setFormName: (name) => set({ formName: name, isDirty: true }),
  setFormDescription: (desc) => set({ formDescription: desc, isDirty: true }),
  setSuccessTitle: (title) => set({ successTitle: title, isDirty: true }),
  setSuccessSubtitle: (subtitle) => set({ successSubtitle: subtitle, isDirty: true }),
  setWebhookUrl: (url) => set({ webhookUrl: url, isDirty: true }),

  saveForm: () => {
    const state = get();
    const formId = state.formId || generateFormId();
    const now = new Date().toISOString();
    const forms = loadCustomForms();
    const existing = forms.findIndex(f => f.id === formId);

    const welcomeStep = state.steps.find(s => s.type === 'welcome');
    if (welcomeStep) {
      welcomeStep.meta = {
        ...welcomeStep.meta,
        successTitle: state.successTitle,
        successSubtitle: state.successSubtitle,
      };
    } else if (state.steps.length > 0) {
      state.steps[0].meta = {
        ...state.steps[0].meta,
        successTitle: state.successTitle,
        successSubtitle: state.successSubtitle,
      };
    }

    const formData: CustomFormData = {
      id: formId,
      name: state.formName,
      description: state.formDescription,
      category: 'Custom',
      steps: state.steps,
      successTitle: state.successTitle,
      successSubtitle: state.successSubtitle,
      webhookUrl: state.webhookUrl,
      createdAt: existing >= 0 ? forms[existing].createdAt : now,
      updatedAt: now,
    };

    if (existing >= 0) {
      forms[existing] = formData;
    } else {
      forms.push(formData);
    }

    saveCustomForms(forms);
    set({ formId, isDirty: false });
    return formId;
  },

  loadForm: (formId) => {
    const forms = loadCustomForms();
    const form = forms.find(f => f.id === formId);
    if (!form) return false;
    set({
      formId: form.id,
      formName: form.name,
      formDescription: form.description,
      steps: form.steps,
      selectedStepIndex: form.steps.length > 0 ? 0 : null,
      isDirty: false,
      successTitle: form.successTitle,
      successSubtitle: form.successSubtitle,
      webhookUrl: form.webhookUrl,
    });
    return true;
  },

  newForm: () => {
    set({
      formId: '',
      formName: 'Untitled Form',
      formDescription: '',
      steps: [],
      selectedStepIndex: null,
      isDirty: false,
      successTitle: "You're all set!",
      successSubtitle: 'Thanks for your submission.',
      webhookUrl: '',
    });
  },

  reset: () => {
    set({
      formId: '',
      formName: 'Untitled Form',
      formDescription: '',
      steps: [],
      selectedStepIndex: null,
      isDirty: false,
      successTitle: "You're all set!",
      successSubtitle: 'Thanks for your submission.',
      webhookUrl: '',
    });
  },
}));
