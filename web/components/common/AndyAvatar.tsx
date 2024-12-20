import Image from 'next/image';
export default function AndyAvatar() {
  return (
    <div className="bg-gray-50 w-fit h-fit rounded-full">
      <Image
        src="/images/andy-avatar.png"
        alt="Andy Avatar"
        width={50}
        height={50}
      />
    </div>
  );
}
