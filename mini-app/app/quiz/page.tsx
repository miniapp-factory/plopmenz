import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const questions = [
  {
    question: 'What is your favorite color?',
    options: [
      { text: 'Blue', princess: 'Elsa' },
      { text: 'Pink', princess: 'Belle' },
      { text: 'Red', princess: 'Mulan' },
      { text: 'Green', princess: 'Rapunzel' },
      { text: 'Purple', princess: 'Aurora' },
    ],
  },
  {
    question: 'What is your favorite activity?',
    options: [
      { text: 'Reading', princess: 'Belle' },
      { text: 'Singing', princess: 'Aurora' },
      { text: 'Adventure', princess: 'Mulan' },
      { text: 'Dancing', princess: 'Tiana' },
      { text: 'Magic', princess: 'Elsa' },
    ],
  },
  {
    question: 'What is your favorite food?',
    options: [
      { text: 'Pasta', princess: 'Tiana' },
      { text: 'Ice Cream', princess: 'Elsa' },
      { text: 'Steak', princess: 'Mulan' },
      { text: 'Fruit', princess: 'Rapunzel' },
      { text: 'Cake', princess: 'Aurora' },
    ],
  },
  {
    question: 'What is your favorite animal?',
    options: [
      { text: 'Lion', princess: 'Mulan' },
      { text: 'Horse', princess: 'Aurora' },
      { text: 'Fish', princess: 'Tiana' },
      { text: 'Bird', princess: 'Rapunzel' },
      { text: 'Snowflake', princess: 'Elsa' },
    ],
  },
  {
    question: 'What is your favorite hobby?',
    options: [
      { text: 'Painting', princess: 'Aurora' },
      { text: 'Singing', princess: 'Elsa' },
      { text: 'Cooking', princess: 'Tiana' },
      { text: 'Exploring', princess: 'Mulan' },
      { text: 'Reading', princess: 'Belle' },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSelect = (princess: string) => {
    const newAnswers = [...answers, princess];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      sessionStorage.setItem('answers', JSON.stringify(newAnswers));
      router.push('/results');
    }
  };

  const question = questions[current];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-semibold">{question.question}</h2>
        </CardHeader>
        <CardContent className="grid gap-2">
          {question.options.map((opt, idx) => (
            <Button
              key={idx}
              variant="outline"
              onClick={() => handleSelect(opt.princess)}
              className="w-full justify-start"
            >
              {opt.text}
            </Button>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
