import { MainLayout } from '~/app/layouts/MainLayout';
import { View } from 'react-native';
import { Button } from '~/shared/ui';
import { useWithdrawalStore } from '../model/use-withdrawal-store';
import { useResponsive } from '~/shared/hooks/useResponsive';
import {
  CryptoSelectionStep,
  NetworkSelectionStep,
  FormStep,
  ConfirmationStep,
  SuccessStep,
} from './steps';

export const WithdrawalPage = () => {
  const { s } = useResponsive();
  const { currentStep, nextStep, prevStep, reset, canProceed, getButtonText, getTitle } =
    useWithdrawalStore();

  const handleContinue = () => {
    if (currentStep === 'success') {
      reset();
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    if (currentStep !== 'crypto-selection') {
      prevStep();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'crypto-selection':
        return <CryptoSelectionStep />;
      case 'network-selection':
        return <NetworkSelectionStep />;
      case 'form':
        return <FormStep />;
      case 'confirmation':
        return <ConfirmationStep />;
      case 'success':
        return <SuccessStep />;
      default:
        return null;
    }
  };

  return (
    <MainLayout isBack isTitle title={getTitle()} onPrevStep={{ onPress: handleBack }}>
      {renderStepContent()}

      {currentStep !== 'crypto-selection' && currentStep !== 'network-selection' && (
        <View className="mb-6 mt-auto" style={{ paddingBottom: s(20) }}>
          <Button
            label={getButtonText()}
            onPress={handleContinue}
            disabled={!canProceed()}
            className="h-[42px] w-full"
          />
        </View>
      )}
    </MainLayout>
  );
};
