import { Send, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AndyTyping from '@/components/andy/AndyTyping';
import AndyChatBubble from '@/components/andy/AndyChatBubble';
import UserChatBubble from '@/components/andy/UserChatBubble';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import useAndy from '@/hooks/useAndy';

export default function MessageContainer() {
   const {
      handleDelete,
      messages,
      value,
      handleInputChange,
      handleSendButtonClick,
      andyTyping,
      textareaRef,
      messageContainerRef,
      sendButtonRef,
   } = useAndy();
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
                        onClick={handleDelete}
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
                  className="rounded-2xl pr-11 h-14 min-h-14 max-h-40 focus-visible:ring-0 bg-secondary text-sm overflow-y-scroll scrollbar-hide"
                  maxLength={1200}
                  style={{ resize: 'none' }}
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
