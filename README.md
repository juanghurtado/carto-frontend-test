# Carto Front-end test: Juan G. Hurtado

## Part 1

Nothing special here. Just learning how to use Deck.gl with `CartoSQLLayer`. And trying to remember how to write React code (nowadays I'm focused on Angular, because that's what's being used on my current company).

## Part 2

https://public.carto.com/api/v2/sql?q=select t.continent, COUNT(\*) as num_countries FROM public.ne_50m_admin_0_countries t WHERE ST_WITHIN(t.the_geom, ST_MakeEnvelope(-410961,4920492,-402305,4926887,3857)) GROUP BY t.continent
