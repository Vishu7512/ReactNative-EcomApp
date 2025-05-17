import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import Colors from '@/constants/Colors';

interface ProductSkeletonProps {
  count?: number;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // 2 columns with padding

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ count = 6 }) => {
  const opacity = useSharedValue(0.5);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0.5, { duration: 500 }),
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const skeletons = Array.from({ length: count }).map((_, index) => (
    <Animated.View key={index} style={[styles.container, animatedStyle]}>
      <View style={styles.imageContainer} />
      <View style={styles.contentContainer}>
        <View style={styles.titleLine} />
        <View style={styles.titleLineFull} />
        <View style={styles.ratingContainer}>
          <View style={styles.ratingLine} />
        </View>
        <View style={styles.priceLine} />
      </View>
    </Animated.View>
  ));

  return <>{skeletons}</>;
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 160,
    backgroundColor: Colors.neutral[200],
  },
  contentContainer: {
    padding: 12,
  },
  titleLine: {
    height: 16,
    width: '80%',
    backgroundColor: Colors.neutral[200],
    borderRadius: 4,
    marginBottom: 8,
  },
  titleLineFull: {
    height: 16,
    width: '60%',
    backgroundColor: Colors.neutral[200],
    borderRadius: 4,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLine: {
    height: 14,
    width: 80,
    backgroundColor: Colors.neutral[200],
    borderRadius: 4,
  },
  priceLine: {
    height: 20,
    width: '40%',
    backgroundColor: Colors.neutral[200],
    borderRadius: 4,
  },
});

export default ProductSkeleton;