import { LatLng } from './coordinates';

export interface Size {
    width: number;
    height: number;
    widthUnit?: string;
    heightUnit?: string;
}

export interface Point {
    x: number;
    y: number;
}


export enum MarkerAnimation {
    BOUNCE = 1,
    DROP = 0,
    NONE = null
}


/**
 * InfoWindowOptions object used to define the properties that can be set on a InfoWindow.
 *
 * see: https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions
 *
 */
export interface InfoWindowOptions {

    /**
     * Content to display in the InfoWindow. This can be an HTML element, a plain-text string, or a
     * string containing HTML. The InfoWindow will be sized according to the content. To set an
     * explicit size for the content, set content to be a HTML element with that size.
     */
    content?: string | Node;

    /**
     * Disable auto-pan on open. By default, the info window will pan the map so that it is fully
     * visible when it opens.
     */
    disableAutoPan?: boolean;

    /**
     * Maximum width of the infowindow, regardless of content's width. This value is only considered
     * if it is set before a call to open. To change the maximum width when changing content, call close, setOptions, and then open.
     */
    maxWidth?: number;

    /**
     * The offset, in pixels, of the tip of the info window from the point on the map at whose
     * geographical coordinates the info window is anchored. If an InfoWindow is opened with an anchor,
     * the pixelOffset will be calculated from the anchor's anchorPoint property.
     *
     */
    pixelOffset?: Size;

    /**
     * The LatLng at which to display this InfoWindow. If the InfoWindow is opened with an anchor,
     * the anchor's position will be used instead.
     */
    position?: LatLng;

    /**
     * All InfoWindows are displayed on the map in order of their zIndex, with higher values
     * displaying in front of InfoWindows with lower values. By default, InfoWindows are
     * displayed according to their latitude, with InfoWindows of lower latitudes appearing
     * in front of InfoWindows at higher latitudes. InfoWindows are always displayed in
     * front of markers.
     */
    zIndex?: number;
}


export interface MarkerOptions {

    /**
     * The offset from the marker's position to the tip of an InfoWindow that
     * has been opened with the marker as anchor.
     */
    anchorPoint?: Point;

    /**
     * Which animation to play when marker is added to a map.
     */
    animation?: MarkerAnimation;

    /**
     * If true, the marker receives mouse and touch events.
     * Default value is true.
     */
    clickable?: boolean;

    /**
     * If false, disables cross that appears beneath the marker when dragging.
     * This option is true by default.
     */
    crossOnDrag?: boolean;

    /**
     * Mouse cursor to show on hover
     */
    cursor?: string;

    /**
     * If true, the marker can be dragged. Default value is false.
     */
    draggable?: boolean;

    /**
     * Icon for the foreground. If a string is provided, it is treated as though
     * it were an Icon with the string as url.
     */
    // icon?: string | Icon | Symbol;

    /**
     * Adds a label to the marker. The label can either be a string,
     * or a MarkerLabel object.
     */
    // label?: string | MarkerLabel;

    /**
     * Map on which to display Marker.
     */
    // map?: Map | StreetViewPanorama;

    /**
     * The marker's opacity between 0.0 and 1.0.
     */
    opacity?: number;

    /**
     * Optimization renders many markers as a single static element.
     * Optimized rendering is enabled by default.
     * Disable optimized rendering for animated GIFs or PNGs, or when each
     * marker must be rendered as a separate DOM element (advanced usage only).
     */
    optimized?: boolean;

    /**
     * Marker position. Required.
     */
    position?: LatLng;

    /**
     * Image map region definition used for drag/click.
     */
    // shape?: MarkerShape;

    /**
     * Rollover text
     */
    title?: string;

    /**
     * If true, the marker is visible
     */
    visible?: boolean;

    /**
     * All markers are displayed on the map in order of their zIndex, with
     *  higher values displaying in front of markers with lower values.
     * By default, markers are displayed according to their vertical
     * position on screen, with lower markers appearing in front of
     * markers further up the screen.
     */
    zIndex?: number;
}

export interface PolygonOptions {

    /**
     * Indicates whether this Polygon handles mouse events. Defaults to true.
     */
    clickable?: boolean;

    /**
     * If set to true, the user can drag this shape over the map. The geodesic property defines the mode of dragging. Defaults to false.
     */
    draggable?: boolean;

    /**
     * If set to true, the user can edit this shape by dragging the control points shown at the vertices and on each segment. Defaults to false.
     */
    editable?: boolean;

    /**
     * The fill color. All CSS3 colors are supported except for extended named colors.
     */
    fillColor?: string;

    /**
     * The fill opacity between 0.0 and 1.0
     */
    fillOpacity?: number;

    /**
     * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth. When false, edges of the polygon are rendered as straight lines in screen space. Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions are maintained relative to the surface of the earth. Defaults to false.
     */
    geodesic?: boolean;

    /**
     * Map on which to display Polygon.
     */
    //map?: Map;

    /**
     * The ordered sequence of coordinates that designates a closed loop. Unlike polylines, a polygon may consist of one or more paths. As a result, the paths property may specify one or more arrays of LatLng coordinates. Paths are closed automatically; do not repeat the first vertex of the path as the last vertex. Simple polygons may be defined using a single array of LatLngs. More complex polygons may specify an array of arrays. Any simple arrays are converted into MVCArrays. Inserting or removing LatLngs from the MVCArray will automatically update the polygon on the map.
     */
    paths?: Array<Array<LatLng>>;

    /**
     * The stroke color. All CSS3 colors are supported except for extended named colors.
     */
    strokeColor?: string;

    /**
     * The stroke opacity between 0.0 and 1.0
     */
    strokeOpacity?: number;

    /**
     * The stroke position. Defaults to CENTER. This property is not supported on Internet Explorer 8 and earlier.
     */
    //strokePosition?: StrokePosition;

    /**
     * The stroke width in pixels.
     */
    strokeWeight?: number;

    /**
     * Whether this polygon is visible on the map. Defaults to true.
     */
    visible?: boolean;

    /**
     * The zIndex compared to other polys.
     */
    zIndex?: number;


}