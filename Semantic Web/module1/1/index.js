const $rdf = require('rdflib');
const fs = require('fs');
const store = $rdf.graph();

const data = fs.readFileSync('countrues_info.ttl', 'utf-8');
$rdf.parse(data, store, 'http://example.com/demo/', 'text/turtle');

const countryQuery = `
  PREFIX : <http://example.com/demo/>
  
  SELECT ?country ?neighbor ?neighborPopulation
  WHERE {
    ?country :capital ?capital .
    ?country :population ?countryPopulation .
    ?neighbor :capital ?neighborCapital .
    ?neighbor :population ?neighborPopulation .
    FILTER (?country != ?neighbor)
    FILTER (?neighborPopulation > ?countryPopulation)
  }
`;

const countriesResults = store.each(undefined, $rdf.sym('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), $rdf.sym('http://example.com/demo/Country'));
const countries = [];

countriesResults.forEach(country => {
  const query = $rdf.SPARQLToQuery(countryQuery, false, store);
  query.pat[0].term = country;
  const results = query.execute();
  if (results.length > 0) {
    const countryName = store.any(country, $rdf.sym('http://example.com/demo/country_name')).value;
    const neighborName = store.any(results[0].neighbor, $rdf.sym('http://example.com/demo/country_name')).value;
    const neighborPopulation = results[0].neighborPopulation.value;
    countries.push({ country: countryName, neighbor: neighborName, neighborPopulation });
  }
});

countries.forEach(entry => {
  console.log(`Країна: ${entry.country}, Найбільше населення у сусідній країні: ${entry.neighbor}, Населення: ${entry.neighborPopulation}`);
});
