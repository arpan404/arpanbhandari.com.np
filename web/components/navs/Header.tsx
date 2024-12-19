import Settings from '../buttons/Settings';
import ExAI from '../common/Andy';

export default function Header() {
  return (
    <header>
      <nav className="bg-transparent py-2">
        <div className="flex justify-end">
          <div className="flex items-center gap-2 px-6">
            <ExAI />
            <Settings />
          </div>
        </div>
      </nav>
    </header>
  );
}
