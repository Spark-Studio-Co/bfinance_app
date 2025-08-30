import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import ChevronLeft from '../icons/ChevronLeft';

export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
      <ChevronLeft />
    </TouchableOpacity>
  );
};
