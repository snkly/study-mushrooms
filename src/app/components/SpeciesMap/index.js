import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import "./styles.scss";
import {Dimmer, Grid, Header, Image, Loader, Segment} from 'semantic-ui-react';

const SpeciesMap = ({mapKey, loading, mapCapabilities}) => {
  const gbifMap = (z, x, y) => (
    <Image 
      fluid
      src={mapKey ? `https://api.gbif.org/v2/map/occurrence/density/${z}/${x}/${y}@1x.png?srs=EPSG:4326&style=classic-noborder.poly&taxonKey=${mapKey}&bin=hex&hexPerTile=75` : null }
      onError={(e) => {e.target.onerror = null; e.target.src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="} }
    />  
  )
 
  return (
    <Segment.Group className="speciesMap">
      {!loading ? (
        <>
          <Segment attached>
            <Grid className="mapGrid" columns={2} >
              <Grid.Column>
                {gbifMap(0, 0, 0)}
              </Grid.Column>
              <Grid.Column>
                {gbifMap(0, 1, 0)}
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment attached='bottom'>
            <Header 
              as="h5"
              content={`Total Occurrences: ${_.toNumber(mapCapabilities.total).toLocaleString()} `} 
              subheader={`Records from ${mapCapabilities.minYear}-${mapCapabilities.maxYear}`}
              textAlign="right"
            />
          </Segment>
        </>
      ) : (<Dimmer active inverted className="mapLoader"><Loader inline size="small" content="Loading Map"/></Dimmer>)
      }
    </Segment.Group>
  );
}

SpeciesMap.propTypes = {
  mapKey: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  mapCapabilities: PropTypes.object.isRequired,
};

export default SpeciesMap;