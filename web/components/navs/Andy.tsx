import { Button } from '../ui/button';

export default function Andy() {
  return (
    <Button className="text-xs px-8 py-2 bg-primary-foreground rounded-2xl font-semibold text-pretty cursor-pointer dark:bg-[#ff7d37] bg-[#ff6730] hover:dark:bg-[#ff7d37] hover:bg-[#ff6730] hover:cursor-pointer saturate-[110%] hover:saturate-[130%] active:opacity-50 transition-all delay-0 ease-linear">
      <h3 className="text-xs font-semibold text-white">Chat with Andy</h3>
    </Button>
  );
}
