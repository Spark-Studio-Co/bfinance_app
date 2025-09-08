import { create } from 'zustand';

export type VerificationStep = 'idle' | 'in-progress' | 'completed' | 'failed';
export type VerificationType = 'basic' | 'advanced';
export type VerificationFlowStep =
  | 'document-capture'
  | 'liveness-check'
  | 'processing'
  | 'success'
  | 'failed';

export interface VerificationState {
  // Current verification flow state
  currentVerificationType: VerificationType | null;
  currentFlowStep: VerificationFlowStep;

  // Basic verification states
  isBasicVerificationSuccess: boolean;
  basicVerificationStep: VerificationStep;
  basicPhotoIdStatus: VerificationStep;
  basicLivenessCheckStatus: VerificationStep;

  // Advanced verification states
  isAdvancedVerificationSuccess: boolean;
  advancedVerificationStep: VerificationStep;
  advancedProofOfAddressStatus: VerificationStep;

  // Overall verification status
  isFullyVerified: boolean;

  // Actions
  setCurrentVerificationType: (type: VerificationType) => void;
  setCurrentFlowStep: (step: VerificationFlowStep) => void;

  startBasicVerification: () => void;
  completeBasicVerification: () => void;
  failBasicVerification: () => void;
  setBasicPhotoIdStatus: (status: VerificationStep) => void;
  setBasicLivenessCheckStatus: (status: VerificationStep) => void;

  startAdvancedVerification: () => void;
  completeAdvancedVerification: () => void;
  failAdvancedVerification: () => void;
  setAdvancedProofOfAddressStatus: (status: VerificationStep) => void;

  resetVerification: () => void;
}

const initialState = {
  currentVerificationType: null as VerificationType | null,
  currentFlowStep: 'document-capture' as VerificationFlowStep,

  isBasicVerificationSuccess: false,
  basicVerificationStep: 'idle' as VerificationStep,
  basicPhotoIdStatus: 'idle' as VerificationStep,
  basicLivenessCheckStatus: 'idle' as VerificationStep,

  isAdvancedVerificationSuccess: false,
  advancedVerificationStep: 'idle' as VerificationStep,
  advancedProofOfAddressStatus: 'idle' as VerificationStep,

  isFullyVerified: false,
};

export const useVerificationStore = create<VerificationState>((set, get) => ({
  ...initialState,

  // Flow control actions
  setCurrentVerificationType: (type: VerificationType) => set({ currentVerificationType: type }),
  setCurrentFlowStep: (step: VerificationFlowStep) => set({ currentFlowStep: step }),

  // Basic verification actions
  startBasicVerification: () =>
    set({
      basicVerificationStep: 'in-progress',
      currentVerificationType: 'basic',
      currentFlowStep: 'document-capture',
    }),

  completeBasicVerification: () => {
    const state = get();
    const isBasicComplete =
      state.basicPhotoIdStatus === 'completed' && state.basicLivenessCheckStatus === 'completed';

    set({
      basicVerificationStep: 'completed',
      isBasicVerificationSuccess: isBasicComplete,
      isFullyVerified: isBasicComplete && state.isAdvancedVerificationSuccess,
    });
  },

  failBasicVerification: () =>
    set({
      basicVerificationStep: 'failed',
      isBasicVerificationSuccess: false,
    }),

  setBasicPhotoIdStatus: (status: VerificationStep) => {
    set({ basicPhotoIdStatus: status });

    // Auto-complete basic verification if both steps are done
    const state = get();
    if (status === 'completed' && state.basicLivenessCheckStatus === 'completed') {
      state.completeBasicVerification();
    }
  },

  setBasicLivenessCheckStatus: (status: VerificationStep) => {
    set({ basicLivenessCheckStatus: status });

    // Auto-complete basic verification if both steps are done
    const state = get();
    if (status === 'completed' && state.basicPhotoIdStatus === 'completed') {
      state.completeBasicVerification();
    }
  },

  // Advanced verification actions
  startAdvancedVerification: () =>
    set({
      advancedVerificationStep: 'in-progress',
      currentVerificationType: 'advanced',
      currentFlowStep: 'document-capture',
    }),

  completeAdvancedVerification: () => {
    const state = get();
    const isAdvancedComplete = state.advancedProofOfAddressStatus === 'completed';

    set({
      advancedVerificationStep: 'completed',
      isAdvancedVerificationSuccess: isAdvancedComplete,
      isFullyVerified: state.isBasicVerificationSuccess && isAdvancedComplete,
    });
  },

  failAdvancedVerification: () =>
    set({
      advancedVerificationStep: 'failed',
      isAdvancedVerificationSuccess: false,
    }),

  setAdvancedProofOfAddressStatus: (status: VerificationStep) => {
    set({ advancedProofOfAddressStatus: status });

    // Auto-complete advanced verification if step is done
    const state = get();
    if (status === 'completed') {
      state.completeAdvancedVerification();
    }
  },

  // Reset all verification states
  resetVerification: () => set({ ...initialState }),
}));
