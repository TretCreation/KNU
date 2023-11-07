PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>

SELECT ?city ?cityLabel ?foundingDate
WHERE {
  ?city a dbo:City ;
        dbo:country dbr:Ukraine ;
        dbo:foundingDate ?foundingDate .
  ?city rdfs:label ?cityLabel .
  FILTER (LANGMATCHES(LANG(?cityLabel), 'en'))
}
ORDER BY ?foundingDate
LIMIT 1