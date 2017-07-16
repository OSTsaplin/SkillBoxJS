import { indexOfByID, numderByKey, readListPartsFromLocalStore } from '../unit/sys-proc';
import { suppLocStor } from './suppLocStor';

let ALi = [];

if (suppLocStor()) {
  ALi = readListPartsFromLocalStore();
}

const initialState = {
  ALi,
  currentLi: -1,
  btnDisable: 1,
  unsplashActive: -1,
  suppLocStor
}

export default function favore(state = initialState, action) {
  console.log("favore: "+action.type);
  switch (action.type) {
    case "SELECT_LI": {
      const j = indexOfByID(state.ALi, action.idLi);
      if (j < 0) {
        return state;
      } else {
        let ALi = [...state.ALi];
        let itemLi = ALi[j];
        itemLi.currentImgPos = action.currentImgPos;
        return { ALi, currentLi: action.idLi, btnDisable: 0, unsplashActive: 0, suppLocStor: state.suppLocStor }
      }
    }

    case "SHOW_LIST_IMG":
      return { ALi: [...state.ALi], currentLi: state.idLi, btnDisable: 0, unsplashActive: 0, suppLocStor: state.suppLocStor }

    case "GET_UNSPLASH_IMG":
      return { ALi: [...state.ALi], currentLi: state.currentLi, btnDisable: 1, unsplashActive: 1, suppLocStor: state.suppLocStor }

    case "ADD_LI": {
      let id = 1;
      const ALi = state.ALi;
      for (var j=0;j<ALi.length;j++) {
        if (id <= ALi[j].id) { id = ALi[j].id + 1; }
      }
      const itemLi =  {id, caption: action.nmsPart, count: 0, maxIdImg: -1};
      if (state.suppLocStor) {
        const sKey = "liS_"+id;
        localStorage[sKey] = JSON.stringify(itemLi);
      }
      return { ALi: [...ALi, itemLi], currentLi: state.currentLi, btnDisable: 1, unsplashActive: 1, suppLocStor: state.suppLocStor };
    }

    case "RENAME_LI": {
      const id = state.currentLi;
      if (id > 0) {
        let ALi = [...state.ALi];
        const j = indexOfByID(ALi, id);
        ALi[j] = { id, caption: action.nmsPart, count: ALi[j].count, maxIdImg: ALi[j].maxIdImg };
        if (state.suppLocStor) {
          const sKey = "liS_"+id;
          localStorage[sKey] = JSON.stringify(ALi[j]);
        }
        return { ALi, currentLi: id, btnDisable: state.btnDisable, unsplashActive: state.unsplashActive, suppLocStor: state.suppLocStor };
      } else {
        return state;
      }
    }

    case "CLEAR_LI": {
      const id = state.currentLi;
      if (id > 0) {
        let ALi = [...state.ALi];
        const j = indexOfByID(ALi, id);
        ALi[j] = { id, caption: ALi[j].caption, count: 0, maxIdImg: 0 };
        if (state.suppLocStor) {
          const sKey = "liS_"+id;
          localStorage[sKey] = JSON.stringify(ALi[j]);
        }
        return { ALi, currentLi: id, btnDisable: state.btnDisable, unsplashActive: state.unsplashActive, suppLocStor: state.suppLocStor };
      } else {
        return state;
      }
    }

    case "DELETE_LI": {
      const id = state.currentLi;
      if (id > 0) {
        let A = [...state.ALi];
        const j = indexOfByID(A, id);
        A.splice(j,1);
        A.sort(function(a, b){return a.id - b.id});
        if (state.suppLocStor) {
          localStorage.removeItem("liS_"+id);
        }
        return { ALi: A, currentLi: -1, btnDisable: 1, unsplashActive: 0, suppLocStor: state.suppLocStor };
      } else {
        return state;
      }
    }

    case "DELETE_ALL_LI": {
      if (state.suppLocStor) {
        let sKey;
        for (var j=(localStorage.length-1);j>=0;j--) {
          sKey = localStorage.key(j);
          if (sKey.substr(0,4) == "liS_") {
            localStorage.removeItem(sKey);     // ЗАЧИСТКА
          }
        }
      }
      return { ALi: [], currentLi: -1, btnDisable: 1, unsplashActive: 0, suppLocStor: state.suppLocStor };
    }

    case "ADD_IMG": {
      const idLi = action.idLi;
      const ALi = [...state.ALi];
      const j = indexOfByID(ALi, idLi);
      if (j >= 0) {
        let itemLi = ALi[j];
        const N = ++itemLi.maxIdImg;
        itemLi["a"+N] = action.idImg;
        itemLi.count++;
        if (state.suppLocStor) {
          localStorage["liS_"+idLi] = JSON.stringify(itemLi);
        }
        return { ALi, currentLi: idLi, btnDisable: state.btnDisable, unsplashActive: 1, suppLocStor: state.suppLocStor };
      }
      return state;
    }

    case "DELETE_IMG": {
      const idLi = state.currentLi;
      const ALi = [...state.ALi];
      let j = indexOfByID(ALi, idLi);
      if (j >= 0) {
        let itemLi = ALi[j];
        const idImg = action.idImg;
        j = numderByKey(itemLi, idImg);
        if (j > 0) {
          itemLi["a"+j] = "";
          itemLi.count--;
          if (state.suppLocStor) {
            localStorage["liS_"+idLi] = JSON.stringify(itemLi);
          }
          return { ALi, currentLi: idLi, btnDisable: state.btnDisable, unsplashActive: 0, suppLocStor: state.suppLocStor };
        } else {
          return state;
        }
      }
    }

    default:
      return state;
  }

}
