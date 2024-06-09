import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, containerRef, list }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = width * 0.5625; // Mantém a proporção de 16:9
      setDimensions({ width, height });
      if(list.length > 0)
        list[0].style.height = `${height}px`
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [containerRef]);

  const opts = {
    height: dimensions.height,
    width: dimensions.width,
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      {dimensions.width && (
        <YouTube videoId={videoId} opts={opts} />
      )}
    </div>
  );
};

export default VideoPlayer;