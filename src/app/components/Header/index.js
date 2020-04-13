import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Search';
import {
  Grid,
  Header,
  Segment
  } from 'semantic-ui-react'

const HeaderBar = () => {
  return (
    <Fragment>
      <Segment>
        <Grid stackable columns='equal'>
          <Grid.Column floated='left' tablet={7} computer={9} largeScreen={11}>
            <Link to={`/`}>
              <Header
                as='h1'
                content='Study Mushrooms'
                subheader='Search mushroom species and get data from around the web!'
                floated='left'
              />
            </Link>
          </Grid.Column>
          <Grid.Column floated='right' tablet={9} computer={7} largeScreen={5}>
            <SearchBar />
          </Grid.Column>
        </Grid>
      </Segment>
    </Fragment>
  );
}

export default HeaderBar;
