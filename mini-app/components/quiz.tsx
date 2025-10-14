'use client';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { Share } from '../components/share';

const princesses = ["Ariel", "Belle", "Cinderella", "Jasmine", "Snow White"];

const questions = [
  "What is your favorite type of adventure?",
  "What is your favorite color?",
  "What is your favorite food?",
  "What is your favorite hobby?",
  "What is your favorite animal?"
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (princess: string) => {
    const newAnswers = [...answers, princess];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // compute result
      const counts: Record<string, number> = {};
      princesses.forEach(p => (counts[p] = 0));
      newAnswers.forEach(p => {
        counts[p] = (counts[p] ?? 0) + 1;
      });
      const max = Math.max(...Object.values(counts));
      const most = Object.entries(counts).find(([_, v]) => v === max)?.[0] ?? princesses[0];
      setResult(most);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <Card className="w-full max-w-md bg-pink-100 text-pink-800">
        <CardHeader>
          <h2 className="text-xl font-bold">Your Disney Princess Match</h2>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-extrabold">{result}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Share text={`I am most similar to ${result}!`} />
          <Button variant="outline" onClick={resetQuiz}>
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-pink-100 text-pink-800">
      <CardHeader>
        <h2 className="text-xl font-bold">{questions[current]}</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {princesses.map((p) => (
          <Button key={p} onClick={() => handleAnswer(p)} className="w-full">
            {p}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
