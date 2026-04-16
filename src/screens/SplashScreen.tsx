import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import GradientBackground from '../components/GradientBackground';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const isSmall  = SCREEN_H < 700;
const LOGO_SIZE = isSmall ? SCREEN_W * 0.52 : SCREEN_W * 0.68;

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Onboarding'), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <GradientBackground preset="splash" />
      <Image
        source={require('../assets/loader.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  logo: {
    width:  LOGO_SIZE,
    height: LOGO_SIZE,
  },
});