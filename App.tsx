
import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './constants';
import { SlideType } from './types';
import BackgroundEffects from './components/BackgroundEffects';
import { generateLoveNote } from './services/geminiService';
import { ChevronRight, ChevronLeft, Heart, Music, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [aiNote, setAiNote] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const currentSlide = SLIDES[currentSlideIndex];

  const handleNext = useCallback(() => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setAiNote(null);
    }
  }, [currentSlideIndex]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      setAiNote(null);
    }
  }, [currentSlideIndex]);

  const handleGenerateNote = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger background burst when clicking AI button
    setIsGenerating(true);
    const note = await generateLoveNote("deeply romantic and appreciative");
    setAiNote(note);
    setIsGenerating(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const isFinalSlide = currentSlideIndex === SLIDES.length - 1;

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center transition-colors duration-1000 select-none cursor-default ${currentSlide.bgColor}`}
    >
      <BackgroundEffects type={currentSlide.effect} key={`effect-${currentSlideIndex}`} />

      {/* Music Indicator */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsMusicOn(!isMusicOn); }}
          className={`p-3 rounded-full bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:scale-110 ${isMusicOn ? 'text-pink-500' : 'text-gray-400'}`}
        >
          <Music size={24} className={isMusicOn ? 'animate-pulse' : ''} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100/30">
        <div 
          className="h-full bg-pink-400 transition-all duration-500 ease-out" 
          style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
        />
      </div>

      {/* Content Area - Pointer Events None on container to let taps hit the background */}
      <div className="relative z-10 w-full max-w-2xl px-8 text-center flex flex-col items-center pointer-events-none">
        
        {/* Title */}
        <h1 
          key={`title-${currentSlideIndex}`}
          className={`text-4xl md:text-6xl font-romantic mb-8 transition-all duration-700 delay-100 transform drop-shadow-sm ${currentSlide.accentColor}`}
        >
          {currentSlide.title}
        </h1>

        {/* Text Body */}
        <div 
          key={`content-${currentSlideIndex}`}
          className="space-y-4 mb-10 transition-all duration-700 delay-300"
        >
          {currentSlide.content.map((line, i) => (
            <p key={i} className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed drop-shadow-sm">
              {line}
            </p>
          ))}
        </div>

        {/* Emoji Row */}
        <div className="flex gap-4 justify-center mb-12">
          {currentSlide.emojis.map((emoji, i) => (
            <span 
              key={i} 
              className={`text-4xl transition-all duration-500 hover:scale-125 transform delay-${i * 100} ${currentSlide.type === SlideType.CUTE_STUFF ? 'animate-bounce' : ''}`}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* AI Interaction on Final Slide */}
        {isFinalSlide && (
          <div className="mt-8 p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-pink-100 max-w-lg pointer-events-auto animate-fade-in">
            {!aiNote ? (
              <button
                onClick={handleGenerateNote}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 mx-auto"
              >
                <Sparkles size={20} />
                {isGenerating ? "Thinking of you..." : "A special message for you?"}
              </button>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500">
                <p className="text-lg italic text-gray-800 mb-4">"{aiNote}"</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setAiNote(null); }}
                  className="text-pink-500 text-sm font-semibold hover:underline"
                >
                  Ask for another?
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-12 flex items-center gap-8 z-50 pointer-events-auto">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          disabled={currentSlideIndex === 0}
          className={`p-4 rounded-full border border-gray-200 transition-all shadow-lg bg-white/80 hover:bg-white disabled:opacity-0 ${currentSlideIndex === 0 ? 'pointer-events-none' : 'hover:scale-110'}`}
        >
          <ChevronLeft size={28} className="text-gray-600" />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); isFinalSlide ? alert("I love you more than all the code in the world, Smriti! ❤️") : handleNext(); }}
          className={`group relative p-6 rounded-full transition-all shadow-xl hover:scale-110 active:scale-95 ${isFinalSlide ? 'bg-pink-500' : 'bg-white/80'} overflow-hidden`}
        >
          {isFinalSlide ? (
            <div className="flex items-center gap-2 text-white font-bold px-4">
              <Heart size={28} fill="currentColor" />
              <span>Smile if you felt this 💖</span>
            </div>
          ) : (
            <ChevronRight size={32} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Footer Vibe Info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-30 text-xs tracking-widest uppercase pointer-events-none">
        Vibe: {currentSlide.musicVibe}
      </div>
    </div>
  );
};

export default App;
