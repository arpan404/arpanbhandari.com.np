import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Trash2 } from 'lucide-react';
import { use, useEffect, useRef, useState } from 'react';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
} from '@/components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import useStore from '@/lib/store';
import UserChatBubble from '@/components/common/UserChatBubble';
import AndyChatBubble from '@/components/andy/AndyChatBubble';
import AndyTyping from '@/components/common/AndyTyping';
import axios from 'axios';

export default function MessageContainer() {
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
         const msgValue = value;
         addMessage({ uid: uid, from: 'user', message: value });
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

   useEffect(() => {
      if (messageContainerRef.current) {
         messageContainerRef.current.scrollTop =
            messageContainerRef.current.scrollHeight;
      }
   }, [messages]);

   return (
      <div className="p-2 h-full my-2 pt-10">
         <div className="absolute top-2 left-2">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        variant={'outline'}
                        size={'icon'}
                        className="rounded-full"
                        onClick={() => {
                           setUserDetails(null);
                           localStorage.removeItem('userDetails');
                           setMessages([]);
                           setChatUID(null);
                        }}
                     >
                        <Trash2 size={20} />
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent className="z-[203] h-fit w-fit p-0 px-3 py-1 rounded-full text-[0.6rem]">
                     <p className="text-[0.5rem]">Delete Chat & Details</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
         <div
            className="h-[calc(100%-4rem-10px)] overflow-scroll scrollbar-hide "
            ref={messageContainerRef}
            style={{ scrollBehavior: 'smooth' }}
         >
            {messages.map((message, index) => {
               if (message.from === 'user') {
                  return (
                     <UserChatBubble key={index} message={message.message} />
                  );
               } else {
                  return (
                     <AndyChatBubble key={index} message={message.message} />
                  );
               }
            })}
            {andyTyping && <AndyTyping />}
         </div>

         <div className="absolute bottom-2 w-full pr-4">
            <div className="relative">
               <Textarea
                  ref={textareaRef}
                  value={value}
                  onChange={handleInputChange}
                  onKeyDown={e => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (sendButtonRef.current) {
                           sendButtonRef.current.click();
                        }
                     }
                  }}
                  className="rounded-2xl pr-11 h-14 min-h-14 max-h-40 focus-visible:ring-0 bg-secondary/80 text-sm"
                  maxLength={1000}
                  style={{ overflow: 'hidden', resize: 'none' }}
                  placeholder="Ask me anything..."
               />

               <Button
                  className="absolute bottom-2 right-2 rounded-full"
                  variant={'default'}
                  size={'icon'}
                  onClick={handleSendButtonClick}
                  disabled={!value || andyTyping}
                  ref={sendButtonRef}
               >
                  <Send size={20} />
               </Button>
            </div>
         </div>
      </div>
   );
}
