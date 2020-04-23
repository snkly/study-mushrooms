import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import "./styles.scss";
import { Card } from 'semantic-ui-react'

const MushroomCard = ({mushroom}) => {
  return (
      <Card
        as={Link}
        image={mushroom.default_photo.square_url.replace("square", "large")}
        className="mushroomCard"
        header={mushroom.name}
        meta={mushroom.preferred_common_name ?  _.upperFirst(mushroom.preferred_common_name) : ""}
        to={`/fungi/${mushroom.id}`}
      />
  );
};

MushroomCard.propTypes = {
  mushroom: PropTypes.object.isRequired
};

export default MushroomCard;

