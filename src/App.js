import * as THREE from 'three';
import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';
import client from './lib/apollo';
import 'bootstrap/dist/css/bootstrap.min.css';

import sceneImg from './assets/slumpspace-min.png';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ReleasesPage from './pages/ReleasesPage';
import InfoPage from './pages/InfoPage';
import PostPage from './pages/PostPage';

import './App.css';
import './PlayerApp.css';
import './Components.css';

import './HomePage.css';

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
            <Navbar></Navbar>
            <div className="outer-page">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/releases" component={ReleasesPage} />
                <Route path="/info" component={InfoPage} />
 
                <Route path="/blog/:slug" component={PostPage} />
              </Switch>
              <Footer></Footer>
            </div>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
