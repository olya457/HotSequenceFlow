import React, { useState, useRef } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, FlatList, Dimensions,
  ListRenderItem, Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList, OnboardingSlide } from '../../types/navigation';
import GradientBackground from '../../components/GradientBackground';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { setOnboardingDone } from '../../data/storage';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const isSmall = SCREEN_H < 700;

const SLIDES: OnboardingSlide[] = [
  {
    id:         1,
    image:      require('../../assets/img_onboard_cherry_hands.png'),
    title:      'Start Small. Move Fast.',
    subtitle:   'One short action can shift your pace instantly.',
    buttonText: "Let's Begin",
  },
  {
    id:         2,
    image:      require('../../assets/img_onboard_lemon_hands.png'),
    title:      'Stay Sharp',
    subtitle:   'A quick check keeps your mind in motion.',
    buttonText: 'Continue',
  },
  {
    id:         3,
    image:      require('../../assets/img_onboard_orange_hands.png'),
    title:      'Stay in Motion',
    subtitle:   'Patterns appear when you keep going.',
    buttonText: 'Next',
  },
  {
    id:         4,
    image:      require('../../assets/img_onboard_watermelon_hands.png'),
    title:      'Slow It Down',
    subtitle:   'Some moments are meant to be longer.',
    buttonText: 'Continue',
  },
  {
    id:         5,
    image:      require('../../assets/img_onboard_flame_hands.png'),
    title:      'Keep the Heat',
    subtitle:   'Every step builds your rhythm.',
    buttonText: 'Next',
  },
  {
    id:         6,
    image:      require('../../assets/img_onboard_star_hands.png'),
    title:      'One Tap Away',
    subtitle:   'Pick a fruit and start your flow.',
    buttonText: 'Ignite',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const insets  = useSafeAreaInsets();

  const paddingTop    = Platform.OS === 'android' ? SPACING.safeTop    : insets.top;
  const paddingBottom = Platform.OS === 'android' ? SPACING.safeBottom : insets.bottom;

  const goNext = async () => {
    if (index < SLIDES.length - 1) {
      const next = index + 1;
      listRef.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    } else {
      await setOnboardingDone();
      navigation.replace('Main');
    }
  };

  const skip = async () => {
    await setOnboardingDone();
    navigation.replace('Main');
  };

  const renderItem: ListRenderItem<OnboardingSlide> = ({ item }) => (
    <View style={[styles.slide, { width: SCREEN_W }]}>
      <Image
        source={item.image}
        style={styles.slideImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop, paddingBottom }]}>
      <GradientBackground preset="onboarding" />

      <View style={styles.header}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
        <TouchableOpacity onPress={skip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip  ›</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={s => String(s.id)}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />

      <AppButton
        label={SLIDES[index].buttonText}
        onPress={goNext}
        variant="purple"
        style={styles.btn}
      />
    </View>
  );
}

const IMAGE_SIZE = isSmall ? SCREEN_W * 0.52 : SCREEN_W * 0.68;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical:   isSmall ? SPACING.xs : SPACING.sm,
  },

  dots: {
    flexDirection: 'row',
    alignItems:    'center',
  },

  dot: {
    width:           isSmall ? 7 : 8,
    height:          isSmall ? 7 : 8,
    borderRadius:    4,
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginRight:     6,
  },

  dotActive: {
    width:           isSmall ? 18 : 22,
    backgroundColor: COLORS.white,
  },

  skipBtn:  { padding: 6 },

  skipText: {
    color:      COLORS.white,
    fontSize:   isSmall ? 13 : 15,
    fontWeight: '500',
    opacity:    0.85,
  },

  list: { flex: 1 },

  slide: {
    flex:              1,
    alignItems:        'center',
    justifyContent:    'center',
    paddingHorizontal: isSmall ? SPACING.lg : SPACING.xl,
  },

  slideImage: {
    width:        IMAGE_SIZE,
    height:       IMAGE_SIZE,
    marginBottom: isSmall ? SPACING.sm : SPACING.lg,
  },

  title: {
    color:        COLORS.white,
    fontSize:     isSmall ? 20 : 26,
    fontWeight:   '800',
    textAlign:    'center',
    marginBottom: isSmall ? SPACING.xs : SPACING.sm,
  },

  subtitle: {
    color:      COLORS.white,
    fontSize:   isSmall ? 13 : 15,
    fontWeight: '400',
    textAlign:  'center',
    opacity:    0.85,
    lineHeight: isSmall ? 19 : 22,
  },

  btn: {
    marginBottom: isSmall ? SPACING.md : SPACING.xl,
  },
});