import React, { useCallback, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { useFetch } from "./hooks";
import { fetchTerms, fetchBrandsTerms, fetchStyles } from "./api";

import "./App.css";

const renderSelect = (array, onChange, slug = "") => {
  if (slug) {
    const index = slug.indexOf("-");
    const selectedSlug = slug.slice(index + 1);
    const selectedItem = array.find(
      item => item.slug.toLowerCase() === selectedSlug
    );
    const selectValue = (selectedItem && selectedItem.id) || "select";
    return (
      <select value={selectValue} onChange={onChange}>
        <option value="select">Select</option>
        {array.map(arrayItem => (
          <option key={arrayItem.id} value={arrayItem.id}>
            {arrayItem.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <select defaultValue="select" onChange={onChange}>
      <option value="select">Select</option>
      {array.map(arrayItem => (
        <option key={arrayItem.id} value={arrayItem.id}>
          {arrayItem.label}
        </option>
      ))}
    </select>
  );
};

function App(props) {
  const [urlObject, setUrlObject] = useState({
    terms: "",
    brands: "",
    style: ""
  });
  useEffect(() => {
    const pathArray = props.location.pathname.split("/");
    if (pathArray[1].length === 0) return;
    const getUrlParam = value => (value && value.length > 1 ? `/${value}` : "");
    const terms = getUrlParam(pathArray[1]);

    const brands = getUrlParam(pathArray[2]);
    const style = getUrlParam(pathArray[3]);
    setUrlObject({
      terms,
      brands,
      style
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname]);
  const terms = useFetch(fetchTerms);
  const brandsTerms = useFetch(fetchBrandsTerms);
  const styles = useFetch(fetchStyles);
  const onSelectTerms = useCallback(
    e => {
      const selectedTerm = terms.find(term => {
        return term.id == e.target.value;
      });
      if (selectedTerm) {
        setUrlObject({
          ...urlObject,
          terms: `/s-${selectedTerm.slug}`
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [terms]
  );
  const onSelectBrands = useCallback(
    e => {
      const selectedBrand = brandsTerms.find(brand => {
        return brand.id == e.target.value;
      });
      if (selectedBrand) {
        setUrlObject({
          ...urlObject,
          brands: `/b-${selectedBrand.slug}`
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [brandsTerms]
  );
  const onSelectStyles = useCallback(
    e => {
      const selectedStyle = styles.find(style => {
        return style.id == e.target.value;
      });
      if (selectedStyle) {
        setUrlObject({
          ...urlObject,
          style: `/st-${selectedStyle.slug}`
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [styles]
  );
  const isLoading =
    terms.length > 0 && brandsTerms.length > 0 && styles.length > 0;
  return (
    <Router>
      <div className="App">
        <header className="App-header">Autobooking test</header>
        <main className="App-main">
          {isLoading ? (
            <div>
              {renderSelect(terms, onSelectTerms, urlObject.terms)}
              {renderSelect(brandsTerms, onSelectBrands, urlObject.brands)}
              {renderSelect(styles, onSelectStyles, urlObject.style)}
            </div>
          ) : 'Loading..., please wait'}
        </main>
        <Redirect
          to={`${urlObject.terms}${urlObject.brands}${urlObject.style}`}
        />
      </div>
    </Router>
  );
}

const AppWithRouter = withRouter(App);

const Core = () => (
  <Router>
    <AppWithRouter />
  </Router>
);

export default Core;
