import AsyncStorage from '@react-native-async-storage/async-storage';

const K = {
  ONBOARDING_DONE: '@app/onboarding_done',
  SELECTED_FRUIT:  '@app/selected_fruit',
  SAVED_STORIES:   '@app/saved_stories',
  CHERRY_DONE:     '@app/cherry_actions_done',
  LEMON_SCORES:    '@app/lemon_scores',
  ORANGE_LEVEL:    '@app/orange_level',
} as const;

export const setOnboardingDone = async (): Promise<void> => {
  await AsyncStorage.setItem(K.ONBOARDING_DONE, 'true');
};

export const getOnboardingDone = async (): Promise<boolean> => {
  const v = await AsyncStorage.getItem(K.ONBOARDING_DONE);
  return v === 'true';
};

export const setSelectedFruit = async (fruit: string): Promise<void> => {
  await AsyncStorage.setItem(K.SELECTED_FRUIT, fruit);
};

export const getSelectedFruit = async (): Promise<string | null> => {
  return AsyncStorage.getItem(K.SELECTED_FRUIT);
};

export interface Story {
  id:       string;
  title:    string;
  subtitle: string;
  body:     string;
}

export const getSavedStories = async (): Promise<Story[]> => {
  const raw = await AsyncStorage.getItem(K.SAVED_STORIES);
  return raw ? (JSON.parse(raw) as Story[]) : [];
};

export const saveStory = async (story: Story): Promise<void> => {
  const list = await getSavedStories();
  if (!list.find(s => s.id === story.id)) {
    await AsyncStorage.setItem(
      K.SAVED_STORIES,
      JSON.stringify([...list, story]),
    );
  }
};

export const removeStory = async (id: string): Promise<void> => {
  const list = await getSavedStories();
  await AsyncStorage.setItem(
    K.SAVED_STORIES,
    JSON.stringify(list.filter(s => s.id !== id)),
  );
};

export const clearAllStories = async (): Promise<void> => {
  await AsyncStorage.removeItem(K.SAVED_STORIES);
};

export const getDoneActions = async (): Promise<string[]> => {
  const raw = await AsyncStorage.getItem(K.CHERRY_DONE);
  return raw ? (JSON.parse(raw) as string[]) : [];
};

export const markActionDone = async (id: string): Promise<void> => {
  const list = await getDoneActions();
  if (!list.includes(id)) {
    await AsyncStorage.setItem(
      K.CHERRY_DONE,
      JSON.stringify([...list, id]),
    );
  }
};

export const getOrangeLevel = async (): Promise<number> => {
  const v = await AsyncStorage.getItem(K.ORANGE_LEVEL);
  return v ? parseInt(v, 10) : 1;
};

export const setOrangeLevel = async (level: number): Promise<void> => {
  await AsyncStorage.setItem(K.ORANGE_LEVEL, String(level));
};

export interface LemonScore {
  date:    string;
  correct: number;
  total:   number;
}

export const getLemonScores = async (): Promise<LemonScore[]> => {
  const raw = await AsyncStorage.getItem(K.LEMON_SCORES);
  return raw ? (JSON.parse(raw) as LemonScore[]) : [];
};

export const saveLemonScore = async (score: LemonScore): Promise<void> => {
  const list = await getLemonScores();
  await AsyncStorage.setItem(
    K.LEMON_SCORES,
    JSON.stringify([...list, score]),
  );
};
export const clearAllData = async (): Promise<void> => {
  await AsyncStorage.multiRemove(Object.values(K));
};