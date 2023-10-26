1.
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX dbc: <http://dbpedia.org/resource/Category:>

SELECT ?country ?population
WHERE {
  	?country a dbo:Country ;
      dct:subject dbc:Eastern_European_countries ;
      dbo:populationTotal ?population .
}
ORDER BY DESC(?population)

2.
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX dbc: <http://dbpedia.org/resource/Category:>

SELECT ?countryName (GROUP_CONCAT(DISTINCT ?languageNameUpper; separator=" | ") as ?languageName)
WHERE {
  {
    ?country a dbo:Country ;
      rdfs:label ?countryName ;
      dct:subject dbc:Countries_in_Europe .
    FILTER (regex(str(?countryName), "^A"))
  }
  UNION 
  {
    ?country a dbo:Country ;
      rdfs:label ?countryName ;
      dct:subject dbc:Countries_in_North_America .
    FILTER (regex(str(?countryName), "^A"))
  }
  OPTIONAL {
    ?country dbo:officialLanguage ?languageRes.
    ?languageRes rdfs:label ?languageName.
    FILTER (LANGMATCHES(LANG(?languageName), "en"))
    BIND(UCASE(?languageName) as ?languageNameUpper)
  }
}

ORDER BY ?countryName

3.
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>

SELECT ?laureate ?birthdate
WHERE {
  ?laureate dbo:award dbr:Nobel_Prize_in_Physics ;
    dbo:birthDate ?birthdate .
}

ORDER BY ?birthdate
----------
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>

SELECT ?university (COUNT(?laureate) as ?laureateCount)
WHERE {
  ?laureate dbo:award dbr:Nobel_Prize_in_Physics ;
    dbo:almaMater ?university .
}

GROUP BY ?university
ORDER BY DESC(?laureateCount)
LIMIT 10
----------
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>

SELECT (COUNT(DISTINCT ?laureate) as ?laureates)
WHERE {
  ?laureate dbo:award dbr:Nobel_Prize_in_Physics ;
    dbo:birthPlace ?birthPlace ;
    dbo:almaMater ?university .
  ?university dbo:location ?universityLocation .
  FILTER (?birthPlace != ?universityLocation)
}