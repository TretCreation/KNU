const $rdf = require('rdflib')
const fs = require('fs')

// Define FOAF and XSD
const FOAF = 'http://xmlns.com/foaf/0.1/'
const XSD = 'http://www.w3.org/2001/XMLSchema#'

// Define the RDF store
const store = $rdf.graph()

// Define URIs
const keithURI = 'http://example.org/keith'
const emmaURI = 'http://example.org/emma'

function addPersonData(personURI, name, address, degree, graduationYear, interests, visitedCountry, knows, meet) {
  store.add(
    $rdf.sym(personURI),
    $rdf.sym(FOAF + 'name'),
    $rdf.literal(name)
  )
  store.add(
    $rdf.sym(personURI),
    $rdf.sym(FOAF + 'address'),
    $rdf.literal(address)
  )
  store.add(
    $rdf.sym(personURI),
    $rdf.sym(FOAF + 'degree'),
    $rdf.literal(degree)
  )
  store.add(
    $rdf.sym(personURI),
    $rdf.sym(FOAF + 'graduationYear'),
    $rdf.literal(graduationYear, undefined, $rdf.sym(XSD + 'gYear'))
  )
  store.add(
    $rdf.sym(personURI),
    $rdf.sym(FOAF + 'interests'),
    $rdf.literal(interests)
  )
  store.add(
    $rdf.sym(personURI),
    $rdf.sym(FOAF + 'visitedCountry'),
    $rdf.literal(visitedCountry)
  )
  if (knows) {
    store.add(
      $rdf.sym(personURI),
      $rdf.sym(FOAF + 'knows'),
      $rdf.sym(knows)
    )
  }
  if (meet) {
    store.add(
      $rdf.sym(personURI),
      $rdf.sym(FOAF + 'meet' + '/Parish'+ '/august'+ '/2014'),
      $rdf.literal(meet)
    )
  }
}

addPersonData(
  keithURI,
  'Keith',
  '1516 Henry Street, Berkeley, California 94709, USA',
  'Biology Bachelor',
  '2011',
  'Birds, Ecology, Environment, Photography, Travel',
  'Canada, France',
  keithURI,
  emmaURI
)

addPersonData(
  emmaURI,
  'Emma',
  'Carrer de la Guardia Civil 20, 46020 Valencia, Spain',
  'Chemistry Master',
  '2015',
  'Cycling, Music, Travel',
  'Portugal, Italy, France, Germany, Denmark, Sweden',
  null,
  keithURI
)

// Serialize
const jsonld = $rdf.serialize(undefined, store, null, 'application/ld+json')
console.log(jsonld)
console.log('----------')

const turtle = $rdf.serialize(undefined, store, null, 'text/turtle')
fs.writeFileSync('graph.ttl', turtle)
console.log(turtle)
console.log('----------')

const ntriples = $rdf.serialize(undefined, store, null, 'application/n-triples')
console.log(ntriples)
console.log('----------')

const xml = $rdf.serialize(undefined, store, null, 'application/rdf+xml')
console.log(xml)
console.log('----------')

// Print all triples in the graph
store.statementsMatching(null, null, null).forEach((triple) => {
  console.log(triple.toString())
})

console.log('----------')

// Print triples related to Emma
store.statementsMatching($rdf.sym(emmaURI), null, null).forEach((triple) => {
  console.log(triple.toString())
})

console.log('----------')

// Print triples that contain names of people
store.statementsMatching(null, $rdf.sym(FOAF + 'name'), null).forEach((triple) => {
  console.log(triple.toString())
})