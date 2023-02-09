import React from 'react';
// import './MediaComponent.css';
import YouTube from 'react-youtube';

import { mediaItems } from '../data/data';

export const MediaPage = () => {
  return (
    <div className="media-page">
    <div className='menu'>
    <ul className='menu-items'>
        {mediaItems.map((item, index) => (
          <li
            key={index}
            // onClick={() => handleDrill(index)}
            className="menu-item"
          >
            {item.item}
          </li>
        ))}
      </ul>
    </div>
  
      <div>
        <h3 className="video-title">Slump Media</h3>
        <YouTube
          videoId={'vzHEWLxGIig'}
          // onReady={(event) => this._onReady(event)}
        />
      </div>
    </div>
  );
};

export default MediaPage;

// class MediaComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   _onReady(event) {
//     event.target.playVideo();
//     this.setState({
//       myTitle: event.target.videoTitle,
//     });
//   }

//   render() {
//     const opts = {
//       height: '450',
//       width: '650',
//       playerVars: {
//         autoplay: 1,
//       },
//     };

//     // const activeTitle = this.state.myTitle;

//     return (
//   <div className="media-area">
//     <div className="video-box">
//       <div className="video-title">Slump Media</div>
//       <YouTube
//         videoId={'vzHEWLxGIig'}
//         opts={opts}
//         onReady={(event) => this._onReady(event)}
//       />
//     </div>
//     <div className="media-description-area">
//       {/* {this.props.activeDescription} */}
//       some description
//     </div>
//   </div>
//     );
//   }
// }

// export default MediaComponent;
