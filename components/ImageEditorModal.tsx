
import React, { useState } from 'react';
import { editChartImage } from '../services/geminiService';

interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetElementId: string;
  stockName: string;
}

const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ isOpen, onClose, targetElementId, stockName }) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const captureAndEdit = async () => {
    setIsProcessing(true);
    try {
      // In a real browser environment with html2canvas or similar:
      // const canvas = await html2canvas(document.getElementById(targetElementId)!);
      // const base64 = canvas.toDataURL('image/png').split(',')[1];
      
      // For this demonstration, we'll simulate the "screenshot" of the chart
      // by using a placeholder that represents the current state.
      const simulatedBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="; // Mock base64
      
      const edited = await editChartImage(simulatedBase64, prompt);
      setResultImage(edited || "https://picsum.photos/600/400?grayscale&blur=2"); // Fallback for demo
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden animate-slideUp">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Creative Editor: {stockName}</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {!resultImage ? (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-gray-400 text-sm">Capturing chart state...</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">How should Gemini edit this chart?</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. 'Add a retro cyberpunk filter' or 'Make it look like a pencil sketch'"
                  className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-24"
                />
              </div>
              <button 
                onClick={captureAndEdit}
                disabled={isProcessing || !prompt}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all ${isProcessing ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 active:scale-95'}`}
              >
                {isProcessing ? 'Gemini is Generating...' : 'Generate AI Edit'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden relative">
                <img src={resultImage} alt="Edited" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                  <span className="text-white font-bold px-3 py-1 bg-black bg-opacity-50 rounded-full text-xs">AI GENERATED</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setResultImage(null)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Try Again
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800"
                >
                  Save & Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditorModal;
