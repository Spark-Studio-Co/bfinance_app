import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '~/shared/ui';
import SadFaceIcon from '~/shared/icons/SadFaceIcon';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonPress: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  buttonText,
  onButtonPress,
  icon = <SadFaceIcon width={78} height={78} />,
}) => {
  return (
    <View className="mt-[59.33px] flex items-center justify-center">
      <View className="items-center gap-6">
        {icon}

        <View className="w-full items-center gap-1">
          <Text weight="semibold" className="text-center text-[20px] tracking-[-0.45px] text-white">
            {title}
          </Text>

          <Text
            weight="regular"
            className="max-w-[240px] text-center text-[17px] leading-[22px] tracking-[-0.4px] text-[#aaaaaa]">
            {description}
          </Text>
        </View>

        <Button
          label={buttonText}
          onPress={onButtonPress}
          variant="light"
          weight="semibold"
          className="!flex h-[36px] w-[168px] !items-center !justify-center !rounded-full"
        />
      </View>
    </View>
  );
};
