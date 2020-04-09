import {iNat, handpickedMushroomIds, formatWikiRevision } from "../../utils/config";
import {
  FETCH_FUNGI_REQUEST,
  FETCH_FUNGI_SUCCESS,
  FETCH_FUNGI_FAILURE,
  FETCH_SPECIE_REQUEST,
  FETCH_SPECIE_SUCCESS,
  FETCH_SPECIE_FAILURE,
  FUNGI_LIST_REQUEST,
  FUNGI_LIST_SUCCESS,
  FUNGI_LIST_FAILURE
  } from "../actions";

const axios = require('axios');
const _ = require('lodash');

export function fungiRequest() {
  return {
    type: FETCH_FUNGI_REQUEST
  }
}

export function fungiSuccess(data) {
  return {
    type: FETCH_FUNGI_SUCCESS,
    payload: data
  }
}

export function fungiFailure(error) {
  return {
    type: FETCH_FUNGI_FAILURE,
    payload: error
  }
}

export function specieRequest() {
  return {
    type: FETCH_SPECIE_REQUEST
  }
}

export function specieSuccess(data) {
  return {
    type: FETCH_SPECIE_SUCCESS,
    payload: data
  }
}

export function specieFailure(error) {
  return {
    type: FETCH_SPECIE_FAILURE,
    payload: error
  }
}

export function fungiListRequest() {
  return {
      type: FUNGI_LIST_REQUEST
  }
}

export function fungiListSuccess(data) {
  return {
      type: FUNGI_LIST_SUCCESS,
      payload: data
  }
}

export function fungiListFailure(error) {
  return {
      type: FUNGI_LIST_FAILURE,
      payload: error
  }
}

export function fetchFungiList() {
  return async function (dispatch) {
    dispatch(fungiListRequest());  
    return await iNat.get('taxa', {
      params: {
        id: handpickedMushroomIds
      }}).then(response => dispatch(fungiListSuccess(response.data.results))
    ).catch(error => dispatch(fungiListFailure(error)));
  }
}

// Get species info from iNat using 
export function fetchSpecie(id) {
  return async function (dispatch) {
    dispatch(fungiRequest());
    return await axios.all([
      iNat.get('taxa', {
        params: {
          id: id,
          all_names: true,
          locale: 'en'
        }
      }),
      iNat.get('observations', {
        params: {
          taxon_id: id,
          photos: true,
          iconic_taxa: 'Fungi',
          rank: 'species',
          order_by: 'votes',
          locale: 'en',
          quality_grade: 'research',
          reviewed: true
        },
        timeout: 1000 * 5,
      })
    ]).then(axios.spread((taxaResults, observationResults) => {
        const filteredObservationPhotos = { 
          observationPhotos: _.remove(observationResults.data.results, observation => {
            const result = observation.photos.map((photo) => {
              return (photo.original_dimensions.width/photo.original_dimensions.height > 1) ? true : false;
            })
            return _.includes(result, false) ? false : true ;
          }
        )};

        const speciesData = _.merge(taxaResults.data.results[0], filteredObservationPhotos);

        dispatch(fungiSuccess(speciesData));
        dispatch(fetchSpeciesDetails(taxaResults.data.results[0].name, taxaResults.data.results[0].ancestor_ids));
    })).catch(error => dispatch(fungiFailure(error))); 
  }
}

export function fetchSpeciesDetails(name, ancestorIds) {
  return async function (dispatch) {
    dispatch(specieRequest());
    return await axios.all([
      axios.get('https://en.wikipedia.org/w/api.php', {
        //https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Amanita%20muscaria
        params: {
          format: 'json',
          action: 'query',
          prop: 'extracts',
          //exintro: true,
          //explaintext: true,
          redirects: 1,
          origin: '*',
          //titles: 'Agaricus subrutilescens'
          titles: name
        }
      }),
      axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          format: 'json',
          action: 'query',
          prop: 'revisions',
          rvprop: 'content',
          rvsection: 0,
          origin: '*',
          //titles: 'Agaricus subrutilescens'
          titles: name
        }
      }),
      axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          format: 'json',
          action: 'query',
          prop: 'description',
          origin: '*',
          //titles: 'Agaricus subrutilescens'
          titles: name
        }
      }),
      iNat.get('taxa', {
          params: {
            id: ancestorIds,
            all_names: true,
            locale: 'en',
            rank: ['phylum', 'subphylum', 'superclass', 'class', 'subclass', 'superorder', 'order', 'suborder', 'family', 'genus', 'genushybrid', 'species', 'hybrid', 'subspecies']
          }
        }),
    ]).then(axios.spread((descriptionResults, revisionResults, shortDescriptionResults, taxaResults, s) => {

      // Find current mushroom Wiki ID
      let wikiId;
      for (var key in descriptionResults.data.query.pages) { wikiId = key; }

      // Get specie description from Wikipedia 
      const mushroomDescription = {
        description: descriptionResults.data.query.pages[wikiId].extract
      }

      // Get specie mycological characteristics from Wikipedia revision data
      const mycologicalData = _.isArray(revisionResults.data.query.redirects) 
        ? revisionResults.query.pages[wikiId].title 
        : formatWikiRevision(revisionResults.data.query.pages[wikiId].revisions[0]["*"]);

      // Get specie description from Wikipedia 
      const mushroomDescriptionShort = {
        descriptionShort: shortDescriptionResults.data.query.pages[wikiId].description
      }

      // Get species taxonomy info from iNat 
      const taxonomyData = {
        taxonomyData: taxaResults.data.results
      }
      // Check for wikipedia redirect -> Shaggy parasol

      dispatch(specieSuccess(_.merge(mycologicalData, mushroomDescription, mushroomDescriptionShort, taxonomyData)));
  
    })).catch(error =>
      dispatch(specieFailure(error))
    );
  }
}

// http