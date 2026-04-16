export type RootStackParamList = {
  Splash:      undefined;
  Onboarding:  undefined;
  Main:        undefined;
};

export type MainTabParamList = {
  CherryPulse:  undefined;
  LemonCheck:   undefined;
  OrangeMatch:  undefined;
  WaterStories: undefined;
  SavedStories: undefined;
};

export interface OnboardingSlide {
  id:         number;
  image:      any;
  title:      string;
  subtitle:   string;
  buttonText: string;
}