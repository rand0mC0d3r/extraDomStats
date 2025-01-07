import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // The default
import Sparkline from '../Sparkline';
import { functionRelevantElements } from '../utils';
import GithubPage from './GithubPage.jsx';

const intervals = [
  { label: '1s', value: 1000 },
  { label: '2.5s', value: 2500 },
  { label: '5s', value: 5000 },
]

export default function ComponentContent() {
  const [stats2, setStats2] = useState({});
  const [statsHistory, setStatsHistory] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [intervalTimer, setIntervalTimer] = useState(1500);

  const constructDetails = useCallback(() => {
    const loadTime = performance.timing ? (performance.timing.loadEventEnd - performance.timing.navigationStart) / 1000 : false;
    const jsFiles = document.querySelectorAll('script[src]').length;

    const resources = performance.getEntriesByType('resource');
    const totalDownloadTime = resources.reduce((acc, resource) => acc + (resource.responseEnd - resource.responseStart), 0);
    const totalSize = resources.reduce((acc, resource) => acc + resource.transferSize, 0);
    const avgDownloadSpeed = totalSize / totalDownloadTime || 0;

    setStats2(prev => ({
      ...prev,
      'dom.count': {
        icon: '🧮',
        label: 'DOM Count',
        value: functionRelevantElements().length,
        unit: '',
      },
      'js.heap.used': {
        icon: '🧠',
        label: 'Used JS Heap',
        value: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1000 / 1000 * 1000) / 1000 : 0,
        unit: 'MB',
      },
      'js.heap.total': {
        icon: '🧠',
        label: 'Total JS Heap',
        value: performance.memory ? Math.round(performance.memory.totalJSHeapSize / 1000 / 1000 * 1000) / 1000 : 0,
        unit: 'MB',
      },
      // 'page.load.time': {
      //   icon: '⏱️',
      //   label: 'Page Load Time',
      //   value: loadTime * 1000,
      //   unit: 'ms',
      // },
      // 'round.trip.time': {
      //   icon: '🔄',
      //   label: 'Round Trip Time',
      //   value: navigator.connection.rtt,
      //   unit: 'ms',
      // },
      // 'js.files.loaded': {
      //   icon: '📜',
      //   label: 'JS Files Loaded',
      //   value: jsFiles,
      //   unit: '',
      // },
      'avg.speed': {
        icon: '⚡',
        label: 'Avg Speed',
        value: Math.round(avgDownloadSpeed * 1000) / 1000,
        unit: 'KB/s',
      },
    }));

  }, []);

  useEffect(() => {
    let interval = null;
    let idleCallbackId = null;

    const scheduleConstructDetails = () => {
      if (idleCallbackId) {
        cancelIdleCallback(idleCallbackId); // Ensure previous callback is canceled
      }
      idleCallbackId = requestIdleCallback(() => {
        constructDetails();
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (interval) {
          clearInterval(interval);
          interval = null; // Avoid overlapping intervals
        }
        if (idleCallbackId) {
          cancelIdleCallback(idleCallbackId);
        }
      } else if (!interval) { // Only set a new interval if not already set
        interval = setInterval(scheduleConstructDetails, intervalTimer);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial setup
    if (!interval) {
      interval = setInterval(scheduleConstructDetails, intervalTimer);
      console.log('Initial setup');
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      if (idleCallbackId) {
        cancelIdleCallback(idleCallbackId);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [intervalTimer, constructDetails]);


  useEffect(() => {
    if (Object.keys(stats2).length) {
      setStatsHistory(prev => {
        if (prev.length >= 60) {
          return [...prev.slice(1), stats2];
        } else {
          return [...prev, stats2];
        }
      });
    }
  }, [stats2])

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

  if (Object.keys(stats2).length === 0) return null;

  return <>
    <GithubPage />
    {/* <Draggable
      position={position}
      grid={[10, 10]}
      scale={1}
      onStop={handleStop}
      on
    >
      <Box
        gap={2}
        p={1}
        sx={{
          bgcolor: 'background.default',
          borderRadius: 2,
          borderColor: 'divider',
          border: 1,
        }}
        display={'flex'}
        flexDirection={'column'}
        style={{
          pointerEvents: 'auto',
          width: 'fit-content',
          cursor: 'move',
        }}
      >
        {Object.entries(stats2).map(([key, entry], i) => <Box
          key={key}
          display={'flex'}
          justifyContent={'space-between'}
          gap={2}
          alignItems={'center'}
          px={2}
          py={1}
          sx={{
            borderRadius: 2,
          }}
          style={{
            border: '1px solid #00000022',
            background: `rgba(255, 255, 255, ${i % 2 === 0 ? '0.3' : '0.5'} )`,
          }}>
          <Typography variant='caption'>{entry.icon}</Typography>
          <Typography variant='caption' style={{ width: '125px' }}>{entry.label}:</Typography>

          <Sparkline
            data={statsHistory?.map(stat => stat[key].value).filter(Number)}
            width={100} height={20} stroke="blue" strokeWidth={2} tooltip={false} />

          <Typography variant='caption' style={{ width: '85px', textAlign: 'right' }}>{entry.value} {entry.unit}</Typography>

          <Typography variant='caption' style={{ width: '85px', textAlign: 'right' }}>
            {Math.round(statsHistory?.map(stat => stat[key].value).reduce((acc, val) => acc + val, 0) / statsHistory.length)} {entry.unit}
          </Typography>
        </Box>)}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {intervals.map(({ label, value }) => <Button
            variant='contained'
            color="primary"
            size="small"
            key={label}
            onClick={() => setIntervalTimer(value)}
          >
            {label}
          </Button>)}
        </div>
      </Box>
    </Draggable> */}
  </>
}
