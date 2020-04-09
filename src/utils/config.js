const axios = require('axios');
const _ = require('lodash');

const iNat = axios.create({
    baseURL: 'https://api.inaturalist.org/v1/',
    timeout: 1000,
  });
  
const handpickedMushroomIds = [47347,155197,154869,348711,55245,52135,51314,48715,62486,63401,67354,49547,53284,179085,47392,153445,124344,118226,351380,48701,790951,63505,53713,54134,49158,54164,126131,48529,49134,48215]; 

// Format wikipedia revision response with regex, ugh update later
const formatWikiRevision = (wikiData, name) => {
  let testMycoBoxPresence = (dataSet, stringToSplit) => {
    const splitObj = _.split(dataSet, stringToSplit);
    return !_.isNil(splitObj[1]) ? true : false;  
  } 

  let test = 
    testMycoBoxPresence(wikiData, '{{mycomorphbox') ? _.split(wikiData, '{{mycomorphbox') 
      : testMycoBoxPresence(wikiData, '{{Mycomorphbox') ? _.split(wikiData, '{{Mycomorphbox')
        : testMycoBoxPresence(wikiData, '{{ mycomorphbox') ? _.split(wikiData, '{{ mycomorphbox') 
          : testMycoBoxPresence(wikiData, '{{ Mycomorphbox') ? _.split(wikiData, '{{ Mycomorphbox') 
            : false;

  if (test === false) { return }; 
  let rev = test[1].replace(/[^}}]*$/g, '');
  // Remove single quotes
  let revA = rev.replace(/'{5}|'{3}|'{2}|<[^>]*>|{{|}}|\| /g, '');
  // Remove Headers
  let revB =revA.replace(/Taxobox|taxobox|Mycomorphbox|mycomorphbox|Speciesbox|speciesbox|stack begin|stack end|Italic title/g, '');
  // Remove braketed items [[William Henry Kauffman|Kauffman]] => (/\|.*?\]\s*, '')
  // Remove [[]] or []  =>  (/(\[{2,}|\]{1,})/g, '')
  // Remove single quotes =>  (/'{5}|'{3}|'{2}|<[^>]*>|{{|}}|\| /g, '')
  let revC = revB.replace(/\|.*?\]\s*|(\[{2,}|\]{1,})|'{5}|'{3}|'{2}|<[^>]*>|{{|}}|\|/g, '');
  // Remove line breaks that = 2
  let revE = revC.replace(/\n{2}/g, '\n');
  // Replace new line with param $
  let revF = revE.replace(/\n/g, '$');
  // Convert [space]=[space], = (no space) or | to :
  let revG = revF.replace(/ = |=|\|/g, ':');
  // Convert a string set up like below into json
  // "domain:Abcd-E-Group,domaintype:com,Submit1:Search";
  let items = revG.split('$');
  let jsonStrig = '{';
  for (let i = 0; i < items.length; i++) {
    const current = items[i].split(':');
    jsonStrig += !_.isEmpty(current[1]) && !_.includes(current[0], "(") ? '"' + _.trim(current[0]) + '":"' + current[1] + '",' : '"field-' + i + '": null,';
  }
  jsonStrig = jsonStrig.substr(0, jsonStrig.length - 1);
  jsonStrig += '}';

  const mycoResults = _.pick(JSON.parse(jsonStrig), [
    'whichGills', 'whichGills2',
    'capShape', 'capShape2',
    'hymeniumType',
    'stipeCharacter', 'stipeCharacter2',
    'sporePrintColor', 'sporePrintColor2',
    'ecologicalType', 'ecologicalType2',
    'howEdible', 'howEdible2'
  ]);
  return mycoResults;
}

module.exports = {
    iNat,
    handpickedMushroomIds,
    formatWikiRevision
}