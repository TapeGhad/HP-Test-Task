import type { Album } from '@/types';
import axios, { AxiosResponse } from 'axios';

const backUrl = `${import.meta.env.VITE_APP_BACK_URL}/api`;

export const getAlbums = async (artist: string): Promise<AxiosResponse<Album[]>> => {
	const url = `${backUrl}/albums?artist=${artist}`;
	
	try {
		return await axios.get(url);
	}
	catch (error) {
		throw { error };
	}
};