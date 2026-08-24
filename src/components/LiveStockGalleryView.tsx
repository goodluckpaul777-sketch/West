import React, { useState, useMemo } from "react";
import { 
  Search, 
  DollarSign, 
  Info, 
  Mail, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Fish,
  Image as ImageIcon,
  Sparkles
} from "lucide-react";
import { FishSpecies, WaterType, Temperament, CareLevel } from "../types";
import { LIVESTOCK_DATA } from "../data/livestock";
import { getImageSrc } from "../utils";

interface LiveStockGalleryViewProps {
  onInquire: (species: FishSpecies) => void;
}

export default function LiveStockGalleryView({ onInquire }: LiveStockGalleryViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [photosOnly, setPhotosOnly] = useState(false);
  const [zoomedFish, setZoomedFish] = useState<FishSpecies | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  
  const filteredFishes = useMemo(() => {
    return [...LIVESTOCK_DATA]
      .filter(fish => !photosOnly || !!fish.image)
      .sort((a, b) => {
        if (!!a.image !== !!b.image) return !!b.image ? 1 : -1;
        return a.name.localeCompare(b.name);
      })
      .filter(fish => 
        fish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fish.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fish.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, photosOnly]);

  const photoCount = useMemo(() => LIVESTOCK_DATA.filter(f => !!f.image).length, []);

  return (
    <div className="space-y-12 pb-12">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-mono text-xs uppercase tracking-wider">
          <Fish className="w-3.5 h-3.5" /> Complete Commercial Catalog
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display uppercase">Live Stock Gallery</h1>
        <p className="text-zinc-400 font-mono text-sm max-w-2xl mx-auto">
          Explore all our certified West African species including Aba Aba knifefish, Tigerfish, Mormyrids, Polypterus bichirs, and rare riverine imports.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center bg-zinc-900 border border-white/5 rounded-full px-4 py-3 w-full sm:max-w-md">
            <Search className="w-5 h-5 text-zinc-500 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name, scientific name, or origin..."
              className="bg-transparent border-none text-white w-full focus:outline-none font-mono text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 bg-zinc-900/80 p-1.5 rounded-full border border-white/5 font-mono text-xs">
            <button
              onClick={() => setPhotosOnly(false)}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${!photosOnly ? "bg-yellow-500 text-black font-bold" : "text-zinc-400 hover:text-white"}`}
            >
              <Fish className="w-3.5 h-3.5" /> All Species ({LIVESTOCK_DATA.length})
            </button>
            <button
              onClick={() => setPhotosOnly(true)}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${photosOnly ? "bg-yellow-500 text-black font-bold" : "text-zinc-400 hover:text-white"}`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> Photos Only ({photoCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFishes.map((fish) => {
            const hasImg = !!fish.image;
            return (
              <div key={fish.id} className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-yellow-500/30 transition-colors shadow-lg">
                <div 
                  className={`relative h-64 overflow-hidden bg-zinc-950 flex-shrink-0 ${hasImg ? "cursor-zoom-in" : "flex items-center justify-center p-6"}`}
                  onClick={() => {
                    if (hasImg) {
                      setZoomedFish(fish);
                      setZoomScale(1);
                    }
                  }}
                >
                  {hasImg ? (
                    <>
                      <img 
                        src={getImageSrc(fish.image)} 
                        alt={`${fish.name} (${fish.scientificName}) - West African Fish Farm specimen`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoomedFish(fish);
                            setZoomScale(1);
                          }}
                          className="p-2 rounded-full bg-black/80 hover:bg-yellow-500 text-zinc-300 hover:text-black border border-white/10 hover:border-transparent transition-all cursor-pointer shadow-lg"
                          title="Zoom Image"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
                        <Fish className="w-8 h-8 opacity-80" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">AUTHENTIC COMMERCIAL SPECIMEN</span>
                        <span className="text-sm font-bold text-white block mt-1">{fish.name}</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-xs font-mono font-bold text-yellow-500 border border-yellow-500/20">
                    {fish.status}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{fish.name}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{fish.careLevel}</span>
                    </div>
                    <p className="text-xs font-mono text-yellow-500/80 italic mt-0.5">{fish.scientificName}</p>
                  </div>
                  
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-4 leading-relaxed font-sans">
                    {fish.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 my-2 py-3 border-y border-white/5 font-mono text-[11px] text-zinc-400">
                    <div><span className="text-zinc-500">Min Tank:</span> {fish.minTankSize} gal</div>
                    <div><span className="text-zinc-500">Temp:</span> {fish.tempRange}</div>
                    <div><span className="text-zinc-500">pH:</span> {fish.phRange}</div>
                    <div><span className="text-zinc-500">Nature:</span> {fish.temperament}</div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto gap-3">
                    {hasImg ? (
                      <button 
                        onClick={() => {
                          setZoomedFish(fish);
                          setZoomScale(1);
                        }}
                        className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        Zoom
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-zinc-500">Origin: {fish.origin.split("(")[0]}</span>
                    )}

                    <button 
                      onClick={() => onInquire(fish)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors ml-auto cursor-pointer"
                    >
                      Inquire Specimen
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredFishes.length === 0 && (
            <div className="col-span-full py-16 text-center text-zinc-500">
              <Info className="w-10 h-10 mx-auto mb-4 opacity-30 text-yellow-500" />
              <p className="font-mono text-base text-zinc-400">No specimens found matching your filter.</p>
              <button 
                onClick={() => { setSearchTerm(""); setPhotosOnly(false); }}
                className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-yellow-500 text-xs font-mono rounded-full"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Immersive Image Zoom Lightbox Modal */}
      {zoomedFish && zoomedFish.image && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-lg select-none"
          onClick={() => setZoomedFish(null)}
        >
          {/* Top Panel: Title and general actions */}
          <div 
            className="absolute top-4 inset-x-4 flex justify-between items-center z-10 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/5 max-w-5xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-left">
              <p className="text-yellow-500 text-[10px] font-mono uppercase tracking-widest font-semibold">Exotic Specimen Zoom</p>
              <h4 className="text-sm font-bold text-white tracking-tight">{zoomedFish.name}</h4>
              <p className="text-xs text-zinc-400 font-mono italic">{zoomedFish.scientificName}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomScale(prev => Math.min(prev + 0.25, 3));
                }}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
                <span className="hidden sm:inline">In</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomScale(prev => Math.max(prev - 0.25, 0.5));
                }}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
                <span className="hidden sm:inline">Out</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomScale(1);
                }}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedFish(null);
                }}
                className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg border border-red-500/20 transition-all cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const photoList = filteredFishes.filter(f => !!f.image);
              const currentIndex = photoList.findIndex(f => f.id === zoomedFish.id);
              if (currentIndex > 0) {
                setZoomedFish(photoList[currentIndex - 1]);
                setZoomScale(1);
              } else if (photoList.length > 0) {
                setZoomedFish(photoList[photoList.length - 1]);
                setZoomScale(1);
              }
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white hover:text-yellow-400 transition-colors border border-white/5 cursor-pointer shadow-xl"
            title="Previous Specimen"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const photoList = filteredFishes.filter(f => !!f.image);
              const currentIndex = photoList.findIndex(f => f.id === zoomedFish.id);
              if (currentIndex < photoList.length - 1) {
                setZoomedFish(photoList[currentIndex + 1]);
                setZoomScale(1);
              } else if (photoList.length > 0) {
                setZoomedFish(photoList[0]);
                setZoomScale(1);
              }
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white hover:text-yellow-400 transition-colors border border-white/5 cursor-pointer shadow-xl"
            title="Next Specimen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Canvas Container */}
          <div 
            className="w-full max-w-4xl h-[65vh] md:h-[70vh] flex items-center justify-center overflow-hidden relative cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={getImageSrc(zoomedFish.image)} 
              alt={zoomedFish.name} 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-transform duration-300"
              style={{ transform: `scale(${zoomScale})` }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bottom Specimen Meta Bar */}
          <div 
            className="absolute bottom-4 inset-x-4 max-w-2xl mx-auto bg-zinc-950/90 border border-white/10 rounded-2xl p-4 text-center space-y-2 z-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-xs font-mono text-zinc-400">
              <span><strong className="text-zinc-500">ORIGIN:</strong> {zoomedFish.origin}</span>
              <span><strong className="text-zinc-500">WATER:</strong> {zoomedFish.waterType}</span>
              <span><strong className="text-zinc-500">CARE:</strong> {zoomedFish.careLevel}</span>
              <span><strong className="text-zinc-500">DIET:</strong> {zoomedFish.diet}</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed line-clamp-2 md:line-clamp-none">
              {zoomedFish.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

