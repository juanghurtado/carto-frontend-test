import axios from "axios";

const BASE_URL = "https://public.carto.com/api/v2/sql?q=";

const client = axios.create();

const getNumberOfCountriesGroupdByContinent = (bounds) => {
  const where = !bounds
    ? ""
    : `WHERE ST_Intersects(the_geom, ST_MakeEnvelope(${bounds[0]}, ${bounds[1]}, ${bounds[2]}, ${bounds[3]}, 4326))`;

  const query = `select continent, COUNT(*) as num_countries FROM public.ne_50m_admin_0_countries ${where} GROUP BY continent ORDER BY num_countries DESC`;

  return client.get(`${BASE_URL}${query}`);
};

const getPopulationPerContinent = (bounds) => {
  const where = !bounds
    ? ""
    : `WHERE ST_Intersects(the_geom, ST_MakeEnvelope(${bounds[0]}, ${bounds[1]}, ${bounds[2]}, ${bounds[3]}, 4326))`;
  const query = `select continent, SUM(pop_est) as population FROM public.ne_50m_admin_0_countries ${where} GROUP BY continent ORDER BY population DESC`;

  return client.get(`${BASE_URL}${query}`);
};

const CartoService = {
  getNumberOfCountriesGroupdByContinent,
  getPopulationPerContinent,
};

export default CartoService;
