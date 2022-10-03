import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail, resetDetail } from "../redux/actions";
import styles from "../styles/detail.module.css";
import imgNotFound from "../styles/pictures/detailnf.jpg";
import NavBar from "./navBar";

function Detail({ getDetail, detail, resetDetail }) {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(true);
  const [getError, setGetError] = useState(false);

  useEffect(() => {
    async function handleGetDetail() {
      try {
        await getDetail(id);
      } catch (error) {
        setGetError(true);
      }
      setIsloading(false);
    }
    handleGetDetail();
    return () => {
      resetDetail();
    };
  }, [getDetail, id, resetDetail]);

  return (
    <div className={styles.detail}>
      <NavBar></NavBar>
      {isLoading ? (
        <div className={styles.loading}>
          Loading....
          <span className={styles.loadingIn}>&#160;</span>
        </div>
      ) : getError ? (
        <div className={styles.notFound}>
          <span>
            <Link className={styles.linkNotFound} to="/home">
              Dog not found. <br />
              <br /> Back home
            </Link>
          </span>
          <img
            src={imgNotFound}
            className={styles.imgNotFound}
            alt="Not found"
          />
          <span className={styles.spanNotFound}>&#160;</span>
        </div>
      ) : (
        <div className={styles.detailShown}>
          <div className={styles.container}>
            <div>
              <p className={styles.tittle}>Breed:</p>
              <p className={styles.name}>{detail.name}</p>
              <p className={styles.tittle}>Temperament:</p>
              <p className={styles.temperaments}>{detail.temperaments}</p>
              <p className={styles.tittle}>Weight:</p>
              <p> {detail.weight} kgs</p>
              <p className={styles.tittle}>Height:</p>
              <p> {detail.height} cmts</p>
              <p className={styles.tittle}>Life span:</p>
              <p> {detail.life_span} years</p>
            </div>
            <div className={styles.imgBox}>
              <img
                className={styles.image}
                src={detail.image}
                alt="detail"
              ></img>
            </div>
          </div>
          <Link className={styles.home} to="/home">
            Home
          </Link>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return { detail: state.detail };
}

export default connect(mapStateToProps, { getDetail, resetDetail })(Detail);
