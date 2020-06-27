import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as actions from '../../actions/fungiActions';
import SpeciesCard from "../../components/SpeciesCard";
import SpeciesInfo from "../../components/SpeciesInfo";
import SpeciesMap from "../../components/SpeciesMap";
import SpecieNames from "../../components/SpecieNames";
import SpecieTaxon from "../../components/SpecieTaxon";
import MycoCharacteristics from "../../components/MycoCharacteristics";
import ObservationPhotos from "../../components/ObservationPhotos";
import {Dimmer, Grid, Loader, Segment} from 'semantic-ui-react';
import "./styles.scss";

class Fungi extends Component {

  componentDidMount() {
    this.props.actions.fetchSpecie(this.props.match.params.fungi);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.match.params.fungi !== this.props.match.params.fungi) {
      this.props.actions.fetchSpecie(nextProps.match.params.fungi);
    }
  }

  render() {
    const {fungiObject, specieObject, gbifObject} = this.props;

    return (
      <Segment basic className='speciesContainer'>
        {!fungiObject.loading && !specieObject.loading ? (
          <Grid stackable>
            <Grid.Row computer={2}>
              <Grid.Column computer={6}>
                <SpeciesCard 
                  name={fungiObject.fungi.name}
                  commonName={fungiObject.fungi.preferred_common_name}
                  image={fungiObject.fungi.default_photo.square_url.replace('square', 'large')}
                  description={specieObject.specie.descriptionShort}
                  loadingGBIF={gbifObject.loading}
                  occurrenceTotal={gbifObject.data.mapCapabilities.total}
                />
              </Grid.Column>
              <Grid.Column computer={10}>
                <ObservationPhotos
                  photoSets={fungiObject.fungi.observationPhotos}
                  observationsCount={fungiObject.fungi.observations_count}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row computer={2} reversed='mobile'>
              <Grid.Column computer={12}>
                <SpeciesInfo
                  description={specieObject.specie.description}
                />
                <SpeciesMap 
                  mapKey={gbifObject.data.species.key} 
                  loading={gbifObject.loading}
                  mapCapabilities={gbifObject.data.mapCapabilities}
                />  
              </Grid.Column>
              <Grid.Column computer={4}>
                <MycoCharacteristics 
                  hymeniumType={specieObject.specie.hymeniumType}
                  hymenium={specieObject.specie.whichGills}
                  hymenium2= {specieObject.specie.whichGills2}
                  cap={specieObject.specie.capShape}
                  cap2={specieObject.specie.capShape2}
                  stipe={specieObject.specie.stipeCharacter}
                  stipe2={specieObject.specie.stipeCharacter2}
                  sporePrint={specieObject.specie.sporePrintColor}
                  sporePrint2={specieObject.specie.sporePrintColor2}
                  ecologicalType={specieObject.specie.ecologicalType}
                  ecologicalType2={specieObject.specie.ecologicalType2}
                  edibility={specieObject.specie.howEdible}
                  edibility2={specieObject.specie.howEdible2}
                />
                <SpecieTaxon taxonomyData={specieObject.specie.taxonomyData} />
                <SpecieNames names={fungiObject.fungi.names} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (<Dimmer active inverted><Loader size="large" content="Loading" /></Dimmer>)}
      </Segment>
    );
  }
}

Fungi.propTypes = {
  fungiObject: PropTypes.object.isRequired,
  specieObject: PropTypes.object.isRequired,
  gbifObject: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    fungiObject: state.fungiReducer.fungiObject,
    specieObject: state.fungiReducer.specieObject,
    gbifObject: state.fungiReducer.gbifObject
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

const FungiContainer = connect(mapStateToProps, mapDispatchToProps)(Fungi);

export default withRouter(FungiContainer);
