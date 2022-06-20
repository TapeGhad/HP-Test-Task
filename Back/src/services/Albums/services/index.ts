import { ITUNES_URL, ResourceType } from '../../../constants';
import { logger } from '../../../config/logger';
import { ITunesItem } from '../types';
import axios, { AxiosResponse } from 'axios';

export const getArtistAlbums = async (artist: string, limit: number): Promise<AxiosResponse<{ results: ITunesItem[] }>> => {
	const url = `${ITUNES_URL}/search`;
	
	try {
		return await axios.get(url, { params: { term: artist, limit, entity: ResourceType.ALBUM }});
	}
	catch (error) {
		logger.error(error);
		return error;
	}
};