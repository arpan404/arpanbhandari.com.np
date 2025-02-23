export default function UserChatBubble({ message }: { message: string }) {
   return (
      <div className="flex justify-end w-full my-1">
         <div className="bg-primary text-[0.8rem] text-background w-fit max-w-[90%] px-3 md:px-4 py-1 md:py-1.5 rounded-2xl font-helvetica-light">
            <pre className="font-helvetica-light break-words whitespace-pre-wrap">
               {message}
            </pre>
         </div>
      </div>
   );
}
