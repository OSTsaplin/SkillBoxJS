import React from "react";
import {connect} from "react-redux";
// import { Router, Route } from "react-router";
import HeaderPn from "../components/header";
import FavorePn from "./app-favore";
import GellereyPn from "./app-gallerey";
import * as acts from "../actions";

// var browserHistory = Router.browserHistory;

let App = (props) => {
  const { favore, gallerey, getListImg, getUnsplashImg,
          addLi, renameLi, clearLi, deleteLi, deleteALL, addImg, deleteImg,
          photoOnClick, showFullPhoto, closeShow, likPhoto, unlikPhoto } = props;
  return (
    <div id="cargo">
      <HeaderPn />
      <div className="wrapp">
        <FavorePn favoreState={favore}
                  getListImg={getListImg}
                  addLi={addLi}
                  renameLi={renameLi}
                  clearLi={clearLi}
                  deleteLi={deleteLi}
                  getUnsplashImg={getUnsplashImg}
                  deleteALL={deleteALL} />
        <GellereyPn gallereyState={gallerey}
                    favoreState={favore}
                    addImg={addImg}
                    deleteImg={deleteImg}
                    photoOnClick={photoOnClick}
                    showFullPhoto={showFullPhoto}
                    closeShow={closeShow}
                    getUnsplashImg={getUnsplashImg}
                    getListImg={getListImg}
                    likPhoto={likPhoto}
                    unlikPhoto={unlikPhoto} />
      </div>
    </div>
  )
}

//                   getUnsplashImg={getUnsplashImg}

const mapStateToProps = (state) => {
  return { favore: state.favore, gallerey: state.gallerey }
}

const mapDispathToProps = (dispath) => {
  return {
    getListImg: (item, mode) => dispath(acts.getListImg(item, mode)),
    addLi: () => dispath(acts.addLi()),
    renameLi: () => dispath(acts.renameLi()),
    clearLi: (idLi) =>  dispath(acts.clearLi()),
    deleteLi: (idLi) =>  dispath(acts.deleteLi()),
    deleteALL: () => dispath(acts.deleteALL()),
    addImg: (idImg) => dispath(acts.addImg(idImg)),
    deleteImg: (idImg) => dispath(acts.deleteImg(idImg)),
    getUnsplashImg: (n) => dispath(acts.getUnsplashImg(n)),
    photoOnClick: (item) => dispath(acts.photoOnClick(item)),
    showFullPhoto: (url) => dispath(acts.showFullPhoto(url)),
    closeShow: () => dispath(acts.closeShow()),
    likPhoto: (idImg) => dispath(acts.likPhoto(idImg)),
    unlikPhoto: (idImg) => dispath(acts.unlikPhoto(idImg))
  }
}

App = connect(
  mapStateToProps,
  mapDispathToProps
)(App);

export default App;
