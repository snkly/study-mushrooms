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
        <Grid>
          <Grid.Column floated='left' width={10}>
            <Link to={`/`}>
              <Header
                as='h1'
                content='Study Mushrooms'
                subheader='Search mushroom species and get data from around the web!'
                floated='left'
              />
            </Link>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <SearchBar />
          </Grid.Column>
        </Grid>
      </Segment>
    </Fragment>
  );
}

export default HeaderBar;
