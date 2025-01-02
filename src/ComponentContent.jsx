import { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // The default

export default function ComponentContent() {
  const [domCount, setDomCount] = useState(0);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setDomCount(document.querySelectorAll('*').length);
      setStats(prev => ({ ...prev, '🧮 DOM Count': document.querySelectorAll('*').length }));

      if (performance.memory) {
        setStats(prev => ({
          ...prev,
          "🧠 Used JS Heap": performance.memory.usedJSHeapSize / 1000 / 1000,
          "🗒️ Total JS Heap": performance.memory.totalJSHeapSize,
        }));
      }

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
        padding: 10,
        background: 'rgba(255, 255, 255, 0.9)',
        color: 'black',
        fontSize: 12,
        width: 'fit-content',
        cursor: 'move',
        borderRadius: 5,
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        gap: 5
      }}>
        {Object.keys(stats).map(key => <div key={key}>{key}: {stats[key]}</div>)}
      </div>
    </Draggable>
  </>
}
