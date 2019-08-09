import Provider from '../';
import { Payload, Marker, Point, Coords } from '../../model/types';
import { MAP_UPDATE, MARKER_ADD } from '../../model/actions';

export default class MapboxProvider extends Provider {
	protected callback(payload: Payload): void {
		switch (payload.action) {
			case MAP_UPDATE:
				break;

			case MARKER_ADD:
				this.addMarker(payload.entity);
				break;
		}
	}

	private addMarker(marker: Marker) {
		// nejak nahod do mapy marker
		console.log(marker);
	}

	pointToCoords(point: Point): Coords {
		return {
			latitude: 0,
			longitude: 0,
		}
	}

	coordsToPoint(point: Coords): Point {
		return {
			x: 0,
			y: 0,
		}
	}
}
