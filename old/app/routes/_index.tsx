import type { MetaFunction } from '@remix-run/node';
import Settings from 'old/app/components/buttons/Settings';
import Hero from 'old/app/components/sections/Hero';

export const meta: MetaFunction = () => {
  return [
    { title: 'Arpan Bhandari | The Developer' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <>
      <nav className="flex justify-end px-4 py-2">
        <Settings />
      </nav>
      <div className="flex justify-center">
        <main className="px-4">
          <Hero />
        </main>
      </div>
    </>
  );
}
