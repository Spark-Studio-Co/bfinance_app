import React, { useRef, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Banner } from '../Banner/Banner';

const { width: screenWidth } = Dimensions.get('window');

export const BannerSwiper = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data for different banners
  const banners = [
    {
      id: 1,
      title: 'Pay crypto like fiat',
      subtitle: 'Issue your Visa crypto-card in seconds',
    },
    {
      id: 2,
      title: 'Trade with confidence',
      subtitle: 'Advanced trading tools at your fingertips',
    },
    {
      id: 3,
      title: 'Secure your assets',
      subtitle: 'Bank-level security for your crypto',
    },
  ];

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const cardWidth = screenWidth; // Full screen width for proper centering
    const index = Math.round(contentOffsetX / cardWidth);
    setCurrentIndex(index);
  };

  return (
    <View className="mt-4 w-full">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        decelerationRate="fast"
        snapToInterval={screenWidth}
        snapToAlignment="center">
        {banners.map((banner) => (
          <View
            key={banner.id}
            style={{
              width: screenWidth,
              paddingHorizontal: 24, // Move padding to individual items
            }}>
            <Banner title={banner.title} subtitle={banner.subtitle} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
