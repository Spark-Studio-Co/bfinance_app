import { create } from 'zustand';

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
  selectedCrypto: CryptoData | null;
  selectedNetwork: NetworkData | null;
  formData: FormData;

  // Actions
  setSelectedCrypto: (crypto: CryptoData) => void;
  setSelectedNetwork: (network: NetworkData) => void;
  setFormData: (data: FormData) => void;
  reset: () => void;
}

const initialFormData: FormData = {
  walletAddress: '',
  amount: '',
};

export const useWithdrawalStore = create<WithdrawalStore>((set, get) => ({
  // Initial state
  selectedCrypto: null,
  selectedNetwork: null,
  formData: initialFormData,

  // Actions
  setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto }),

  setSelectedNetwork: (network) => set({ selectedNetwork: network }),

  setFormData: (data) => set({ formData: data }),

  reset: () =>
    set({
      selectedCrypto: null,
      selectedNetwork: null,
      formData: initialFormData,
    }),
}));
