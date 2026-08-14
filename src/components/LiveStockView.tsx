import React, { useState, useMemo } from "react";
import { 
  MessageSquare, 
  Mail, 
  Copy, 
  Check, 
  Search, 
  Fish, 
  Sparkles, 
  ArrowDown, 
  ZoomIn, 
  X, 
  Grid, 
  List, 
  Image as ImageIcon,
  CheckCircle2,
  Plus
} from "lucide-react";
import { NEW_LIVESTOCK_DATA, StockFish } from "../data/newLivestock";

export default function LiveStockView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWithPhotosOnly, setFilterWithPhotosOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [zoomedFish, setZoomedFish] = useState<StockFish | null>(null);
  
  // Client Info
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredFishes = useMemo(() => {
    let list = NEW_LIVESTOCK_DATA;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter((fish) => 
        fish.commonName.toLowerCase().includes(q) || 
        fish.scientificName.toLowerCase().includes(q) ||
        fish.sn.includes(q)
      );
    }
    if (filterWithPhotosOnly) {
      list = list.filter((fish) => !!fish.image);
    }
    return [...list].sort((a, b) => parseInt(a.sn, 10) - parseInt(b.sn, 10));
  }, [searchTerm, filterWithPhotosOnly]);

  const totalWithPhotosCount = useMemo(() => {
    return NEW_LIVESTOCK_DATA.filter(f => !!f.image).length;
  }, []);

  const handleCheckboxChange = (sn: string, checked: boolean) => {
    setSelectedItems(prev => {
      const updated = { ...prev };
      if (checked) {
        updated[sn] = 1; // Default to 1 piece when checked
      } else {
        delete updated[sn];
      }
      return updated;
    });
  };

  const handleQuantityChange = (sn: string, quantity: number) => {
    setSelectedItems(prev => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[sn];
      } else {
        updated[sn] = quantity;
      }
      return updated;
    });
  };

  const generateMessage = () => {
    const itemsList = Object.entries(selectedItems).map(([sn, qty]) => {
      const fish = NEW_LIVESTOCK_DATA.find(f => f.sn === sn);
      return `- S/N #${sn}: ${fish?.commonName} (${fish?.scientificName}): ${qty} pc(s)`;
    }).join("\n");

    return `Hello West Africa Fish Farm (WAGFF),

I would like to place an export order inquiry for the following stock:

${itemsList || "No items selected."}

Client Info:
Name: ${clientName || "[Your Name]"}
Email: ${email || "[Your Email]"}
Phone: ${phone || "[Your Phone]"}

Additional Notes:
${notes || "None"}
`;
  };

  const validateForm = () => {
    if (Object.keys(selectedItems).length === 0) {
      alert("Please select at least one item from the stock list below.");
      return false;
    }
    if (!clientName || !phone) {
      alert("Please fill in your Name and Phone Number in the Order Details form.");
      return false;
    }
    return true;
  };

  const orderWhatsApp = () => {
    if (!validateForm()) return;
    const url = `https://wa.me/2348036708191?text=${encodeURIComponent(generateMessage())}`;
    window.open(url, "_blank");
  };

  const orderEmail = () => {
    if (!validateForm()) return;
    const mailto = `mailto:westafricafishfarm@gmail.com?subject=${encodeURIComponent(`Stock Purchase Inquiry - ${clientName}`)}&body=${encodeURIComponent(generateMessage())}`;
    window.open(mailto, "_self");
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Title & Description */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-mono text-xs uppercase tracking-wider">
          <Fish className="w-3.5 h-3.5" /> 98 Certified Export Species Available
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display uppercase">Available Stock List</h1>
        <p className="text-zinc-400 font-mono text-sm max-w-3xl leading-relaxed">
          Browse our complete commercial inventory below with authentic species imagery. Select your species, adjust quantities, fill in your contact details, and send an inquiry directly to our sales dispatch.
        </p>
      </div>

      {/* Prominent Order & Messaging Sign Banner */}
      <div className="bg-gradient-to-r from-yellow-500/15 via-zinc-900 to-zinc-900 border-2 border-yellow-500/40 p-5 md:p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-xl text-yellow-400 flex-shrink-0 animate-pulse">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Easy Ordering & Messaging Sign
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white font-display uppercase tracking-wide">
                How to Send Messages & Place Stock Orders
              </h2>
              <p className="text-zinc-300 text-xs font-sans max-w-xl leading-relaxed">
                Check species boxes in the list below, then click <strong>"Order via WhatsApp"</strong> or <strong>"Order via Email"</strong> to message us instantly (+234 803 670 8191).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const el = document.getElementById("order-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/20 cursor-pointer"
            >
              <ArrowDown className="w-4 h-4" /> Go to Order Form
            </button>
            <a
              href="https://wa.me/2348036708191"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-black" /> Direct WhatsApp Chat
            </a>
          </div>
        </div>

        {/* 3 Step Visual Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 font-mono text-xs">
          <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-white/5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
            <span className="text-zinc-300 text-[11px]">Select species & qty below</span>
          </div>
          <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-white/5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
            <span className="text-zinc-300 text-[11px]">Fill Name & Phone in Form</span>
          </div>
          <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-white/5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
            <span className="text-zinc-300 text-[11px]">Click "Order via WhatsApp"</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stock Inventory Table / Cards */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Controls Bar: Search, Photos Filter, View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex-1 flex items-center bg-zinc-900 border border-white/5 rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-zinc-500 mr-2.5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search common name, scientific name, S/N..."
                className="bg-transparent border-none text-white w-full focus:outline-none font-mono text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="text-zinc-500 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterWithPhotosOnly(!filterWithPhotosOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  filterWithPhotosOnly 
                    ? "bg-yellow-500 text-black font-bold shadow-md shadow-yellow-500/20" 
                    : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-white/5"
                }`}
                title="Toggle species with high-res photos"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{filterWithPhotosOnly ? `Photos Only (${totalWithPhotosCount})` : `Show All Species (98)`}</span>
              </button>

              <div className="flex items-center bg-zinc-900 border border-white/5 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "table" ? "bg-yellow-500 text-black font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "cards" ? "bg-yellow-500 text-black font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                  title="Visual Cards View"
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* TABLE VIEW */}
          {viewMode === "table" ? (
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-950/80 border-b border-white/5">
                      <th className="p-3.5 font-mono text-xs uppercase tracking-wider text-zinc-500 text-center w-12">Select</th>
                      <th className="p-3.5 font-mono text-xs uppercase tracking-wider text-zinc-500 w-14">S/N</th>
                      <th className="p-3.5 font-mono text-xs uppercase tracking-wider text-zinc-500 w-16 text-center">Photo</th>
                      <th className="p-3.5 font-mono text-xs uppercase tracking-wider text-zinc-500">Common Name</th>
                      <th className="p-3.5 font-mono text-xs uppercase tracking-wider text-zinc-500">Scientific Name</th>
                      <th className="p-3.5 font-mono text-xs uppercase tracking-wider text-zinc-500 w-24">Qty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {filteredFishes.map((fish, idx) => {
                      const isSelected = !!selectedItems[fish.sn];
                      return (
                        <tr 
                          key={`${fish.sn}-${fish.commonName}-${idx}`} 
                          className={`hover:bg-white/5 transition-colors group ${isSelected ? 'bg-yellow-500/5' : ''}`}
                        >
                          <td className="p-3.5 text-center">
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={(e) => handleCheckboxChange(fish.sn, e.target.checked)}
                              className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-yellow-500 focus:ring-yellow-500 cursor-pointer"
                            />
                          </td>
                          <td className="p-3.5 text-xs font-mono text-zinc-400">
                            #{fish.sn}
                          </td>
                          <td className="p-2 text-center">
                            {fish.image ? (
                              <button
                                type="button"
                                onClick={() => setZoomedFish(fish)}
                                className="relative w-11 h-11 rounded-lg overflow-hidden border border-yellow-500/30 bg-black group/thumb cursor-zoom-in inline-block shadow transition-transform hover:scale-105"
                                title={`Click to view full photo of ${fish.commonName}`}
                              >
                                <img 
                                  src={fish.image} 
                                  alt={fish.commonName} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                                  <ZoomIn className="w-3.5 h-3.5 text-yellow-400" />
                                </div>
                              </button>
                            ) : (
                              <span className="text-zinc-600 font-mono text-xs">—</span>
                            )}
                          </td>
                          <td className="p-3.5">
                            <div className="text-sm font-medium text-white flex items-center gap-2">
                              <span>{fish.commonName}</span>
                              {fish.image && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                  Photo
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3.5 text-xs font-mono text-zinc-400 italic">
                            {fish.scientificName}
                          </td>
                          <td className="p-3.5">
                            {isSelected ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  min="1"
                                  className="w-16 bg-zinc-950 border border-yellow-500/40 rounded px-2 py-1 text-white text-xs font-mono focus:outline-none focus:border-yellow-500"
                                  value={selectedItems[fish.sn] || 1}
                                  onChange={(e) => handleQuantityChange(fish.sn, parseInt(e.target.value) || 0)}
                                />
                                <span className="text-[10px] font-mono text-zinc-500">pcs</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleCheckboxChange(fish.sn, true)}
                                className="opacity-0 group-hover:opacity-100 text-[10px] font-mono px-2 py-1 rounded bg-zinc-800 hover:bg-yellow-500 hover:text-black text-zinc-300 transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" /> Select
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {filteredFishes.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-zinc-500 font-mono text-sm">
                          <Fish className="w-10 h-10 mx-auto mb-3 opacity-20" />
                          No species found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* CARDS GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredFishes.map((fish, idx) => {
                const isSelected = !!selectedItems[fish.sn];
                return (
                  <div 
                    key={`${fish.sn}-${fish.commonName}-${idx}`}
                    className={`bg-zinc-900/50 border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                      isSelected 
                        ? 'border-yellow-500/60 bg-yellow-500/5 shadow-lg shadow-yellow-500/5' 
                        : 'border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div>
                      {/* Card Image Banner */}
                      {fish.image ? (
                        <div 
                          className="relative h-44 w-full rounded-xl overflow-hidden bg-black border border-white/5 mb-3 cursor-zoom-in group/cardimg shadow-md"
                          onClick={() => setZoomedFish(fish)}
                        >
                          <img 
                            src={fish.image} 
                            alt={fish.commonName}
                            className="w-full h-full object-cover group-hover/cardimg:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-yellow-400 border border-yellow-500/30">
                            <ZoomIn className="w-3.5 h-3.5" />
                          </div>
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur rounded font-mono text-[10px] text-yellow-400 font-bold border border-yellow-500/20">
                            S/N #{fish.sn}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between mb-3 pt-1">
                          <span className="px-2 py-0.5 bg-zinc-800 rounded font-mono text-[10px] text-yellow-400 font-bold border border-white/5">
                            S/N #{fish.sn}
                          </span>
                        </div>
                      )}

                      {/* Info */}
                      <h4 className="text-base font-bold text-white mb-0.5">{fish.commonName}</h4>
                      <p className="text-xs font-mono text-zinc-400 italic mb-4">{fish.scientificName}</p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-zinc-300">
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleCheckboxChange(fish.sn, e.target.checked)}
                          className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-yellow-500 focus:ring-yellow-500 cursor-pointer"
                        />
                        <span>{isSelected ? "Selected" : "Add to Order"}</span>
                      </label>

                      {isSelected && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-zinc-500">Qty:</span>
                          <input
                            type="number"
                            min="1"
                            value={selectedItems[fish.sn] || 1}
                            onChange={(e) => handleQuantityChange(fish.sn, parseInt(e.target.value) || 0)}
                            className="w-16 bg-zinc-950 border border-yellow-500/40 rounded px-2 py-1 text-white text-xs font-mono focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {filteredFishes.length === 0 && (
                <div className="col-span-2 p-12 text-center text-zinc-500 font-mono text-sm bg-zinc-900/30 rounded-2xl border border-white/5">
                  <Fish className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  No species found matching your search.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Order Form */}
        <div className="space-y-6" id="order-form">
          <div className="bg-zinc-900/50 border border-yellow-500/30 p-6 rounded-2xl sticky top-24 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 font-display uppercase">
              <MessageSquare className="w-5 h-5 text-yellow-500" />
              Order & Message Form
            </h3>
            <p className="text-zinc-400 text-xs font-sans mb-6">
              Selected items are auto-drafted below. Fill in your details and click to send directly to WhatsApp or Email.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-400 block">Full Name <span className="text-yellow-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white font-sans text-xs focus:outline-none focus:border-yellow-500/40 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-400 block">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white font-sans text-xs focus:outline-none focus:border-yellow-500/40 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-400 block">Phone / WhatsApp <span className="text-yellow-500">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white font-mono text-xs focus:outline-none focus:border-yellow-500/40 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-400 block">Additional Notes</label>
                <textarea
                  placeholder="Any specific instructions, sizes, or parameters..."
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-zinc-100 placeholder-zinc-600 font-sans text-xs focus:outline-none focus:border-yellow-500/40 transition-colors"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2 mb-6">
              <span className="text-[9px] font-mono uppercase text-zinc-500 block tracking-wider flex justify-between items-center">
                Draft Message Preview ({Object.keys(selectedItems).length} items)
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateMessage());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-1 hover:text-yellow-500 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </span>
              <div className="font-mono text-[10px] text-zinc-400 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {generateMessage()}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={orderWhatsApp}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-black text-emerald-500" />
                Order via WhatsApp
              </button>
              
              <button
                onClick={orderEmail}
                className="w-full py-3.5 rounded-xl bg-zinc-100 hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Order via Email
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal for Stock List Photos */}
      {zoomedFish && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomedFish(null)}
        >
          <div 
            className="bg-zinc-900 border border-yellow-500/40 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-yellow-500 font-mono text-xs font-bold uppercase">S/N #{zoomedFish.sn}</span>
                <h3 className="text-lg font-bold text-white">{zoomedFish.commonName}</h3>
                <p className="text-xs font-mono text-zinc-400 italic">{zoomedFish.scientificName}</p>
              </div>
              <button 
                onClick={() => setZoomedFish(null)}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[60vh] bg-black flex items-center justify-center p-2">
              <img 
                src={zoomedFish.image} 
                alt={zoomedFish.commonName}
                className="max-h-[55vh] w-auto max-w-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-4 bg-zinc-950 flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-zinc-400">
                Official Specimen Photo
              </span>
              <button
                onClick={() => {
                  handleCheckboxChange(zoomedFish.sn, true);
                  setZoomedFish(null);
                }}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-yellow-500/20"
              >
                <CheckCircle2 className="w-4 h-4" /> Add to Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Quick Bar so users never miss how to send message */}
      <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto bg-zinc-900/95 border-2 border-yellow-500/60 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 flex-shrink-0">
            <Fish className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-white font-mono font-bold text-xs truncate">
              {Object.keys(selectedItems).length > 0 
                ? `${Object.keys(selectedItems).length} Species Selected` 
                : "Need to Send a Message?"}
            </div>
            <div className="text-zinc-400 text-[10px] font-sans truncate">
              {Object.keys(selectedItems).length > 0 
                ? "Tap button to fill details & send" 
                : "Select items or tap to jump to Order Form"}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById("order-form");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-lg shadow-yellow-500/20"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Send Message
        </button>
      </div>
    </div>
  );
}
