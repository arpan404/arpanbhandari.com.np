import type { MetaFunction } from "@remix-run/node";
import Settings from "~/components/buttons/Settings";

export const meta: MetaFunction = () => {
  return [
    { title: "Arpan Bhandari | The Developer" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <div className="flex justify-end px-4 py-2">
        <Settings />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-primary">Hello</h1>
      </div>
    </main>
  );
}
