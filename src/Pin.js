/**
 *
 * Pin
 *
 */

import React from 'react';
import { Marker } from 'react-map-gl';

export class Pin extends Marker {
  render() {
    return (
      <Marker offsetLeft={-10} offsetTop={-10} {...this.props}>
        <div
          style={{
            height: 20,
            width: 20,
            backgroundColor: 'red',
            borderRadius: 10,
            textAlign: 'center'
          }}
        >
          <span>1</span>
        </div>
      </Marker>
    );
  }
}

export class Group extends React.PureComponent {
  render() {
    const {
      cluster,
      // superCluster
    } = this.props;
    // if you want to access the leaves in this cluster group
    // const leaves = superCluster.getLeaves(cluster.properties.cluster_id, 3);
    // the number of leaves in this cluster group 
    const count = cluster.properties.point_count_abbreviated;
    return (
      <div>
        <div
          style={{
            height: 20,
            width: 20,
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: 10,
            textAlign: 'center'
          }}
        >
          <span>{count}</span>
        </div>
      </div>
    );
  }
}
