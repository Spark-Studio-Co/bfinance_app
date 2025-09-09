import { create } from 'zustand';

export type WithdrawalStep =
  | 'crypto-selection'
  | 'network-selection'
  | 'form'
  | 'confirmation'
  | 'success';

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
}

export interface NetworkData {
  id: string;
  name: string;
  symbol: string;
}

export interface FormData {
  walletAddress: string;
  amount: string;
}

interface WithdrawalStore {
  // State
  currentStep: WithdrawalStep;
  selectedCrypto: CryptoData | null;
  selectedNetwork: NetworkData | null;
  formData: FormData;

  // Actions
  setCurrentStep: (step: WithdrawalStep) => void;
  setSelectedCrypto: (crypto: CryptoData) => void;
  setSelectedNetwork: (network: NetworkData) => void;
  setFormData: (data: FormData) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;

  // Computed
  canProceed: () => boolean;
  getButtonText: () => string;
  getTitle: () => string;
}
const initialFormData: FormData = {
  walletAddress: '',
  amount: '',
};

export const useWithdrawalStore = create<WithdrawalStore>((set, get) => ({
  // Initial state
  currentStep: 'crypto-selection',
  selectedCrypto: null,
  selectedNetwork: null,
  formData: initialFormData,

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),

  setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto }),

  setSelectedNetwork: (network) => set({ selectedNetwork: network }),

  setFormData: (data) => set({ formData: data }),
  nextStep: () => {
    const { currentStep } = get();
    switch (currentStep) {
      case 'crypto-selection':
        set({ currentStep: 'network-selection' });
        break;
      case 'network-selection':
        set({ currentStep: 'form' });
        break;
      case 'form':
        set({ currentStep: 'confirmation' });
        break;
      case 'confirmation':
        set({ currentStep: 'success' });
        break;
      default:
        break;
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    switch (currentStep) {
      case 'network-selection':
        set({ currentStep: 'crypto-selection' });
        break;
      case 'form':
        set({ currentStep: 'network-selection' });
        break;
      case 'confirmation':
        set({ currentStep: 'form' });
        break;
      default:
        break;
    }
  },

  reset: () =>
    set({
      currentStep: 'crypto-selection',
      selectedCrypto: null,
      selectedNetwork: null,
      formData: initialFormData,
    }), // Computed
  canProceed: () => {
    const { currentStep, selectedCrypto, selectedNetwork, formData } = get();
    switch (currentStep) {
      case 'crypto-selection':
        return selectedCrypto !== null;
      case 'network-selection':
        return selectedNetwork !== null;
      case 'form':
        return formData.walletAddress.trim() !== '' && formData.amount.trim() !== '';
      case 'confirmation':
        return true;
      case 'success':
        return true;
      default:
        return false;
    }
  },

  getButtonText: () => {
    const { currentStep } = get();
    switch (currentStep) {
      case 'confirmation':
        return 'Confirm';
      case 'success':
        return 'Continue';
      default:
        return 'Continue';
    }
  },

  getTitle: () => {
    const { currentStep, selectedCrypto, selectedNetwork } = get();
    switch (currentStep) {
      case 'crypto-selection':
        return 'Withdrawal';
      case 'network-selection':
        return selectedCrypto?.name || 'Select Network';
      case 'form':
        return selectedCrypto && selectedNetwork
          ? `${selectedCrypto.name} (${selectedNetwork.name})`
          : selectedCrypto?.name || 'Form';
      case 'confirmation':
        return selectedCrypto && selectedNetwork
          ? `${selectedCrypto.name} (${selectedNetwork.name})`
          : 'Confirmation';
      case 'success':
        return 'Withdrawal';
      default:
        return 'Withdrawal';
    }
  },
}));
