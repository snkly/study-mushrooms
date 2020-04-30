import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import _ from 'lodash';
import "./styles.scss";
import {Header, Segment} from 'semantic-ui-react'

const ObservationPhotos = ({photoSets, observationsCount}) => {
  let observationNum = _.toNumber(observationsCount).toLocaleString();

  const observationPhotos = photoSets ? (
    photoSets.map((photoSet, i) => {
      return photoSet.photos.map((photoObj) => photoObj)
    }) 
  ) : null;

  return (
    <Segment.Group className="carouselSegment">
      <Carousel 
        className="observationCarousel"
        infiniteLoop
        autoPlay>
        {_(observationPhotos)
            .flatten()
            .map((image) => <img src={image.url.replace("square", "large")} attr={image.attribution} key={image.id}/>)
            .value()
        }
      </Carousel>
      <Segment>
        <Header 
          as="h5"
          content="iNaturalist Observation Photos" 
          subheader={`Total observations: ${observationNum}`}
          textAlign="right"
        />
      </Segment>
    </Segment.Group>
  );
};

ObservationPhotos.propTypes = {
  photoSets: PropTypes.array.isRequired
};

export default ObservationPhotos;

