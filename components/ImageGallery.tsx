
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative group aspect-video rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
        <img 
          src={images[currentIndex]} 
          alt={`Hotel view ${currentIndex + 1}`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Fullscreen Trigger */}
        <button 
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-2xl text-white hover:bg-black/60 transition-all"
        >
          <Maximize2 size={20} />
        </button>

        {/* Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 p-2 bg-black/20 backdrop-blur-sm rounded-full">
          {images.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative min-w-[80px] h-16 rounded-xl overflow-hidden border-2 transition-all ${
              idx === currentIndex ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-60'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col animate-in fade-in duration-300">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-4 text-white z-10"
          >
            <X size={32} />
          </button>
          
          <div className="flex-1 flex items-center justify-center p-4">
             <img 
               src={images[currentIndex]} 
               alt="Full size view" 
               className="max-w-full max-h-full object-contain"
             />
          </div>

          <div className="p-8 flex items-center justify-center gap-8">
            <button onClick={prevImage} className="p-4 bg-white/10 rounded-full text-white">
              <ChevronLeft size={32} />
            </button>
            <span className="text-white font-bold">{currentIndex + 1} / {images.length}</span>
            <button onClick={nextImage} className="p-4 bg-white/10 rounded-full text-white">
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
