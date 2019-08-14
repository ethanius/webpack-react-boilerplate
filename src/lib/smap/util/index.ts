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

/*
Tohle je ve skutečnosti srdce toho všeho, co se snažím vymyslet. Přihlášení ke sledování stavu a notifikaci o něm
zvládne v ostré aplikaci třeba Redux a není třeba dělat něco svého, ale tohle je to, co z předchozího a následujícího
stavu sestaví objekt s instrukcemi, co změnit, odebrat či přidat. V kombinaci s providerem, který obaluje užití už
nějakého konkrétního mapového SDK (naše Mapy API, Mapbox, webassembly port appkové mapy, Leaflet, URL)
to je to, co způsobí, že se v nějaké mapě něco změní.
*/
export function updateViewport(prev: Viewport, next: Viewport): ViewportAction {
	const coords = equalCoords(prev.center, next.center) ? {} : { coords: next.center };
	const zoom = prev.zoom === next.zoom ? {} : { zoom: next.zoom };

	const actions = {
		...coords,
		...zoom,
	};

	return actions;
}
