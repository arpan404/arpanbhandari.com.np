import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Arpan Bhandari | The Developer" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <h1 className="text-3xl font-helvetica-compressed">Hello World</h1>
    </main>
  );
}
