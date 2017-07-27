// Reducer:
function ftgroup(state = {
  driver : {
    RegistrationNumber: null,
    PrimaryDriverCPR: null,
    PrimaryDrivingLicenseNumber: null,
    SecondaryDriverCPR: null,
    SecondaryDrivingLicense: null,
    SecondaryDriverName: null
  },
  customer: {
    DebitorNavn: null,
    DebitorAdresse1: null,
    DebitorAdresse2: null,
    DebitorPostnr: null,
    DebitorBy: null,
    DebitorMobil: null,
    DebitorEmail: null,
    DebitorNewsletter: null,
    DebitorFirma: null,
    DebitorPayType: null,
    DebitorCVR: null,
    DebitorGruppeID: 1,
    DebitorID: null
  },
  reservation: {
    paymentMethod: null,
    sessionId: null,
    locationId: null,
    startDate: '2017-07-27T00:00',
    isBluetoothLocation: null,
    endDate: '2017-07-27T20:00',
    insurance: 1,
    productId: null
  }
}, action) {
  switch(action.type){
    case 'update':
    return {...state,
      [action.payload.field]: {
        ...state[action.payload.field],
        [action.payload.key]: action.payload.value
      }
    }
    default:
      return state;
  }
}

export default ftgroup
