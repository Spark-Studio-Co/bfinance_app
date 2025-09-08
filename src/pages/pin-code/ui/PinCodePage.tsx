import { usePinCodeStore, PinCodeStep } from '../model/use-pin-code-store';
import { EnterPinScreen, ReEnterPinScreen, SuccessScreen } from '~/widgets/PinCodeScreens';
import { MainLayout } from '~/app/layouts/MainLayout';

export const PinCodePage = () => {
  const { step } = usePinCodeStore();

  return (
    <MainLayout isTitle title="PIN code setup" isBack>
      {step === PinCodeStep.ENTER_NEW && <EnterPinScreen />}
      {step === PinCodeStep.RE_ENTER && <ReEnterPinScreen />}
      {step === PinCodeStep.SUCCESS && <SuccessScreen />}
    </MainLayout>
  );
};
