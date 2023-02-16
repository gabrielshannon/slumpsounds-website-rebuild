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
        <div className="menu">
          <ul className="menu-items">
            {ReleasesItems.map((item, index) => (
              <li
                key={index}
                // onClick={() => handleDrill(index)}
                className="menu-item"
              >
                {item.item}
              </li>
            ))}
          </ul>
          <div className="player-area">
          <AudioPlayer
            autoPlay
            src="https://file-examples.com/storage/fe1aa0c9d563ea1e4a1fd34/2017/11/file_example_MP3_700KB.mp3"
            onPlay={(e) => console.log('onPlay')}
          />
        </div>
        </div>
 
      </div>
      <div className="photo-items"></div>
    </div>
  );
};

export default ReleasesPage;
