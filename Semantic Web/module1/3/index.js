const { SparqlClient } = require('sparql-http-client');

const endpoint = 'http://example.com/sparql-endpoint';
const client = new SparqlClient({ endpoint });

const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ex: <http://example.com/ontology#>

SELECT ?company ?name ?foundingDate
WHERE {
  ?company rdf:type ex:Company .
  ?company ex:country "Україна" .
  ?company ex:industry "IT" .
  ?company ex:name ?name .
  ?company ex:foundingDate ?foundingDate .
}
ORDER BY ?foundingDate
`;

client.query.select(query)
  .execute()
  .then((results) => {
    const companies = results.bindings.map((binding) => {
      const companyURI = binding.company.value;
      const companyName = binding.name.value;
      const foundingDate = binding.foundingDate.value;
      return { uri: companyURI, name: companyName, foundingDate };
    });

    companies.sort((a, b) => a.foundingDate.localeCompare(b.foundingDate));

    companies.forEach((company) => {
      console.log(`Підприємство: ${company.name}`);
      console.log(`Дата заснування: ${company.foundingDate}`);
      console.log(`URI: ${company.uri}`);
      console.log('-------------------');
    });
  })
  .catch((error) => {
    console.error('Помилка при виконанні SPARQL-запиту:', error);
  });
