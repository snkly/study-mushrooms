const axios = require('axios');
const _ = require('lodash');

const iNat = axios.create({
  baseURL: 'https://api.inaturalist.org/v1/',
  timeout: 1000,
});

const handpickedMushroomIds = [47347, 155197, 348711, 55245, 52135, 51314, 48715, 62486, 63401, 49547, 53284, 47392, 153445, 124344, 118226, 351380, 48701, 53713, 54134, 49158, 54164, 126131, 48529, 49134, 48215];

// Format wikipedia revision response with regex, ugh update later
const formatWikiRevision = (wikiData) => {
  const testMycoBoxPresence = (dataSet, stringToSplit) => {
    const splitObj = _.split(dataSet, stringToSplit);
    return !_.isNil(splitObj[1]) ? true : false;
  }

  const findMycoBox =
    testMycoBoxPresence(wikiData, '{{mycomorphbox') ? _.split(wikiData, '{{mycomorphbox')
      : testMycoBoxPresence(wikiData, '{{Mycomorphbox') ? _.split(wikiData, '{{Mycomorphbox')
        : testMycoBoxPresence(wikiData, '{{ mycomorphbox') ? _.split(wikiData, '{{ mycomorphbox')
          : testMycoBoxPresence(wikiData, '{{ Mycomorphbox') ? _.split(wikiData, '{{ Mycomorphbox')
            : false;

  if (findMycoBox === false) return;

  let wikiRevisionItems = findMycoBox[1].replace(/[^}}]*$/g, '')
    // Remove single quotes
    .replace(/'{5}|'{3}|'{2}|<[^>]*>|{{|}}|\| /g, '')
    .replace(/Taxobox|taxobox|Mycomorphbox|mycomorphbox|Speciesbox|speciesbox|stack begin|stack end|Italic title/g, '') // Remove Headers
    // Remove braketed items [[William Henry Kauffman|Kauffman]] => (/\|.*?\]\s*, '')
    // Remove [[]] or []  =>  (/(\[{2,}|\]{1,})/g, '')
    // Remove single quotes =>  (/'{5}|'{3}|'{2}|<[^>]*>|{{|}}|\| /g, '')
    .replace(/\|.*?\]\s*|(\[{2,}|\]{1,})|'{5}|'{3}|'{2}|<[^>]*>|{{|}}|\|/g, '')
    // Remove line breaks that = 2
    .replace(/\n{2}/g, '\n')
    // Replace new line with param $
    .replace(/\n/g, '$')
    // Convert [space]=[space], = (no space) or | to :
    .replace(/ = |=|\|/g, ':')
    .split('$');

  let wikiRevisionData = '{';
  for (let i = 0; i < wikiRevisionItems.length; i++) {
    const current = wikiRevisionItems[i].split(':');
    wikiRevisionData += !_.isEmpty(current[1]) && !_.includes(current[0], "(") ? '"' + _.trim(current[0]) + '":"' + current[1] + '",' : '"field-' + i + '": null,';
  }
  wikiRevisionData = wikiRevisionData.substr(0, wikiRevisionData.length - 1);
  wikiRevisionData += '}';
  const mycoResults = _.pick(JSON.parse(wikiRevisionData), [
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