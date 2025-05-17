import { Stack } from 'expo-router/stack';
import Colors from '@/constants/Colors';

export default function ProductsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary[500],
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Inter-Bold',
        },
        presentation: 'card',
      }}
    />
  );
}