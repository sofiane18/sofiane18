import { useEffect, useCallback } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { COLORS } from '@/constants/colors';

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }} onLayout={onLayoutRootView}>
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background }
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="product/[id]" 
          options={{ 
            headerShown: true,
            headerTitle: "Product Details",
            headerTintColor: COLORS.white,
            headerStyle: { backgroundColor: COLORS.primary }
          }} 
        />
        <Stack.Screen 
          name="service/[id]" 
          options={{ 
            headerShown: true,
            headerTitle: "Service Details",
            headerTintColor: COLORS.white,
            headerStyle: { backgroundColor: COLORS.primary }
          }} 
        />
        <Stack.Screen 
          name="store/[id]" 
          options={{ 
            headerShown: true,
            headerTitle: "Store Details",
            headerTintColor: COLORS.white,
            headerStyle: { backgroundColor: COLORS.primary }
          }} 
        />
        <Stack.Screen 
          name="confirmation/[id]" 
          options={{ 
            headerShown: true,
            headerTitle: "Order Confirmation",
            headerTintColor: COLORS.white,
            headerStyle: { backgroundColor: COLORS.primary }
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}