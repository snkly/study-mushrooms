import React from 'react';
import PropTypes from 'prop-types';
import "./styles.scss";
import { Grid, Image, Segment } from 'semantic-ui-react';

const SpeciesMap = ({ mapKey }) => {
  const gbifMap = (z, x, y) => (
    <Image 
      fluid
      src={mapKey ? `https://api.gbif.org/v2/map/occurrence/density/${z}/${x}/${y}@1x.png?srs=EPSG:4326&style=classic-noborder.poly&taxonKey=${mapKey}&bin=hex&hexPerTile=75` : null }
      onError={(e) => {e.target.onerror = null; e.target.src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="} }
    />  
  )

  return (
    <Segment className="speciesMap">
      <Grid columns={2}>
        <Grid.Column>
          {gbifMap(0, 0, 0)}
        </Grid.Column>
        <Grid.Column>
          {gbifMap(0, 1, 0)}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

SpeciesMap.propTypes = {
  mapKey: PropTypes.number.isRequired
};

export default SpeciesMap;