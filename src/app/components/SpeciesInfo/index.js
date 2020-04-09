import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import "./styles.scss";
import {
  Header,
  Segment,
  Tab
  } from 'semantic-ui-react'

const SpeciesInfo = ({description, observationsCount, synonymousTaxonIds, ancestory, wikiUrl }) => {
    const splitDescription = _.split(description, '<h2>');

    const getSectionPanes = splitDescription.map((descriptionText, i) => {
      // Get header from revision HTML string with regex, Content before '</span></h2>'
      let findHeaderText = descriptionText.match(/(?<=(">))(\w|\d|\n|[().,\-:;@#$%^&*[\]"'+–//®°⁰!?{}|`~]| )+?(?=(<\/span><\/h2>))/g);
      const header = !_.isNull(findHeaderText) ? findHeaderText.pop() : "Info";
      const content = descriptionText.split('</h2>');
      
      if (header === "See also" || header === "Footnotes" || header === "Resources" || header === "References" || header === "External links" || header === "Gallery" || header === "Further reading" || header === "Notes" ) return {}; 
      return { menuItem: header, render: () => <Tab.Pane dangerouslySetInnerHTML={{ __html: content[1] ? content[1] : content[0]}}/> } 
    });
    
    return (
      <Fragment>
        <Header as='h3' attached='top' content='Species Information' />
        <Segment attached>
          <Tab menu={{ attached: true, fluid: true, vertical: true, tabular: true}} panes={getSectionPanes} className="specieInfo"/>
        </Segment>
      </Fragment>
    );
};

SpeciesInfo.propTypes = {
  description: PropTypes.string.isRequired
};

export default SpeciesInfo;

