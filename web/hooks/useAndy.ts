import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import useStore from '@/lib/store';

export default function useAndy() {
   const setUserDetails = useStore(state => state.setUserDetails);
   const addMessage = useStore(state => state.addMessage);
   const setMessages = useStore(state => state.setMessages);
   const setChatUID = useStore(state => state.setChatUID);
   const chatUID = useStore(state => state.chatUID);

   const userDetails = useStore(state => state.userDetails);
   const messages = useStore(state => state.messages);
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   const sendButtonRef = useRef<HTMLButtonElement>(null);
   const [value, setValue] = useState('');
   const [andyTyping, setAndyTyping] = useState(false);

   const messageContainerRef = useRef<HTMLDivElement>(null);

   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length > 1000) {
         e.target.value = e.target.value.slice(0, 1000);
      }
      setValue(e.target.value);
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto';
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
   };

   const handleSendButtonClick = async () => {
      const uid = Date.now().toString() + Math.random().toString();
      try {
         if (!value) return;
         const msgValue = value.trim();
         if(!msgValue) return;
         addMessage({ uid: uid, from: 'user', message: msgValue });
         setValue('');
         if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
         }
         setAndyTyping(true);
         let convoUID = chatUID;
         if (!convoUID) {
            const response = await axios.post(
               process.env.NEXT_PUBLIC_ANDY_API_URL + 'gen-uid',
               {
                  user_details: {
                     name: userDetails?.name,
                     email: userDetails?.email,
                  },
               }
            );
            if(!response.data.uid) throw new Error('No UID returned from server');
            convoUID = response.data.uid;
            setChatUID(response.data.uid);
         }

         const response = await axios.post(
            process.env.NEXT_PUBLIC_ANDY_API_URL + 'chat',
            {
               message: msgValue,
               chat_uid: convoUID,
               user_details: {
                  name: userDetails?.name,
                  email: userDetails?.email,
               },
            }
         );
         if (response.data.message) {
            addMessage({
               uid: uid + '-andy',
               from: 'andy',
               message: response.data.message,
            });
         } else {
            addMessage({
               uid: uid + '-andy',
               from: 'andy',
               message:
                  "I'm sorry, I'm having trouble processing your query. Please try again later.",
            });
         }
      } catch (error: unknown) {
         addMessage({
            uid: uid + '-andy-error',
            from: 'andy',
            message:
               "I'm sorry, I'm having trouble processing your query. Please try again later.",
         });
         console.error(error);
      } finally {
         setAndyTyping(false);
      }
   };

   const handleDelete = () => {
      setUserDetails(null);
      localStorage.removeItem('userDetails');
      setMessages([]);
      setChatUID(null);
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      type SourceCapabilities = {
         firesTouchEvents?: boolean;
      };

      const hasSourceCapabilities = (
         event: React.KeyboardEvent<HTMLTextAreaElement>
      ): event is React.KeyboardEvent<HTMLTextAreaElement> & {
         sourceCapabilities: SourceCapabilities;
      } => {
         return 'sourceCapabilities' in event;
      };

      if (
         e.key === 'Enter' &&
         !e.shiftKey &&
         e.isTrusted &&
         !e.nativeEvent.isComposing &&
         hasSourceCapabilities(e) &&
         !e.sourceCapabilities.firesTouchEvents
      ) {
         e.preventDefault();
         if (sendButtonRef.current) {
            sendButtonRef.current.click();
         }
      } else if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         if (sendButtonRef.current) {
            sendButtonRef.current.click();
         }
      }
   };

   useEffect(() => {
      if (messageContainerRef.current) {
         messageContainerRef.current.scrollTop =
            messageContainerRef.current.scrollHeight;
      }
   }, [messages]);

   return {
      value,
      messages,
      andyTyping,
      textareaRef,
      handleDelete,
      handleKeyDown,
      sendButtonRef,
      handleInputChange,
      messageContainerRef,
      handleSendButtonClick,
   };
}
