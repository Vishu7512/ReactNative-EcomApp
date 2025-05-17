import { Tabs } from 'expo-router';
import { ShoppingBag, ShoppingCart } from 'lucide-react-native';
import { StyleSheet, Platform } from 'react-native';
import { useCart } from '@/context/CartContext';
import Colors from '@/constants/Colors';
import { View, Text } from 'react-native';

export default function TabLayout() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary[500],
        tabBarInactiveTintColor: Colors.neutral[400],
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: true,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag size={size} color={color} />
          ),
          headerTitle: 'Shop'
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <View>
              <ShoppingCart size={size} color={color} />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    }),
    backgroundColor: '#fff',
    height: 60,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: Colors.error[500],
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  header: {
    backgroundColor: Colors.primary[500],
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    fontSize: 18,
  }
});