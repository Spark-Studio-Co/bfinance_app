import { Text, TouchableOpacity } from 'react-native';

export const CopyCard: React.FC<{ value: string; caption: string; onPress: () => void }> = ({
  value,
  caption,
  onPress,
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    className="items-left mb-2.5 h-[68px] flex-col justify-center rounded-[16px] bg-[#0F0F0F] px-4">
    <Text className="mb-1 text-[17px] font-medium text-white">{value}</Text>
    <Text className="text-[13px] text-[#AAAAAA]">{caption}</Text>
  </TouchableOpacity>
);
