import { ReactNode } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { Text } from '~/shared/ui';

import { useResponsive } from '~/shared/hooks';

export const SupportTab = ({
  icon,
  label,
  description,
  url,
}: {
  icon: ReactNode;
  label: string;
  description?: string;
  url: string;
}) => {
  const { fs } = useResponsive();

  return (
    <TouchableOpacity
      className="flex h-[68px] w-full flex-row items-center gap-x-4 rounded-[16px] bg-[#0F0F0F] pl-4"
      onPress={() => Linking.openURL(url)}
      activeOpacity={0.7}>
      {icon}
      <View className="flex flex-col">
        <Text weight="medium" className=" text-[#FFFFFF]" style={{ fontSize: 17 }}>
          {label}
        </Text>
        {description && (
          <Text weight="regular" className="mt-[2px] text-[#AAAAAA]" style={{ fontSize: 13 }}>
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
