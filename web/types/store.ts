interface StoreState {
  userDetails: null | {
    name: string;
    email: string;
  };
  messages:
    | []
    | Array<{
        uid: string;
        from: string;
        message: string;
      }>;
  setUserDetails: (data: StoreState['userDetails']) => void;
  addMessage: (message: StoreState['messages'][0]) => void;
  setMessages: (message: StoreState['messages'] | []) => void;
}
export default StoreState;
