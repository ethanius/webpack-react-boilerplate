import Provider from '../';
import { ViewportAction, Point, Coords } from '../../model/types';

export default class TextProvider extends Provider {
	protected callback(action: ViewportAction): void {
		// eslint-disable-next-line no-console
		console.log(this.map, action);
	}

	pointToCoords(point: Point): Coords {
		// eslint-disable-next-line no-console
		console.log(this.map, point);

		return {
			latitude: 0,
			longitude: 0,
		};
	}

	coordsToPoint(point: Coords): Point {
		// eslint-disable-next-line no-console
		console.log(this.map, point);

		return {
			x: 0,
			y: 0,
		};
	}
}
