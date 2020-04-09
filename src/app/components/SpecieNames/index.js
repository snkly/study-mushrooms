import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import "./styles.scss";
import {
  Header,
  List,
  Segment
  } from 'semantic-ui-react'

const SpecieNames = ({names}) => {
  let getNameByType = (validity, locale) => {
    return names ? (
      names.map((name) => name.is_valid === validity &&  name.locale === locale ? _.upperFirst(name.name) : null )
    ) : null;
  }
  
  return (
    <Fragment>
      <Header as='h3' attached='top' content='Names' />
      <Segment attached className="specieNames">
        <h5>Taxon Names</h5>
        <List items={getNameByType(true, "sci")} />
        <h5>Common Names</h5>
        <List items={getNameByType(true, "en")} />
        <h5>Taxon names (old)</h5>
        <List items={getNameByType(false, "sci")} />
      </Segment>
    </Fragment>
  );
};

SpecieNames.propTypes = {
  names: PropTypes.array.isRequired
};

export default SpecieNames;