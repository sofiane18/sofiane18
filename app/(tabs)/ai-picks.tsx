import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ItemCard } from '@/components/ui/ItemCard';
import { COLORS } from '@/constants/colors';
import { Product, Service, generateRecommendations } from '@/constants/mockData';
import { Sparkles, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function AIPicksScreen() {
  const router = useRouter();
  const [vehicle, setVehicle] = useState('');
  const [pastPurchases, setPastPurchases] = useState('');
  const [recommendations, setRecommendations] = useState<(Product | Service)[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = () => {
    if (!vehicle.trim()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = generateRecommendations(vehicle, pastPurchases);
      setRecommendations(results);
      setShowForm(false);
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setShowForm(true);
    setRecommendations([]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header Banner */}
        <View style={styles.headerBanner}>
          <View style={styles.headerIconContainer}>
            <Sparkles size={28} color={COLORS.white} />
          </View>
          <Text style={styles.headerTitle}>AI Recommendations</Text>
          <Text style={styles.headerDescription}>
            Get personalized product and service recommendations for your vehicle
          </Text>
        </View>

        {showForm ? (
          <Card style={styles.formCard}>
            <Text style={styles.formTitle}>Vehicle Information</Text>
            
            <Text style={styles.inputLabel}>Vehicle Details</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Renault Clio 2018"
              value={vehicle}
              onChangeText={setVehicle}
            />
            
            <Text style={styles.inputLabel}>Recent Purchases (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="e.g., brake pads, oil change, tire rotation"
              value={pastPurchases}
              onChangeText={setPastPurchases}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
            
            <View style={styles.disclaimerContainer}>
              <AlertTriangle size={18} color={COLORS.warning} style={styles.disclaimerIcon} />
              <Text style={styles.disclaimerText}>
                This is a demo. No real AI processing is performed.
              </Text>
            </View>
            
            <Button
              title="Get Recommendations"
              onPress={handleSubmit}
              loading={loading}
              disabled={!vehicle.trim() || loading}
              style={styles.submitButton}
              fullWidth
            />
          </Card>
        ) : (
          <View style={styles.resultsContainer}>
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Recommendations for</Text>
              <Text style={styles.vehicleText}>{vehicle}</Text>
              
              <TouchableOpacity onPress={resetForm} style={styles.resetButton}>
                <Text style={styles.resetText}>Try with different vehicle</Text>
              </TouchableOpacity>
            </Card>

            <View style={styles.recommendationsContainer}>
              <Text style={styles.recommendationsTitle}>Suggested for You</Text>
              
              <View style={styles.itemsGrid}>
                {recommendations.map(item => (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type={'price' in item ? ('provider' in item ? 'service' : 'product') : 'store'}
                    price={'price' in item ? item.price : undefined}
                    rating={item.rating}
                    location={item.location}
                    image={item.image}
                    provider={
                      'store' in item 
                        ? item.store 
                        : 'provider' in item 
                          ? item.provider 
                          : undefined
                    }
                  />
                ))}
              </View>
            </View>
          </View>
        )}
        
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
  },
  headerBanner: {
    backgroundColor: COLORS.primary,
    padding: 24,
    alignItems: 'center',
  },
  headerIconContainer: {
    backgroundColor: COLORS.primaryDark,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    color: COLORS.white,
    marginBottom: 8,
  },
  headerDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.8,
  },
  formCard: {
    margin: 16,
  },
  formTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 12,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warning + '15', // 15% opacity
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  disclaimerIcon: {
    marginRight: 8,
  },
  disclaimerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },
  submitButton: {
    marginTop: 8,
  },
  resultsContainer: {
    padding: 16,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  vehicleText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 16,
  },
  resetButton: {
    alignSelf: 'flex-start',
  },
  resetText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.primary,
  },
  recommendationsContainer: {
    marginBottom: 16,
  },
  recommendationsTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bottomPadding: {
    height: 40,
  },
});