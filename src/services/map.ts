import SMap from '~/lib/smap/model/smap';
import { Viewport } from '~/lib/smap/model/types';
import { TILES_BASE } from './types';

const DEFAULT_VIEWPORT: Viewport = {
	center: {
		longitude: 14.41790,
		latitude: 50.12655,
	},
	zoom: 15,
	layers: [{
		id: 'base',
		rasterURLs: [
			TILES_BASE,
		],
	}],
};

export const MAX_ZOOM: number = 18;
export const MIN_ZOOM: number = 1;

export const map = new SMap({
	viewport: DEFAULT_VIEWPORT,
});
