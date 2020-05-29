import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as actions from '../../actions/fungiActions';
import _ from 'lodash';
import MushroomCard from "../../components/MushroomCard";
import "./styles.scss";
import { Card, Dimmer, Loader, Segment } from 'semantic-ui-react';

class FungiList extends Component {

  componentDidMount() {
    this.props.actions.fetchFungiList();
  }

  render() {
    const { fungiList } = this.props;
    return (
      <Fragment>
        <Segment>
          <Card.Group 
            itemsPerRow={5}
            className="fungiList"
            fluid
            stackable
          >
          {!fungiList.loading 
            ? _.shuffle(fungiList.mushrooms).map(mushroom => <MushroomCard key={mushroom.id} mushroom={mushroom}/>)
            : (<Segment basic><Dimmer active inverted className="loading"><Loader inline size="large" content="Loading"/></Dimmer></Segment>)
          } 
          </Card.Group>
        </Segment>
      </Fragment>
    );
  }
}


FungiList.propTypes = {
  fungiList: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    fungiList: state.fungiReducer.fungiList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

const FungiListContainer = connect(mapStateToProps, mapDispatchToProps)(FungiList);

export default withRouter(FungiListContainer);
