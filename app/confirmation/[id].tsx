import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { COLORS } from '@/constants/colors';
import { getOrderById } from '@/utils/storage';
import { formatPrice, formatDate } from '@/utils/formatter';
import { CircleCheck as CheckCircle, Copy, Share2, MapPin, Car, Store } from 'lucide-react-native';
import Svg, { Rect } from 'react-native-svg';

export default function ConfirmationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const order = getOrderById(id as string);

  if (!order) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Order not found</Text>
        <Button title="Go to Orders" onPress={() => router.push('/orders')} />
      </View>
    );
  }

  const handleCopyCode = async () => {
    try {
      await Share.share({
        message: `My AutoDinar confirmation code: ${order.confirmationCode}`,
      });
    } catch (error) {
      console.error('Error sharing code:', error);
    }
  };

  // Generate a mock QR code (visual representation only)
  const MockQRCode = () => (
    <View style={styles.qrContainer}>
      <Svg height={200} width={200} viewBox="0 0 100 100">
        {/* Simple visual representation of a QR code */}
        <Rect x="0" y="0" width="100" height="100" fill="white" />
        <Rect x="10" y="10" width="20" height="20" fill="black" />
        <Rect x="70" y="10" width="20" height="20" fill="black" />
        <Rect x="10" y="70" width="20" height="20" fill="black" />
        <Rect x="40" y="40" width="20" height="20" fill="black" />
        <Rect x="70" y="70" width="10" height="10" fill="black" />
        <Rect x="80" y="60" width="10" height="10" fill="black" />
        <Rect x="40" y="10" width="10" height="10" fill="black" />
        <Rect x="10" y="40" width="10" height="10" fill="black" />
        <Rect x="60" y="40" width="10" height="10" fill="black" />
        <Rect x="80" y="40" width="10" height="10" fill="black" />
      </Svg>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.successContainer}>
        <View style={styles.successIconContainer}>
          <CheckCircle size={64} color={COLORS.success} fill={COLORS.success} />
        </View>
        <Text style={styles.successTitle}>Purchase Confirmed!</Text>
        <Text style={styles.successText}>
          Your order has been successfully placed.
        </Text>
      </View>

      <Card style={styles.confirmationCard}>
        <Text style={styles.cardTitle}>Order Details</Text>
        
        <View style={styles.orderDetail}>
          <Text style={styles.orderDetailLabel}>Item:</Text>
          <Text style={styles.orderDetailValue}>{order.itemName}</Text>
        </View>
        
        <View style={styles.orderDetail}>
          <Text style={styles.orderDetailLabel}>Price:</Text>
          <Text style={styles.orderDetailValue}>{formatPrice(order.itemPrice)}</Text>
        </View>
        
        <View style={styles.orderDetail}>
          <Text style={styles.orderDetailLabel}>Date:</Text>
          <Text style={styles.orderDetailValue}>{formatDate(order.date)}</Text>
        </View>
        
        <View style={styles.orderDetail}>
          <Text style={styles.orderDetailLabel}>Type:</Text>
          <Text style={styles.orderDetailValue}>
            {order.itemType === 'product' ? 'Product' : 'Service'}
          </Text>
        </View>
        
        <View style={styles.storeContainer}>
          <Store size={18} color={COLORS.primary} style={styles.storeIcon} />
          <Text style={styles.storeName}>{order.storeName}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin size={18} color={COLORS.gray} style={styles.locationIcon} />
          <Text style={styles.locationText}>{order.storeLocation}</Text>
        </View>
      </Card>

      <Card style={styles.qrCard}>
        <Text style={styles.qrTitle}>Show this at pickup</Text>
        
        <MockQRCode />
        
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Confirmation Code</Text>
          <View style={styles.codeValueContainer}>
            <Text style={styles.codeValue}>{order.confirmationCode}</Text>
            <TouchableOpacity onPress={handleCopyCode} style={styles.copyButton}>
              <Copy size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      <Card style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>Pickup Instructions</Text>
        
        <View style={styles.instruction}>
          <View style={styles.instructionNumber}>
            <Text style={styles.instructionNumberText}>1</Text>
          </View>
          <Text style={styles.instructionText}>
            Visit {order.storeName} in {order.storeLocation}
          </Text>
        </View>
        
        <View style={styles.instruction}>
          <View style={styles.instructionNumber}>
            <Text style={styles.instructionNumberText}>2</Text>
          </View>
          <Text style={styles.instructionText}>
            Show this confirmation screen (QR code or confirmation code) to the staff
          </Text>
        </View>
        
        <View style={styles.instruction}>
          <View style={styles.instructionNumber}>
            <Text style={styles.instructionNumberText}>3</Text>
          </View>
          <Text style={styles.instructionText}>
            {order.itemType === 'product' 
              ? 'Collect your product' 
              : 'Get your service completed'}
          </Text>
        </View>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title="Share Confirmation"
          onPress={handleCopyCode}
          type="outline"
          style={styles.shareButton}
          textStyle={styles.shareButtonText}
          fullWidth
        />
        
        <Button
          title="Go to My Orders"
          onPress={() => router.push('/orders')}
          style={styles.ordersButton}
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
  successContainer: {
    alignItems: 'center',
    padding: 24,
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: COLORS.success,
    marginBottom: 8,
  },
  successText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  confirmationCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  orderDetail: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  orderDetailLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    width: 60,
  },
  orderDetailValue: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  storeIcon: {
    marginRight: 8,
  },
  storeName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: COLORS.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 8,
  },
  locationText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.gray,
  },
  qrCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  qrTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  qrContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    ...StyleSheet.absoluteFillObject,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  codeContainer: {
    width: '100%',
    marginTop: 220, // Account for the QR code height
  },
  codeLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  codeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight + '15', // 15% opacity
    borderRadius: 8,
    padding: 12,
  },
  codeValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: COLORS.primary,
    letterSpacing: 2,
  },
  copyButton: {
    marginLeft: 12,
    padding: 4,
  },
  instructionsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 16,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  instructionNumberText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: COLORS.white,
  },
  instructionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
    lineHeight: 24,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  shareButton: {
    marginBottom: 12,
  },
  shareButtonText: {
    color: COLORS.primary,
  },
  ordersButton: {
    backgroundColor: COLORS.primary,
  },
  bottomPadding: {
    height: 40,
  },
});