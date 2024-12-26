import Settings from '@/components/buttons/Settings';
import Andy from '@/components/modals/Andy';

export default function Header() {
  return (
    <header>
      <nav className="bg-transparent py-2 fixed w-full z-[99]">
        <div className="flex justify-end">
          <div className="flex items-center gap-2 px-2 sm:px-4 md:px-6">
            <Andy buttonText="Chat with Andy" className="opacity-100 z-[99]" />
            <Settings />
          </div>
        </div>
      </nav>
    </header>
  );
}
