import React from 'react';
import PropTypes from 'prop-types';
import "./styles.scss";
import { Grid, Image, Segment } from 'semantic-ui-react'

// Hex: &bin=hex&hexPerTile=80
// Squares: &bin=square&squareSize=64
// Styles: green.poly, green2.poly, classic.poly, classic-noborder.poly, orange.marker, scaled-circles
const SpeciesMap = ({ mapKey }) => {
  return (
    <Segment className="speciesMap">
      <Grid columns={2}>
        <Grid.Column>
          <Image fluid src={`https://api.gbif.org/v2/map/occurrence/density/0/0/0@1x.png?srs=EPSG:4326&style=classic-noborder.poly&taxonKey=${mapKey}&bin=hex&hexPerTile=75`}/>
        </Grid.Column>
        <Grid.Column>
          <Image fluid src={`https://api.gbif.org/v2/map/occurrence/density/0/1/0@1x.png?srs=EPSG:4326&style=classic-noborder.poly&taxonKey=${mapKey}&bin=hex&hexPerTile=75`} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

SpeciesMap.propTypes = {
  mapKey: PropTypes.number.isRequired
};

export default SpeciesMap;