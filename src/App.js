import * as THREE from 'three';
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import sceneImg from './assets/slumpspace-min.png';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apollo';

import slumpLogo from './assets/slumplogo.svg';

import PostPage from './pages/PostPage';

import HomePage from './pages/HomePage';

import 'bootstrap/dist/css/bootstrap.min.css';

// import { Button } from 'bootstrap';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  let camera;
  let scene;
  let renderer;
  let isUserInteracting = false,
    lon = 0,
    lat = 0,
    phi = 0,
    theta = 0;
  const distance = 500;
  let onPointerDownPointerX = 0,
    onPointerDownPointerY = 0,
    onPointerDownLon = 0,
    onPointerDownLat = 0;

  const onDocumentMouseDown = useCallback((event) => {
    event.preventDefault();
    isUserInteracting = true;
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
  }, []);

  const onWindowResize = useCallback((event) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, []);

  const onDocumentMouseMove = useCallback((event) => {
    if (isUserInteracting) {
      lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
      lat = (onPointerDownPointerY - event.clientY) * 0.1 + onPointerDownLat;
    }
  }, []);

  const onDocumentMouseUp = useCallback(() => {
    isUserInteracting = false;
  }, []);

  const init = useCallback(() => {
    console.log('init');
    /// 3D BACKGROUND CODE
    let container, mesh;
    container = document.getElementById('container');
    if (!container) {
      throw new Error('container div missing');
    }

    camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    scene = new THREE.Scene();
    const geometry = new THREE.SphereBufferGeometry(500, 60, 40).toNonIndexed();
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);
    // Remap UVs
    const normals = geometry.attributes.normal.array;
    const uvs = geometry.attributes.uv.array;
    let i = 0;
    const l = normals.length / 3;
    for (; i < l; i++) {
      const x = normals[i * 3 + 0];
      const y = normals[i * 3 + 1];
      const z = normals[i * 3 + 2];
      let correction;
      if (i < l / 2) {
        correction =
          x === 0 && z === 0
            ? 1
            : (Math.acos(y) / Math.sqrt(x * x + z * z)) * (2 / Math.PI);
        uvs[i * 2 + 0] = x * (404 / 1920) * correction + 447 / 1920;
        uvs[i * 2 + 1] = z * (404 / 1080) * correction + 582 / 1080;
      } else {
        correction =
          x === 0 && z === 0
            ? 1
            : (Math.acos(-y) / Math.sqrt(x * x + z * z)) * (2 / Math.PI);
        uvs[i * 2 + 0] = -x * (404 / 1920) * correction + 1460 / 1920;
        uvs[i * 2 + 1] = z * (404 / 1080) * correction + 582 / 1080;
      }
    }
    geometry.rotateY(-Math.PI / 2);
    geometry.rotateZ(-Math.PI / 2);
    // geometry.rotateY(-Math.PI / 2);

    const texture = new THREE.TextureLoader().load(sceneImg);
    texture.minFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    window.addEventListener('resize', onWindowResize, false);
  }, []);

  const update = useCallback(() => {
    if (!isUserInteracting) {
      lon += 0.05;
    }

    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon - 180);
    camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
    camera.position.y = distance * Math.cos(phi);
    camera.position.z = distance * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }, []);

  const animate = useCallback(() => {
    requestAnimationFrame(animate);
    update();
  }, [update]);

  useEffect(() => {
    init();
    animate();
  }, [init, animate]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="container">
          <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <img className="loading-img" src={slumpLogo}></img>{' '}
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <a class="nav-item nav-link active" href="/">
                    Home <span class="sr-only">(current)</span>
                  </a>
                  <a class="nav-item nav-link" href="/">
                    Releases
                  </a>
                  <a class="nav-item nav-link" href="/">
                    Radio / Archives
                  </a>
                  <a class="nav-item nav-link" href="/">
                    Info
                  </a>
                </div>
              </div>
            </nav>
            <Switch>
    
            <Route exact path="/" component={HomePage} />

              <Route path="/blog/:slug" component={PostPage}/>
              
           
            </Switch>
          </div>
        </div>
      </Router>

  
    </ApolloProvider>
  );

  // return (
  //   <ApolloProvider client={client}>

  //       <div className="App">
  //         <div id="container">
  //           <div className="container">
  //             <div className="container-main">
  //               {/* <Menu></Menu> */}
  //               {/* <Button></Button> */}
  // <nav class="navbar navbar-expand-lg navbar-light bg-light">
  //   <img className="loading-img" src={slumpLogo}></img>{' '}
  //   <button
  //     class="navbar-toggler"
  //     type="button"
  //     data-toggle="collapse"
  //     data-target="#navbarNavAltMarkup"
  //     aria-controls="navbarNavAltMarkup"
  //     aria-expanded="false"
  //     aria-label="Toggle navigation"
  //   >
  //     <span class="navbar-toggler-icon"></span>
  //   </button>
  //   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
  //     <div class="navbar-nav">
  //       <a class="nav-item nav-link active" href="/">
  //         Home <span class="sr-only">(current)</span>
  //       </a>
  //       <a class="nav-item nav-link" href="/">
  //         Releases
  //       </a>
  //       <a class="nav-item nav-link" href="/">
  //         Radio / Archives
  //       </a>
  //       <a class="nav-item nav-link" href="/">
  //         Info
  //       </a>
  //     </div>
  //   </div>
  // </nav>
  //               <Routes>
  //               <Route exact path="/" component={Content}  />
  //               {/* <Route path="/blog/:slug" component={< PostPage />} exact /> */}

  //               </Routes>
  //             </div>
  //           </div>
  //           {/* <Footer></Footer> */}
  //         </div>
  //       </div>

  //   </ApolloProvider>
  // );
}

export default App;
