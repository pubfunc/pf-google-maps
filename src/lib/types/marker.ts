import { LatLng } from './common';

export enum MarkerAnimation {
    BOUNCE = 1,
    DROP = 0,
    NONE = null
}




export interface MarkerOptions {

    /**
     * The offset from the marker's position to the tip of an InfoWindow that
     * has been opened with the marker as anchor.
     */
    // anchorPoint?: Point;

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
