export interface HomeownerData {
  firstName: string;
  lastName: string;
  phone: string;
  phoneVerified: boolean;
  email: string;
  aadhaarFront: UploadedFile | null;
  aadhaarBack: UploadedFile | null;
  aadhaarOCR: OCRResult | null;
  pan: string;
  panVerified: boolean;
  panName: string;
  panCard: UploadedFile | null;
}

export interface BankAccount {
  beneficiaryName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  bankName: string;
  ifscCode: string;
  branchName: string;
  verified: boolean;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface OCRResult {
  name?: string;
  dob?: string;
  aadhaarNumber?: string;
  address?: string;
  fatherName?: string;
}

export interface FormData {
  role: 'owner' | 'poc' | 'both' | '';
  homeownerCount: number;
  homeowners: HomeownerData[];
  propertyDocument: UploadedFile | null;
  bankAccountCount: number;
  bankAccounts: BankAccount[];
  poc: ContactInfo;
  backupContact: ContactInfo;
  consent: boolean;
}

export const createEmptyHomeowner = (): HomeownerData => ({
  firstName: '',
  lastName: '',
  phone: '',
  phoneVerified: false,
  email: '',
  aadhaarFront: null,
  aadhaarBack: null,
  aadhaarOCR: null,
  pan: '',
  panVerified: false,
  panName: '',
  panCard: null,
});

export const createEmptyBankAccount = (): BankAccount => ({
  beneficiaryName: '',
  accountNumber: '',
  confirmAccountNumber: '',
  bankName: '',
  ifscCode: '',
  branchName: '',
  verified: false,
});

export const createEmptyContact = (): ContactInfo => ({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
});

export const createInitialFormData = (): FormData => ({
  role: '',
  homeownerCount: 1,
  homeowners: [createEmptyHomeowner()],
  propertyDocument: null,
  bankAccountCount: 1,
  bankAccounts: [createEmptyBankAccount()],
  poc: createEmptyContact(),
  backupContact: createEmptyContact(),
  consent: false,
});
