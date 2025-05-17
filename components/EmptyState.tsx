import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

interface EmptyStateProps {
  title: string;
  message: string;
  buttonText: string;
  buttonAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  buttonText,
  buttonAction,
  icon,
}) => {
  const router = useRouter();

  const handleButtonPress = () => {
    if (buttonAction) {
      buttonAction();
    } else {
      router.push('/');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon || <ShoppingBag size={48} color={Colors.neutral[400]} />}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress} activeOpacity={0.8}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[800],
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    backgroundColor: Colors.primary[500],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});

export default EmptyState;