import { AuthLayout } from '~/app/layouts/AuthLayout';
import { Text } from '~/shared/ui';
import { Button } from '~/shared/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '~/shared/hooks/useResponsive';
import { View, ActivityIndicator } from 'react-native';
import { useVerificationStore } from '../identity-verification/use-verification-store';
import { useEffect, useState } from 'react';
import GreenBookIcon from '~/shared/icons/GreenBookIcon';
import GreenCheckmarkIcon from '~/shared/icons/GreenCheckmarkIcon';
import GreenPinIcon from '~/shared/icons/GreenPinIcon';
import { MiniLoader } from '~/shared/ui/MiniLoader';
import BigCheckMarkIcon from '~/shared/icons/BigCheckMarkIcon';

export const IdentityVerificationInnerPage = () => {
  const navigation = useNavigation();
  const { hp, s } = useResponsive();
  const {
    currentVerificationType,
    currentFlowStep,
    setCurrentFlowStep,
    setBasicPhotoIdStatus,
    setBasicLivenessCheckStatus,
    setAdvancedProofOfAddressStatus,
  } = useVerificationStore();

  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-handle success step
  useEffect(() => {
    if (currentFlowStep === 'success') {
      const timer = setTimeout(() => {
        handleContinue();
      }, 3000); // Show success for 3 seconds, then auto-continue

      return () => clearTimeout(timer);
    }
  }, [currentFlowStep, navigation]);

  // Simulate verification process
  const handleStartVerification = () => {
    setIsProcessing(true);
    setCurrentFlowStep('processing');

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);

      if (currentVerificationType === 'basic') {
        if (currentFlowStep === 'document-capture') {
          setBasicPhotoIdStatus('completed');
          setCurrentFlowStep('success');
        } else if (currentFlowStep === 'liveness-check') {
          setBasicLivenessCheckStatus('completed');
          setCurrentFlowStep('success');
        }
      } else if (currentVerificationType === 'advanced') {
        setAdvancedProofOfAddressStatus('completed');
        setCurrentFlowStep('success');
      }
    }, 3000);
  };

  const handleContinue = () => {
    if (currentVerificationType === 'basic' && currentFlowStep === 'success') {
      // Check if we just completed document capture and need liveness check
      const { basicPhotoIdStatus, basicLivenessCheckStatus } = useVerificationStore.getState();

      if (basicPhotoIdStatus === 'completed' && basicLivenessCheckStatus === 'idle') {
        setCurrentFlowStep('liveness-check');
      } else {
        // Both steps completed, go back
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }
  };

  const getStepContent = () => {
    switch (currentFlowStep) {
      case 'document-capture':
        return {
          icon:
            currentVerificationType === 'basic' ? (
              <GreenBookIcon width={48} height={48} />
            ) : (
              <GreenPinIcon width={48} height={48} />
            ),
          title: currentVerificationType === 'basic' ? 'Photo of your ID' : 'Proof of address',
          subtitle:
            currentVerificationType === 'basic'
              ? 'Please take a clear photo of your government-issued ID'
              : 'Please upload a document showing your current address',
          buttonText: 'Start Capture',
          onPress: handleStartVerification,
        };

      case 'liveness-check':
        return {
          icon: <GreenCheckmarkIcon width={48} height={48} />,
          title: 'Liveness check',
          subtitle: 'Please follow the instructions on screen to complete the liveness check',
          buttonText: 'Start Liveness Check',
          onPress: handleStartVerification,
        };

      case 'processing':
        return {
          icon: <MiniLoader />,
          title: 'We are checking your information',
          buttonText: null,
          onPress: null,
        };

      case 'success':
        return {
          icon: <BigCheckMarkIcon />,
          title: 'Success!',
          subtitle: `You have successfully confirmed your ${currentVerificationType === 'basic' ? 'identity' : 'address'}`,
          buttonText: null,
        };

      default:
        return {
          icon: <GreenBookIcon width={48} height={48} />,
          title: 'Document Verification',
          subtitle: 'Please prepare your documents',
          buttonText: 'Start',
          onPress: handleStartVerification,
        };
    }
  };

  const content = getStepContent();

  return (
    <AuthLayout isBack title="Identity verification">
      <View
        className={`${currentFlowStep === 'processing' || currentFlowStep === 'success' ? 'bg-transparent' : 'bg-[#0F0F0F]'} mt-[24px] items-center justify-center rounded-[20px]  px-6 pt-10`}
        style={{ height: hp(75) }}>
        <View>{content.icon}</View>

        <Text
          weight="semibold"
          className="mt-3 text-center text-white"
          style={{
            fontSize: s(20),
            lineHeight: s(24),
          }}>
          {content.title}
        </Text>

        <Text
          weight="regular"
          className="mb-8 mt-1 max-w-[260px] text-center text-[#AAAAAA]"
          style={{
            fontSize: s(17),
            lineHeight: s(22),
          }}>
          {content.subtitle}
        </Text>

        {content.buttonText && (
          <Button
            label={content.buttonText}
            onPress={content.onPress}
            style={{
              width: '100%',
              height: s(48),
              marginTop: 'auto',
              marginBottom: s(20),
            }}
            disabled={isProcessing}
          />
        )}
      </View>
    </AuthLayout>
  );
};
