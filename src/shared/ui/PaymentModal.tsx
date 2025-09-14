import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
} from 'react-native';
import { Text, Button } from '~/shared/ui';
import BitcoinIcon from '~/shared/icons/BitcoinIcon';
import CircleCrossIcon from '../icons/CircleCrossIcon';
import CircleDollarIcon from '../icons/CircleDollarIcon';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onPay: () => void;
  cardName: string;
}

const { height: screenHeight } = Dimensions.get('window');

interface PaymentMethodProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  amount: string;
  onPress: () => void;
  isSelected?: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  icon,
  title,
  subtitle,
  amount,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`h-[68px] flex-row items-center justify-between rounded-[16px] bg-[#0F0F0F] px-4`}
      activeOpacity={0.7}>
      <View className="flex-1 flex-row items-center">
        <View className="mr-3">{icon}</View>
        <View className="flex-1">
          <Text weight="medium" className="mb-1 text-[17px] text-white">
            {title}
          </Text>
          <Text weight="regular" className="text-[13px] text-[#aaaaaa]">
            {subtitle}
          </Text>
        </View>
      </View>
      <Text weight="regular" className="text-[17px] text-white">
        {amount}
      </Text>
    </TouchableOpacity>
  );
};

export function PaymentModal({ visible, onClose, onPay, cardName }: PaymentModalProps) {
  const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const [selectedPayment, setSelectedPayment] = useState<string>('usd');

  const fiatMethods = [
    {
      id: 'usd',
      icon: <CircleDollarIcon />,
      title: 'Dollars',
      subtitle: '100 USD',
      amount: '1 USD',
    },
  ];

  const cryptoMethods = [
    {
      id: 'btc1',
      icon: <BitcoinIcon width={40} height={40} />,
      title: 'Bitcoin',
      subtitle: '0.1 BTC',
      amount: '0.00001 BTC',
    },
    {
      id: 'btc2',
      icon: <BitcoinIcon width={40} height={40} />,
      title: 'Bitcoin',
      subtitle: '0.1 BTC',
      amount: '0.00001 BTC',
    },
    {
      id: 'btc3',
      icon: <BitcoinIcon width={40} height={40} />,
      title: 'Bitcoin',
      subtitle: '0.1 BTC',
      amount: '0.00001 BTC',
    },
  ];

  const handleAnimatedClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          const dragValue = Math.min(gestureState.dy, screenHeight * 0.5);
          slideAnim.setValue(dragValue);
          const opacity = Math.max(0.3, 1 - gestureState.dy / (screenHeight * 0.4));
          opacityAnim.setValue(opacity);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 80 || gestureState.vy > 0.8) {
          handleAnimatedClose();
        } else {
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
              tension: 100,
              friction: 8,
            }),
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    if (visible) {
      slideAnim.setValue(screenHeight);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 60,
          friction: 10,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handlePayment = () => {
    handleAnimatedClose();
    setTimeout(() => {
      onPay();
    }, 300);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleAnimatedClose}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: opacityAnim,
        }}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={handleAnimatedClose} />

        <Animated.View
          style={{
            backgroundColor: '#000000',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            minHeight: screenHeight * 0.58,
            transform: [{ translateY: slideAnim }],
            flex: 1,
          }}
          {...panResponder.panHandlers}>
          <View className="flex-1 px-[25px]">
            <View className="items-center">
              <View className="mb-[13px] mt-[13px] items-center">
                <Text weight="semibold" className="mb-[6px] text-[17px] text-white">
                  Payment
                </Text>
                <Text weight="regular" className="text-[14px] text-[#FFFFFF] opacity-[70%]">
                  100 USD
                </Text>
              </View>

              {/* Close Button */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleAnimatedClose}
                className="absolute right-0 top-6">
                <CircleCrossIcon />
              </TouchableOpacity>
            </View>

            {/* Payment Methods - Scrollable Content */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              <View className="mt-[12px]">
                <Text
                  weight="regular"
                  className="mb-3 text-[14px] uppercase tracking-wider text-[#aaaaaa]">
                  FIAT
                </Text>

                <View className="gap-3">
                  {fiatMethods.map((method) => (
                    <PaymentMethod
                      key={method.id}
                      icon={method.icon}
                      title={method.title}
                      subtitle={method.subtitle}
                      amount={method.amount}
                      onPress={() => setSelectedPayment(method.id)}
                      isSelected={selectedPayment === method.id}
                    />
                  ))}
                </View>
              </View>

              {/* CRYPTO Section */}
              <View className="mb-6 mt-[24px]">
                <Text
                  weight="regular"
                  className="mb-3 text-[14px] uppercase tracking-wider text-[#aaaaaa]">
                  CRYPTO
                </Text>

                <View className="gap-3">
                  {cryptoMethods.map((method) => (
                    <PaymentMethod
                      key={method.id}
                      icon={method.icon}
                      title={method.title}
                      subtitle={method.subtitle}
                      amount={method.amount}
                      onPress={() => setSelectedPayment(method.id)}
                      isSelected={selectedPayment === method.id}
                    />
                  ))}
                </View>
              </View>
            </ScrollView>

            <View className="pb-8 pt-4">
              <Button
                label="Pay"
                onPress={handlePayment}
                variant="light"
                weight="semibold"
                className="h-[42px] rounded-[12px]"
              />
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
