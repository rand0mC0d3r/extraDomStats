import React from 'react';

const Sparkline = ({ data, width = 100, height = 20, stroke = 'black', strokeWidth = 1, tooltip = false }) => {
  if (!data || data.length === 0) return null;

  // Calculate the min and max values to normalize the data
  const min = Math.min(...data);
  const max = Math.max(...data);

  // Normalize data points to fit within the SVG dimensions
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / (max - min)) * height;
    return [x, y];
  });

  // Generate the polyline points attribute
  const polylinePoints = points.map(point => point.join(',')).join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        points={polylinePoints}
      />
      {tooltip && points.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={1}
          fill={stroke}
          onMouseOver={(e) => {
            const tooltip = document.createElement('div');
            tooltip.innerText = `Value: ${data[index]}`;
            tooltip.style.position = 'absolute';
            tooltip.style.background = '#fff';
            tooltip.style.border = '1px solid #ccc';
            tooltip.style.padding = '2px 5px';
            tooltip.style.fontSize = '12px';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.left = `${e.clientX + 5}px`;
            tooltip.style.top = `${e.clientY + 5}px`;
            tooltip.setAttribute('id', `tooltip-${index}`);
            document.body.appendChild(tooltip);
          }}
          onMouseOut={() => {
            const tooltip = document.getElementById(`tooltip-${index}`);
            if (tooltip) {
              document.body.removeChild(tooltip);
            }
          }}
        />
      ))}
    </svg>
  );
};

export default Sparkline;
