import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { iNat } from "../../../utils/config";
import "./styles.scss";
import { Search } from 'semantic-ui-react'

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchValue.length >= 3  ) {
      iNat.get('taxa/autocomplete', {
        params: {
          q: searchValue,
          all_names: false,
          locale: 'en',
          taxon_id: [47169,55523,152031,152032, 53539],
          rank: 'species'
          //rank_level: 10
        }

      }).then((response) => {
        if (response.data.total_results.length === 0) {
          return
        } else {
          const allResults = response.data.results.map((matchedResult, i) => {
            let resultsObj = {
              title: _.upperFirst(matchedResult.matched_term),
              description: matchedResult.preferred_common_name !== matchedResult.matched_term ? 
`${_.upperFirst(matchedResult.name)},
${_.upperFirst(matchedResult.preferred_common_name)}` 
                : _.upperFirst(matchedResult.name), 
              id: matchedResult.id,
              image: matchedResult.default_photo.square_url ? matchedResult.default_photo.square_url : null
            }
            return resultsObj;
          });
          setIsLoading(false);
          setSearchResults(allResults);
        }
      }).catch(error => console.log(error))
    } else {
      return;
    }
  }, [searchValue]);

  const handleSearchInputChanges = e => {
    setIsLoading(true);
    setSearchValue(e.target.value);

    setTimeout(() => {
      setIsLoading(false);
    }, 300)
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e, { result }) => {
    e.preventDefault();
    resetInputField();
    // Send selected id back
    return result ? window.location = `/fungi/${result.id}` : null;
  };

  return(
    <Search
      minCharacters={3}
      loading={isLoading}
      onResultSelect={callSearchFunction}
      onSearchChange={_.debounce(handleSearchInputChanges, 500, { leading: true, })}
      results={searchResults}
      value={searchValue}
      size={'big'}
      noResultsMessage={'No mushrooms found. Keep searching!'}
      fluid={true}
      className={'searchBar'}
    />
  )
}

export default SearchBar;
