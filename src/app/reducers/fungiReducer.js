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

const INITIAL_STATE = {
    fungiList: {
        mushrooms: [],
        error: null,
        loading: false
    },
    fungiObject: {
        fungi: {
            name: "",
            names: [{}],
            preferred_common_name: "",
            default_photo: {
                id: null,
                attribution: null,
                square_url: "",
                url: null,
                licenseCode: null
            },
            observationPhotos: [],
            observations_count: 0
        },
        error: null,
        loading: false
    },
    specieObject: {
        specie: {
            fungi: null,
            fungiName: null,
            description: "",
            descriptionShort: "",
            image: null,
            authority: null,
            ecologicalType: null,
            ecologicalType2: null,
            capShape: null,
            capShape2: null,
            hymeniumType:null,
            whichGills: null,
            whichGills2: null,
            stipeCharacter: null,
            stipeCharacter2: null,
            sporePrintDeposit: null,
            sporePrintDeposit2: null,
            howEdible: null,
            howEdible2: null,
            taxonomyData: []
        },
        error: null,
        loading: false
    }
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FUNGI_LIST_REQUEST:
            return {
                ...state,
                fungiList: {
                    mushrooms: [...state.fungiList.mushrooms],
                    error: null,
                    loading: true
                }
            };
        case FUNGI_LIST_SUCCESS:
            return {
                ...state,
                fungiList: {
                    mushrooms: action.payload,
                    error: null,
                    loading: false
                }
            };
        case FUNGI_LIST_FAILURE:
            return {
                ...state,
                fungiList: {
                    mushrooms: [],
                    error: action.payload,
                    loading: false
                }
            };
        case FETCH_FUNGI_REQUEST:
            return {
                ...state,
               fungiObject: {
                    fungi: {
                        name: "",
                        names: [{}],
                        preferred_common_name: "",
                        default_photo: {
                            id: null,
                            attribution: null,
                            square_url: "",
                            url: null,
                            licenseCode: null
                        },
                        observationPhotos: [],
                        observations_count: 0
                    },
                    error: null,
                    loading: true
                }
            };
        case FETCH_FUNGI_SUCCESS:
            return {
                ...state,
                fungiObject: {
                    fungi: action.payload,
                    error: null,
                    loading: false
                }
            };
        case FETCH_FUNGI_FAILURE:
            return {
                ...state,
                fungiObject: {
                    fungi: {
                        name: "",
                        names: [{}],
                        preferred_common_name: "",
                        default_photo: {
                            id: null,
                            attribution: null,
                            square_url: "",
                            url: null,
                            licenseCode: null
                        },
                        observationPhotos: [],
                        observations_count: 0
                    },
                    error: action.payload,
                    loading: false
                }
            };
        case FETCH_SPECIE_REQUEST:
            return {
                ...state,
                specieObject: {
                    specie: {...state.specieObject.specie},
                    error: null,
                    loading: true
                }
            };
        case FETCH_SPECIE_SUCCESS:
            return {
                ...state,
                specieObject: {
                    specie: action.payload,
                    error: null,
                    loading: false
                }
            };
        case FETCH_SPECIE_FAILURE:
            return {
                ...state,
                specieObject: {
                    specie: {
                        fungi: null,
                        fungiName: null,
                        description: null,
                        image: null,
                        authority: null,
                        ecologicalType: null,
                        ecologicalType2: null,
                        capShape: null,
                        capShape2: null,
                        hymeniumType:null,
                        whichGills: null,
                        whichGills2: null,
                        stipeCharacter: null,
                        stipeCharacter2: null,
                        sporePrintDeposit: null,
                        sporePrintDeposit2: null,
                        howEdible: null,
                        howEdible2: null,
                        observationPhotos: [],
                        taxonomyData: []
                    },
                    error: action.payload,
                    loading: false
                }
            };
        default:
            return state
    }
}
