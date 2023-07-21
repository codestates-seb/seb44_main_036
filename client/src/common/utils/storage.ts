type StorageKey = 'accessToken' | 'memberId';

export const storage = {
  get: (key: StorageKey) => {
    return localStorage.getItem(key);
  },
  set: (key: StorageKey, value: string) => localStorage.setItem(key, value),
  remove: (key: StorageKey) => localStorage.removeItem(key),
};
