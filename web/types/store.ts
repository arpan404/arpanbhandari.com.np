interface StoreState {
  userDetails: null | {
    name: string;
    email: string;
  };
  messages: Array<{
    uid: string;
    from: string;
    message: string;
  }>;
  setUserData: (data: StoreState['userDetails']) => void;
  addMessage: (message: StoreState['messages'][0]) => void;
  setMessage: (message: StoreState['messages'][0]) => void;
}
export default StoreState;
