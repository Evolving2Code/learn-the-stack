import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>learn-the-stack</h1>
      <Link href="/about">Go to About</Link>
    </main>
  );
}