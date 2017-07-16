import React from "react";
import OneFotoMini from "../components/one-foto-mini";
import DropDownBtn from "../components/dropDownBtn"
import { indexOfByID } from '../unit/sys-proc';

const GellereyPn = (props) => {
  const { gallereyState, favoreState,  addImg, deleteImg, photoOnClick, showFullPhoto, closeShow, likPhoto, unlikPhoto, getUnsplashImg, getListImg } = props;
  let itemLi = undefined;
  if (favoreState.currentLi > 0) {
    const j = indexOfByID(favoreState.ALi, favoreState.currentLi);
    if (j >= 0) { itemLi = favoreState.ALi[j]; }
  }
  const unsplashAct = favoreState.unsplashActive;

  if (gallereyState.mode == "SHOW-LIST") {
    const {AImg, idCurrentImg, page} = gallereyState;
    const btnAddDisabled = ((idCurrentImg <= 0)||(favoreState.currentLi < 0)||(favoreState.unsplashActive == 0)) ? 1 : 0;   // добавить можно только из раздела Unsplash
    const btnDelDisabled = ((idCurrentImg <= 0)||(favoreState.unsplashActive == 1)) ? 1 : 0;   // удалить можно только из "своего" раздела
    const btnLoadDisabled = (((itemLi != undefined)&&(itemLi.count > 10)&&(itemLi.currentImgPos<itemLi.count))||favoreState.unsplashActive) ? 0 : 1;
    const ALi = favoreState.ALi;
    return (
      <article className='share gellerey'>
        <div id="imgsBox">
          {
            AImg.map((item, j) => {
              return <OneFotoMini key={item.id} item={item} photoOnClick={photoOnClick} showFullPhoto={showFullPhoto} idCurrentImg={idCurrentImg} unsplashAct={unsplashAct} />
            })
          }

          <div className="galleryBtnDiv">

            {
              (favoreState.unsplashActive == 1) &&
              <DropDownBtn ALi={ALi} addImg={addImg} unsplashAct={unsplashAct} idImg={idCurrentImg} idCurrentLi={favoreState.currentLi} />
            }

            {
              (favoreState.unsplashActive == 0) &&
              <button className="galleryBtn" onClick={ev => deleteImg(idCurrentImg)} disabled={btnDelDisabled}>Удалить фото</button>
            }

            {
              (favoreState.unsplashActive == 1) &&
                <button className="galleryBtn" onClick={ev => getUnsplashImg(page)} disabled={btnLoadDisabled}>Загрузить еще</button>
            }

            {
              (favoreState.unsplashActive == 0) && (itemLi != undefined) &&
                <button className="galleryBtn" onClick={ev => getListImg(itemLi,2)} disabled={btnLoadDisabled}>Загрузить еще</button>
            }

          </div>

        </div>


      </article>
    )
  } else {
    const { AImg, idCurrentImg } = gallereyState;
    const j = indexOfByID(AImg, idCurrentImg);
    if (j >= 0) {
      const item = AImg[j];
      return (
        <article className="share gellerey">
          <div id="imgsBox">
            <div className="maxPhotoBox">
              <img className="maxPhoto" src={item.urlFull} alt="one photo" />
              <button className="btnClose" onClick={ev=>closeShow()}>X</button>

              <div className="infoBox">
                <span>Автор:</span><span className="valueInfo2">{item.author}</span>
                <span>Профиль:</span><span className="valueInfo2"><a href={item.profile}>Ссылка на профиль</a></span>
                <span>Дата публикации:</span><span className="valueInfo2">{item.data}</span>
                <span>Количество лайков:</span><span className="valueInfo2">{item.countLicke}</span>
                {
                  (item.leked) && <button className="btnLik" onClick={ev=>unlikPhoto(item.id)}>дизлайк</button>
                }
                {
                  (!item.leked) && <button className="btnLik" onClick={ev=>likPhoto(item.id)}>лайк</button>
                }
              </div>

            </div>

          </div>
        </article>
      )
    } else {
      return null;
    }
  }
}

export default GellereyPn;
