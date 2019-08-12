/*
Tady se děje magie s datovou mapou. Jakákoliv změna se děje pomocí téhle třídy a ta modifikuje
data a vyšle signál všem, co poslouchají. Výhoda je, že rozhraní SMap bude dané, ale co z něj
bude který provider umět zpracovat, to je na něm a je to hezky oddělené.
*/

import { Viewport, ViewportAction } from './types';
import { updateViewport } from '../util';

export default class SMap {
	protected map: Viewport;

	protected callbacks: Function[];

	constructor({
		viewport,
	}: {
		viewport: Viewport,
	}) {
		this.callbacks = [];
		this.map = viewport;
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

	set viewport(viewport: Viewport) {
		const prevViewport: Viewport = this.viewport;
		const action: ViewportAction = updateViewport(this.map, viewport);

		this.map = viewport;

		this.emmit(action, prevViewport);
	}

	get viewport(): Viewport {
		return JSON.parse(JSON.stringify(this.map));
	}

	protected emmit(action: ViewportAction, prevViewport: Viewport) {
		this.callbacks.forEach(callback => callback(action, prevViewport));
	}
}
