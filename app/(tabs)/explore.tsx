import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { SearchBar } from '@/components/ui/SearchBar';
import { ItemCard } from '@/components/ui/ItemCard';
import { 
  PRODUCTS, 
  SERVICES, 
  STORES, 
  PRODUCT_CATEGORIES, 
  SERVICE_CATEGORIES 
} from '@/constants/mockData';
import { Car, Wrench, Store } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';

type TabType = 'product' | 'service' | 'store';

export default function ExploreScreen() {
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams();
  const initialType = (params?.type as TabType) || 'product';
  const initialFilter = params?.filter as string;

  const [activeTab, setActiveTab] = useState<TabType>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialFilter || null);

  // Reset category filter when tab changes
  useEffect(() => {
    setSelectedCategory(null);
  }, [activeTab]);

  // Reset search when category changes
  useEffect(() => {
    setSearchQuery('');
  }, [selectedCategory]);

  // Set initial category from URL params
  useEffect(() => {
    if (initialFilter) {
      setSelectedCategory(initialFilter);
    }
  }, [initialFilter]);

  // Apply filters to the data
  const getFilteredData = () => {
    let data;
    
    // Select data based on active tab
    switch (activeTab) {
      case 'product':
        data = PRODUCTS;
        break;
      case 'service':
        data = SERVICES;
        break;
      case 'store':
        data = STORES;
        break;
      default:
        data = PRODUCTS;
    }

    // Apply category filter if selected
    if (selectedCategory) {
      data = data.filter(item => 
        'category' in item 
          ? item.category === selectedCategory
          : 'categories' in item 
            ? item.categories.includes(selectedCategory)
            : false
      );
    }

    // Apply search query if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(query);
        const locationMatch = item.location.toLowerCase().includes(query);
        const providerMatch = 'store' in item 
          ? item.store.toLowerCase().includes(query)
          : 'provider' in item 
            ? item.provider.toLowerCase().includes(query)
            : false;
        
        return nameMatch || locationMatch || providerMatch;
      });
    }

    return data;
  };

  const filteredData = getFilteredData();

  // Get categories based on active tab
  const getCategories = () => {
    switch (activeTab) {
      case 'product':
        return PRODUCT_CATEGORIES;
      case 'service':
        return SERVICE_CATEGORIES;
      default:
        return [];
    }
  };

  const categories = getCategories();

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'product' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('product')}
        >
          <Car 
            size={20} 
            color={activeTab === 'product' ? COLORS.primary : COLORS.gray} 
          />
          <Text 
            style={[
              styles.tabText,
              activeTab === 'product' && styles.activeTabText,
            ]}
          >
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'service' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('service')}
        >
          <Wrench 
            size={20} 
            color={activeTab === 'service' ? COLORS.primary : COLORS.gray} 
          />
          <Text 
            style={[
              styles.tabText,
              activeTab === 'service' && styles.activeTabText,
            ]}
          >
            Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'store' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('store')}
        >
          <Store 
            size={20} 
            color={activeTab === 'store' ? COLORS.primary : COLORS.gray} 
          />
          <Text 
            style={[
              styles.tabText,
              activeTab === 'store' && styles.activeTabText,
            ]}
          >
            Stores
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={`Search ${activeTab}s...`}
        onClear={() => setSearchQuery('')}
      />

      {/* Categories for products and services */}
      {activeTab !== 'store' && categories.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryChip,
              !selectedCategory && styles.activeCategoryChip,
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text 
              style={[
                styles.categoryText,
                !selectedCategory && styles.activeCategoryText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.activeCategoryChip,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Results */}
      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {filteredData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        ) : (
          <View style={styles.resultsGrid}>
            {filteredData.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                type={activeTab}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 8,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  categoriesContainer: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  activeCategoryChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: COLORS.text,
  },
  activeCategoryText: {
    color: COLORS.white,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 80,
  },
});