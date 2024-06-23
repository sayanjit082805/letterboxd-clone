import { Router } from 'express';
import {
  createMovie,
  listMovies,
  movieDetail,
  popularMovies,
  queryMovies,
} from '../controller/movieController.js';
import protect from '../middleware/authMiddleware.js';

const movieRouter = Router();

movieRouter.use(protect);

// movieRouter.route("/")
//   .get(listMovies)
//    .post(createMovie);

movieRouter.get('/', listMovies);
movieRouter.post('/', createMovie);
movieRouter.get('/popular', popularMovies);
movieRouter.get('/suggestion', queryMovies); // ?search=
movieRouter.get('/details/:id', movieDetail);

export default movieRouter;
