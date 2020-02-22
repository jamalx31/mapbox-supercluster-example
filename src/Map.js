/**
 *
 * Map
 *
 */

import React from 'react';
import ReactMapGL from 'react-map-gl';
import { generateRandomPoints } from 'generate-random-points';
import { Pin, Group } from './Pin';
import Cluster from './Cluster';

const options = {
  centerPosition: {
    longitude: -87.072768, latitude: 20.6331904
  },
  radius: 5000000,
  count: 100
}

// generate random points to draw on map
let points = generateRandomPoints(options.centerPosition, options.radius, options.count)

const TOKEN = ''; // Set your mapbox token here

class Map extends React.Component {

  state = {
    viewport: {
      width: 500,
      height: 500,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 12,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  onViewportChange = (viewport) => {
    this.setState({ ...this.state.viewport, viewport })
  }

  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        ref={ref => (this.mapRef = ref)}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={this.onViewportChange}
      >
        {this.mapRef && (
          <Cluster
            map={this.mapRef.getMap()}
            radius={20}
            extent={512}
            nodeSize={40}
            element={clusterProps => (
              <Group onViewportChange={this.onViewportChange} {...clusterProps} />
            )}
          >
            {/* 
              each Marker MUST have a 
              uniqe key other wise cluster will not rerender on change
             */}
            {points.map((point, i) => (
              <Pin
                key={point.longitude + point.latitude + i}
                longitude={point.longitude}
                latitude={point.latitude}
              />
            ))}
          </Cluster>
        )}
      </ReactMapGL>
    );
  }
}

export default Map;
