'use client';

import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Share } from '@/components/share';
import { url } from '@/lib/metadata';

type Animal = 'cat' | 'dog' | 'fox' | 'hamster' | 'horse';

type Option = {
  animal: Animal;
  text: string;
};

type Question = {
  question: string;
  options: Option[];
};

const questions: Question[] = [
  {
    question: 'What is your favorite type of food?',
    options: [
      { animal: 'cat', text: 'Fish' },
      { animal: 'dog', text: 'Bones' },
      { animal: 'fox', text: 'Berries' },
      { animal: 'hamster', text: 'Seeds' },
      { animal: 'horse', text: 'Hay' },
    ],
  },
  {
    question: 'How do you prefer to spend a weekend?',
    options: [
      { animal: 'cat', text: 'Napping in a sunny spot' },
      { animal: 'dog', text: 'Playing fetch in the park' },
      { animal: 'fox', text: 'Exploring the woods' },
      { animal: 'hamster', text: 'Running on a wheel' },
      { animal: 'horse', text: 'Riding a trail' },
    ],
  },
  {
    question: 'What is your favorite activity?',
    options: [
      { animal: 'cat', text: 'Chasing laser pointers' },
      { animal: 'dog', text: 'Fetching sticks' },
      { animal: 'fox', text: 'Hunting small prey' },
      { animal: 'hamster', text: 'Collecting food' },
      { animal: 'horse', text: 'Galloping' },
    ],
  },
  {
    question: 'Which trait describes you best?',
    options: [
      { animal: 'cat', text: 'Independent' },
      { animal: 'dog', text: 'Loyal' },
      { animal: 'fox', text: 'Clever' },
      { animal: 'hamster', text: 'Curious' },
      { animal: 'horse', text: 'Graceful' },
    ],
  },
  {
    question: 'What is your preferred environment?',
    options: [
      { animal: 'cat', text: 'Indoor cozy' },
      { animal: 'dog', text: 'Outdoor spacious' },
      { animal: 'fox', text: 'Forest' },
      { animal: 'hamster', text: 'Small cage' },
      { animal: 'horse', text: 'Open field' },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<Animal, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [resultAnimal, setResultAnimal] = useState<Animal | null>(null);

  const shuffledOptions = useMemo(() => {
    return questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  }, []);

  const handleAnswer = useCallback(
    (animal: Animal) => {
      setScores((prev) => ({
        ...prev,
        [animal]: prev[animal] + 1,
      }));
      if (currentIndex + 1 >= questions.length) {
        const best = Object.entries(scores).reduce((a, b) =>
          a[1] > b[1] ? a : b
        )[0] as Animal;
        setResultAnimal(best);
        setShowResult(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentIndex, scores]
  );

  const handleRetake = useCallback(() => {
    setCurrentIndex(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShowResult(false);
    setResultAnimal(null);
  }, []);

  if (showResult && resultAnimal) {
    return (
      <Result animal={resultAnimal} onRetake={handleRetake} />
    );
  }

  const currentQuestion = shuffledOptions[currentIndex];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">
          Question {currentIndex + 1} of {questions.length}
        </h2>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{currentQuestion.question}</p>
        <div className="grid gap-2">
          {currentQuestion.options.map((opt) => (
            <Button
              key={opt.animal}
              variant="outline"
              onClick={() => handleAnswer(opt.animal)}
            >
              {opt.text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type ResultProps = {
  animal: Animal;
  onRetake: () => void;
};

function Result({ animal, onRetake }: ResultProps) {
  const imageMap: Record<Animal, string> = {
    cat: '/cat.png',
    dog: '/dog.png',
    fox: '/fox.png',
    hamster: '/hamster.png',
    horse: '/horse.png',
  };

  const animalNames: Record<Animal, string> = {
    cat: 'Cat',
    dog: 'Dog',
    fox: 'Fox',
    hamster: 'Hamster',
    horse: 'Horse',
  };

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <h2 className="text-2xl font-bold">
          You are a {animalNames[animal]}!
        </h2>
      </CardHeader>
      <CardContent>
        <img
          src={imageMap[animal]}
          alt={animalNames[animal]}
          width={512}
          height={512}
          className="size-[512px] mx-auto"
        />
        <p className="mt-4">
          Share your result with friends!
        </p>
        <Share text={`I am a ${animalNames[animal]}! ${url}`} />
      </CardContent>
      <CardFooter>
        <Button onClick={onRetake}>Retake Quiz</Button>
      </CardFooter>
    </Card>
  );
}
