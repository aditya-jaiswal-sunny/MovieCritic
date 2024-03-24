import express from 'express';
import movieRoute from './movie.route.js';
import reviewRoute from './review.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/movie',
    route: movieRoute,
  },
  {
    path: '/review',
    route: reviewRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
