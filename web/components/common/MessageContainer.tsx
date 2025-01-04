import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useRef, useState } from 'react';
export default function MessageContainer() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSendButtonClick = () => {
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };
  return (
    <div className="p-2 h-full my-2 pt-10">
      <div></div>
      <div className="absolute bottom-2 w-full pr-4">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === 'Enter' && e.shiftKey) {
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
