import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
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

  // Mock transaction data
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

  // Format card number to show only last 4 digits
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

  return (
    <MainLayout
      isTitle
      isBack
      isNoPadding={false}
      title={cardTitle}
      isGradient={true}
      gradientColor="161616">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Card Display */}
        <View className="mb-6 overflow-hidden rounded-[16px]" style={{ height: s(209) }}>
          <Image
            source={require('../../../assets/card_placeholder.png')}
            style={{
              width: '100%',
              height: s(209),
            }}
            resizeMode="cover"
          />
          {/* Card Number Overlay */}
          <View
            className="absolute left-5"
            style={{
              bottom: s(20),
              width: s(141),
            }}>
            <Text
              weight="bold"
              className="text-center text-white/70"
              style={{
                fontSize: s(16),
                lineHeight: s(22),
                letterSpacing: -0.4,
                marginTop: s(11),
              }}>
              {maskedCardNumber}
            </Text>
          </View>
        </View>

        {/* Balance Section */}
        <View className="mb-6 rounded-[16px] bg-[#0F0F0F]" style={{ padding: s(16) }}>
          <View style={{ gap: s(12) }}>
            {/* Balance Info */}
            <View style={{ gap: s(6) }}>
              <Text
                weight="regular"
                className="text-[#A2ACB0]"
                style={{
                  fontSize: s(15),
                  lineHeight: s(22),
                  letterSpacing: -0.4,
                }}>
                Card's balance
              </Text>
              <Text
                weight="semibold"
                className="text-white"
                style={{
                  fontSize: s(32),
                  letterSpacing: -0.4,
                }}>
                {balance}
                {currency}
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row" style={{ gap: s(12), height: s(42) }}>
              <TouchableOpacity
                onPress={handleTopUp}
                className="flex-1 items-center justify-center rounded-[12px] bg-white"
                style={{ height: s(42) }}>
                <Text
                  weight="semibold"
                  className="text-black"
                  style={{
                    fontSize: s(15),
                    lineHeight: s(20),
                    letterSpacing: -0.23,
                  }}>
                  Topup
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleWithdraw}
                className="items-center justify-center rounded-[12px]  bg-[#0F0F0F]"
                style={{
                  width: s(142),
                  height: s(42),
                }}>
                <Text
                  weight="semibold"
                  className="text-white/95"
                  style={{
                    fontSize: s(15),
                    lineHeight: s(20),
                    letterSpacing: -0.23,
                  }}>
                  Withdraw
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6 rounded-[16px] bg-[#0F0F0F]" style={{ padding: s(12) }}>
          <View className="flex-row justify-between" style={{ height: s(76) }}>
            {/* Show */}
            <TouchableOpacity
              className="flex-1 items-center justify-center"
              style={{ gap: s(10) }}
              onPress={handleShowCardDetails}>
              <Image
                source={require('../../../assets/eye_dark.png')}
                style={{ width: s(36), height: s(36) }}
                resizeMode="contain"
              />
              <Text
                weight="medium"
                className="text-white"
                style={{
                  fontSize: s(14),
                  lineHeight: s(22),
                  letterSpacing: -0.4,
                }}>
                Show
              </Text>
            </TouchableOpacity>

            {/* Freeze */}
            <TouchableOpacity className="flex-1 items-center justify-center" style={{ gap: s(10) }}>
              <Image
                source={require('../../../assets/freeze.png')}
                style={{ width: s(36), height: s(36) }}
                resizeMode="contain"
              />
              <Text
                weight="medium"
                className="text-white"
                style={{
                  fontSize: s(14),
                  lineHeight: s(22),
                  letterSpacing: -0.4,
                }}>
                Freeze
              </Text>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity className="flex-1 items-center justify-center" style={{ gap: s(10) }}>
              <Image
                source={require('../../../assets/gear.png')}
                style={{ width: s(36), height: s(36) }}
                resizeMode="contain"
              />
              <Text
                weight="medium"
                className="text-white"
                style={{
                  fontSize: s(14),
                  lineHeight: s(22),
                  letterSpacing: -0.4,
                }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={{ gap: s(8) }}>
          <Text
            weight="regular"
            className="uppercase text-[#AAAAAA]"
            style={{
              fontSize: s(13),
              lineHeight: s(16),
              letterSpacing: -0.08,
            }}>
            today
          </Text>

          {/* Transaction List */}
          <View style={{ gap: s(8) }}>
            {transactions.map((transaction) => (
              <View
                key={transaction.id}
                className="rounded-[16px] bg-[#0F0F0F]"
                style={{ padding: s(16) }}>
                <View className="flex-row items-center" style={{ gap: s(16) }}>
                  {/* Avatar */}
                  <View className="relative">
                    <View
                      className="overflow-hidden rounded-full bg-[#2990FF]/15"
                      style={{ width: s(40), height: s(40) }}>
                      <Text
                        weight="semibold"
                        className="text-center text-[#2990FF]"
                        style={{
                          fontSize: s(19),
                          lineHeight: s(24),
                          letterSpacing: -0.45,
                          marginTop: s(8),
                        }}>
                        T
                      </Text>
                      <Image
                        source={transaction.avatar}
                        style={{
                          position: 'absolute',
                          top: s(-1),
                          left: s(-1),
                          width: s(41),
                          height: s(41),
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  </View>

                  {/* Content */}
                  <View className="flex-1" style={{ gap: s(2) }}>
                    <Text
                      weight="medium"
                      className="text-white"
                      style={{
                        fontSize: s(17),
                        lineHeight: s(22),
                        letterSpacing: -0.4,
                      }}>
                      {transaction.title}
                    </Text>
                    <Text
                      weight="regular"
                      className="text-[#AAAAAA]"
                      style={{
                        fontSize: s(15),
                        lineHeight: s(20),
                        letterSpacing: -0.23,
                      }}>
                      {transaction.time}
                    </Text>
                  </View>

                  {/* Amount */}
                  <View className="items-end" style={{ gap: s(2) }}>
                    <Text
                      weight="regular"
                      className={transaction.type === 'expense' ? 'text-[#EC594E]' : 'text-white'}
                      style={{
                        fontSize: s(15),
                        lineHeight: s(22),
                        letterSpacing: -0.4,
                      }}>
                      {transaction.amount}
                    </Text>
                    {transaction.amountUSD && (
                      <Text
                        weight="regular"
                        className="text-[#AAAAAA]"
                        style={{
                          fontSize: s(13),
                          lineHeight: s(20),
                          letterSpacing: -0.23,
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
