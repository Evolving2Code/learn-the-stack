import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <h1>learn-the-stack</h1>
      <Link href="/about">Go to About</Link>
      <div>
        <Button>Click me</Button>
      </div>
    </main>
  );
}