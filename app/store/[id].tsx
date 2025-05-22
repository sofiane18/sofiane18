import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { COLORS } from '@/constants/colors';
import { findStoreById } from '@/constants/mockData';
import { MapPin, Star, Phone, Navigation as NavigationArrow, Tag } from 'lucide-react-native';

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const store = findStoreById(id as string);

  if (!store) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Store not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleExploreProducts = () => {
    router.push({
      pathname: '/explore',
      params: { type: 'product' }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Store Image */}
      <Image source={{ uri: store.image }} style={styles.image} />
      
      {/* Store Info Card */}
      <Card style={styles.infoCard}>
        <Text style={styles.name}>{store.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={18} color={COLORS.warning} fill={COLORS.warning} />
          <Text style={styles.rating}>{store.rating.toFixed(1)}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={16} color={COLORS.gray} style={styles.icon} />
          <Text style={styles.locationText}>{store.address}</Text>
        </View>
        
        <View style={styles.phoneContainer}>
          <Phone size={16} color={COLORS.gray} style={styles.icon} />
          <Text style={styles.phoneText}>{store.phone}</Text>
        </View>
        
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Specializes in:</Text>
          <View style={styles.categoriesRow}>
            {store.categories.map((category) => (
              <View style={styles.categoryChip} key={category}>
                <Tag size={12} color={COLORS.primary} />
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>
        </View>
      </Card>
      
      {/* Description Card */}
      <Card style={styles.descriptionCard}>
        <Text style={styles.descriptionTitle}>About</Text>
        <Text style={styles.descriptionText}>{store.description}</Text>
      </Card>
      
      {/* Location Card */}
      <Card style={styles.locationCard}>
        <Text style={styles.locationTitle}>Location</Text>
        
        <View style={styles.locationActions}>
          <TouchableOpacity style={styles.locationAction}>
            <Phone size={20} color={COLORS.primary} />
            <Text style={styles.locationActionText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.locationAction}>
            <NavigationArrow size={20} color={COLORS.primary} />
            <Text style={styles.locationActionText}>Directions</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Map View</Text>
        </View>
      </Card>
      
      {/* Explore Button */}
      <View style={styles.exploreButtonContainer}>
        <Button
          title="Explore Products"
          onPress={handleExploreProducts}
          style={styles.exploreButton}
          fullWidth
        />
      </View>
      
      {/* Bottom padding */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoCard: {
    margin: 16,
    marginTop: -40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  locationText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },
  phoneText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  categoriesContainer: {
    marginTop: 8,
  },
  categoriesTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight + '20', // 20% opacity
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 4,
  },
  descriptionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
  locationCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  locationTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  locationActions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  locationAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  locationActionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 8,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  exploreButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  exploreButton: {
    height: 56,
  },
  bottomPadding: {
    height: 40,
  },
});