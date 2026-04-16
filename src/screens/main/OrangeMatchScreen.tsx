import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Image, Dimensions,
} from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import SafeScreen from '../../components/SafeScreen';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { getOrangeLevel, setOrangeLevel } from '../../data/storage';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const isSmall = SCREEN_H < 700;

const TILE_IMAGES = [
  require('../../assets/img_tile_cherry.png'),
  require('../../assets/img_tile_lemon.png'),
  require('../../assets/img_tile_orange.png'),
  require('../../assets/img_tile_watermelon.png'),
  require('../../assets/img_tile_flame.png'),
  require('../../assets/img_tile_star.png'),
];

const COLS      = 4;
const TILE_SIZE = Math.floor((SCREEN_W - SPACING.md * 2 - 12 * COLS) / COLS);
const IMG_SIZE  = Math.floor(TILE_SIZE * 0.65);

interface Tile {
  id:      number;
  imgIdx:  number;
  flipped: boolean;
  matched: boolean;
}

function buildBoard(pairs: number): Tile[] {
  const indices = Array.from({ length: pairs }, (_, i) => i);
  const doubled = [...indices, ...indices];
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled.map((imgIdx, id) => ({ id, imgIdx, flipped: false, matched: false }));
}

type Phase = 'intro' | 'game' | 'result';

