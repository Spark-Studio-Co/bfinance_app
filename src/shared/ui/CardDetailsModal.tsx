import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { CopyIcon } from './CopyIcon';
import { CloseIcon } from './CloseIcon';

interface CardDetailsModalProps {
  visible: boolean;
  onClose: () => void;
}

const { height: screenHeight } = Dimensions.get('window');

export function CardDetailsModal({ visible, onClose }: CardDetailsModalProps) {
  const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const contentOpacityAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  // Функция для анимированного закрытия
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
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose(); // Вызываем реальное закрытие только после завершения анимации
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

          // Уменьшаем прозрачность при свайпе
          const opacity = Math.max(0.3, 1 - gestureState.dy / (screenHeight * 0.4));
          opacityAnim.setValue(opacity);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 80 || gestureState.vy > 0.8) {
          // Плавное закрытие при свайпе вниз
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: screenHeight,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 0.95,
              duration: 250,
              useNativeDriver: true,
            }),
          ]).start(() => onClose()); // Здесь можно оставить прямой вызов, так как анимация уже выполнена
        } else {
          // Возврат в исходное положение
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
      // Сброс значений для начала анимации
      slideAnim.setValue(screenHeight);
      opacityAnim.setValue(0);
      contentOpacityAnim.setValue(1); // Контент сразу видимый
      scaleAnim.setValue(0.95);

      // Простая плавная анимация появления
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
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
      ]).start();
    }
    // Убираем else блок - анимация закрытия теперь управляется вручную
  }, [visible]);

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  const cardData = [
    {
      title: '4937 2800 1122 3344',
      subtitle: 'Card number',
      value: '4937 2800 1122 3344',
    },
    {
      title: '02/25',
      subtitle: 'Expiry date',
      value: '02/25',
    },
    {
      title: '123',
      subtitle: 'CVV',
      value: '123',
    },
    {
      title: 'John Doe',
      subtitle: 'Cardholder',
      value: 'John Doe',
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleAnimatedClose}>
      {/* Background overlay with fade animation */}
      <Animated.View style={{ opacity: opacityAnim }} className="flex-1 bg-black/30">
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={handleAnimatedClose} />

        {/* Bottom sheet */}
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          }}
          className="overflow-hidden rounded-t-[20px] bg-black">
          {/* Header */}
          <View className="relative mt-[19px] h-[60px] flex-row items-center justify-center px-4">
            <Text className="text-[17px] font-semibold tracking-[-0.4px] text-white">
              Card Details
            </Text>
            <View className="absolute right-4">
              <CloseIcon
                onPress={handleAnimatedClose}
                size={28}
                backgroundColor="#333333"
                iconColor="#848484"
              />
            </View>
          </View>

          {/* Content */}
          <Animated.View style={{ opacity: contentOpacityAnim }} className="px-[25px] pb-6 pt-3">
            <View className="gap-2">
              {cardData.map((item, index) => (
                <View
                  key={index}
                  className="h-[68px] flex-row items-center justify-between rounded-[16px] bg-[#0f0f0f] px-4">
                  <View className="flex-1 py-3">
                    <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.4px] text-white">
                      {item.title}
                    </Text>
                    <Text className="text-[13px] leading-[16px] tracking-[-0.08px] text-[#aaaaaa]">
                      {item.subtitle}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => copyToClipboard(item.value)}
                    className="h-6 w-6 items-center justify-center">
                    <CopyIcon size={20} color="#00e675" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Bottom handle area */}
          <View className="h-[34px] items-center justify-center bg-black/80">
            <View className="h-[5px] w-[139px] rounded-full bg-white/20" />
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
