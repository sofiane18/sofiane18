import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { ItemCard } from '@/components/ui/ItemCard';
import { COLORS } from '@/constants/colors';
import { 
  PRODUCT_CATEGORIES, 
  SERVICE_CATEGORIES,
  PRODUCTS,
  SERVICES,
  STORES
} from '@/constants/mockData';
import { Car, Wrench, File as Oil, Gauge, Lightbulb, Filter, DiscAlbum, BatteryCharging, ShowerHead, Cog, Stethoscope, Timer, Map, Sparkles } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  // Map categories to icons
  const getProductIcon = (category: string) => {
    switch (category) {
      case 'Brake Systems':
        return <DiscAlbum size={24} color={COLORS.white} />;
      case 'Engine Parts':
        return <Cog size={24} color={COLORS.white} />;
      case 'Filters':
        return <Filter size={24} color={COLORS.white} />;
      case 'Lighting':
        return <Lightbulb size={24} color={COLORS.white} />;
      case 'Oil & Fluids':
        return <Oil size={24} color={COLORS.white} />;
      case 'Suspension':
        return <Car size={24} color={COLORS.white} />;
      case 'Tires & Wheels':
        return <DiscAlbum size={24} color={COLORS.white} />;
      case 'Electronic Systems':
        return <BatteryCharging size={24} color={COLORS.white} />;
      default:
        return <Car size={24} color={COLORS.white} />;
    }
  };

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'General Maintenance':
        return <Wrench size={24} color={COLORS.white} />;
      case 'Repairs':
        return <Wrench size={24} color={COLORS.white} />;
      case 'Diagnostics':
        return <Stethoscope size={24} color={COLORS.white} />;
      case 'Cleaning':
        return <ShowerHead size={24} color={COLORS.white} />;
      case 'Tire Services':
        return <DiscAlbum size={24} color={COLORS.white} />;
      case 'Oil Change':
        return <Oil size={24} color={COLORS.white} />;
      case 'Battery Services':
        return <BatteryCharging size={24} color={COLORS.white} />;
      case 'AC Services':
        return <Gauge size={24} color={COLORS.white} />;
      default:
        return <Wrench size={24} color={COLORS.white} />;
    }
  };

  // Featured items
  const featuredProducts = PRODUCTS.slice(0, 4);
  const featuredServices = SERVICES.slice(0, 4);
  const featuredStores = STORES.slice(0, 2);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <View style={styles.heroContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg' }} 
          style={styles.heroImage} 
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>AutoDinar</Text>
          <Text style={styles.heroSubtitle}>Smart automotive shopping experience</Text>
        </View>
      </View>

      {/* Actions Card */}
      <Card style={styles.actionsCard}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => router.push('/explore')}
          activeOpacity={0.7}
        >
          <Car size={24} color={COLORS.primary} />
          <Text style={styles.actionText}>Explore All Products & Services</Text>
        </TouchableOpacity>
      </Card>

      {/* Product Categories */}
      <SectionHeader 
        title="Product Categories" 
        showViewAll 
        viewAllPath="/explore?type=product" 
      />
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesContainer}
      >
        {PRODUCT_CATEGORIES.map((category) => (
          <CategoryCard 
            key={category} 
            name={category} 
            type="product" 
            icon={getProductIcon(category)} 
          />
        ))}
      </ScrollView>

      {/* Featured Products */}
      <SectionHeader 
        title="Featured Products" 
        showViewAll 
        viewAllPath="/explore?type=product" 
      />
      <View style={styles.itemsGrid}>
        {featuredProducts.map((product) => (
          <ItemCard
            key={product.id}
            id={product.id}
            name={product.name}
            type="product"
            price={product.price}
            rating={product.rating}
            location={product.location}
            image={product.image}
            provider={product.store}
          />
        ))}
      </View>

      {/* Service Categories */}
      <SectionHeader 
        title="Service Categories" 
        showViewAll 
        viewAllPath="/explore?type=service" 
      />
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesContainer}
      >
        {SERVICE_CATEGORIES.map((category) => (
          <CategoryCard 
            key={category} 
            name={category} 
            type="service" 
            icon={getServiceIcon(category)} 
          />
        ))}
      </ScrollView>

      {/* Featured Services */}
      <SectionHeader 
        title="Featured Services" 
        showViewAll 
        viewAllPath="/explore?type=service" 
      />
      <View style={styles.itemsGrid}>
        {featuredServices.map((service) => (
          <ItemCard
            key={service.id}
            id={service.id}
            name={service.name}
            type="service"
            price={service.price}
            rating={service.rating}
            location={service.location}
            image={service.image}
            provider={service.provider}
          />
        ))}
      </View>

      {/* Nearby Stores */}
      <SectionHeader 
        title="Nearby Stores" 
        showViewAll 
        viewAllPath="/explore?type=store" 
      />
      <View style={styles.storesContainer}>
        {featuredStores.map((store) => (
          <Card key={store.id} style={styles.storeCard}>
            <Image source={{ uri: store.image }} style={styles.storeImage} />
            <View style={styles.storeContent}>
              <Text style={styles.storeName}>{store.name}</Text>
              <View style={styles.storeLocationContainer}>
                <Map size={14} color={COLORS.gray} />
                <Text style={styles.storeLocation}>{store.location}</Text>
              </View>
              <TouchableOpacity 
                style={styles.storeButton} 
                onPress={() => router.push(`/store/${store.id}`)}
                activeOpacity={0.7}
              >
                <Text style={styles.storeButtonText}>View Store</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>

      {/* AI Recommendations Banner */}
      <TouchableOpacity 
        style={styles.aiBanner} 
        onPress={() => router.push('/ai-picks')}
        activeOpacity={0.7}
      >
        <View style={styles.aiIconContainer}>
          <Sparkles size={24} color={COLORS.white} />
        </View>
        <View style={styles.aiTextContainer}>
          <Text style={styles.aiTitle}>AI-Powered Recommendations</Text>
          <Text style={styles.aiDescription}>Get personalized product & service recommendations for your vehicle</Text>
        </View>
      </TouchableOpacity>

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
  heroContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 32,
    color: COLORS.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  actionsCard: {
    marginTop: -20,
    marginHorizontal: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 10,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  storesContainer: {
    paddingHorizontal: 16,
  },
  storeCard: {
    flexDirection: 'row',
    padding: 0,
    overflow: 'hidden',
    marginBottom: 16,
  },
  storeImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  storeContent: {
    flex: 1,
    padding: 12,
  },
  storeName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  storeLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeLocation: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 4,
  },
  storeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  storeButtonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.white,
  },
  aiBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.accentLight,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  aiIconContainer: {
    backgroundColor: COLORS.accent,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  aiDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.text,
  },
  bottomPadding: {
    height: 40,
  },
});