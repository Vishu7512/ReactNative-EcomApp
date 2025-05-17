import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/Colors';
import { ShoppingCart } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function CartScreen() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Looks like you haven't added anything to your cart yet."
        buttonText="Start Shopping"
        icon={<ShoppingCart size={48} color={Colors.neutral[400]} />}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Cart</Text>
        
        {cartItems.map((item, index) => (
          <Animated.View 
            key={item.id} 
            entering={FadeInUp.delay(index * 100).springify()}
          >
            <CartItem item={item} />
          </Animated.View>
        ))}
      </ScrollView>
      
      <Animated.View 
        style={styles.summaryContainer}
        entering={FadeInUp.delay(200).springify()}
      >
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>${getTotalPrice().toFixed(2)}</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearCart}
            activeOpacity={0.7}
          >
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.checkoutButton}
            activeOpacity={0.7}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 150, // Space for summary container
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
    color: Colors.neutral[800],
  },
  summaryContainer: {
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[600],
  },
  summaryValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: Colors.neutral[100],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[700],
  },
  checkoutButton: {
    flex: 2,
    paddingVertical: 16,
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#fff',
  },
});