import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import "./styles.scss";
import { Card } from 'semantic-ui-react'

const SpeciesCard = ({name, commonName, image, description}) => {
  return (
    <Card
      className='speciesCard'
      image={image}
      header={{content: name}}
      meta={_.startCase(commonName)}
      description={_.upperFirst(description)}
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