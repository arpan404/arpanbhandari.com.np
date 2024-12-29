'use client';
import {
  FaCheck,
  FaCopy,
  FaFacebook,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Check, Copy } from 'lucide-react';

export default function WritingShare({ title }: { title: string }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const pathName = usePathname();
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${pathName}`;
  const socialMediaQuote = encodeURI(
    `I just read an amazing article by Arpan titled "${title}". It's definitely worth checking out!`
  );
  const handleCopy = async () => {
    if (!linkCopied) {
      navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, 1000);
    }
  };
  return (
    <div className="flex gap-2 md:gap-4 items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${socialMediaQuote}`}
              target="_blank"
            >
              <FaFacebook className="text-2xl md:text-3xl cursor-pointer transition-all ease-in-out delay-75 text-primary/80 hover:text-primary" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="text-[0.7rem] h-fit w-fit px-3 py-1 rounded-full">
            Share to Facebook
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`https://twitter.com/intent/tweet?text=${socialMediaQuote}&url=${url}`}
              target="_blank"
            >
              <FaTwitter className="text-2xl md:text-3xl cursor-pointer transition-all ease-in-out delay-75 text-primary/80 hover:text-primary" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="text-[0.7rem] h-fit w-fit px-3 py-1 rounded-full">
            Share to X / Twitter
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${socialMediaQuote}`}
              target="_blank"
            >
              <FaLinkedin className="text-2xl md:text-3xl cursor-pointer transition-all ease-in-out delay-75 text-primary/80 hover:text-primary" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="text-[0.7rem] h-fit w-fit px-3 py-1 rounded-full">
            Share to Linkedin
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="" onClick={handleCopy}>
        {!linkCopied ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Copy className="text-2xl md:text-3xl cursor-pointer transition-all ease-in-out delay-75 text-primary/80 hover:text-primary" />
              </TooltipTrigger>
              <TooltipContent className="text-[0.7rem] h-fit w-fit px-3 py-1 rounded-full">
                Copy Link
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Check className="text-2xl md:text-3xl cursor-pointer transition-all ease-in-out delay-75 text-primary/80 hover:text-primary" />
              </TooltipTrigger>
              <TooltipContent className="text-[0.7rem] h-fit w-fit px-3 py-1 rounded-full">
                Link Copied
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
