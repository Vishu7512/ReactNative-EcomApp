import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface RatingStarsProps {
  rating: number;
  size?: number;
  color?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 16, 
  color = Colors.accent[400]
}) => {
  // Create an array of 5 stars
  const stars = [];
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        size={size}
        color={color}
        fill={color}
      />
    );
  }

  // Add partial star if needed
  if (partialStar > 0) {
    stars.push(
      <View key="partial" style={styles.partialStarContainer}>
        <Star
          size={size}
          color={color}
          fill={color}
          style={styles.partialStarFill}
        />
        <View style={[
          styles.partialStarOverlay,
          { width: `${(1 - partialStar) * 100}%` }
        ]}>
          <Star
            size={size}
            color={color}
            style={styles.partialStarOutline}
          />
        </View>
      </View>
    );
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        size={size}
        color={color}
      />
    );
  }

  return (
    <View style={styles.container}>
      {stars}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  partialStarContainer: {
    position: 'relative',
  },
  partialStarFill: {
    position: 'absolute',
  },
  partialStarOutline: {
    position: 'absolute',
  },
  partialStarOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: '#fff',
  }
});

export default RatingStars;