import React, { useEffect, useState, FormEvent } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { searchForHospitals, HospitalResponse } from '../apis/infomed';

/**
 * Renders a hospital search page. It is parametrized by the location provided
 * by React router to allow for deep linking. The following query parameters
 * are used:
 * * `q`: the search text.
 */
export default () => {
  // Get the location from React Router and extract the search text parameter.
  const location = useLocation();
  const locationQueryString = new URLSearchParams(location.search);
  const locationSearchText = locationQueryString.get('q') || '';

  // Use React hooks for state. The trick with `searchText` is to initialize
  // this piece with `locationSearchText`; if it's changed later, it's going to
  // be reflected in the state, but the location (URL) will only change if the
  // form is submitted.
  const [searchText, setSearchText] = useState(locationSearchText)

  // Search results are initially empty, until they arrive from the server.
  const [searchResults, setSearchResults] = useState<HospitalResponse[]>([]);

  // History object, for pushing URL changes.
  const history = useHistory();

  // We query the API for search results. Note that the useEffect() callback
  // needs to be synchronous, so we execute an anonymous asynchronous function
  // internally.
  useEffect(
    () => {
      (async () => {
        const results = await searchForHospitals(locationSearchText, { lat: 0, long: 0 });
        setSearchResults(results);
      })();
    },
    // Re-evaluate this effect only if the search text in URL changes.
    [locationSearchText]
  );

  // The search text in URL changes when we submit the form, not whenever the
  // search box changes content.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    history.push(`?q=${encodeURIComponent(searchText)}`);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
      </form>
      <ul>
        {searchResults.map(sr => (
          <li><a href={sr.admissionFormLink}>{sr.name}</a> ({sr.coords.lat}, {sr.coords.long})</li>
        ))}
      </ul>
    </>
  )
}