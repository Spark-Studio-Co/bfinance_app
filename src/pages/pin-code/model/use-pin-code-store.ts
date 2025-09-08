import { create } from 'zustand';

export enum PinCodeStep {
  ENTER_NEW = 'ENTER_NEW',
  RE_ENTER = 'RE_ENTER',
  SUCCESS = 'SUCCESS',
}

interface PinCodeState {
  step: PinCodeStep;
  firstPin: string;
  secondPin: string;
  currentPin: string;
  pinDots: boolean[];
  isLoading: boolean;
  error: string | null;
}

interface PinCodeActions {
  addDigit: (digit: string) => void;
  removeDigit: () => void;
  resetPin: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  reset: () => void;
}

type PinCodeStore = PinCodeState & PinCodeActions;

const initialState: PinCodeState = {
  step: PinCodeStep.ENTER_NEW,
  firstPin: '',
  secondPin: '',
  currentPin: '',
  pinDots: [false, false, false, false],
  isLoading: false,
  error: null,
};

export const usePinCodeStore = create<PinCodeStore>((set, get) => ({
  ...initialState,

  addDigit: (digit: string) => {
    const { currentPin, step } = get();

    if (currentPin.length < 4) {
      const newPin = currentPin + digit;
      const newDots = [...get().pinDots];
      newDots[currentPin.length] = true;

      set({
        currentPin: newPin,
        pinDots: newDots,
        error: null,
      });

      // Auto proceed when PIN is complete
      if (newPin.length === 4) {
        setTimeout(() => {
          if (step === PinCodeStep.ENTER_NEW) {
            get().goToNextStep();
          } else if (step === PinCodeStep.RE_ENTER) {
            const { firstPin } = get();
            if (newPin === firstPin) {
              get().goToNextStep();
            } else {
              set({
                error: 'PINs do not match',
                currentPin: '',
                pinDots: [false, false, false, false],
              });
            }
          }
        }, 100);
      }
    }
  },

  removeDigit: () => {
    const { currentPin } = get();
    if (currentPin.length > 0) {
      const newPin = currentPin.slice(0, -1);
      const newDots = [...get().pinDots];
      newDots[currentPin.length - 1] = false;

      set({
        currentPin: newPin,
        pinDots: newDots,
        error: null,
      });
    }
  },

  resetPin: () => {
    set({
      currentPin: '',
      pinDots: [false, false, false, false],
      error: null,
    });
  },

  goToNextStep: () => {
    const { step, currentPin } = get();

    if (step === PinCodeStep.ENTER_NEW) {
      set({
        step: PinCodeStep.RE_ENTER,
        firstPin: currentPin,
        currentPin: '',
        pinDots: [false, false, false, false],
        error: null,
      });
    } else if (step === PinCodeStep.RE_ENTER) {
      set({
        step: PinCodeStep.SUCCESS,
        secondPin: currentPin,
        isLoading: true,
      });

      // Simulate API call
      setTimeout(() => {
        set({ isLoading: false });
      }, 1000);
    }
  },

  goToPreviousStep: () => {
    const { step, firstPin } = get();

    if (step === PinCodeStep.RE_ENTER) {
      const firstPinDots = [false, false, false, false];
      for (let i = 0; i < firstPin.length && i < 4; i++) {
        firstPinDots[i] = true;
      }

      set({
        step: PinCodeStep.ENTER_NEW,
        currentPin: firstPin,
        secondPin: '',
        pinDots: firstPinDots,
        error: null,
      });
    }
  },

  reset: () => {
    set(initialState);
  },
}));
