import { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // The default
import Sparkline from './Sparkline';

export default function ComponentContent() {
  const [stats, setStats] = useState({});
  const [statsHistory, setStatsHistory] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [intervalTimer, setIntervalTimer] = useState(1000);

  useEffect(() => {
    const interval = setInterval(() => {

      const loadTime = performance.timing ? (performance.timing.loadEventEnd - performance.timing.navigationStart) / 1000 : false;
      const jsFiles = document.querySelectorAll('script[src]').length;

      setStats(prev => ({
        ...prev,
        '🧮 DOM Count': document.querySelectorAll(':not(#crx-root):not(#crx-root *)').length,
        "🧠 Used JS Heap": performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1000 / 1000 * 1000) / 1000 : false,
        "🗒️ Total JS Heap": performance.memory ? Math.round(performance.memory.totalJSHeapSize / 1000 / 1000 * 1000) / 1000 : false,
        "⏱️ Page Load Time": loadTime,
        "🔄 Round Trip Time": navigator.connection.rtt,
        "📜 JS Files Loaded": jsFiles
        ,
      }));
    }, intervalTimer);

    return () => clearInterval(interval);
  }, [intervalTimer]);

  useEffect(() => {
    if (Object.keys(stats).length) {
      setStatsHistory(prev => {
        if (prev.length >= 60) {
          return [...prev.slice(1), stats];
        } else {
          return [...prev, stats];
        }
      });
    }
  }, [stats])

  useEffect(() => {
    const localStoragePosition = localStorage.getItem('stats-position');
    if (localStoragePosition) {
      setPosition(JSON.parse(localStoragePosition));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stats-position', JSON.stringify(position));
  }, [position]);

  const handleStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  }

  if (Object.keys(stats).length === 0) return null;

  return <>
    <Draggable
      position={position}
      grid={[10, 10]}
      scale={1}
      onStop={handleStop}
      on
    >
      <div style={{
        pointerEvents: 'auto',
        padding: 4,
        background: '#14539aaf',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(5px)',
        color: 'black',
        fontSize: 11,
        width: 'fit-content',
        cursor: 'move',
        fontFamily: 'Helvetica, Arial, sans-serif',
        borderRadius: 5,
        border: '1px solid #00000088',
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }}>
        {Object.keys(stats).map((key, i) => <div
          key={key}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 10,
            alignItems: 'center',
            padding: '2px 8px',
            borderRadius: 5,
            background: `rgba(255, 255, 255, ${i % 2 === 0 ? '0.3' : '0.5'} )`,
          }}>
          <div style={{ width: '125px' }}>{key}:</div>

          <Sparkline
            data={statsHistory.map(stat => stat[key]).filter(Number)}
            width={100} height={20} stroke="blue" strokeWidth={2} tooltip={true} />

          <div style={{ width: '50px', textAlign: 'right' }}>{stats[key]}</div>
          <div style={{ width: '50px', textAlign: 'right' }}>
            {Math.round(statsHistory.map(stat => stat[key]).reduce((acc, val) => acc + val, 0) / statsHistory.length)}
          </div>

        </div>)}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={() => setIntervalTimer(500)}>0.5s</button>
          <button onClick={() => setIntervalTimer(1000)}>1s</button>
          <button onClick={() => setIntervalTimer(5000)}>5s</button>
        </div>
      </div>
    </Draggable>
  </>
}
