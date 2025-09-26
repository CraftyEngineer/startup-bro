import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { buzzwords } from '@/lib/buzzwords';
import { Dices, Sparkles } from 'lucide-react';

interface GeneratorControlsProps {
  onGenerate: (word1: string, word2: string, word3: string) => void;
  isLoading: boolean;
}

export default function GeneratorControls({ onGenerate, isLoading }: GeneratorControlsProps) {
  const [words, setWords] = useState(['', '', '']);

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleRandomize = () => {
    const randomWords: string[] = [];
    const usedIndices = new Set<number>();
    while (randomWords.length < 3) {
      const randomIndex = Math.floor(Math.random() * buzzwords.length);
      if (!usedIndices.has(randomIndex)) {
        randomWords.push(buzzwords[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }
    setWords(randomWords);
  };

  const handleGenerateClick = () => {
    if (words.every(word => word.trim() !== '')) {
      onGenerate(words[0], words[1], words[2]);
    }
  };

  return (
    <div className='w-full max-w-2xl space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {[0, 1, 2].map(index => (
          <div key={index} className='space-y-2'>
            <Label htmlFor={`word-${index}`}>Buzzword #{index + 1}</Label>
            <Input
              id={`word-${index}`}
              value={words[index]}
              onChange={e => handleWordChange(index, e.target.value)}
              placeholder='e.g., Blockchain'
              disabled={isLoading}
            />
          </div>
        ))}
      </div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <Button variant='outline' onClick={handleRandomize} className='w-full sm:w-auto text-black hover:text-white hover:bg-black border-black hover:border-black' disabled={isLoading}>
          <Dices className='mr-2 h-4 w-4' />
          Randomize
        </Button>
        <Button onClick={handleGenerateClick} className='w-full' disabled={isLoading || words.some(w => w.trim() === '')}>
          {isLoading ? 'Bro-ing up...' : <><Sparkles className='mr-2 h-4 w-4' />Generate Idea</>}
        </Button>
      </div>
    </div>
  );
}
