import { LatLng } from './common';


/**
 *
 * See https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/reference/map#MapOptions
 */
export interface MapOptions {

    /**
     * Color used for the background of the Map div.
     * This color will be visible when tiles have not yet
     * loaded as the user pans. This option can only be set
     * when the map is initialized.
     */
    backgroundColor?: string;

    /**
     * The initial Map center.
     */
    center?: LatLng;

    /**
     * When false, map icons are not clickable. A map icon
     * represents a point of interest, also known as a POI.
     * By default map icons are clickable.
     */
    clickableIcons?: boolean;

    /**
     * Size in pixels of the controls appearing on the map.
     * This value must be supplied directly when creating the Map,
     * updating this value later may bring the controls into
     * an undefined state. Only governs the controls made by
     * the Maps API itself. Does not scale developer created
     * custom controls.
     */
    controlSize?: number;

    /**
     * Enables/disables all default UI. May be overridden individually.
     */
    disableDefaultUI?: boolean;

    /**
     * Enables/disables zoom and center on double click.
     * Enabled by default.
     * Note: This property is not recommended.
     * To disable zooming on double click, you can use the
     * gestureHandling property, and set it to "none".
     */
    disableDoubleClickZoom?: boolean;

    /**
     * If false, prevents the map from being dragged.
     * Dragging is enabled by default.
     * Note: This property is deprecated.
     * To disable dragging on the map, you can use the
     * gestureHandling property, and set it to "none".
     */
    draggable?: boolean;

    /**
     * The name or url of the cursor to display when mousing
     * over a draggable map. This property uses the css cursor
     * attribute to change the icon. As with the css property,
     * you must specify at least one fallback cursor that is
     * not a URL.
     * For example: draggableCursor: 'url(http://www.example.com/icon.png), auto;'.
     */
    draggableCursor?: string;

    /**
     * The name or url of the cursor to display
     * when the map is being dragged.
     * This property uses the css cursor attribute
     * to change the icon. As with the css property,
     * you must specify at least one fallback cursor
     * that is not a URL.
     * For example: draggingCursor: 'url(http://www.example.com/icon.png), auto;'.
     */
    draggingCursor?: string;

    /**
     * The enabled/disabled state of the Fullscreen control.
     */
    fullscreenControl?: boolean;

    /**
     * The display options for the Fullscreen control.
     */
    fullscreenControlOptions?: google.maps.FullscreenControlOptions;

    /**
     * This setting controls how the API handles gestures on the map. Allowed values:
     *  - "cooperative": Scroll events and one-finger touch gestures scroll the page, and do not zoom or pan the map.
     *    Two-finger touch gestures pan and zoom the map. Scroll events with a ctrl key or ⌘ key pressed zoom the map.
     *    In this mode the map cooperates with the page.
     *  - "greedy": All touch gestures and scroll events pan or zoom the map.
     *  - "none": The map cannot be panned or zoomed by user gestures.
     *  - "auto": (default) Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or in an iframe.
     */
    gestureHandling?: string;


    /**
     * The heading for aerial imagery in degrees measured
     * clockwise from cardinal direction North.
     * Headings are snapped to the nearest available
     * angle for which imagery is available.
     */
    heading?: number;

    /**
     * If false, prevents the map from being controlled by the keyboard.
     * Keyboard shortcuts are enabled by default.
     */
    keyboardShortcuts?: boolean;

    /**
     * The initial enabled/disabled state of the Map type control.
     */
    mapTypeControl?: boolean;

    /**
     * The initial display options for the Map type control.
     */
    mapTypeControlOptions?: google.maps.MapTypeControlOptions;

    /**
     * The initial Map mapTypeId. Defaults to ROADMAP.
     */
    mapTypeId?: google.maps.MapTypeId | string;

    /**
     * The maximum zoom level which will be displayed on the map.
     * If omitted, or set to null, the maximum zoom from the current
     * map type is used instead. Valid values: Integers between zero,
     * and up to the supported maximum zoom level.
     */
    maxZoom?: number;

