import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import "./styles.scss";
import { Container, Header, Segment, Tab } from 'semantic-ui-react'

const SpeciesInfo = ({ description }) => {
  
  // Rebuild Tabs vs. Full text / Desktop, Mobile functionality
  // https://regexr.com/52j7r -> grab all non-html from string
  const wordCount = _.words(description, /\b(\w+(?![^<>]*>))\b/g).length;
    
  const getSectionPanes =  _.split(description, '<h2>').flatMap((descriptionText, i) => {
    // Get header from revision HTML string with regex, Content before '</span></h2>'
    let findHeaderText = descriptionText.match(/(?<=(">))(\w|\d|\n|[().,\-:;@#$%^&*[\]"'+–//®°⁰!?{}|`~]| )+?(?=(<\/span><\/h2>))/g);
    const header = !_.isNull(findHeaderText) ? findHeaderText.pop() : "Info";
    const content = descriptionText.split('</h2>');

    if (header === "See also" || header === "Footnotes" || header === "Resources" || header === "References" || header === "External links" || header === "Gallery" || header === "Further reading" || header === "Notes" ) return []; 
    //return { header: header, content: content[1] };
    return { menuItem: header, render: () => <Tab.Pane dangerouslySetInnerHTML={{ __html: content[1] ? content[1] : content[0]}}/> } 
  });

  return (
    <Fragment>
      <Header as='h3' attached='top' content='Species Information' />
      <Segment attached>
        {
          wordCount > 700 
          ? <Tab menu={{ attached: true, fluid: true, vertical: true, tabular: true}} panes={getSectionPanes} className="specieInfo"/>
          : <Container dangerouslySetInnerHTML={{ __html: description}}/>
        }
      </Segment>
    </Fragment>
  );
};

SpeciesInfo.propTypes = {
  description: PropTypes.string.isRequired
};

export default SpeciesInfo;
