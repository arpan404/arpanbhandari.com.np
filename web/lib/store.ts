import StoreState from '@/types/store';
import { create } from 'zustand';

const useStore = create<StoreState>(set => ({
  userDetails: null,
  messages: [],
  setUserDetails: data => set({ userDetails: data }),
  addMessage: message =>
    set(state => ({ messages: [...state.messages, message] })),
  setMessage: message => set({ messages: [message] }),
}));

export default useStore;
