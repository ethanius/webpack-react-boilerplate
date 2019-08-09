/*
Tady je popis tvarů objektů, ze kterých se může skládat mapa a nějakých dalších.
Tím, že je mapa samotná v zásadě jen datová struktura, tak už věci jako Marker či Coords nejsou třídy, ale jen datové typy.
*/

/**
 * Geographical coordinates primitive with optional altitude.
 * @typedef {Object} Coords
 * @property {number} longitude Longitude in WGS84
 * @property {number} latitude Latitude in WGS84
 * @property {number} [longitude] Altitude in metres above sea level
 */
export interface Coords {
	longitude: number;
	latitude: number;
	altitude?: number;
}

/**
 * Pixel coordinates primitive with optional z-index.
 * @typedef {Object} Point
 * @property {number} x Horizontal coordinate
 * @property {number} y Vertical coordinate
 * @property {number} [z] Z-index
 */
export interface Point {
	x: number;
	y: number;
	z?: number;
}

/**
 * Map marker.
 * @typedef {Object} Marker
 * @property {Coords} coords Geographical coordinates
 * @property {Point} anchor Pixel coordinates of the marker relative to the geographical coordinates
 * @property {HTMLElement} element HTML representation of the marker
 */
export interface Marker {
	coords: Coords;
	anchor: Point;
	element: HTMLElement;
}

// TODO: domyslet geometrie
export interface Geometry {
	type: any;
}

export interface Layer {
	rasterURLs?: string[];
	vectorURLs?: string[];
	markers?: Marker[];
	geometries?: Geometry[];
}

export interface Viewport {
	center: Coords;
	zoom: number;
	layers: Layer[];
}

/**
 * Bounding box
 * @typedef {Object} BBox
 * @property {Coords} leftTop Left top coordinates
 * @property {Coords} rightBottom Right bottom coordinates
 */
export interface BBox {
	leftTop: Coords;
	rightBottom: Coords;
}

// TODO: spravne typy
export interface Payload {
	action: string;
	entity: any;
	data?: any;
}
