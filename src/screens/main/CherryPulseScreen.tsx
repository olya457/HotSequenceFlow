import React, { useState, useEffect } from 'react';
import {
  View, Text, Switch, Image,
  StyleSheet, ScrollView, Dimensions,
} from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import SafeScreen from '../../components/SafeScreen';
import CardBlock from '../../components/CardBlock';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { markActionDone, getDoneActions } from '../../data/storage';
import { CHERRY_ACTIONS } from '../../data/cherryActions';

const { width, height } = Dimensions.get('window');

const isSmall = height < 680;

export default function CherryPulseScreen() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDone,     setIsDone]     = useState(false);
  const [doneIds,    setDoneIds]    = useState<string[]>([]);

  useEffect(() => {
    getDoneActions().then((ids: string[]) => {
      setDoneIds(ids);
      const first = CHERRY_ACTIONS.findIndex(a => !ids.includes(a.id));
      if (first !== -1) setCurrentIdx(first);
    });
  }, []);

  const current = CHERRY_ACTIONS[currentIdx];
  const allDone = doneIds.length >= CHERRY_ACTIONS.length;

  const handleToggle = async (val: boolean) => {
    setIsDone(val);
    if (val) {
      await markActionDone(current.id);
      setDoneIds(prev => [...prev, current.id]);
    }
  };

  const handleAnother = () => {
    let next = (currentIdx + 1) % CHERRY_ACTIONS.length;
    let tries = 0;
    while (
      doneIds.includes(CHERRY_ACTIONS[next].id) &&
      tries < CHERRY_ACTIONS.length
    ) {
      next = (next + 1) % CHERRY_ACTIONS.length;
      tries++;
    }
    setCurrentIdx(next);
    setIsDone(false);
  };

  const handleNext = () => {
    const next = (currentIdx + 1) % CHERRY_ACTIONS.length;
    setCurrentIdx(next);
    setIsDone(doneIds.includes(CHERRY_ACTIONS[next].id));
  };

  return (
    <View style={styles.container}>
      <GradientBackground preset="main" />
      <SafeScreen withBottomNav style={styles.safe}>

        <Text style={styles.screenTitle}>Cherry Pulse</Text>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {allDone ? (
        
            <View style={styles.allDoneWrap}>
              <Text style={styles.allDoneEmoji}>🎉</Text>
              <Text style={styles.allDoneText}>
                You completed all actions!{'\n'}Great work.
              </Text>
            </View>
          ) : (
            <>
     
              <CardBlock style={styles.card}>
                <Text style={styles.cardLabel}>Phrase:</Text>
                <Text style={styles.cardText}>{current.phrase}</Text>
              </CardBlock>

      
              <CardBlock style={styles.card}>
                <Text style={styles.cardLabel}>Action:</Text>
                <Text style={styles.cardText}>{current.action}</Text>
              </CardBlock>

              <CardBlock style={styles.toggleCard}>
                <Text style={styles.toggleLabel}>Mark as Done</Text>
                <Switch
                  value={isDone}
                  onValueChange={handleToggle}
                  trackColor={{ false: COLORS.toggleOff, true: COLORS.toggleOn }}
                  thumbColor={COLORS.white}
                />
              </CardBlock>

              {!isDone ? (
                <AppButton
                  label="Another action"
                  onPress={handleAnother}
                  variant="brown"
                  style={styles.btn}
                />
              ) : (
                <AppButton
                  label="Next action"
                  onPress={handleNext}
                  variant="purple"
                  style={styles.btn}
                />
              )}

        
              <Text style={styles.counter}>
                {doneIds.length} / {CHERRY_ACTIONS.length} completed
              </Text>
            </>
          )}

          <Image
            source={require('../../assets/img_cherry_stand.png')}
            style={styles.character}
            resizeMode="contain"
          />
        </ScrollView>

      </SafeScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe:      { flex: 1 },

  screenTitle: {
    color:        COLORS.yellow,
    fontSize:     isSmall ? 18 : 22,
    fontWeight:   '800',
    textAlign:    'center',
    paddingTop:   isSmall ? SPACING.sm : SPACING.md,
    marginBottom: isSmall ? 4 : SPACING.sm,
  },

  scroll: {
    paddingBottom: SPACING.lg,
    flexGrow: 1,
  },


  card: {
    marginBottom: 0,
    paddingVertical: isSmall ? SPACING.sm : SPACING.md,
  },

  cardLabel: {
    color:        COLORS.yellow,
    fontSize:     isSmall ? 12 : 14,
    fontWeight:   '700',
    marginBottom: 4,
  },

  cardText: {
    color:      COLORS.white,
    fontSize:   isSmall ? 13 : 15,
    lineHeight: isSmall ? 18 : 22,
  },

  toggleCard: {
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
    paddingVertical: isSmall ? SPACING.sm : SPACING.md,
  },

  toggleLabel: {
    color:    COLORS.white,
    fontSize: isSmall ? 13 : 15,
  },

  btn: {
    marginTop:    isSmall ? SPACING.sm : SPACING.md,
    marginBottom: SPACING.xs,
  },

  counter: {
    color:     COLORS.white,
    fontSize:  isSmall ? 11 : 13,
    opacity:   0.6,
    textAlign: 'center',
    marginTop: isSmall ? 4 : SPACING.sm,
  },

  allDoneWrap: {
    alignItems:      'center',
    justifyContent:  'center',
    paddingVertical: isSmall ? SPACING.lg : SPACING.xxl,
  },

  allDoneEmoji: {
    fontSize:     isSmall ? 50 : 70,
    marginBottom: isSmall ? SPACING.sm : SPACING.md,
  },

  allDoneText: {
    color:      COLORS.white,
    fontSize:   isSmall ? 17 : 20,
    fontWeight: '700',
    textAlign:  'center',
    lineHeight: isSmall ? 24 : 30,
  },

  
  character: {
    width:      isSmall ? width * 0.35 : width * 0.45,
    height:     isSmall ? width * 0.35 : width * 0.45,
    alignSelf:  'center',
    marginTop:  isSmall ? SPACING.sm : SPACING.lg,
  },
});