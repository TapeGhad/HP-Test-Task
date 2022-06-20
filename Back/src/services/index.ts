import express from 'express';
import albumsController from './Albums';

export default function apiController(): express.Router {
	const router = express.Router();
	
	router.use("/albums", albumsController());

	return router;
};