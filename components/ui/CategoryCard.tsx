import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from './Card';
import { COLORS } from '@/constants/colors';

type CategoryCardProps = {
  name: string;
  type: 'product' | 'service';
  icon: React.ReactNode;
};

export const CategoryCard = ({ name, type, icon }: CategoryCardProps) => {
  const router = useRouter();
  
  const handlePress = () => {
    // Navigate to explore page with filter applied
    router.push({
      pathname: '/explore',
      params: { 
        filter: name,
        type: type
      }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 110,
    height: 110,
    padding: 12,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: COLORS.text,
    textAlign: 'center',
  },
});