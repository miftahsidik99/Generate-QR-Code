import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { LinkIcon, Download, QrCode, ArrowRight } from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setQrValue(url.trim());
    }
  };

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current;
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex items-center justify-center p-4 font-['Helvetica_Neue',Arial,sans-serif]">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1F1F1F] border border-[#1F1F1F] items-stretch min-h-[600px]">
        
        {/* Left Column: Input Form */}
        <div className="space-y-8 bg-[#050505] p-8 md:p-12 flex flex-col justify-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 text-[11px] uppercase tracking-[2px] text-[#D4AF37]">
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
              <span>Generator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-['Georgia',serif] italic tracking-[1px] mb-4">
              Buat QR Code <br />
              <span>dalam detik.</span>
            </h1>
            <p className="text-[#888888] text-sm leading-relaxed max-w-sm">
              Masukkan tautan URL apa pun dan ubah seketika menjadi QR code yang siap dipindai dan diunduh.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6 max-w-sm">
            <div className="space-y-2">
              <label htmlFor="url" className="text-[10px] uppercase tracking-[1.5px] text-[#888888] font-semibold block">
                Tautan URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LinkIcon size={16} className="text-[#888888]" />
                </div>
                <input
                  type="url"
                  id="url"
                  placeholder="https://contoh.com"
                  className="w-full pl-12 pr-4 py-4 bg-[#0F0F0F] border border-[#1F1F1F] rounded-[4px] text-[#FFFFFF] text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-[#050505] py-4 px-6 rounded-[2px] font-['Georgia',serif] italic text-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 border-none"
            >
              <span>Buat QR Code</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Right Column: QR Code Preview */}
        <div className="w-full bg-[#050505] flex justify-center items-center relative p-8 md:p-12">
          <div className="bg-[#FFFFFF] p-8 rounded-[2px] shadow-[0_0_80px_rgba(0,0,0,0.5)] w-full max-w-[360px] flex flex-col items-center aspect-square justify-center relative">
            {qrValue ? (
              <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-300">
                <div className="bg-white p-2 mb-6">
                  <QRCodeCanvas
                    ref={qrRef}
                    value={qrValue}
                    size={200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={false}
                  />
                </div>
                
                <div className="w-full space-y-4">
                  <div className="text-center w-full px-4 py-3 bg-[#0F0F0F] rounded-[4px] border border-[#1F1F1F] overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="text-[13px] text-[#888888] font-mono" title={qrValue}>
                      {qrValue}
                    </span>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="w-full bg-transparent border border-[#1F1F1F] text-[#FFFFFF] py-3 px-4 rounded-[4px] font-medium focus:outline-none hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    <span className="text-sm">Unduh PNG</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center w-full relative">
                <div className="absolute inset-0 opacity-[0.15]" style={{
                  backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}></div>
                <div className="absolute w-[60px] h-[60px] border-[10px] border-[#000] bg-white top-6 left-6 z-0"></div>
                <div className="absolute w-[60px] h-[60px] border-[10px] border-[#000] bg-white top-6 right-6 z-0"></div>
                <div className="absolute w-[60px] h-[60px] border-[10px] border-[#000] bg-white bottom-6 left-6 z-0"></div>
                
                <QrCode size={48} strokeWidth={1} className="mb-4 text-[#888888] relative z-10" />
                <p className="text-[10px] uppercase tracking-[1.5px] text-[#888888] font-semibold relative z-10">
                  Pratinjau QR Code akan<br />muncul di sini
                </p>
              </div>
            )}
          </div>
          
          <div className="absolute bottom-10 right-10 w-[120px] h-[1px] bg-[#D4AF37] opacity-30"></div>
        </div>

      </div>
    </div>
  );
}
