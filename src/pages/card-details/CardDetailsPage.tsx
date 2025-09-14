import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/shared/types/navigation';
import { MainLayout } from '~/app/layouts/MainLayout';
import { Text, CardDetailsModal } from '~/shared/ui';
import { useResponsive } from '~/shared/hooks/useResponsive';

type CardDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CardDetails'>;
type CardDetailsRouteProp = RouteProp<RootStackParamList, 'CardDetails'>;

export const CardDetailsPage: React.FC = () => {
  const navigation = useNavigation<CardDetailsNavigationProp>();
  const route = useRoute<CardDetailsRouteProp>();
  const { s } = useResponsive();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { cardId, cardNumber, balance, currency } = route.params;

  const transactions = [
    {
      id: 1,
      title: 'APPLE.COM/BILL',
      time: '19:20',
      amount: '-1000 KZT',
      amountUSD: '2 USD',
      type: 'expense',
      avatar: require('../../../assets/avatar.png'),
    },
    {
      id: 2,
      title: 'APPLE.COM/BILL',
      time: '19:20',
      amount: '$10.32',
      amountUSD: '',
      type: 'income',
      avatar: require('../../../assets/avatar.png'),
    },
  ];

  const maskedCardNumber = `• ${cardNumber.slice(-4)}`;
  const cardTitle = `Card *${cardNumber.slice(-4)}`;

  const handleTopUp = () => {
    navigation.navigate('TopUp');
  };

  const handleWithdraw = () => {
    navigation.navigate('Withdrawal');
  };

  const handleShowCardDetails = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSettings = () => {
    navigation.navigate('CardSettings', { cardNumber: cardNumber.slice(-4) });
  };

  return (
    <MainLayout
      isTitle
      isBack
      isNoPadding={false}
      title={cardTitle}
      isGradient={true}
      gradientColor="161616">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mb-[12px] overflow-hidden rounded-[16px]">
          <ImageBackground
            source={require('../../../assets/card_placeholder.png')}
            style={{
              height: 209,
              marginTop: 12,
            }}
            resizeMode="cover">
            <View className="absolute bottom-[20px] left-[20px]">
              <Text
                weight="bold"
                className="text-center text-white/70"
                style={{
                  fontSize: 16,
                }}>
                {maskedCardNumber}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View className="mb-6 rounded-[16px] bg-[#0F0F0F]" style={{ padding: 16 }}>
          <View style={{ gap: 12 }}>
            <View style={{ gap: 6 }}>
              <Text
                weight="regular"
                className="text-[#A2ACB0]"
                style={{
                  fontSize: 15,
                }}>
                Card's balance
              </Text>
              <Text
                weight="semibold"
                className="text-white"
                style={{
                  fontSize: 32,
                }}>
                {balance}$
              </Text>
            </View>
            <View className="flex-row" style={{ gap: 12, height: 42 }}>
              <TouchableOpacity
                onPress={handleTopUp}
                className="flex-1 items-center justify-center rounded-[12px] bg-white"
                style={{ height: 42 }}>
                <Text
                  weight="semibold"
                  className="text-black"
                  style={{
                    fontSize: 15,
                  }}>
                  Topup
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleWithdraw}
                className="items-center justify-center rounded-[12px]  bg-[#0F0F0F]"
                style={{
                  width: 142,
                  height: 42,
                }}>
                <Text
                  weight="semibold"
                  className="text-white/95"
                  style={{
                    fontSize: 15,
                  }}>
                  Withdraw
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="mb-6 rounded-[16px] bg-[#0F0F0F]" style={{ padding: 12 }}>
          <View className="flex-row justify-between" style={{ height: 76 }}>
            {/* Show */}
            <TouchableOpacity
              className="flex-1 items-center justify-center"
              style={{ gap: 10 }}
              onPress={handleShowCardDetails}>
              <Image
                source={require('../../../assets/eye_dark.png')}
                style={{ width: 36, height: 36 }}
                resizeMode="contain"
              />
              <Text
                weight="medium"
                className="text-white"
                style={{
                  fontSize: 14,
                }}>
                Show
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center justify-center" style={{ gap: s(10) }}>
              <Image
                source={require('../../../assets/freeze.png')}
                style={{ width: 36, height: 36 }}
                resizeMode="contain"
              />
              <Text
                weight="medium"
                className="text-white"
                style={{
                  fontSize: 14,
                }}>
                Freeze
              </Text>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity
              className="flex-1 items-center justify-center"
              style={{ gap: 10 }}
              onPress={handleSettings}>
              <Image
                source={require('../../../assets/gear.png')}
                style={{ width: 36, height: 36 }}
                resizeMode="contain"
              />
              <Text
                weight="medium"
                className="text-white"
                style={{
                  fontSize: 14,
                }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={{ gap: 8 }}>
          <Text
            weight="regular"
            className="uppercase text-[#AAAAAA]"
            style={{
              fontSize: 13,
            }}>
            today
          </Text>

          {/* Transaction List */}
          <View style={{ gap: 8 }}>
            {transactions.map((transaction) => (
              <View
                key={transaction.id}
                className="rounded-[16px] bg-[#0F0F0F]"
                style={{ padding: 16 }}>
                <View className="flex-row items-center" style={{ gap: 16 }}>
                  {/* Avatar */}
                  <View className="relative">
                    <View
                      className="overflow-hidden rounded-full bg-[#2990FF]/15"
                      style={{ width: 40, height: 40 }}>
                      <Text
                        weight="semibold"
                        className="text-center text-[#2990FF]"
                        style={{
                          fontSize: 19,
                          marginTop: 8,
                        }}>
                        T
                      </Text>
                      <Image
                        source={transaction.avatar}
                        style={{
                          position: 'absolute',
                          top: -1,
                          left: -1,
                          width: 41,
                          height: 41,
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  </View>

                  {/* Content */}
                  <View className="flex-1" style={{ gap: 2 }}>
                    <Text
                      weight="medium"
                      className="text-white"
                      style={{
                        fontSize: 17,
                      }}>
                      {transaction.title}
                    </Text>
                    <Text
                      weight="regular"
                      className="text-[#AAAAAA]"
                      style={{
                        fontSize: 15,
                      }}>
                      {transaction.time}
                    </Text>
                  </View>

                  {/* Amount */}
                  <View className="items-end" style={{ gap: 2 }}>
                    <Text
                      weight="regular"
                      className={transaction.type === 'expense' ? 'text-[#EC594E]' : 'text-white'}
                      style={{
                        fontSize: 15,
                      }}>
                      {transaction.amount}
                    </Text>
                    {transaction.amountUSD && (
                      <Text
                        weight="regular"
                        className="text-[#AAAAAA]"
                        style={{
                          fontSize: 13,
                        }}>
                        {transaction.amountUSD}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Card Details Modal */}
      <CardDetailsModal visible={isModalVisible} onClose={handleCloseModal} />
    </MainLayout>
  );
};
