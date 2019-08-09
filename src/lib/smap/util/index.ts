/*
Tady budou žít různé užitečné funkce. Příklad je možná zrovna z kategorie toho, co pokrývá proj4, ale to nevadí.
*/
import { BBox, Coords } from '../model/types';

export function coordsInBBox(coords: Coords, bbox: BBox): boolean {
	return (
		coords.longitude <= bbox.rightBottom.longitude
		&& coords.longitude >= bbox.leftTop.longitude
		&& coords.latitude <= bbox.rightBottom.latitude
		&& coords.latitude >= bbox.leftTop.latitude
	);
}
