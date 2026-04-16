import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ScrollView, Image,
  Dimensions,
} from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import SafeScreen from '../../components/SafeScreen';
import CardBlock from '../../components/CardBlock';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { saveLemonScore, getLemonScores, LemonScore } from '../../data/storage';
import { getLevelData, MAX_LEVEL } from '../../data/lemonQuestions';

const { height: SCREEN_H } = Dimensions.get('window');
const isSmall = SCREEN_H < 700;

type Phase = 'intro' | 'quiz' | 'result';

export default function LemonCheckScreen() {
  const [level,     setLevel]     = useState(1);
  const [phase,     setPhase]     = useState<Phase>('intro');
  const [qIndex,    setQIndex]    = useState(0);
  const [selected,  setSelected]  = useState<number | null>(null);
  const [score,     setScore]     = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const levelData = getLevelData(level);
  const questions = levelData?.questions ?? [];
  const q         = questions[qIndex];
  const isLast    = qIndex === questions.length - 1;
  const passed    = score >= Math.ceil(questions.length / 2);

  useEffect(() => {
    getLemonScores().then((scores: LemonScore[]) => {
      if (scores.length > 0) {
        setBestScore(Math.max(...scores.map((s: LemonScore) => s.correct)));
      }
    });
  }, []);

  const startQuiz = () => {
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setPhase('quiz');
  };

  const handleNext = async () => {
    if (selected === null) return;
    const newScore = selected === q.answer ? score + 1 : score;
    if (isLast) {
      await saveLemonScore({
        date:    new Date().toISOString(),
        correct: newScore,
        total:   questions.length,
      });
      setScore(newScore);
      setPhase('result');
    } else {
      setScore(newScore);
      setQIndex(qIndex + 1);
      setSelected(null);
    }
  };

  if (phase === 'intro') {
    return (
      <View style={styles.container}>
        <GradientBackground preset="main" />
        <SafeScreen withBottomNav style={styles.safe}>
          <Text style={styles.screenTitle}>Lemon Check</Text>
          <View style={styles.centerBody}>
            <Image
              source={require('../../assets/img_lemon_stand.png')}
              style={styles.character}
              resizeMode="contain"
            />
            <Text style={styles.levelBadge}>Level {level}</Text>
            <Text style={styles.heading}>Stay Sharp</Text>
            <Text style={styles.sub}>
              A few questions to keep your mind going.{'\n'}Just clear thinking.
            </Text>
            {bestScore > 0 && (
              <Text style={styles.bestScore}>Best score: {bestScore}</Text>
            )}
          </View>
          <AppButton label="Start Check" onPress={startQuiz} style={styles.btn} />
        </SafeScreen>
      </View>
    );
  }

  if (phase === 'result') {
    return (
      <View style={styles.container}>
        <GradientBackground preset="main" />
        <SafeScreen withBottomNav style={styles.safe}>
          <Text style={styles.screenTitle}>Lemon Check</Text>
          <View style={styles.centerBody}>
            <Image
              source={require('../../assets/img_lemon_stand.png')}
              style={styles.character}
              resizeMode="contain"
            />
            <Text style={styles.resultHeading}>
              {passed ? 'Sharp Enough' : 'Try Again'}
            </Text>
            <Text style={styles.resultScore}>
              {score} / {questions.length} correct
            </Text>
            <Text style={styles.sub}>
              {passed
                ? 'Clean answers. Keep the pace.'
                : 'Reset and go again, sharper this time.'}
            </Text>
            {passed && level < MAX_LEVEL && (
              <Text style={styles.unlocked}>Level {level + 1} unlocked 🎉</Text>
            )}
            {passed && level >= MAX_LEVEL && (
              <Text style={styles.unlocked}>All 15 levels done! 🏆</Text>
            )}
          </View>
          {passed && level < MAX_LEVEL ? (
            <AppButton
              label="Next level"
              onPress={() => { setLevel(l => l + 1); setPhase('intro'); }}
              style={styles.btn}
            />
          ) : (
            <AppButton
              label="Try Again"
              onPress={() => setPhase('intro')}
              variant="brown"
              style={styles.btn}
            />
          )}
        </SafeScreen>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GradientBackground preset="main" />
      <SafeScreen withBottomNav style={styles.safe}>

        <View style={styles.quizHeader}>
          <TouchableOpacity onPress={() => setPhase('intro')} style={styles.exitBtn}>
            <Text style={styles.exitText}>Exit</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Lemon Check</Text>
          <Text style={styles.progress}>{qIndex + 1}/{questions.length}</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.quizScroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.taskLabel}>Task {qIndex + 1}</Text>

          <CardBlock style={styles.questionCard}>
            <Text style={styles.questionText}>{q.text}</Text>
          </CardBlock>

          {q.options.map((opt, i) => {
            let bg = 'rgba(255,255,255,0.10)';
            if (selected === i) {
              bg = i === q.answer
                ? 'rgba(60,180,100,0.55)'
                : 'rgba(200,30,30,0.55)';
            }
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setSelected(i)}
                style={[styles.option, { backgroundColor: bg }]}
                activeOpacity={0.75}
              >
                <Text style={styles.optionLabel}>{['A', 'B', 'C', 'D'][i]})</Text>
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <AppButton
          label={isLast ? 'Finish' : 'Next'}
          onPress={handleNext}
          disabled={selected === null}
          style={styles.btn}
        />

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
    width:        isSmall ? 120 : 180,
    height:       isSmall ? 120 : 180,
    marginBottom: isSmall ? SPACING.sm : SPACING.md,
  },

  levelBadge: {
    color:             COLORS.yellow,
    fontSize:          isSmall ? 12 : 14,
    fontWeight:        '700',
    backgroundColor:   'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical:   4,
    borderRadius:      20,
    marginBottom:      isSmall ? SPACING.xs : SPACING.sm,
  },

  heading: {
    color:        COLORS.white,
    fontSize:     isSmall ? 20 : 26,
    fontWeight:   '800',
    textAlign:    'center',
    marginBottom: SPACING.sm,
  },

  sub: {
    color:      COLORS.white,
    fontSize:   isSmall ? 13 : 15,
    textAlign:  'center',
    opacity:    0.85,
    lineHeight: isSmall ? 19 : 22,
  },

  bestScore: {
    color:     COLORS.yellow,
    fontSize:  13,
    marginTop: SPACING.md,
    opacity:   0.8,
  },

  btn: {
    marginBottom: isSmall ? SPACING.sm : SPACING.lg,
    marginTop:    SPACING.sm,
  },

  quizHeader: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical:   isSmall ? SPACING.xs : SPACING.sm,
  },

  exitBtn:  { width: 44, padding: 4 },
  exitText: { color: COLORS.white, fontSize: 15, fontWeight: '600' },

  progress: {
    color:      COLORS.yellow,
    fontSize:   14,
    fontWeight: '700',
  },

  quizScroll: {
    paddingHorizontal: SPACING.md,
    paddingBottom:     SPACING.md,
  },

  taskLabel: {
    color:        COLORS.yellow,
    fontSize:     isSmall ? 12 : 13,
    fontWeight:   '700',
    marginBottom: SPACING.sm,
  },

  questionCard: {
    marginHorizontal: 0,
    marginBottom:     isSmall ? SPACING.sm : SPACING.md,
  },

  questionText: {
    color:      COLORS.white,
    fontSize:   isSmall ? 14 : 16,
    lineHeight: isSmall ? 20 : 24,
  },

  option: {
    flexDirection: 'row',
    alignItems:    'center',
    borderRadius:  12,
    borderWidth:   1,
    borderColor:   'rgba(255,255,255,0.2)',
    padding:       isSmall ? 10 : 14,
    marginBottom:  isSmall ? 7 : 10,
  },

  optionLabel: {
    color:       COLORS.yellow,
    fontSize:    isSmall ? 13 : 14,
    fontWeight:  '700',
    marginRight: 10,
    width:       24,
  },

  optionText: {
    color:    COLORS.white,
    fontSize: isSmall ? 13 : 14,
    flex:     1,
  },

  resultHeading: {
    color:        COLORS.yellow,
    fontSize:     isSmall ? 22 : 26,
    fontWeight:   '800',
    textAlign:    'center',
    marginBottom: SPACING.sm,
  },

  resultScore: {
    color:        COLORS.white,
    fontSize:     isSmall ? 16 : 18,
    fontWeight:   '700',
    marginBottom: SPACING.sm,
  },

  unlocked: {
    color:      COLORS.yellow,
    fontSize:   isSmall ? 13 : 15,
    marginTop:  SPACING.md,
    fontWeight: '600',
  },
});