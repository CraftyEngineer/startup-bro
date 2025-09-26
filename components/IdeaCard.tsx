import { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StartupIdea } from '@/lib/ai';
import * as htmlToImage from 'html-to-image';
import { Twitter, Download, Sparkles, Lightbulb, AlertCircle } from 'lucide-react';

interface IdeaCardProps {
  idea: StartupIdea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, { 
        quality: 0.95, 
        backgroundColor: '#0f172a',
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });

      const link = document.createElement('a');
      link.download = `startup-bro-${idea.ideaName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error generating PNG:', error);
      alert('Could not generate image. Please try again.');
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;

    try {
      await htmlToImage.toPng(cardRef.current, { quality: 0.95, backgroundColor: '#0f172a' });

      const shareText = `🤯 Just generated this absolutely unhinged startup idea!\n\n"${idea.ideaName}"\n\nTry Startup Bro for maximum brainrot! 🚀 on https://startup-bro-app.vercel.app/\n\nMade by the funniest people on the internet. @CookedDev, @Sukhvir_Kooner, @advolt #StartupBro #Brainrot #StartupIdeas`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
      window.open(twitterUrl, '_blank');
      
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Could not share. Please try again.');
    }
  };

  return (
    <div ref={cardRef} className='w-full max-w-3xl'>
      <Card className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-700 shadow-2xl overflow-hidden'>
        {/* Header with gradient background */}
        <CardHeader className='bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 p-6 relative'>
          <div className='absolute inset-0 bg-black/20'></div>
          <div className='relative z-10'>
            <div className='flex items-center gap-2 mb-2'>
              <Sparkles className='h-5 w-5 text-yellow-300' />
              <span className='text-sm font-medium text-yellow-200 uppercase tracking-wider'>Startup Bro Presents</span>
            </div>
            <CardTitle className='text-3xl font-black text-white leading-tight'>
              {idea.ideaName}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className='p-6 space-y-6'>
          {/* Problem Section */}
          <div className='bg-red-900/20 border border-red-500/30 rounded-xl p-4'>
            <div className='flex items-center gap-2 mb-3'>
              <AlertCircle className='h-5 w-5 text-red-400' />
              <h3 className='font-bold text-lg text-red-300'>The Problem </h3>
            </div>
            <p className='text-slate-200 leading-relaxed text-lg'>{idea.problemStatement}</p>
          </div>

          {/* Solution Section */}
          <div className='bg-green-900/20 border border-green-500/30 rounded-xl p-4'>
            <div className='flex items-center gap-2 mb-3'>
              <Lightbulb className='h-5 w-5 text-green-400' />
              <h3 className='font-bold text-lg text-green-300'>Our Revolutionary Solution </h3>
            </div>
            <p className='text-slate-200 leading-relaxed text-lg'>{idea.solution}</p>
          </div>

          {/* Stats Section */}
          <div className='grid grid-cols-3 gap-4 mt-6'>
            <div className='text-center bg-slate-800/50 rounded-lg p-3'>
              <div className='text-2xl font-bold text-cyan-400'>$420M</div>
              <div className='text-sm text-slate-400'>Valuation</div>
            </div>
            <div className='text-center bg-slate-800/50 rounded-lg p-3'>
              <div className='text-2xl font-bold text-purple-400'>69%</div>
              <div className='text-sm text-slate-400'>Growth Rate</div>
            </div>
            <div className='text-center bg-slate-800/50 rounded-lg p-3'>
              <div className='text-2xl font-bold text-pink-400'>∞</div>
              <div className='text-sm text-slate-400'>Synergy</div>
            </div>
          </div>
        </CardContent>

        <CardFooter className='p-6 bg-slate-800/50 border-t border-slate-700'>
          <div className='flex flex-col sm:flex-row gap-3 w-full'>
            <Button 
              onClick={handleDownloadPNG} 
              className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold'
            >
              <Download className='mr-2 h-4 w-4' />
              Download PNG
            </Button>
            <Button 
              onClick={handleShare} 
              className='flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold'
            >
              <Twitter className='mr-2 h-4 w-4' />
              Share on X
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}