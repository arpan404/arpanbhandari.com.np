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
                  onKeyDown={handleKeyDown}
                  className="rounded-2xl pr-11 h-16 min-h-16 max-h-40 focus-visible:ring-0 bg-secondary text-sm overflow-y-scroll scrollbar-hide placeholder:text-sm"
                  maxLength={1200}
                  style={{ resize: 'none', fontSize: '16px' }}
                  placeholder="Ask me anything..."
               />

               <Button
                  className="absolute bottom-3 right-2 rounded-full"
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
