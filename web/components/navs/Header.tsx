import Settings from '../buttons/Settings';

export default function Header() {
  return (
    <header>
      <nav className="bg-transparent py-2">
        <div>
          <div>
            <h2>{'</Arpan>'}</h2>
          </div>
          <div>
            <Settings />
          </div>
        </div>
      </nav>
    </header>
  );
}
