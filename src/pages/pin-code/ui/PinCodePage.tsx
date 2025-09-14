import { usePinCodeStore, PinCodeStep } from '../model/use-pin-code-store';
import { EnterPinScreen, ReEnterPinScreen, SuccessScreen } from '~/widgets/PinCodeScreens';
import { MainLayout } from '~/app/layouts/MainLayout';

import { useNavigation } from '@react-navigation/native';

export const PinCodePage = () => {
  const navigation = useNavigation();
  const { step, goToPreviousStep } = usePinCodeStore();

  const handleBack = () => {
    if (step === PinCodeStep.ENTER_NEW || step === PinCodeStep.SUCCESS) {
      navigation.goBack();
    } else {
      goToPreviousStep();
    }
  };

  return (
    <MainLayout
      isTitle
      title="PIN code setup"
      onPrevStep={{
        onPress: handleBack,
      }}
      isBack>
      {step === PinCodeStep.ENTER_NEW && <EnterPinScreen />}
      {step === PinCodeStep.RE_ENTER && <ReEnterPinScreen />}
      {step === PinCodeStep.SUCCESS && <SuccessScreen />}
    </MainLayout>
  );
};
