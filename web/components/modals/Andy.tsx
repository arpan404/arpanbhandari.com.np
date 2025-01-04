'use client';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import AndyAvatar from '@/components/common/AndyAvatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Andy({
  buttonText,
  className,
}: Readonly<{ buttonText: string; className?: string }>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSendButtonClick = () => {
    console.log(value);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          'text-xs px-6 py-3 rounded-full font-semibold text-pretty cursor-pointer dark:bg-[#ff7d37] bg-[#ff6730] hover:dark:bg-[#ff7d37] hover:bg-[#ff6730] hover:cursor-pointer saturate-[110%] hover:saturate-[130%] active:opacity-50 transition-all delay-0 ease-linear m-0 text-white',
          className
        )}
      >
        <h3>{buttonText}</h3>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] cursor-default z-[101] px-0 md:px-0 py-0 md:py-0">
        <SheetTitle>
          <div className="flex gap-4 items-center px-2 pt-4 pb-2">
            <div className="flex items-center">
              <AndyAvatar />
            </div>
            <div className="text-primary">
              <div className="text-sm font-medium">Andy</div>
              <div className="font-light text-xs opacity-80">
                A friendly yet intelligent assistant, here to answer all your
                questions about me.
              </div>
            </div>
          </div>
        </SheetTitle>
        <div className="p-2 h-[calc(100%-90px)] my-2 relative">
          <div></div>
          <div className="absolute bottom-0 w-full pr-4">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={handleInputChange}
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
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
