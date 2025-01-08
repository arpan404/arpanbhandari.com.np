'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function AndyChatBubble({ message }: { message: string }) {
   return (
      <div className="flex max-w-[95%] items-start p-2 rounded-lg gap-1">
         <div className="flex-shrink-0 flex-grow-0 rounded-full w-8 h-8 bg-gray-50 border-orange-500 border-[0.5px]">
            <Image
               src="/images/andy-avatar.png"
               alt="Andy Avatar"
               width={40}
               height={40}
               className="flex-shrink-0 flex-grow-0 rounded-full w-8 h-8"
            />
         </div>
         <div className="text-[0.8rem] px-3 py-0">
            <ReactMarkdown
               className={'writing_body'}
               components={{
                  a: ({ href, children, ...props }) => (
                     <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                     >
                        {children}
                     </Link>
                  ),
               }}
            >
               {message}
            </ReactMarkdown>
         </div>
      </div>
   );
}
