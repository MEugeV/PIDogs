import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Dogs from "../components/dogs";
import CardsBar from "./cardsBar";
import { getDogs, getTemperaments, setPage, resetDogs } from "../redux/actions";
import { Paginado } from "../components/paginado";
import styles from "../styles/home.module.css";
import img from "../styles/pictures/breednf.jpg";
import NavBar from "../components/navBar";

function Home({
  shownDogs,
  temperaments,
  dogs,
  getDogs,
  getTemperaments,
  page,
  setPage,
  resetDogs,
}) {
  const [isLoading, setIsloading] = useState(true);
  const [getError, setGetError] = useState(false);

  useEffect(() => {
    async function upDatePost() {
      try {
        await getDogs();
      } catch (error) {
        setGetError(true);
      }
      setIsloading(false);
      getTemperaments();
    }
    upDatePost();
    return () => {
      resetDogs();
      setPage(1);
    };
  }, []);

  let pagesPerPage = 8;
  let pages = Math.ceil(shownDogs.length / pagesPerPage);

  function handlePage(e) {
    setPage(e.target.value);
  }

  function handlePrev(e) {
    setPage(parseInt(page) - 1);
  }

  function handleNext(e) {
    setPage(parseInt(page) + 1);
  }

  return (
    <div className={styles.home}>
      <NavBar></NavBar>
      <div className={styles.homeBar}>
        <CardsBar temperaments={temperaments}></CardsBar>
        <Paginado
          page={page}
          pages={pages}
          handlePage={handlePage}
          handleNext={handleNext}
          handlePrev={handlePrev}
        ></Paginado>
      </div>
      {isLoading ? (
        <div className={styles.loading}>
          Loading....
          <span className={styles.loadingIn}>&#160;</span>
        </div>
      ) : getError ? (
        <div className={styles.notFound}>
          <div className={styles.positionNotFound}>" "</div>
          <p>Status 404</p>
          <p>Not Found</p>
          <img src={img} className={styles.imgNotFound} alt="bnf" />
        </div>
      ) : (
        <div className={styles.positionDogsCont}>
          <div className={styles.positionDogs}>" "</div>
          <Dogs dogs={shownDogs} page={page} pagesPerPage={pagesPerPage}></Dogs>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    shownDogs: state.shownDogs,
    dogs: state.dogs,
    page: state.page,
    temperaments: state.temperaments,
  };
}

export default connect(mapStateToProps, {
  getDogs,
  getTemperaments,
  setPage,
  resetDogs,
})(Home);
