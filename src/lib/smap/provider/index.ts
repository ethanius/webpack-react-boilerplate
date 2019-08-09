/*
Provider (asi budeme chtít přejmenovat) dostává datovou mapu a HTML element, do kterého se má nacpat.
Zaregistruje si callback nad mapou, sleduje změny rozměrů HTML elementu, do kterého se kreslí a na to
patřičně reaguje a hlavně volá metody a funkce konkrétního API, se kterým pracuje (Mapbox, Mapy API,
Melown 3D) podle toho, co přijde do callbacku za akci a data.

Výhoda tohoto přístupu je v tom, že je možné mít jednu mapu a na ní navázaných víc providerů,
je možné mít komplet mapu nastavenou a připravenou, aniž by se někam vykreslovala (tedy mohu mít plně
ready SMap instanci, ale ještě žádný nahozený provider), je možné implementovat v provideru jen něco
z toho, co emituje mapa. Tedy například se můžeme naučit vrstvy, ale už ne markery nebo geometrie, nebo
naopak (třeba ve 3D) budeme v zásadě ignorovat vrstvy, ale jejich obsah, tedy markery a geometrie budeme
chtít kreslit.
*/

import SMap from '../model/smap';
import { Payload, Point, Coords } from '../model/types';

interface Props {
	map: SMap;
	root: HTMLElement;
}

export default abstract class Provider {
	protected map: SMap;

	protected root: HTMLElement;

	constructor({ map, root }: Props) {
		this.map = map;
		this.root = root;

		this.map.addCallback(this.callback);
	}

	destroy() {
		this.map.removeCallback(this.callback);
	}

	protected abstract callback(payload: Payload): void;

	abstract pointToCoords(point: Point): Coords;

	abstract coordsToPoint(point: Coords): Point;
}
