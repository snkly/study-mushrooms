import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import "./styles.scss";
import { Card } from 'semantic-ui-react'

const SpeciesCard = ({name, commonName, image, description, occurrenceTotal, loadingGBIF}) => {
  // Placeholder "popularity score" for now
  console.log(loadingGBIF);
  const speciesPopularity = loadingGBIF ? "" :
      _.inRange(occurrenceTotal, 1000) ? "Legendary"
        : _.inRange(occurrenceTotal, 1000, 2500) ? "Rare" 
            : _.inRange(occurrenceTotal, 2500, 5000) ? "Uncommon"
                : _.inRange(occurrenceTotal, 5000, 10000) ? "Common"
                  : _.inRange(occurrenceTotal, 10000, 100000) ? "Very Common (widely distributed)" : "";

  return (
    <Card
      className='speciesCard'
      image={image}
      header={name}
      meta={_.startCase(commonName)}
      description={_.upperFirst(description)}
      extra={speciesPopularity}
      fluid
    />
  );
};

SpeciesCard.propTypes = {
  name: PropTypes.string.isRequired,
  commonName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired 
};

export default SpeciesCard;