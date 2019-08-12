/*
Tady budou žít různé užitečné funkce. Příklad je možná zrovna z kategorie toho, co pokrývá proj4, ale to nevadí.
*/
import { BBox, Coords, Viewport, ViewportAction } from '../model/types';

export function coordsInBBox(coords: Coords, bbox: BBox): boolean {
	return (
		coords.longitude <= bbox.rightBottom.longitude
		&& coords.longitude >= bbox.leftTop.longitude
		&& coords.latitude <= bbox.rightBottom.latitude
		&& coords.latitude >= bbox.leftTop.latitude
	);
}

export function equalCoords(first: Coords, second: Coords): boolean {
	return (
		first.latitude === second.latitude
		&& first.longitude === second.longitude
		&& first.altitude === second.altitude
	);
}

export function updateViewport(prev: Viewport, next: Viewport): ViewportAction {
	const coords = equalCoords(prev.center, next.center) ? {} : { coords: next.center };
	const zoom = prev.zoom === next.zoom ? {} : { zoom: next.zoom };

	const actions = {
		...coords,
		...zoom,
	};

	// eslint-disable-next-line no-console
	console.log(actions);

	return actions;
}
