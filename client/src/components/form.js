import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import validate from "../functions/validateForm";
import { postDog, getTemperaments } from "../redux/actions";
import styles from "../styles/form.module.css";
import img from "../styles/pictures/walldogs.jpg";
import NavBar from "./navBar";

const defaultDog =
  "https://media.istockphoto.com/vectors/cartoon-dog-happy-head-face-silhouette-cute-pooch-character-kawaii-vector-id1055461378?b=1&k=20&m=1055461378&s=170667a&w=0&h=B_CPOp6vXDzAcusxwMzzpqijesUmjtbZU1dbiyGLTzY=";

function Form({ dogs, temperamentsList, getTemperaments }) {
  const history = useHistory();

  useEffect(() => {
    document.querySelector("#submit").disabled = true;
    document.querySelector("#submitTemp").disabled = true;
    getTemperaments();
  }, []);

  let initialState = {
    name: "",
    image: "",
    temperaments: [],
    min_weight: "",
    max_weight: "",
    min_height: "",
    max_height: "",
    min_life_span: "",
    max_life_span: "",
    newTemperament: "",
    addTemperaments: [],
  };

  const [state, setState] = useState(initialState);
  const [error, setError] = useState({});

  function handleChange(e) {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
    setError(
      validate(
        { ...state, [e.target.name]: e.target.value },
        dogs,
        temperamentsList
      )
    );
  }

  function selecTemp(e) {
    if (!state.temperaments.find((el) => el === e.target.value)) {
      if (state.temperaments.length < 10) {
        setState({
          ...state,
          temperaments: [...state.temperaments, e.target.value],
        });
        setError(
          validate(
            { ...state, temperaments: [...state.temperaments, e.target.value] },
            dogs,
            temperamentsList
          )
        );
      } else {
        alert("You can select up to 10 temperaments");
      }
    } else {
      alert(`Temperament already added`);
    }
    document.querySelector("#temperaments").value = "Temperaments";
  }

  function addTemperaments(e) {
    e.preventDefault();
    state.addTemperaments.find((el) => el === state.newTemperament)
      ? alert(
          `You have already created the temperament "${state.newTemperament}"`
        )
      : state.addTemperaments.length === 5
      ? alert(`You can add up to 5 temperaments`)
      : setState((state) => ({
          ...state,
          addTemperaments: [...state.addTemperaments, state.newTemperament],
        }));
    setError(
      validate(
        {
          ...state,
          addTemperaments: [...state.addTemperaments, state.newTemperament],
        },
        dogs,
        temperamentsList
      )
    );
    setState((state) => ({ ...state, newTemperament: "" }));
    document.querySelector("#submitTemp").disabled = true;
  }

  function deSelectTemp(e) {
    setState((state) => ({
      ...state,
      [e.target.name]: state[e.target.name].filter(
        (el) => el !== e.target.value
      ),
    }));
    setError(
      validate(
        {
          ...state,
          [e.target.name]: state[e.target.name].filter(
            (el) => el !== e.target.value
          ),
        },
        dogs,
        temperamentsList
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    Object.entries(error).length < 1
      ? postDog({
          name: state.name,
          image: state.image || defaultDog,
          temperaments: state.temperaments,
          weight: `${state.min_weight}-${state.max_weight}`,
          height: `${state.min_height}-${state.max_height}`,
          life_span: `${state.min_life_span}-${state.max_life_span}`,
          addTemperaments: state.addTemperaments?.map((el) => ({ name: el })),
        })
      : alert("Dog not created, required fields need to be completed");

    Object.entries(error).length < 1 && setState(initialState);
    Object.entries(error).length < 1 && history.push(`/home`);
  }

  return (
    <div className={styles.formComponent}>
      <NavBar></NavBar>
      <h3 className={styles.tittle}>Add a Dog Breed!..</h3>
      <div className={styles.imgDiv}>
        <img className={styles.img} src={img} alt="dogs" />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formBox}>
          <div className={styles.field}>
            <label to="name">Name *:</label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              placeholder="name.."
            ></input>
          </div>
          <p>{error.name && error.name}</p>
          <div className={styles.maxMin}>
            <div className={styles.fieldmaxMin}>
              <label to="min_weight">Min weight *: </label>
              <input
                type="text"
                name="min_weight"
                value={state.min_weight}
                onChange={handleChange}
                placeholder="kgs.."
              ></input>
            </div>
            <div className={styles.fieldmaxMin}>
              <label to="max_weight">Max weight *: </label>
              <input
                type="text"
                name="max_weight"
                value={state.max_weight}
                onChange={handleChange}
                placeholder="kgs.."
              ></input>
            </div>
          </div>
          <p>{error.min_weight && error.min_weight}</p>
          <p>{error.max_weight && error.max_weight}</p>
          <p>{error.weight && error.weight}</p>
          <div className={styles.maxMin}>
            <div className={styles.fieldmaxMin}>
              <label to="min_height">Min height *: </label>
              <input
                type="text"
                name="min_height"
                value={state.min_height}
                onChange={handleChange}
                placeholder="cms.."
              ></input>
            </div>
            <div className={styles.fieldmaxMin}>
              <label to="max_height">Max height *: </label>
              <input
                type="text"
                name="max_height"
                value={state.max_height}
                onChange={handleChange}
                placeholder="cms..."
              ></input>
            </div>
          </div>
          <p>{error.min_height && error.min_height}</p>
          <p>{error.max_height && error.max_height}</p>
          <p>{error.height && error.height}</p>
          <div className={styles.maxMin}>
            <div className={styles.fieldmaxMin}>
              <label to="min_life_span">Min life span: </label>
              <input
                type="text"
                name="min_life_span"
                value={state.min_life_span}
                onChange={handleChange}
                placeholder="years.."
              ></input>
            </div>
            <div className={styles.fieldmaxMin}>
              <label to="max_life_span">Max life span: </label>
              <input
                type="text"
                name="max_life_span"
                value={state.max_life_span}
                onChange={handleChange}
                placeholder="years..."
              ></input>
            </div>
          </div>
          <p>{error.life_span && error.life_span}</p>
          <p>{error.min_life_span && error.min_life_span}</p>
          <p>{error.max_life_span && error.max_life_span}</p>
          <div className={styles.field}>
            <label to="image">Picture: </label>
            <input
              type="text"
              name="image"
              value={state.image}
              onChange={handleChange}
              placeholder="URL or data:image.."
            ></input>
          </div>
          <p>{error.image && error.image}</p>
          <div className={styles.field}>
            <label to="temperaments">Add Temperaments *: </label>
            <select
              id="temperaments"
              name="temperaments"
              onChange={selecTemp}
              defaultValue="Temperaments"
            >
              <option value="Temperaments" disabled="disabled">
                Select
              </option>
              {temperamentsList?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <p>{error.temperaments && error.temperaments}</p>
          </div>
          <div className={styles.tempList}>
            {state.temperaments?.map((el) => (
              <p key={el}>
                {
                  temperamentsList?.find((temp) => temp.id === parseInt(el))
                    .name
                }
                <button
                  key={el}
                  name="temperaments"
                  className={styles.buttonTemp}
                  value={el}
                  onClick={deSelectTemp}
                >
                  X
                </button>
              </p>
            ))}
          </div>
          <div className={styles.field}>
            <label to="newTemperament">Create new temperaments:</label>
            <div className={styles.AddTempDisplay}>
              <input
                className={styles.addTempInput}
                type="text"
                name="newTemperament"
                value={state.newTemperament}
                onChange={handleChange}
                placeholder="new temperament..."
              ></input>
              <input
                className={styles.addTempInputSend}
                id="submitTemp"
                type="submit"
                value="Add"
                onClick={addTemperaments}
              ></input>
            </div>
            <p>{error.addTemperaments && error.addTemperaments}</p>
            <p>{error.newTemperament && error.newTemperament}</p>
          </div>
          <div className={styles.tempList}>
            {state.addTemperaments?.map((el) => (
              <p key={el}>
                {el}
                <button
                  key={el}
                  name="addTemperaments"
                  className={styles.buttonTemp}
                  value={el}
                  onClick={deSelectTemp}
                >
                  X
                </button>
              </p>
            ))}
          </div>
          <div className={styles.submitError}> * This fields are required</div>
          <div className={styles.submitError}>
            {" "}
            {error.required && error.required}
          </div>
          <input
            className={styles.submit}
            id="submit"
            type="submit"
            disabled={true}
            value="Add"
          ></input>
        </div>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    dogs: state.dogs,
    temperamentsList: state.temperaments, //si no ingresa antes home no tiene valores
  };
}

export default connect(mapStateToProps, { getTemperaments })(Form);
