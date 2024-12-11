import type { MetaFunction } from "@remix-run/node";
import Theme from "~/components/buttons/Theme";

export const meta: MetaFunction = () => {
  return [
    { title: "Arpan Bhandari | The Developer" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <Theme />
    </main>
  );
}
