import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const handlePress = () => {
    router.push(`/products/${item.id}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.imageContainer}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.image} 
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
          <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
        
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.actionsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleDecreaseQuantity}
            >
              <Minus size={16} color={Colors.neutral[600]} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleIncreaseQuantity}
            >
              <Plus size={16} color={Colors.neutral[600]} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={handleRemove}
          >
            <Trash2 size={16} color={Colors.error[500]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.neutral[50],
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: Colors.primary[700],
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
  },
  quantity: {
    width: 32,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  removeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.neutral[100],
  },
});

export default CartItem;