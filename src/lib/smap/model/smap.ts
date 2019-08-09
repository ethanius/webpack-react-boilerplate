/*
Tady se děje magie s datovou mapou. Jakákoliv změna se děje pomocí téhle třídy a ta modifikuje
data a vyšle signál všem, co poslouchají. Výhoda je, že rozhraní SMap bude dané, ale co z něj
bude který provider umět zpracovat, to je na něm a je to hezky oddělené.
*/

import { Viewport, Payload } from "./types";
import { MAP_UPDATE } from "./actions";

export default class SMap {
	protected mapa: Viewport;
	protected callbacks: Function[];

	constructor() {
		this.callbacks = [];
	}

	addCallback(callback: Function) {
		this.callbacks.push(callback);
	}

	removeCallback(callback: Function) {
		const index = this.callbacks.indexOf(callback);
		if (index !== -1) {
			this.callbacks.splice(index, 1);
		}
	}

	set map(map: Viewport) {
		this.mapa = map;
		const payload: Payload = {
			action: MAP_UPDATE,
			entity: this.mapa,
		};
		this.emmit(payload);
	}

	get map(): Viewport {
		return this.mapa;
	}

	protected emmit(payload: Payload) {
		this.callbacks.forEach(callback => callback(payload));
	}
}
