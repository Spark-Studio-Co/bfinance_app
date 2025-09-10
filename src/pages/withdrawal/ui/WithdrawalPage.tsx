import { MainLayout } from '~/app/layouts/MainLayout';
import { View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
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
import { useNavigation } from '@react-navigation/native';

export const WithdrawalPage = () => {
  const { s } = useResponsive();
  const { currentStep, nextStep, prevStep, reset, canProceed, getButtonText, getTitle } =
    useWithdrawalStore();
  const navigation = useNavigation();

  const handleContinue = () => {
    if (currentStep === 'success') {
      reset();
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    if (currentStep === 'crypto-selection' || currentStep === 'success') {
      navigation.goBack();
    } else {
      prevStep();
    }
  };

  // Ensure title is never undefined
  const title = getTitle() || 'Withdrawal';

  const renderStepContent = () => {
    const stepContent = (() => {
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
    })();

    return (
      <Animated.View
        key={currentStep}
        entering={currentStep !== 'crypto-selection' ? SlideInRight : undefined}
        exiting={SlideOutLeft}>
        {stepContent}
      </Animated.View>
    );
  };

  return (
    <MainLayout
      isBack
      isTitle
      title={title}
      onPrevStep={{
        onPress: handleBack,
      }}>
      {renderStepContent()}

      {currentStep !== 'crypto-selection' &&
        currentStep !== 'network-selection' &&
        currentStep !== 'success' && (
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
