import Image from 'next/image';
export default function AndyTyping() {
  return (
    <div className="flex max-w-[95%] p-2 rounded-lg gap-1 items-center">
      <div className="flex-shrink-0 flex-grow-0 rounded-full w-8 h-8 bg-gray-50 border-orange-500 border-[0.5px]">
        <Image
          src="/images/andy-avatar.png"
          alt="Andy Avatar"
          width={40}
          height={40}
          className="flex-shrink-0 flex-grow-0 rounded-full w-8 h-8"
        />
      </div>
      <div className="flex space-x-1 justify-center items-center">
        <span className="sr-only">Andy Typing...</span>
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
