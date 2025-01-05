import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Delete, Send, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import useStore from '@/lib/store';
import UserChatBubble from '@/components/common/UserChatBubble';
import AndyChatBubble from '@/components/common/AndyChatBubble';
import AndyTyping from '@/components/common/AndyTyping';
export default function MessageContainer() {
  const setUserDetails = useStore(state => state.setUserDetails);
  const addMessage = useStore(state => state.addMessage);
  const setMessages = useStore(state => state.setMessages);
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
  const aboutMe = `
  # About Me
  
  Hello! 👋 I'm **Arpan**, a passionate developer and first-semester **Computer Science** student. I love working on innovative projects, exploring **AI technologies**, and diving deep into **data structures and algorithms**.
  
  ## Skills
  
  - **Programming Languages**: Python, JavaScript, TypeScript, C++
  - **Frameworks & Libraries**: React, Node.js, PyTorch
  - **Tools**: Git, Docker, Anaconda, Neovim (NvChad Config)
  
  ## Projects
  
  1. **[Socioy](https://github.com/arpan/socioy)**:  
     A social media platform developed during high school without using frameworks.
     
  2. **Chrome Extension for Study Mode**:  
     Blocks social media to boost focus, built with TypeScript and React.
  
  3. **AI-Powered Email Assistant**:  
     A Chrome extension for Gmail/Outlook integrating ChatGPT API to compose and summarize emails.
  
  ## Goals
  
  I'm currently exploring **Unreal Engine** for game development and enhancing my skills in **manual memory management** using pointers in **C++**. I'm also eager to master **DSA** and contribute to impactful projects.
  
  Feel free to connect with me on [LinkedIn](https://linkedin.com/in/arpan) or check out my [GitHub](https://github.com/arpan).
  `;

  const handleSendButtonClick = async () => {
    const uid = Date.now().toString() + Math.random().toString();
    if (!value) return;
    addMessage({ uid: uid, from: 'user', message: value });
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setAndyTyping(true);
    setTimeout(() => {
      addMessage({ uid: `${uid}-andy`, from: 'andy', message: aboutMe });
      setAndyTyping(false);
    }, 3000);
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
            return <UserChatBubble key={index} message={message.message} />;
          } else {
            return <AndyChatBubble key={index} message={message.message} />;
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
            ref={sendButtonRef}
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
