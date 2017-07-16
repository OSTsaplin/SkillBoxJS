import { formatDate, unsplash } from "../unit/sys-proc"; // , readListUnsplashPhotos
import {toJson} from 'unsplash-js';

export const getUnsplashImg = (n) => {
  return (dispath) => {
    let item
    let AImg = [];
    unsplash.photos.listPhotos(n, 10)
      .then(toJson)
      .then(json => {
        for (var j=0;j<json.length;j++) {
          item = json[j];
          let sDat = item.created_at.replace("T"," ");  // : "2016-01-12T18:16:09-05:00"
          const D = new Date(sDat.substr(0,18));
          item = {id: item.id, author: item.user.name, data: formatDate(D), urlSmall: item.urls.small, urlFull: item.urls.regular, profile: item.user.portfolio_url, countLicke: item.likes};
          AImg.push(item);
        }
      const unsplashPage = n == 1 ? 2 : (n + 1);
      dispath({ type: "GET_UNSPLASH_IMG", AImg, unsplashPage });
    });
  }
}

export const likPhoto = (idImg) => {
  return (dispath) => {
    unsplash.photos.likePhoto(idImg)
      .then(toJson)
      .then(json => {
        dispath({type: "LIK_PHOTO", likes: json.likes});
      });
  }
}

export const unlikPhoto = (idImg) => {
  return (dispath) => {
    unsplash.photos.unlikePhoto(idImg)
      .then(toJson)
      .then(json => {
        dispath({type: "LIK_PHOTO", likes: json.likes});
      });
  }
}

function getPropsPhoto(AImg, idLi, idPos, mode) {
  return (dispath) => {
    const pos = idPos+AImg.length;
    dispath( { type: "SELECT_LI", idLi, currentImgPos: pos } )
    let idImg = "";
    for (var j=0;j<AImg.length;j++) {
      idImg = AImg[j];
      unsplash.photos.getPhoto(idImg)
        .then(toJson)
        .then(json => {
          let sDat = json.created_at.replace("T"," ");  // : "2016-01-12T18:16:09-05:00"
          const D = new Date(sDat.substr(0,18));
          const item = { id: json.id, author: json.user.name, data: formatDate(D),
                         urlSmall: json.urls.small, urlFull: json.urls.full,
                         profile: json.user.portfolio_url, countLicke: json.likes,
                         leked: false };
          dispath({ type: 'ITEMS_IMG_SUCCESS', item, mode });
      });
    }
  }
}

export const getListImg = (itemLi, mode) => {
  let imgId;
  let n = -1;
  let AImg = [];
  let idPos = 0;
  if (mode == 2) {
    idPos = itemLi.currentImgPos < itemLi.count ? itemLi.currentImgPos : 0;
  }
  for (var j=0;j<=itemLi.maxIdImg;j++) {
    imgId = itemLi["a"+j];
    if ((imgId != "")&&(imgId != undefined)) {
      n++;
      if (idPos <= n)
      {
        AImg.push(imgId);
        if (AImg.length == 10) { break; }
      }
    }
  }
  if (AImg.length == 0) {
    return { type: "SELECT_LI", idLi: itemLi.id, currentImgPos: 0 }
  } else {
    return getPropsPhoto(AImg, itemLi.id, idPos, mode);
  }
}

export const ShowOneMinImage = (item) => {
  return {
    type: "SHOW_MINI_IMG",
    item
  }
}

export const addLi = () => {
  const nmsPart = prompt("Наименование нового раздела", "");
  if ((nmsPart == null)||(nmsPart.trim() == "")) {
    return { type: "EMPTY_ACTION" }
  } else {
    return { type: "ADD_LI",  nmsPart }
  }
}

export const renameLi = () => {
  let result;
  const nmsPart = prompt("Укажите новое наименование раздела", "");
  if ((nmsPart == null)||(nmsPart.trim() == "")) {
    result = { type: "EMPTY_ACTION" };
  } else {
    result = {
               type: "RENAME_LI",
               nmsPart
             };
  }
  return result;
}

export const clearLi = () => {
  let result;
  if (!confirm('Очистить раздел?')) {
    result = { type: "EMPTY_ACTION" };
  } else {
    result = { type: "CLEAR_LI" };
  }
  return result;
}

export const deleteLi = () => {
  let result;
  if (!confirm('Удалить раздел?')) {
    result = { type: "EMPTY_ACTION" };
  } else {
    result = { type: "DELETE_LI" };
  }
  return result;
}

export const deleteALL = () => {
  if (confirm('Удалить ВСЕ разделы?')) {
    return { type: "DELETE_ALL_LI" };
  } else {
    return { type: "EMPTY_ACTION" };
  }
}

export const addImg = (idLi, idImg) => {
  return {
    type: "ADD_IMG",
    idLi,
    idImg
  }
}

export const deleteImg = (idImg) => {
  if (confirm('Удалить изображение?')) {
    return {
      type: "DELETE_IMG", idImg
    }
  } else {
    return { type: "EMPTY_ACTION" }
  }
}

export const photoOnClick = (item, unsplashAct) => {
  if (item.url == "") {
    return { type: "EMPTY_ACTION" }
  } else {
    return { type: "SELECT_PHOTO", id: item.id, unsplashAct }
  }
}

export const showFullPhoto = (item) => {
  if (item.url == "") {
    return { type: "EMPTY_ACTION" }
  } else {
    return { type: "SHOW_FULL_PHOTO" }
  }
}

export const closeShow = () => {
  return { type: "CLOSE_SHOW" }
}
