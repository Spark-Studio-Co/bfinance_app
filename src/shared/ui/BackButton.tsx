import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import ChevronLeft from '../icons/ChevronLeft';

export const BackButton = (onPress: { onPress: () => void }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className=""
      onPress={onPress?.onPress ? onPress.onPress : () => navigation.goBack()}>
      <ChevronLeft />
    </TouchableOpacity>
  );
};
