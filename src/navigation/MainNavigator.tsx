import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Text,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import { COLORS }  from '../constants/colors';
import { SPACING } from '../constants/spacing';

import CherryPulseScreen  from '../screens/main/CherryPulseScreen';
import LemonCheckScreen   from '../screens/main/LemonCheckScreen';
import OrangeMatchScreen  from '../screens/main/OrangeMatchScreen';
import WaterStoriesScreen from '../screens/main/WaterStoriesScreen';
import SavedStoriesScreen from '../screens/main/SavedStoriesScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_EMOJI: Record<keyof MainTabParamList, string> = {
  CherryPulse:  '🍒',
  LemonCheck:   '🍋',
  OrangeMatch:  '🍊',
  WaterStories: '🍉',
  SavedStories: '❤️',
};

function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type:              'tabPress',
              target:            route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.75}
              style={[
                styles.tabItem,
                focused && styles.tabItemActive,
              ]}
            >
      
              <Text
                style={[
                  styles.tabEmoji,
                  !focused && styles.tabEmojiInactive,
                ]}
              >
                {TAB_EMOJI[route.name as keyof MainTabParamList]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="CherryPulse"
        component={CherryPulseScreen}
      />
      <Tab.Screen
        name="LemonCheck"
        component={LemonCheckScreen}
      />
      <Tab.Screen
        name="OrangeMatch"
        component={OrangeMatchScreen}
      />
      <Tab.Screen
        name="WaterStories"
        component={WaterStoriesScreen}
      />
      <Tab.Screen
        name="SavedStories"
        component={SavedStoriesScreen}
      />
    </Tab.Navigator>
  );
}

const BAR_HEIGHT = 64;

const styles = StyleSheet.create({

  wrapper: {
    position:   'absolute',
    bottom:     SPACING.navBarBottom,
    left:       SPACING.lg,
    right:      SPACING.lg,
    alignItems: 'center',

    zIndex:     999,
  },

  bar: {
    flexDirection:     'row',
    height:            BAR_HEIGHT,
    backgroundColor:   COLORS.navBar,
    borderRadius:      BAR_HEIGHT / 2,   
    borderWidth:       1.5,
    borderColor:       COLORS.navBarBorder,
    paddingHorizontal: 8,
    alignItems:        'center',

    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius:  14,
    elevation: 14,
  },

  tabItem: {
    flex:            1,
    height:          BAR_HEIGHT - 12,
    alignItems:      'center',
    justifyContent:  'center',
    borderRadius:    (BAR_HEIGHT - 12) / 2,
    marginHorizontal: 3,
  },

  tabItemActive: {
    backgroundColor: COLORS.navActive,
  },

  tabEmoji: {
    fontSize:  27,
  },

  tabEmojiInactive: {
    opacity: 0.5,
  },

});