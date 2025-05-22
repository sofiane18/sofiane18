import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { COLORS } from '@/constants/colors';
import { formatPrice, formatDate } from '@/utils/formatter';
import { getOrders } from '@/utils/storage';
import { Order } from '@/constants/mockData';
import { Calendar, ShoppingBag, MapPin, Clock } from 'lucide-react-native';

export default function OrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const storedOrders = getOrders();
    setOrders(storedOrders);
    setLoading(false);
  };

  const goToConfirmation = (orderId: string) => {
    router.push(`/confirmation/${orderId}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading orders...</Text>
          </View>
        ) : orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg' }}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptyText}>
              You haven't placed any orders yet. Start browsing products and services!
            </Text>
            <Button
              title="Explore Products"
              onPress={() => router.push('/explore')}
              style={styles.exploreButton}
            />
          </View>
        ) : (
          <View style={styles.ordersContainer}>
            {orders.map((order) => (
              <Card key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderHeaderLeft}>
                    <Text style={styles.orderType}>
                      {order.itemType === 'product' ? 'Product' : 'Service'}
                    </Text>
                    <View style={styles.orderDateContainer}>
                      <Calendar size={14} color={COLORS.gray} />
                      <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
                    </View>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    order.status === 'Completed' ? styles.completedBadge : styles.pendingBadge
                  ]}>
                    <Text style={[
                      styles.statusText,
                      order.status === 'Completed' ? styles.completedText : styles.pendingText
                    ]}>
                      {order.status}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.orderContent}>
                  <View style={styles.orderInfo}>
                    <ShoppingBag size={18} color={COLORS.primary} style={styles.icon} />
                    <Text style={styles.orderItemName}>{order.itemName}</Text>
                  </View>
                  
                  <View style={styles.orderInfo}>
                    <MapPin size={18} color={COLORS.gray} style={styles.icon} />
                    <Text style={styles.orderStoreName}>{order.storeName}, {order.storeLocation}</Text>
                  </View>
                  
                  <View style={styles.orderPriceRow}>
                    <Text style={styles.orderPrice}>{formatPrice(order.itemPrice)}</Text>
                    
                    <Button
                      title="View Confirmation"
                      onPress={() => goToConfirmation(order.id)}
                      type="outline"
                      style={styles.viewButton}
                      textStyle={styles.viewButtonText}
                    />
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
  },
  emptyTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  exploreButton: {
    minWidth: 200,
  },
  ordersContainer: {
    padding: 16,
  },
  orderCard: {
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderType: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  orderDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderDate: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: COLORS.warning + '20', // 20% opacity
  },
  completedBadge: {
    backgroundColor: COLORS.success + '20', // 20% opacity
  },
  statusText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
  },
  pendingText: {
    color: COLORS.warning,
  },
  completedText: {
    color: COLORS.success,
  },
  orderContent: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  orderItemName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  orderStoreName: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },
  orderPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  orderPrice: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: COLORS.primary,
  },
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewButtonText: {
    fontSize: 14,
  },
  bottomPadding: {
    height: 40,
  },
});