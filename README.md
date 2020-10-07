# Carto Front-end test: Juan G. Hurtado

## Part 1

Nothing special here. Just learning how to use Deck.gl with `CartoSQLLayer`. And trying to remember how to write React code (nowadays I'm focused on Angular, because that's what's being used on my current company).

## Part 2

Learned how to use Carto SQL API. I decided to build a common InfoWidget for both queries (number of countries by continent and population by continent) since both of them build the same UI structure.

## Part 3

I struggled a little bit with a couple of things (not because of being a hard task, just because of my small knowledge of geospatial stuff):

- Find a way to get the bounds of the current viewport
- Limit the SQL API results to that bounding box

I used a debounce function to limit the number of API calls.

## Bonus 1

Couldn't perform this task. It requires a deep knowledge about the "guts" of deck.gl, which I don't have. I could spend some more time trying to do it, but spare time is something I don't have much (with two little daughters requiring my attention at all times… LOL).

What I think I would do to perform this task (after quick look on the deck.gl code) is:

- extend `CartoLayer` to create a `CartoH3HexagonalLayer`
- read data from Carto SQL API in the same way Carto SQL Layer do
- transform data to add a `hex` attribute to each feature, using `geoToH3`from [h3-js](https://github.com/uber/h3-js)
- override `renderLayers` from `CartoLayer` to render an `H3HexagonLayer` using the transformed data

## Bonus 2

On this task I struggled a lot with feature filtering on the map. From the beginning I started using `DataFilterExtensions`, but it only worked on the first render, not reacting to events. Until I found out about `updateTriggers`.

I also used a react library to handle the "selected" status of InfoWidget bars ([react-item-select](https://github.com/goldenshun/react-item-select)). I didn't wanted to struggle with it by myself.

I should find a way to keep selected items in sync between the two InfoWidgets, but I haven't much spare time for this test, so I'll keep moving to "Bonus 1" task
