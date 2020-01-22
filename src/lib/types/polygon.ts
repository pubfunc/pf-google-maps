import { LatLng } from './common';

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