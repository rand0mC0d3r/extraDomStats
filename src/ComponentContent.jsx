import { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // The default

export default function ComponentContent() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {

      const loadTime = performance.timing ? (performance.timing.loadEventEnd - performance.timing.navigationStart) / 1000 : false;
      const jsFiles = document.querySelectorAll('script[src]').length;
      // const eventListeners = getEventListeners(document).length || false

      setStats(prev => ({
        ...prev,
        '🧮 DOM Count': document.querySelectorAll('*').length,
        "🧠 Used JS Heap": performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1000 / 1000 * 1000) / 1000 : false,
        "🗒️ Total JS Heap": performance.memory ? performance.memory.totalJSHeapSize : false,
        "⏱️ Page Load Time": loadTime,
        // "🔌 Event Listeners": eventListeners,
        "📡 Network Type": navigator.connection.effectiveType,
        "🔄 Round Trip Time": navigator.connection.rtt,
        "📜 JS Files Loaded": jsFiles
        ,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  return <>
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[25, 25]}
      scale={1}
    >
      <div style={{
        pointerEvents: 'auto',
        padding: 4,
        background: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
        fontSize: 12,
        width: 'fit-content',
        cursor: 'move',
        borderRadius: 5,
        border: '1px solid #00000088',
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}>
        {Object.keys(stats).map((key, i) => <div
          key={key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 10,
            padding: '2px 8px',
            background: i % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
          }}>
          <div>{key}:</div>
          <div>{stats[key]}</div>
        </div>)}
      </div>
    </Draggable>
  </>
}
