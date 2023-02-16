import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
// import { playPause } from '../assets/playPause.svg';
import PlayPause from '../assets/playPause.svg';
import 'react-h5-audio-player/lib/styles.css';

import { ReleasesItems } from '../data/data';

const ReleasesPage = () => {
  return (
    <div className="media-page">
      <div className="media-widget">
        <div className="audio-items">
          <div className="player-area">
            {/* <AudioPlayer
              src="https://file-examples.com/storage/fe1aa0c9d563ea1e4a1fd34/2017/11/file_example_MP3_700KB.mp3"
              CustomIcons={{
                play: PlayPause,
              }} */}
            {/* /> */}
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

            <AudioPlayer
              autoPlay
              src="https://file-examples.com/storage/fe1aa0c9d563ea1e4a1fd34/2017/11/file_example_MP3_700KB.mp3"
              onPlay={(e) => console.log('onPlay')}
          
            />
          </div>
        </div>
        <div className="photo-items"></div>
      </div>
    </div>
  );
};

export default ReleasesPage;
