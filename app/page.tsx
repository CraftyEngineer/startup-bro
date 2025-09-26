'use client';

import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { StartupIdea, generateIdea } from '@/lib/ai';
import GeneratorControls from '@/components/GeneratorControls';
import IdeaCard from '@/components/IdeaCard';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [idea, setIdea] = useState<StartupIdea | null>(null);

  const handleGenerate = async (word1: string, word2: string, word3: string) => {
    setIsLoading(true);
    setIdea(null);
    try {
      const generatedIdea = await generateIdea(word1, word2, word3);
      setIdea(generatedIdea);
    } catch (error: any) {
      console.error('Error generating idea:', error);
      toast.error(error.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 overflow-hidden bg-slate-950 text-white'>
      <div className='absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(38,143,212,0.1),_rgba(38,143,212,0)_50%)]'></div>
      <div className='z-10 flex flex-col items-center space-y-8 w-full'>
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          <h1 className='text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500'>
            Startup Bro
          </h1>
          <p className='mt-2 text-lg text-slate-400'>Disrupting synergy with artisanal blockchain solutions. For you.</p>
        </motion.div>

        <GeneratorControls onGenerate={handleGenerate} isLoading={isLoading} />

        {isLoading && <p className='text-lg'>🚀 Synergizing the disruptive paradigms... please wait.</p>}

        {idea && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <IdeaCard idea={idea} />
          </motion.div>
        )}
        <Toaster richColors position='top-center' />
      </div>
    </main>
  );
}