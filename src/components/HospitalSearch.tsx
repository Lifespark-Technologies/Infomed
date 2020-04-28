import React, { useEffect, useState, FormEvent } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { searchForHospitals, HospitalResponse } from '../apis/infomed';

export default () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<HospitalResponse[]>([]);

  const locationQueryString = new URLSearchParams(location.search);
  const locationQuery = locationQueryString.get('q') || '';

  const [query, setQuery] = useState(locationQuery)
  const history = useHistory();

  useEffect(() => {
    (async () => {
      setSearchResults(await searchForHospitals(locationQuery, { lat: 0, long: 0 }));
    })();
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    history.push(`?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
      </form>
      <ul>
        {searchResults.map(sr => (
          <li><a href={sr.admissionFormLink}>{sr.name}</a> ({sr.coords.lat}, {sr.coords.long})</li>
        ))}
      </ul>
    </>
  )
}