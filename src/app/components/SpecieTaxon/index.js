import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import "./styles.scss";
import {
  Header,
  List,
  Segment
  } from 'semantic-ui-react'

const SpecieTaxon = ({taxonomyData}) => {
  let margin = 0;
  // Taxon rank, Taxon name, Taxon common name
  const taxonomyTree = taxonomyData ? ( 
    taxonomyData.map((taxon) => {
      const { rank, name, names, id } = taxon; 
      // Find "true" common name
      const getCommonTaxonName = names && rank != "phylum" && rank != "species" ? (
        _.find(names, name => name.is_valid === true &&  name.locale == "en" && !_.includes(name.name, name))
      ) : null;

      margin += 10;
      return <List.Item style={{marginLeft: margin}} key={id}><strong>{rank}</strong> {name} <br/>{getCommonTaxonName ? `(${getCommonTaxonName.name})` : ''}</List.Item>
    })
  ) : null;
  
  return (
    <Fragment>
      <Header as='h3' attached='top' content='Taxonomy' />
      <Segment attached>
        <List className="taxonomyTree">
          {taxonomyTree}
        </List>
      </Segment>
    </Fragment>
  );
};

SpecieTaxon.propTypes = {
  taxonomyData: PropTypes.array.isRequired
};

export default SpecieTaxon;