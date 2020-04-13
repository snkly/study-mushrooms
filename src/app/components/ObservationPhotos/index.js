import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import _ from 'lodash';
import "./styles.scss";
import {
  Header,
  Segment
  } from 'semantic-ui-react'

const ObservationPhotos = ({photoSets, observationsCount}) => {
  let observationNum = _.toNumber(observationsCount).toLocaleString(); 
  const iNatObservationsTotal = (
    observationsCount <= 500 ? <span>Uncommon mushroom</span>
        : observationsCount > 500 && observationsCount <= 1000 ? <span>Semi-common mushroom</span> 
            : observationsCount > 1000 && observationsCount <= 1500 ? <span>Common mushroom</span>
                : observationsCount > 1500 && observationsCount < 2000 ? <span>Very common mushroom</span>
                    : <span>Highly common mushroom</span>
    );

    const observationPhotos = photoSets ? (
      photoSets.map((photoSet, i) => {
        return photoSet.photos.map((photoObj) => photoObj)
      }) 
    ) : null;

    return (
      <Fragment>
        <Segment.Group className="carouselSegment">
          <Carousel 
            className="observationCarousel"
            infiniteLoop
            autoPlay
          > 
          {
            _(observationPhotos)
              .flatten()
              .map((image) => <img src={image.url.replace("square", "large")} attr={image.attribution} key={image.id}/>)
              .value()
          }
          </Carousel>
          <Segment>
            <Header 
              as="h5"
              content={iNatObservationsTotal} 
              subheader={`iNaturalist Observations: ${observationNum}`}
              textAlign="right"
            />
          </Segment>
        </Segment.Group>
      </Fragment>
    );
};

ObservationPhotos.propTypes = {
  photoSets: PropTypes.array.isRequired,
  observationsCount: PropTypes.number.isRequired
};

export default ObservationPhotos;

