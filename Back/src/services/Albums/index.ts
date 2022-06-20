import express from 'express';
import Errors from '../../errors';
import _uniqBy from 'lodash/uniqBy';
import { ITunesItem } from './types';
import { CollectionType } from '../../constants';
import { getArtistAlbums } from './services';

export default function albumsController(): express.Router {
	const router = express.Router();

	router.get('/', async (req, res) => {
		const { query } = req;

		if (!query.artist) {
			return res.send(Errors.invalidValue);
		}

		const { data } = await getArtistAlbums((query.artist as string).replace(/ /g, '+'), 200);

		if (!data) {
			return res.send(Errors.notFound);
		}
		
		const filteredResults = data.results.filter((result: ITunesItem) => result.collectionType === CollectionType.ALBUM);
		res.set('Access-Control-Allow-Origin', '*');		
		return res.send(_uniqBy(filteredResults, 'collectionName'));
	});
	
	return router;
};