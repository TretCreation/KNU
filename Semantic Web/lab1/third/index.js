const { DataFactory, Writer, Parser } = require('n3');
const fs = require('fs');
const rdf = require('rdflib');
const jsonld = require('jsonld');
const $rdf = require('rdflib');


// Create a new RDF dataset
const { namedNode, literal, defaultGraph, quad } = DataFactory;
const dataset = [];

// Define namespaces
const FOAF = 'http://xmlns.com/foaf/0.1/';
const XSD = 'http://www.w3.org/2001/XMLSchema#';

// Define URIs for individuals
const keithURI = namedNode('http://example.org/Keith');
const emmaURI = namedNode('http://example.org/Emma');

// Add triples to the dataset
dataset.push(
  quad(keithURI, namedNode(FOAF + 'name'), literal('Keith')),
  quad(keithURI, namedNode(FOAF + 'address'), literal('1516 Henry Street, Berkeley, California 94709, USA')),
  quad(keithURI, namedNode(FOAF + 'degree'), literal('Biology Bachelor')),
  quad(keithURI, namedNode(FOAF + 'graduationYear'), literal('2011', namedNode(XSD + 'gYear'))),
  quad(keithURI, namedNode(FOAF + 'interests'), literal('Birds, Ecology, Environment, Photography, Travel')),
  quad(keithURI, namedNode(FOAF + 'visitedCountry'), literal('Canada, France')),
  quad(keithURI, namedNode(FOAF + 'knows'), emmaURI),
);

dataset.push(
  quad(emmaURI, namedNode(FOAF + 'name'), literal('Emma')),
  quad(emmaURI, namedNode(FOAF + 'address'), literal('Carrer de la Guardia Civil 20, 46020 Valencia, Spain')),
  quad(emmaURI, namedNode(FOAF + 'degree'), literal('Chemistry Master')),
  quad(emmaURI, namedNode(FOAF + 'graduationYear'), literal('2015', namedNode(XSD + 'gYear')),
  quad(emmaURI, namedNode(FOAF + 'interests'), literal('Cycling, Music, Travel')),
  quad(emmaURI, namedNode(FOAF + 'visitedCountry'), literal('Portugal, Italy, France, Germany, Denmark, Sweden')),
));

// Serialize the dataset to Turtle format
const turtleWriter = new Writer({ format: 'application/n-triples' });
turtleWriter.addQuads(dataset);
// console.log('dataset', dataset)
// Write the Turtle data to a file
turtleWriter.end((turtleError, turtleResult) => {
  if (!turtleError) {
    fs.writeFileSync('rdf_graph.ttl', turtleResult);
    console.log('Data saved to rdf_graph.ttl');
  } else {
    console.error(turtleError);
  }
});

const store = $rdf.graph();
store.add(
  $rdf.sym(keithURI),
  $rdf.sym(FOAF + 'name'),
  $rdf.literal('Keith')
);
store.add(
  $rdf.sym(keithURI),
  $rdf.sym(FOAF + 'address'),
  $rdf.literal('1516 Henry Street, Berkeley, California 94709, USA')
);
// ... (add other quads)

store.add(
  $rdf.sym(emmaURI),
  $rdf.sym(FOAF + 'visitedCountry'),
  $rdf.literal('Portugal, Italy, France, Germany, Denmark, Sweden')
);

// Serialize to JSON-LD
const jsonldString = $rdf.serialize(undefined, store, keithURI, 'application/ld+json');
console.log(jsonldString);

// const test = () => {
//    // Load the RDF data into a graph using rdflib
//    const store = rdf.graph();
//    const baseUrl = 'http://example.org/'; // Base URL for the RDF data
//    const mimeType = 'text/turtle'; // Specify the MIME type for Turtle

//    // Load the Turtle data into the graph
//    rdf.parse(dataset, store, baseUrl, mimeType);

//    // Visualize the RDF graph
//    console.log('Visualization of the RDF Graph:');
//    console.log(store.toString());

//    // Serialize the RDF graph to JSON-LD
//    const jsonldData = store.toString('application/ld+json');
//    console.log('\nSerialized JSON-LD:');
//    console.log(jsonldData);

//    // Serialize the RDF graph to Turtle
//    const newTurtleData = store.toString('text/turtle');
//    console.log('\nSerialized Turtle:');
//    console.log(newTurtleData);

//    // Serialize the RDF graph to N-Triples
//    const ntriplesData = store.toString('application/n-triples');
//    console.log('\nSerialized N-Triples:');
//    console.log(ntriplesData);
// }

// test()





// // Print all triples
// dataset.forEach((quad) => {
//   console.log(`${quad.subject.value} ${quad.predicate.value} ${quad.object.value}`);
// })

// // Print triples related to Emma
// const emmaTriples = dataset.filter((quad) => quad.subject.equals(emmaURI));
// emmaTriples.forEach((quad) => {
//   console.log(`${quad.subject.value} ${quad.predicate.value} ${quad.object.value}`);
// });

// // Print triples containing names of people
// const nameTriples = dataset.filter((quad) => quad.predicate.value.endsWith('name'));
// nameTriples.forEach((quad) => {
//   console.log(`${quad.subject.value} ${quad.predicate.value} ${quad.object.value}`);
// });
