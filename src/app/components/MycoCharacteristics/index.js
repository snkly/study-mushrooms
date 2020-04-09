import React, { Fragment } from 'react';
//import PropTypes from 'prop-types';
import _ from 'lodash';
import "./styles.scss";
import {
  Header,
  Item,
  Segment
} from 'semantic-ui-react'

const MycoCharacteristics = ({ cap, cap2, hymeniumType, hymenium, hymenium2, stipe, stipe2, sporePrint, sporePrint2, ecologicalType, ecologicalType2, edibility, edibility2 }) => {
  // Cheap data check
  if (_.isNil(cap) && _.isNil(hymeniumType) && _.isNil(stipe) && _.isNil(sporePrint)) return false;

  const checkMycoCharacteristic = (charA, charB) => {
    return charA ? (
      charA && charB ? true : false
    ) : null;
  }

  const items = [
    {
      childKey: 0,
      description: { content: 'Cap is ', as: 'span' },
      content: checkMycoCharacteristic(cap, cap2) ? `${cap} and ${cap2}` : `${cap}`
    },
    {
        childKey: 1,
        description: { content: 'Hymenium type: ', as: 'span' },
        content: `${hymeniumType}`
    },
    {
        childKey: 2,
        description: { content: 'Hymenium is ', as: 'span' },
        content: checkMycoCharacteristic(hymenium, hymenium2) ? `${hymenium} and ${hymenium2}` : `${hymenium}`
    },
    {
        childKey: 3,
        description: { content: 'Stipe: ', as: 'span' },
        content: checkMycoCharacteristic(stipe, stipe2) ? `${stipe} and ${stipe2}` : `${stipe}`
    },
    {
        childKey: 4,
        description: { content: 'Spore print is ', as: 'span' },
        content: checkMycoCharacteristic(sporePrint, sporePrint2) ? `${sporePrint} and ${sporePrint2}` : `${sporePrint}`
    },
    {
        childKey: 5,
        description: { content: 'Ecology is ', as: 'span' },
        content: checkMycoCharacteristic(ecologicalType, ecologicalType2) ? `${ecologicalType} and ${ecologicalType2}` : `${ecologicalType}`
    },
    {
        childKey: 6,
        description: { content: 'Edibility: ', as: 'span' },
        content: checkMycoCharacteristic(edibility, edibility2) ? `${edibility} and ${edibility2}` : `${edibility}`
    }
  ];
  
  return (
    <Fragment>
      <Header as="h3" attached="top" content="Mycological Characteristics" />
      <Segment attached>
        <Item.Group className="mycoCharacteristicsGroup" items={items} />
      </Segment>
    </Fragment>
  );
};

/*MycoCharacteristics.propTypes = {
    //mushroom: PropTypes.object.isRequired
};*/

export default MycoCharacteristics;

