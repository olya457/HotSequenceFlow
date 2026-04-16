import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { getOnboardingDone } from '../data/storage';
import { COLORS } from '../constants/colors';

import SplashScreen     from '../screens/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import MainNavigator    from './MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [initial,  setInitial]  = useState<keyof RootStackParamList | null>(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    getOnboardingDone().then(done => {
      setInitial(done ? 'Main' : 'Splash');
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={COLORS.yellow} size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initial!}
      screenOptions={{
        headerShown: false,
        animation:   'fade',
      }}
    >
      <Stack.Screen name="Splash"      component={SplashScreen} />
      <Stack.Screen name="Onboarding"  component={OnboardingScreen} />
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{ animation: 'fade' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex:            1,
    backgroundColor: COLORS.splashTop,
    alignItems:      'center',
    justifyContent:  'center',
  },
});