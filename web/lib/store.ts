import { create } from 'zustand';
import StoreState from '@/types/store';

// Global State stays here
const useStore = create<StoreState>(set => ({
   userDetails: null,
   messages: [],
   chatUID: null,
   setChatUID: uid => set({ chatUID: uid }),
   setUserDetails: data => set({ userDetails: data }),
   addMessage: message =>
      set(state => ({ messages: [...state.messages, message] })),
   setMessages: message => set({ messages: message }),
}));

export default useStore;
