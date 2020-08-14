import * as _ from "lodash";
// import Storage from '../../Functions/Lookup/LocalStorage/LocalStorage';

const initialState = {
  app: {
    appData: {},
  },
  // reduxHasContactPerm:true
};

appReducer = (state = initialState, { type, appData }) => {
  switch (type) {
    case "getApprData":
      let getUserData = _.cloneDeep(state);
      // // console.log('test');
      // Storage.getUserData().then(userData => {
      //   // this.setState({userData: userData});
      //   //       getUserData = userData
      //   // console.log(userData);
      //   getUserData.userData = userData;
      // });
      return getUserData;

      break;

    case "setAppData":
      //       console.log("git history called from didmount");
      let setAppData = _.cloneDeep(state);
      // setAppData.app.appData = appData;
      _.assign(setAppData.app.appData, appData);
      // console.log(appData, 'test reducer');
      return setAppData;
      break;

    default:
      return state;
  }
  return state;
};
export default appReducer;
