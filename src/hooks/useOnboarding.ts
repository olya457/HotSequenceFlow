import { useState, useEffect } from 'react';
import { getOnboardingDone, setOnboardingDone } from '../data/storage';

interface UseOnboardingReturn {
  isDone:    boolean;
  isLoading: boolean;
  complete:  () => Promise<void>;
}

export default function useOnboarding(): UseOnboardingReturn {
  const [isDone,    setIsDone]    = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOnboardingDone().then(done => {
      setIsDone(done);
      setIsLoading(false);
    });
  }, []);

  const complete = async () => {
    await setOnboardingDone();
    setIsDone(true);
  };

  return { isDone, isLoading, complete };
}