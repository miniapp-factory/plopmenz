import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useMiniAppContext } from '@/components/context/miniapp-provider';

export default function ResultsPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<string[]>([]);
  const [princess, setPrincess] = useState<string>('');
  const { sdk } = useMiniAppContext();

  useEffect(() => {
    const stored = sessionStorage.getItem('answers');
    if (!stored) {
      router.push('/quiz');
      return;
    }
    const parsed = JSON.parse(stored);
    setAnswers(parsed);
    const counts: Record<string, number> = {};
    parsed.forEach((p: string) => {
      counts[p] = (counts[p] || 0) + 1;
    });
    const maxPrincess = Object.entries(counts).reduce(
      (a, b) => (b[1] > a[1] ? b : a),
      ['', 0]
    )[0];
    setPrincess(maxPrincess);
  }, [router]);

  const handleShare = async () => {
    if (!sdk) return;
    await sdk.share({
      text: `I am most similar to ${princess}!`,
    });
  };

  if (!answers.length) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-semibold">Your Disney Princess Match</h2>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold">{princess}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={handleShare}>Share on Farcaster</Button>
          <Button variant="outline" onClick={() => router.push('/quiz')}>
            Take Quiz Again
          </Button>
          <Button variant="outline" onClick={() => router.push('/')}>
            Home
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