    /**
     * The minimum zoom level which will be displayed on the map.
     * If omitted, or set to null, the minimum zoom from the current map
     * type is used instead. Valid values: Integers between zero,
     * and up to the supported maximum zoom level.
     */
    minZoom?: number;

    /**
     * If true, do not clear the contents of the Map div.
     */
    noClear?: boolean;

    /**
     * The enabled/disabled state of the Pan control.
     * Note: The Pan control is not available in the new set of
     * controls introduced in v3.22 of the Google Maps JavaScript API.
     * While using v3.22 and v3.23, you can choose to use the earlier set
     *  of controls rather than the new controls, thus making the
     * Pan control available as part of the old control set.
     *
     */
    panControl?: boolean;

    /**
     * The display options for the Pan control.
     * Note: The Pan control is not available in
     * the new set of controls introduced in v3.22 of the
     * Google Maps JavaScript API. While using v3.22 and
     * v3.23, you can choose to use the earlier set of
     * controls rather than the new controls,
     * thus making the Pan control available as part
     * of the old control set.
     */
    panControlOptions?: google.maps.PanControlOptions;


    /**
     * Defines a boundary that restricts the area of the map
     * accessible to users. When set, a user can only pan
     * and zoom while the camera view stays inside the
     * limits of the boundary.
     */
    restriction?: google.maps.MapRestriction;

    /**
     * The enabled/disabled state of the Rotate control.
     */
    rotateControl?: boolean;

    /**
     * The display options for the Rotate control.
     */
    rotateControlOptions?: google.maps.RotateControlOptions;

    /**
     * The initial enabled/disabled state of the Scale control.
     */
    scaleControl?: boolean;

    /**
     * The initial display options for the Scale control.
     */
    scaleControlOptions?: google.maps.ScaleControlOptions;

    /**
     * If false, disables zooming on the map using a mouse scroll wheel. The scrollwheel is enabled by default.
     * Note: This property is not recommended. To disable zooming using scrollwheel, you can use the gestureHandling property, and set it to either "cooperative" or "none".
     */
    scrollwheel?: boolean;



    /**
     * A StreetViewPanorama to display when the Street View pegman is dropped on the map. If no panorama is specified, a default StreetViewPanorama will be displayed in the map's div when the pegman is dropped.
     */
    streetView?: google.maps.StreetViewPanorama;

    /**
     * The initial enabled/disabled state of the Street View Pegman control. This control is part of the default UI, and should be set to false when displaying a map type on which the Street View road overlay should not appear (e.g. a non-Earth map type).
     */
    streetViewControl?: boolean;

    /**
     * The initial display options for the Street View Pegman control.
     */
    streetViewControlOptions?: google.maps.StreetViewControlOptions;

    /**
     * Styles to apply to each of the default map types. Note that for satellite/hybrid and terrain modes, these styles will only apply to labels and geometry.
     */
    styles?: Array<google.maps.MapTypeStyle>;


    /**
     * Controls the automatic switching behavior for the angle of
     * incidence of the map. The only allowed values are 0 and 45.
     * The value 0 causes the map to always use a 0° overhead view
     * regardless of the zoom level and viewport.
     * The value 45 causes the tilt angle to automatically
     * switch to 45 whenever 45° imagery is available for the
     * current zoom level and viewport, and switch back to 0
     * whenever 45° imagery is not available (this is the default behavior).
     * 45° imagery is only available for satellite and hybrid map types,
     * within some locations, and at some zoom levels. Note: getTilt
     * returns the current tilt angle, not the value specified by this
     * option. Because getTilt and this option refer to different things,
     * do not bind() the tilt property; doing so may yield unpredictable effects.
     *
     */
    tilt?: number;


    /**
     * The initial Map zoom level. Required.
     * Valid values: Integers between zero,
     * and up to the supported maximum zoom level.
     */
    zoom?: number;


    /**
     * The enabled/disabled state of the Zoom control.
     */
    zoomControl?: boolean;

    /**
     * The display options for the Zoom control.
     */
    zoomControlOptions?: google.maps.ZoomControlOptions;

}