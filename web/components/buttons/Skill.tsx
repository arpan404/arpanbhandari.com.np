import { Button } from '@/components/ui/button';
import { LinkPreview } from '../ui/link-preview';

export default function Skill({ name, uid }: { name: string; uid: string }) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL + `/projects?tag=${uid}`;
  return (
    <div className="flex justify-center">
      <LinkPreview url={url}>
        <Button className="w-[250px] h-12 rounded-full" variant="outline">
          {name}
        </Button>
      </LinkPreview>
    </div>
  );
}