export default function OrangeMatchScreen() {
  const [phase,  setPhase]  = useState<Phase>('intro');
  const [level,  setLevel]  = useState(1);
  const [tiles,  setTiles]  = useState<Tile[]>([]);
  const [open,   setOpen]   = useState<number[]>([]);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    getOrangeLevel().then((l: number) => setLevel(l));
  }, []);

  const pairs = Math.min(2 + level, 6);

  const startGame = useCallback(() => {
    setTiles(buildBoard(pairs));
    setOpen([]);
    setLocked(false);
    setPhase('game');
  }, [pairs]);

  const handleTile = (id: number) => {
    if (locked) return;
    const tile = tiles.find(t => t.id === id);
    if (!tile || tile.flipped || tile.matched) return;

    const newTiles = tiles.map(t =>
      t.id === id ? { ...t, flipped: true } : t
    );
    setTiles(newTiles);

    const newOpen = [...open, id];
    if (newOpen.length === 2) {
      setLocked(true);
      setOpen([]);
      setTimeout(() => checkMatch(newTiles, newOpen), 700);
    } else {
      setOpen(newOpen);
    }
  };

  const checkMatch = (currentTiles: Tile[], ids: number[]) => {
    const [a, b] = ids.map(id => currentTiles.find(t => t.id === id)!);
    if (a.imgIdx === b.imgIdx) {
      const updated = currentTiles.map(t =>
        t.id === a.id || t.id === b.id ? { ...t, matched: true } : t
      );
      setTiles(updated);
      if (updated.every(t => t.matched)) {
        setTimeout(() => setPhase('result'), 500);
      }
    } else {
      setTiles(currentTiles.map(t =>
        t.id === a.id || t.id === b.id ? { ...t, flipped: false } : t
      ));
    }
    setLocked(false);
  };

  const nextLevel = async () => {
    const nl = level + 1;
    setLevel(nl);
    await setOrangeLevel(nl);
    startGame();
  };

  if (phase === 'intro') {
    return (
      <View style={styles.container}>
        <GradientBackground preset="main" />
        <SafeScreen withBottomNav style={styles.safe}>
          <Text style={styles.screenTitle}>Orange Match</Text>
          <View style={styles.centerBody}>
            <Image
              source={require('../../assets/img_orange_stand.png')}
              style={styles.character}
              resizeMode="contain"
            />
            <Text style={styles.sub}>
              Open the tiles and look for matching pairs.{'\n'}
              Each move reveals a bit more.{'\n'}
              Stay attentive, keep the rhythm.
            </Text>
          </View>
          <AppButton label="Start Match" onPress={startGame} style={styles.btn} />
        </SafeScreen>
      </View>
    );
  }

  if (phase === 'result') {
    return (
      <View style={styles.container}>
        <GradientBackground preset="main" />
        <SafeScreen withBottomNav style={styles.safe}>
          <Text style={styles.screenTitle}>Orange Match</Text>
          <View style={styles.centerBody}>
            <Image
              source={require('../../assets/img_orange_stand.png')}
              style={styles.character}
              resizeMode="contain"
            />
            <Text style={styles.resultHeading}>Well Done</Text>
            <Text style={styles.sub}>
              Clean moves. Steady focus.{'\n'}
              You cleared the grid without breaking the rhythm.{'\n'}
              Ready for the next one?
            </Text>
          </View>
          <AppButton label="Next level" onPress={nextLevel} style={styles.btn} />
        </SafeScreen>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GradientBackground preset="main" />
      <SafeScreen withBottomNav style={styles.safe}>

        <View style={styles.gameHeader}>
          <TouchableOpacity onPress={() => setPhase('intro')} style={styles.exitBtn}>
            <Text style={styles.exitText}>Exit</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Orange Match</Text>
          <Text style={styles.levelLabel}>Lvl {level}</Text>
        </View>

        <View style={styles.grid}>
          {tiles.map(tile => (
            <TouchableOpacity
              key={tile.id}
              onPress={() => handleTile(tile.id)}
              activeOpacity={0.8}
              style={[
                styles.tile,
                (tile.flipped || tile.matched) && styles.tileOpen,
              ]}
            >
              <Image
                source={
                  tile.flipped || tile.matched
                    ? TILE_IMAGES[tile.imgIdx]
                    : require('../../assets/img_tile_back.png')
                }
                style={styles.tileImg}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>

      </SafeScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe:      { flex: 1 },

  screenTitle: {
    color:      COLORS.yellow,
    fontSize:   isSmall ? 17 : 20,
    fontWeight: '800',
    textAlign:  'center',
  },

  centerBody: {
    flex:              1,
    alignItems:        'center',
    justifyContent:    'center',
    paddingHorizontal: SPACING.xl,
  },

  character: {
    width:        isSmall ? 140 : 200,
    height:       isSmall ? 140 : 200,
    marginBottom: isSmall ? SPACING.sm : SPACING.md,
  },

  sub: {
    color:      COLORS.white,
    fontSize:   isSmall ? 13 : 14,
    textAlign:  'center',
    opacity:    0.85,
    lineHeight: isSmall ? 19 : 22,
  },

  resultHeading: {
    color:        COLORS.yellow,
    fontSize:     isSmall ? 20 : 24,
    fontWeight:   '800',
    textAlign:    'center',
    marginBottom: SPACING.sm,
  },

  btn: {
    marginBottom: isSmall ? SPACING.sm : SPACING.lg,
  },

  gameHeader: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical:   isSmall ? SPACING.xs : SPACING.sm,
  },

  exitBtn:    { width: 44, padding: 4 },
  exitText:   { color: COLORS.white, fontSize: 15, fontWeight: '600' },
  levelLabel: { color: COLORS.yellow, fontSize: 14, fontWeight: '700' },

  grid: {
    flexDirection:     'row',
    flexWrap:          'wrap',
    justifyContent:    'center',
    paddingHorizontal: SPACING.md,
    marginTop:         isSmall ? SPACING.sm : SPACING.md,
  },

  tile: {
    width:           TILE_SIZE,
    height:          TILE_SIZE,
    margin:          isSmall ? 4 : 6,
    borderRadius:    10,
    backgroundColor: 'rgba(180,0,0,0.6)',
    alignItems:      'center',
    justifyContent:  'center',
    borderWidth:     1,
    borderColor:     'rgba(255,255,255,0.15)',
  },

  tileOpen: {
    backgroundColor: 'rgba(80,30,0,0.7)',
  },

  tileImg: {
    width:  IMG_SIZE,
    height: IMG_SIZE,
  },
});