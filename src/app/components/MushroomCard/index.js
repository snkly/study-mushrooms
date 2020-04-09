import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./styles.scss";
import {
  Card
  } from 'semantic-ui-react'

const MushroomCard = ({mushroom}) => {
  return (
    <Link to={`/fungi/${mushroom.id}`}>
      <Card
        image={mushroom.default_photo.square_url.replace("square", "large")}
        className="mushroomCard"
        header={mushroom.name}
        meta={mushroom.preferred_common_name ? mushroom.preferred_common_name : ""}
      />
    </Link>
  );
};

MushroomCard.propTypes = {
  mushroom: PropTypes.object.isRequired
};

export default MushroomCard;

