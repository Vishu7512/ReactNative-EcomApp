import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import RatingStars from '@/components/RatingStars';
import Colors from '@/constants/Colors';
import { ArrowLeft, CircleCheck as CheckCircle, ShoppingCart } from 'lucide-react-native';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getProductById, loading } = useProducts();
  const { addToCart, isInCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = React.useState(false);
  const buttonScale = useSharedValue(1);

  const productId = parseInt(id as string, 10);
  const product = getProductById(productId);
  
  const alreadyInCart = isInCart(productId);

  const handleAddToCart = () => {
    if (product && !alreadyInCart) {
      buttonScale.value = withSpring(1.1, { damping: 2 }, () => {
        buttonScale.value = withSpring(1);
      });
      
      addToCart(product, 1);
      setAdded(true);
      
      // Reset the added state after animation completes
      setTimeout(() => {
        setAdded(false);
      }, 2000);
    }
  };

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backIconButton}
              onPress={() => router.back()}
            >
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.image }} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        <Animated.View 
          style={styles.detailsContainer}
          entering={FadeInDown.duration(400).springify()}
        >
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>
          
          <View style={styles.ratingContainer}>
            <RatingStars rating={product.rating.rate} size={18} />
            <Text style={styles.ratingText}>
              {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
            </Text>
          </View>
          
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </Animated.View>
      </ScrollView>
      
      <Animated.View
        style={[styles.bottomContainer, animatedButtonStyle]}
        entering={FadeInDown.delay(200).duration(400).springify()}
      >
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            alreadyInCart && styles.inCartButton,
          ]}
          onPress={handleAddToCart}
          disabled={alreadyInCart}
          activeOpacity={0.8}
        >
          {alreadyInCart ? (
            <>
              <CheckCircle color="#fff" size={20} />
              <Text style={styles.addToCartButtonText}>Added to Cart</Text>
            </>
          ) : added ? (
            <>
              <CheckCircle color="#fff" size={20} />
              <Text style={styles.addToCartButtonText}>Added to Cart</Text>
            </>
          ) : (
            <>
              <ShoppingCart color="#fff" size={20} />
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginBottom: 16,
    color: Colors.neutral[800],
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary[500],
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontFamily: 'Inter-Medium',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 24,
  },
  backIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  category: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[500],
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
  },
  price: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.primary[700],
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[800],
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[700],
    lineHeight: 22,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary[500],
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  inCartButton: {
    backgroundColor: Colors.success[500],
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
});