import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/types';
import RatingStars from './RatingStars';
import Colors from '@/constants/Colors';
import Animated, { FadeIn } from 'react-native-reanimated';

interface ProductCardProps {
  product: Product;
  index: number;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // 2 columns with padding

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const router = useRouter();
  const delay = 100 * (index % 10); // Stagger animation for first 10 items

  const handlePress = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Animated.View 
      entering={FadeIn.delay(delay).duration(300)}
      style={styles.container}
    >
      <TouchableOpacity 
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.image} 
            resizeMode="contain"
          />
        </View>
        <View style={styles.contentContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {product.title}
          </Text>
          <View style={styles.ratingContainer}>
            <RatingStars rating={product.rating.rate} size={14} />
            <Text style={styles.ratingCount}>({product.rating.count})</Text>
          </View>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginBottom: 16,
  },
  card: {
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
    backgroundColor: Colors.neutral[50],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[800],
    marginBottom: 4,
    height: 40,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: Colors.neutral[500],
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: Colors.primary[700],
  }
});

export default ProductCard;