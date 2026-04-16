import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ScrollView, FlatList,
  Image, Dimensions,
} from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import SafeScreen from '../../components/SafeScreen';
import CardBlock from '../../components/CardBlock';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { saveStory } from '../../data/storage';
import { WATER_STORIES, WaterStory } from '../../data/waterStories';

const { height: SCREEN_H } = Dimensions.get('window');
const isSmall = SCREEN_H < 700;

type ViewMode = 'list' | 'read';

export default function WaterStoriesScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selected, setSelected] = useState<WaterStory | null>(null);
  const [storyIdx, setStoryIdx] = useState(0);
  const [starred,  setStarred]  = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const openStory = (story: WaterStory, idx: number) => {
    setSelected(story);
    setStoryIdx(idx);
    setStarred(savedIds.includes(story.id));
    setViewMode('read');
  };

  const nextStory = () => {
    const next = (storyIdx + 1) % WATER_STORIES.length;
    openStory(WATER_STORIES[next], next);
  };

  const handleSave = async () => {
    if (!selected) return;
    await saveStory(selected);
    setSavedIds(prev =>
      prev.includes(selected.id) ? prev : [...prev, selected.id]
    );
    setStarred(true);
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
            <Text style={styles.screenTitle}>Water Stories</Text>
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

          <View style={styles.actionsRow}>
            <AppButton
              label="Next Story"
              onPress={nextStory}
              style={styles.nextBtn}
            />
            <TouchableOpacity
              onPress={handleSave}
              style={[styles.iconBtn, starred && styles.iconBtnActive]}
            >
              <Text style={styles.iconBtnIcon}>{starred ? '⭐' : '☆'}</Text>
            </TouchableOpacity>
          </View>

        </SafeScreen>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GradientBackground preset="main" />
      <SafeScreen withBottomNav style={styles.safe}>

        <Text style={styles.screenTitle}>Water Stories</Text>

        <CardBlock style={styles.descCard}>
          <View style={styles.descRow}>
            <Text style={styles.descText}>
              Each story opens step by step.{'\n'}
              Let it unfold at your pace,{'\n'}
              without skipping ahead.
            </Text>
            <Image
              source={require('../../assets/img_watermelon_book.png')}
              style={styles.descImage}
              resizeMode="contain"
            />
          </View>
        </CardBlock>

        <FlatList
          data={WATER_STORIES}
          keyExtractor={s => s.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.storyRow}
              onPress={() => openStory(item, index)}
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

  descCard: {
    marginBottom: isSmall ? SPACING.xs : SPACING.sm,
  },

  descRow: {
    flexDirection: 'row',
    alignItems:    'center',
  },

  descText: {
    color:      COLORS.white,
    fontSize:   isSmall ? 12 : 13,
    lineHeight: isSmall ? 18 : 20,
    flex:       1,
  },

  descImage: {
    width:      isSmall ? 50 : 70,
    height:     isSmall ? 50 : 70,
    marginLeft: SPACING.sm,
  },

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

  readScroll: { flex: 1 },

  readContent: {
    paddingHorizontal: isSmall ? SPACING.md : SPACING.lg,
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

  actionsRow: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: SPACING.md,
    marginBottom:      isSmall ? SPACING.xs : SPACING.sm,
    gap:               SPACING.sm,
  },

  iconBtn: {
    width:           isSmall ? 42 : 48,
    height:          isSmall ? 42 : 48,
    borderRadius:    14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems:      'center',
    justifyContent:  'center',
    borderWidth:     1,
    borderColor:     'rgba(255,255,255,0.2)',
  },

  iconBtnActive: {
    backgroundColor: COLORS.btnPurple,
    borderColor:     COLORS.btnPurple,
  },

  iconBtnIcon: { fontSize: isSmall ? 19 : 22 },

  nextBtn: { flex: 1 },
});