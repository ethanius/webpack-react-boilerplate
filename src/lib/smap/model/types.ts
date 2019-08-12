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
export type Coords = {
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
export type Point = {
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
export type Marker = {
	id: string;
	coords: Coords;
	anchor: Point;
	element: HTMLElement;
}

// TODO: domyslet geometrie
export type Geometry = {
	id: string;
	type: any;
}

export type Layer = {
	id: string;
	rasterURLs?: string[];
	vectorURLs?: string[];
	markers?: Marker[];
	geometries?: Geometry[];
}

export type Viewport = {
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
export type BBox = {
	leftTop: Coords;
	rightBottom: Coords;
}

export type LayerAction = {

}

export type ViewportAction = {
	center?: Coords;
	zoom?: number;
	layers?: {
		remove: LayerAction[],
		update: LayerAction[],
		create: LayerAction[],
	}
}
