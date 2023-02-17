import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
// import { playPause } from '../assets/playPause.svg';
import PlayPause from '../assets/playPause.svg';
import 'react-h5-audio-player/lib/styles.css';

import { ReleasesItems } from '../data/data';

const ReleasesPage = () => {
  return (
    <div className="media-page">
      <div className="audio-items">
        <div className="menu-items">
          {ReleasesItems.map((item, index) => (
            <p
              key={index}
              className="menu-item"
            >
              {item.item}
            </p>
          ))}
        </div>
        <AudioPlayer
          autoPlay
          src="http://slumpsounds.online/wp-content/uploads/2023/02/SLMP_D001_-baccy-beard-nearest@exomoon.mp3"
          onPlay={(e) => console.log('onPlay')}
        />
      </div>
      <div className="photo-items">
        <div className='image-border'>
        <img className='image-item' src="http://slumpsounds.online/wp-content/uploads/2023/02/exomoon.jpg" alt="Girl in a jacket" width="450"  />


        </div>
      </div>
    </div>
  );
};

export default ReleasesPage;
