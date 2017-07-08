import Unsplash, {toJson} from 'unsplash-js';

export let unsplash;

export const connectToUnsplash = () => {
//  Создаем экземпляр объекта для доступа к API
  unsplash = new Unsplash({
    applicationId: "6944ce411d39f673bbafdf6fc714a27191577291d9e28c8690b5037185a02e1f",
    secret: "6b6dca29b5e68f9c392dd5766414b093411dff5d4b7e329294e33b618c0d4809",
    callbackUrl: "http://olegivanoff.xyz/skilljs/auth/index.html"
  });
  // unsplash = new Unsplash({
  //   applicationId: "6c10e918dabf63e2c5d1e404dace066d4e12c68cd9a787a8710b2a48de5f4b2b",
  //   secret: "33cf3a2a2fe8c4b662b448d36e05f3f4243b5a5563b4a36c47fb5f1732457ef2",
  //   callbackUrl: "http://olegivanoff.xyz/skilljs/auth/index.html"
  // });

  // Считываем GET-параметр code из URL
  // www.example.com/auth?code=abcdef123456...
  const code = location.search.split('code=')[1];

  // Если код передан, отправляем запрос на получение токена
  if (code) {
    unsplash.auth.userAuthentication(code)
      .then(res => res.json())
      .then(json => {
        // Сохраняем полученный токен
        unsplash.auth.setBearerToken(json.access_token);

        // Теперь можно сделать что-то от имени пользователя
        // Например, поставить лайк фотографии
        // unsplash.photos.likePhoto("kBJEJqWNtNY");
      });
  }
}

export const readListUnsplashPhotos = (AImgs, n1) => {
  let item;
  unsplash.photos.listPhotos(n1, n1+29)
    .then(toJson)
    .then(json => {
      for (var j=0;j<json.length;j++) {
        item = json[j];
        const D = new Date(item.created_at.replace("T"," "));  // : "2016-01-12T18:16:09-05:00"
        item = {id: item.id, author: item.user.name, data: formatDate(D), urlSmall: item.urls.small, urlFull: item.urls.regular, profile: item.user.portfolio_url, countLicke: item.likes};
        AImgs.push(item);
      }
  });
}

export const indexOfByID = (ALi, id) => {
  for (var j=0;j<ALi.length;j++) {
    if (ALi[j].id == id) {
      return j;
    }
  }
  return -1;
}

export const numderByKey = (itemLi, key) => {
  for (var j=1;j<=itemLi.maxIdImg;j++) {
    if (itemLi["a"+j] == key) {
      return j;
    }
  }
  return 0;
}

export const formatDate = (D) => {
  const hours = "0"+D.getHours();
  const minutes = "0"+D.getMinutes();
  return D.toLocaleDateString()+" "+hours.substr(-2)+":"+minutes.substr(-2);
}

export const readListPartsFromLocalStore = () => {
  let aLi = [];
  let sKey;
  let n = 0;
  for (var j=0;j<localStorage.length;j++) {
    sKey = localStorage.key(j);
    if (sKey.substr(0,4) == "liS_") {
      aLi.push(JSON.parse(localStorage[sKey]));
      aLi[n].currentImgPos = 0;
      n++;
    }
  }
  aLi.sort(function(a, b){return a.id - b.id});
  return aLi;
}
