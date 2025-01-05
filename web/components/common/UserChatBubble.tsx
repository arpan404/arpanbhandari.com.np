export default function UserChatBubble({ message }: { message: string }) {
  return (
    <div className="flex justify-end w-full my-1">
      <div className="bg-primary text-[0.8rem] text-background w-fit max-w-[90%] px-3 py-1 rounded-full">
        {message}
      </div>
    </div>
  );
}
