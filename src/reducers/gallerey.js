import { indexOfByID } from '../unit/sys-proc';

const initialState = {
  AImg: [],
  idCurrentImg: -1,
  page: 1,
  btnDelActive: 0,
  btnAddActive: 0,
  mode: "SHOW-LIST"
}

export default function gallerey(state = initialState, action) {
  console.log("gallerey: "+action.type);
  switch (action.type) {
    // case "ITEMS_HAS_ERRORED": {
    //   return { AImg: [...state.AImg], idCurrentImg: -1, btnDelActive: 0, btnAddActive: 0, mode: "SHOW-LIST", msgErr: action.msgErr };
    // }

    case 'ITEMS_IMG_SUCCESS': {
      if (action.mode = 1) {
        return { AImg: [...state.AImg, action.item], idCurrentImg: 0, page: state.page, btnDelActive: state.btnDelActive, btnAddActive: state.btnAddActive, mode: "SHOW-LIST" };
      } else {
        return { AImg: [...state.AImg, action.item], idCurrentImg: state.idCurrentImg, page: state.page, btnDelActive: state.btnDelActive, btnAddActive: state.btnAddActive, mode: "SHOW-LIST" };
      }
    }

    case "SHOW_LIST_IMG": {
      return { AImg: action.AImg, idCurrentImg: -1, page: state.page, btnDelActive: 0, btnAddActive: 0, mode: "SHOW-LIST" };
    }

    case "ITEMS_IS_LOADING": {
      if (action.isLoading) {
        return { AImg: [], idCurrentImg: -1, page: state.page, btnDelActive: 0, btnAddActive: 0, mode: "SHOW-LIST" };
      } else {
        let item = { id: 0, author: "", data: "", urlSmall: "./img/Loading1.jpg", urlFull: "./img/Loading1.jpg", profile: "", countLicke: 0 };
        let AImg = [];
        for (var j=0;j<10;j++) {
          AImg.push({item, id: (j+1)});
        };
        return { AImg: [], idCurrentImg: -1, page: state.page, btnDelActive: 0, btnAddActive: 0, mode: "SHOW-LIST" };
      }
    }

    case "GET_UNSPLASH_IMG": {
      return { AImg: action.AImg, idCurrentImg: -1, page: action.unsplashPage, btnDelActive: 0, btnAddActive: 0, mode: "SHOW-LIST" };
    }

    case "SELECT_LI":
    case "CLEAR_LI":
    case "DELETE_LI":
    case "DELETE_ALL_LI":
      return { AImg: [], idCurrentImg: -1, page: state.page, btnDelActive: 0, btnAddActive: 0, mode: "SHOW-LIST" };


    case "DELETE_IMG": {
      const AImg = [...state.AImg];
      const j = indexOfByID(AImg, action.idImg);
      if (j >= 0) {
        AImg.splice(j,1);
        return { AImg, idCurrentImg: -1, page: state.page, btnDelActive: 0, btnAddActive: 0, mode: "SHOW-LIST" };
      } else {
        return state;
      }
    }

    case "SELECT_PHOTO": {
      const id = action.id;
      const AImg = [...state.AImg];
      const j = indexOfByID(AImg, id);
      if ((j < 0)||(AImg[j].url == "")) {
        return state;
      } else {
        return { AImg, idCurrentImg: id, page: state.page, btnDelActive: 0, btnAddActive: 0, mode: state.mode };
      }
    }

    case "SHOW_FULL_PHOTO": {
      const AImg = [...state.AImg];
      return { AImg, idCurrentImg: state.idCurrentImg, page: state.page, btnDelActive: state.btnDelActive, btnAddActive: state.btnAddActive, mode: "SHOW-ONE" };
    }

    case "CLOSE_SHOW": {
      return { AImg: [...state.AImg], idCurrentImg: state.idCurrentImg, page: state.page, btnDelActive: state.btnDelActive, btnAddActive: state.btnAddActive, mode: "SHOW-LIST" };
    }

    case "LIK_PHOTO": {
      const j = state.idCurrentImg;
      let AImg = [...state.AImg];
      AImg[j].countLicke = action.likes;
      return { AImg, idCurrentImg: j, page: state.page, btnDelActive: state.btnDelActive, btnAddActive: state.btnAddActive, mode: "SHOW-ONE" };
    }


    default:
      return state;
  }
}
