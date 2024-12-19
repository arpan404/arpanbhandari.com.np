import Settings from '@/components/buttons/Settings';
import Andy from '@/components/common/Andy';

export default function Header() {
  return (
    <header>
      <nav className="bg-transparent py-2">
        <div className="flex justify-end">
          <div className="flex items-center gap-2 px-6">
            <Andy buttonText="Chat with Andy" />
            <Settings />
          </div>
        </div>
      </nav>
    </header>
  );
}
