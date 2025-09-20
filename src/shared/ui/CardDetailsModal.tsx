import { View, Text, Modal, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { CloseIcon } from './CloseIcon';
import CopyIcon from '../icons/CopyIcon';

interface CardDetailsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function CardDetailsModal({ visible, onClose }: CardDetailsModalProps) {
  console.log('CardDetailsModal render, visible:', visible);

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

  console.log('About to render Modal with visible:', visible);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* Background overlay */}
      <View className="flex-1 bg-black/30">
        <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />

        {/* Bottom sheet */}
        <View className="overflow-hidden rounded-t-[20px] bg-black">
          {/* Header */}
          <View className="relative mt-[19px] h-[60px] flex-row items-center justify-center px-4">
            <Text className="text-[17px] font-semibold tracking-[-0.4px] text-white">
              Card Details
            </Text>
            <View className="absolute right-4">
              <CloseIcon
                onPress={onClose}
                size={28}
                backgroundColor="#333333"
                iconColor="#848484"
              />
            </View>
          </View>

          {/* Content */}
          <View className="px-[25px] pb-6 pt-3">
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
                    <CopyIcon />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Bottom handle area */}
          <View className="h-[34px] items-center justify-center bg-black/80">
            <View className="h-[5px] w-[139px] rounded-full bg-white/20" />
          </View>
        </View>
      </View>
    </Modal>
  );
}
