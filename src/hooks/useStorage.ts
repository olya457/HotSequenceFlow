import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseStorageReturn<T> {
  value:     T | null;
  isLoading: boolean;
  error:     string | null;
  setValue:  (newValue: T) => Promise<void>;
  removeValue: () => Promise<void>;
  refresh:   () => Promise<void>;
}

export default function useStorage<T>(key: string): UseStorageReturn<T> {
  const [value,     setValue_]    = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const raw = await AsyncStorage.getItem(key);
      if (raw !== null) {
        try {
          setValue_(JSON.parse(raw) as T);
        } catch {
          setValue_(raw as unknown as T);
        }
      } else {
        setValue_(null);
      }
    } catch (e) {
      setError(`Failed to load key: ${key}`);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  useEffect(() => {
    load();
  }, [load]);

  const setValue = async (newValue: T) => {
    try {
      setError(null);
      const toStore =
        typeof newValue === 'string'
          ? newValue
          : JSON.stringify(newValue);
      await AsyncStorage.setItem(key, toStore);
      setValue_(newValue);
    } catch (e) {
      setError(`Failed to save key: ${key}`);
    }
  };

  const removeValue = async () => {
    try {
      setError(null);
      await AsyncStorage.removeItem(key);
      setValue_(null);
    } catch (e) {
      setError(`Failed to remove key: ${key}`);
    }
  };

  const refresh = async () => {
    await load();
  };

  return { value, isLoading, error, setValue, removeValue, refresh };
}