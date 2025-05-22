import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { COLORS } from '@/constants/colors';
import { findProductById, generateConfirmationCode } from '@/constants/mockData';
import { formatPrice, generateId } from '@/utils/formatter';
import { addOrder } from '@/utils/storage';
import { MapPin, Star, ShoppingBag, Phone, Navigation as NavigationArrow } from 'lucide-react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = findProductById(id as string);

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Product not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleBuyNow = () => {
    // Create order object
    const orderId = generateId();
    const confirmationCode = generateConfirmationCode();
    
    const order = {
      id: orderId,
      itemId: product.id,
      itemName: product.name,
      itemPrice: product.price,
      itemType: 'product' as const,
      storeName: product.store,
      storeLocation: product.location,
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
      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.image} />
      
      {/* Product Info Card */}
      <Card style={styles.infoCard}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={18} color={COLORS.warning} fill={COLORS.warning} />
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
        </View>
        
        <View style={styles.storeContainer}>
          <ShoppingBag size={16} color={COLORS.gray} style={styles.icon} />
          <Text style={styles.storeText}>{product.store}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={16} color={COLORS.gray} style={styles.icon} />
          <Text style={styles.locationText}>{product.location}</Text>
        </View>
        
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </Card>
      
      {/* Description Card */}
      <Card style={styles.descriptionCard}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{product.description}</Text>
      </Card>
      
      {/* Store Card */}
      <Card style={styles.storeCard}>
        <Text style={styles.storeTitle}>Store Information</Text>
        
        <View style={styles.storeInfo}>
          <Text style={styles.storeInfoLabel}>Location:</Text>
          <Text style={styles.storeInfoText}>{product.location}</Text>
        </View>
        
        <View style={styles.storeActions}>
          <TouchableOpacity style={styles.storeAction}>
            <Phone size={20} color={COLORS.primary} />
            <Text style={styles.storeActionText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.storeAction}>
            <NavigationArrow size={20} color={COLORS.primary} />
            <Text style={styles.storeActionText}>Directions</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Map View</Text>
        </View>
      </Card>
      
      {/* Buy Button */}
      <View style={styles.buyButtonContainer}>
        <Button
          title="Buy Now"
          onPress={handleBuyNow}
          style={styles.buyButton}
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
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  storeText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  locationText: {
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
  storeCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  storeTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  storeInfo: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  storeInfoLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginRight: 8,
    width: 80,
  },
  storeInfoText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  storeActions: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 20,
  },
  storeAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  storeActionText: {
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
  buyButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buyButton: {
    height: 56,
  },
  bottomPadding: {
    height: 40,
  },
});