const { DataFactory, Writer, Parser } = require('n3');
const fs = require('fs');

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
  quad(keithURI, namedNode(FOAF + 'visitedCountry'), literal('Canada')),
  quad(keithURI, namedNode(FOAF + 'visitedCountry'), literal('France')),
  quad(keithURI, namedNode(FOAF + 'knows'), emmaURI),
);

dataset.push(
  quad(emmaURI, namedNode(FOAF + 'name'), literal('Emma')),
  quad(emmaURI, namedNode(FOAF + 'address'), literal('Carrer de la Guardia Civil 20, 46020 Valencia, Spain')),
  quad(emmaURI, namedNode(FOAF + 'degree'), literal('Chemistry Master')),
  quad(emmaURI, namedNode(FOAF + 'graduationYear'), literal('2015', namedNode(XSD + 'gYear')),
  quad(emmaURI, namedNode(FOAF + 'interests'), literal('Cycling, Music, Travel')),
  quad(emmaURI, namedNode(FOAF + 'visitedCountry'), literal('Portugal')),
  quad(emmaURI, namedNode(FOAF + 'visitedCountry'), literal('Italy')),
  quad(emmaURI, namedNode(FOAF + 'visitedCountry'), literal('France')),
  quad(emmaURI, namedNode(FOAF + 'visitedCountry'), literal('Germany')),
  quad(emmaURI, namedNode(FOAF + 'visitedCountry'), literal('Denmark')),
  quad(emmaURI, namedNode(FOAF + 'visitedCountry'), literal('Sweden')),
  quad(emmaURI, namedNode(FOAF + 'age'), literal('36', namedNode(XSD + 'int'))),
));

// Serialize the dataset to Turtle format
const writer = new Writer({ format: 'application/n-triples' });
writer.addQuads(dataset);
const turtleData = writer.end((error, result) => {
  if (error) {
    console.error(error);
  } else {
    // Write the Turtle data to a file
    fs.writeFileSync('rdf_graph.ttl', result);
  }
});

// Print all triples
dataset.forEach((quad) => {
  console.log(`${quad.subject.value} ${quad.predicate.value} ${quad.object.value}`);
});

// Print triples related to Emma
const emmaTriples = dataset.filter((quad) => quad.subject.equals(emmaURI));
emmaTriples.forEach((quad) => {
  console.log(`${quad.subject.value} ${quad.predicate.value} ${quad.object.value}`);
});

// Print triples containing names of people
const nameTriples = dataset.filter((quad) => quad.predicate.value.endsWith('name'));
nameTriples.forEach((quad) => {
  console.log(`${quad.subject.value} ${quad.predicate.value} ${quad.object.value}`);
});
