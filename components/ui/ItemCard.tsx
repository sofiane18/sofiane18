import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from './Card';
import { MapPin, Star } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { formatPrice } from '@/utils/formatter';

type ItemCardProps = {
  id: string;
  name: string;
  type: 'product' | 'service' | 'store';
  price?: number;
  rating: number;
  location: string;
  image: string;
  provider?: string;
};

export const ItemCard = ({
  id,
  name,
  type,
  price,
  rating,
  location,
  image,
  provider,
}: ItemCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    switch (type) {
      case 'product':
        router.push(`/product/${id}`);
        break;
      case 'service':
        router.push(`/service/${id}`);
        break;
      case 'store':
        router.push(`/store/${id}`);
        break;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={styles.container}>
      <Card style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>{name}</Text>
          {provider && (
            <Text style={styles.provider} numberOfLines={1}>{provider}</Text>
          )}
          <View style={styles.locationContainer}>
            <MapPin size={14} color={COLORS.gray} />
            <Text style={styles.location}>{location}</Text>
          </View>
          <View style={styles.bottomRow}>
            {price !== undefined && (
              <Text style={styles.price}>{formatPrice(price)}</Text>
            )}
            <View style={styles.ratingContainer}>
              <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
              <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 8,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 12,
  },
  name: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
  provider: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: COLORS.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
});