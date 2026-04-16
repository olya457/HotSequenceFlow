import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, FlatList, ScrollView, Image,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GradientBackground from '../../components/GradientBackground';
import SafeScreen from '../../components/SafeScreen';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import {
  getSavedStories, removeStory,
  clearAllStories, Story,
} from '../../data/storage';

const { height: SCREEN_H } = Dimensions.get('window');
const isSmall = SCREEN_H < 700;

type ViewMode = 'list' | 'read';

export default function SavedStoriesScreen() {
  const [stories,  setStories]  = useState<Story[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<Story | null>(null);

  useFocusEffect(
    useCallback(() => {
      getSavedStories().then(setStories);
    }, [])
  );

  const handleDeleteAll = async () => {
    await clearAllStories();
    setStories([]);
  };

  const handleDelete = async (id: string) => {
    await removeStory(id);
    setStories(prev => prev.filter(s => s.id !== id));
  };

  const openStory = (story: Story) => {
    setSelected(story);
    setViewMode('read');
  };

  if (viewMode === 'read' && selected) {
    return (
      <View style={styles.container}>
        <GradientBackground preset="main" />
        <SafeScreen withBottomNav style={styles.safe}>

          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => setViewMode('list')} style={styles.exitBtn}>
              <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Saved Stories</Text>
            <View style={{ width: 44 }} />
          </View>

          <ScrollView
            style={styles.readScroll}
            contentContainerStyle={styles.readContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.storyTitle}>{selected.title}</Text>
            <Text style={styles.storySub}>Subtitle: {selected.subtitle}</Text>
            <Text style={styles.storyBody}>{selected.body}</Text>
          </ScrollView>

          <View style={styles.readActions}>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconBtnIcon}>🔒</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconBtnIcon}>⭐</Text>
            </TouchableOpacity>
          </View>

        </SafeScreen>
      </View>
    );
  }

  if (stories.length === 0) {
    return (
      <View style={styles.container}>
        <GradientBackground preset="main" />
        <SafeScreen withBottomNav style={styles.safe}>
          <Text style={styles.screenTitle}>Saved Stories</Text>
          <View style={styles.emptyBody}>
            <Image
              source={require('../../assets/img_watermelon_empty.png')}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyHeading}>Nothing saved yet.</Text>
            <Text style={styles.emptySub}>
              When something feels worth returning to,{'\n'}
              it will appear here.{'\n'}
              For now — just keep going.
            </Text>
          </View>
          <AppButton
            label="Explore Stories"
            onPress={() => {}}
            variant="brown"
            style={styles.btn}
          />
        </SafeScreen>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GradientBackground preset="main" />
      <SafeScreen withBottomNav style={styles.safe}>

        <View style={styles.listHeader}>
          <Text style={styles.screenTitle}>Saved Stories</Text>
          <TouchableOpacity onPress={handleDeleteAll} style={styles.deleteBtn}>
            <Text style={styles.deleteText}>🗑 Delete all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={stories}
          keyExtractor={s => s.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.storyRow}
              onPress={() => openStory(item)}
              activeOpacity={0.75}
            >
              <View style={styles.rowTextWrap}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowSub}>Subtitle: {item.subtitle}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          )}
        />

      </SafeScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe:      { flex: 1 },

  screenTitle: {
    color:           COLORS.yellow,
    fontSize:        isSmall ? 17 : 20,
    fontWeight:      '800',
    textAlign:       'center',
    paddingVertical: isSmall ? SPACING.xs : SPACING.sm,
  },

  topRow: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: SPACING.md,
  },

  exitBtn:  { width: 44, padding: 4 },
  exitText: { color: COLORS.white, fontSize: 15, fontWeight: '600' },

  emptyBody: {
    flex:              1,
    alignItems:        'center',
    justifyContent:    'center',
    paddingHorizontal: SPACING.xl,
  },

  emptyImage: {
    width:        isSmall ? 140 : 200,
    height:       isSmall ? 140 : 200,
    marginBottom: isSmall ? SPACING.md : SPACING.lg,
  },

  emptyHeading: {
    color:        COLORS.yellow,
    fontSize:     isSmall ? 20 : 26,
    fontWeight:   '800',
    textAlign:    'center',
    marginBottom: SPACING.sm,
  },

  emptySub: {
    color:      COLORS.white,
    fontSize:   isSmall ? 13 : 15,
    textAlign:  'center',
    opacity:    0.85,
    lineHeight: isSmall ? 19 : 22,
  },

  btn: {
    marginBottom: isSmall ? SPACING.sm : SPACING.lg,
  },

  listHeader: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: SPACING.md,
  },

  deleteBtn:  { padding: 6 },
  deleteText: { color: COLORS.white, fontSize: 13, opacity: 0.75 },

  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom:     SPACING.md,
  },

  storyRow: {
    flexDirection:   'row',
    alignItems:      'center',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius:    14,
    borderWidth:     1,
    borderColor:     'rgba(255,255,255,0.15)',
    padding:         isSmall ? SPACING.sm : SPACING.md,
    marginBottom:    isSmall ? 7 : 10,
  },

  rowTextWrap: { flex: 1 },

  rowTitle: {
    color:      COLORS.white,
    fontSize:   isSmall ? 13 : 15,
    fontWeight: '700',
  },

  rowSub: {
    color:     COLORS.white,
    fontSize:  isSmall ? 11 : 12,
    opacity:   0.7,
    marginTop: 2,
  },

  arrow: {
    color:    COLORS.white,
    fontSize: isSmall ? 18 : 22,
    opacity:  0.6,
  },

  readScroll:  { flex: 1 },

  readContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom:     SPACING.md,
  },

  storyTitle: {
    color:        COLORS.yellow,
    fontSize:     isSmall ? 20 : 24,
    fontWeight:   '800',
    marginBottom: 6,
  },

  storySub: {
    color:        COLORS.white,
    fontSize:     isSmall ? 12 : 14,
    opacity:      0.75,
    marginBottom: isSmall ? SPACING.sm : SPACING.md,
  },

  storyBody: {
    color:      COLORS.white,
    fontSize:   isSmall ? 13 : 15,
    lineHeight: isSmall ? 21 : 26,
  },

  readActions: {
    flexDirection:     'row',
    paddingHorizontal: SPACING.md,
    marginBottom:      isSmall ? SPACING.xs : SPACING.sm,
  },

  iconBtn:     { padding: isSmall ? 7 : 10 },
  iconBtnIcon: { fontSize: isSmall ? 20 : 24 },
});