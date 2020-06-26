import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import "./styles.scss";
import { Container, Header, Segment, Tab } from 'semantic-ui-react'

const SpeciesInfo = ({ description }) => {
  const wordCount = _.words(description, /\b(\w+(?![^<>]*>))\b/g).length; // https://regexr.com/52j7r Grab all non-html from string
  const unwantedSectionHeaders = ["See also", "Footnotes", "Resources", "References", "External links", "Gallery", "Further reading", "Notes"];

  // Rebuild Tabs vs. Full text / Desktop, Mobile functionality
  const getSectionPanes = _.split(description, '<h2>').flatMap((descriptionText, i) => {
    const sectionContent = descriptionText.split('</h2>');

    // Get header from revision HTML string with regex, Content before '</span></h2>'
    let findHeaderText = descriptionText.match(/(?<=(">))(\w|\d|\n|[().,\-:;@#$%^&*[\]"'+–//®°⁰!?{}|`~]| )+?(?=(<\/span><\/h2>))/g);
    const header = !_.isNull(findHeaderText) ? findHeaderText.pop() : "Info";

    // Omit sections by unwanted section headers
    if (unwantedSectionHeaders.some((title) => header === title ? true : false)) return [];
    return { menuItem: header, render: () => <Tab.Pane dangerouslySetInnerHTML={{ __html: sectionContent[1] ? sectionContent[1] : sectionContent[0] }} /> }
  });

  return (
    <Fragment>
      <Header as='h3' attached='top' content='Species Information' />
      <Segment attached className="speciesInfo__container">
        {
          wordCount > 700
          ? <Tab 
              menu={{ attached: true, fluid: true, vertical: true, tabular: true }} 
              panes={getSectionPanes} 
              className="specieInfo__tab"
            />
          : <Container dangerouslySetInnerHTML={{ __html: description }} />
        }
      </Segment>
    </Fragment>
  );
};

SpeciesInfo.propTypes = {
  description: PropTypes.string.isRequired
};

export default SpeciesInfo;