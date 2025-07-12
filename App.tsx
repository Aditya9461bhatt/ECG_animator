
import React, { useState } from 'react';
import Controls from './components/Controls';
import ECGDisplay from './components/ECGDisplay';
import { AllParams } from './types/ECG';

const App: React.FC = () => {
  const [params, setParams] = useState<AllParams>({
    wave: {
      heartRate: 70,
      pixelsPerMv: 100,
      hP: 0.15, bP: 0.08,
      hQ: -0.1, bQ: 0.025,
      hR: 1.2, bR: 0.05,
      hS: -0.25, bS: 0.025,
      hT: 0.2, bT: 0.16,
      lPQ: 0.08, lST: 0.12,
      lTP: 0.3,
      nP: 1,
    },
    rWave: { enabled: false, count: 2, interval: 5 },
    pWave: { enabled: false, count: 0, interval: 3 },
    customBeats: {
      enabled: false,
      repeatInterval: 10,
      beats: [],
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
                 <HeartPulse className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold text-gray-800">
                    ECG Waveform Animator
                </h1>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-1/3 xl:w-1/4">
             <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto max-h-[calc(100vh-100px)]">
                <Controls params={params} setParams={setParams} />
             </div>
          </aside>
          <section className="flex-1 min-w-0">
            <ECGDisplay params={params} />
          </section>
        </div>
      </main>
    </div>
  );
};

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number;
}

// Simple Lucide-React components for icons
const createLucideIcon = (iconName: string, iconNode: [string, any][]) => {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', size = 24, strokeWidth = 2, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {iconNode.map(([tag, attrs]) => React.createElement(tag, attrs))}
      </svg>
    )
  );
  Icon.displayName = iconName;
  return Icon;
};

const HeartPulse = createLucideIcon('HeartPulse', [
    ['path', { d: 'M22 12h-4l-3 9L9 3l-3 9H2', key: '13364y' }],
    ['path', { d: 'M12.42 12H12a2 2 0 1 0 0 4h.42a2 2 0 1 0 0-4Z', key: '109m20' }]
]);

export default App;
