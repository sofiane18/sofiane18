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
import { findServiceById, generateConfirmationCode } from '@/constants/mockData';
import { formatPrice, generateId } from '@/utils/formatter';
import { addOrder } from '@/utils/storage';
import { MapPin, Star, Briefcase, Phone, Navigation as NavigationArrow, Clock } from 'lucide-react-native';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const service = findServiceById(id as string);

  if (!service) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Service not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleBookNow = () => {
    // Create order object
    const orderId = generateId();
    const confirmationCode = generateConfirmationCode();
    
    const order = {
      id: orderId,
      itemId: service.id,
      itemName: service.name,
      itemPrice: service.price,
      itemType: 'service' as const,
      storeName: service.provider,
      storeLocation: service.location,
      date: new Date().toISOString(),
      status: 'Pickup Pending' as const,
      confirmationCode,
    };
    
    // Save to local storage
    addOrder(order);
    
    // Navigate to confirmation screen
    router.push(`/confirmation/${orderId}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Service Image */}
      <Image source={{ uri: service.image }} style={styles.image} />
      
      {/* Service Info Card */}
      <Card style={styles.infoCard}>
        <Text style={styles.category}>{service.category}</Text>
        <Text style={styles.name}>{service.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={18} color={COLORS.warning} fill={COLORS.warning} />
          <Text style={styles.rating}>{service.rating.toFixed(1)}</Text>
        </View>
        
        <View style={styles.providerContainer}>
          <Briefcase size={16} color={COLORS.gray} style={styles.icon} />
          <Text style={styles.providerText}>{service.provider}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={16} color={COLORS.gray} style={styles.icon} />
          <Text style={styles.locationText}>{service.location}</Text>
        </View>
        
        <View style={styles.durationContainer}>
          <Clock size={16} color={COLORS.gray} style={styles.icon} />
          <Text style={styles.durationText}>Duration: {service.duration}</Text>
        </View>
        
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.price}>{formatPrice(service.price)}</Text>
      </Card>
      
      {/* Description Card */}
      <Card style={styles.descriptionCard}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{service.description}</Text>
      </Card>
      
      {/* Provider Card */}
      <Card style={styles.providerCard}>
        <Text style={styles.providerTitle}>Service Provider Information</Text>
        
        <View style={styles.providerInfo}>
          <Text style={styles.providerInfoLabel}>Location:</Text>
          <Text style={styles.providerInfoText}>{service.location}</Text>
        </View>
        
        <View style={styles.providerActions}>
          <TouchableOpacity style={styles.providerAction}>
            <Phone size={20} color={COLORS.primary} />
            <Text style={styles.providerActionText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.providerAction}>
            <NavigationArrow size={20} color={COLORS.primary} />
            <Text style={styles.providerActionText}>Directions</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Map View</Text>
        </View>
      </Card>
      
      {/* Book Button */}
      <View style={styles.bookButtonContainer}>
        <Button
          title="Book Now"
          onPress={handleBookNow}
          style={styles.bookButton}
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
    height: 250,
    resizeMode: 'cover',
  },
  infoCard: {
    margin: 16,
    marginTop: -40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  category: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 8,
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
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  providerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  locationText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  durationText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  priceLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  price: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: COLORS.primary,
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
  providerCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  providerTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  providerInfo: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  providerInfoLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginRight: 8,
    width: 80,
  },
  providerInfoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  providerActions: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 20,
  },
  providerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  providerActionText: {
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
  bookButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  bookButton: {
    height: 56,
  },
  bottomPadding: {
    height: 40,
  },
});