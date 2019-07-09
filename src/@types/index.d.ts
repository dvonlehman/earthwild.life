namespace mapboxgl {
  export interface MapboxOptions {
    /** If true, an attribution control will be added to the map. */
    attributionControl?: boolean;

    bearing?: number;

    /** Snap to north threshold in degrees. */
    bearingSnap?: number;

    bounds?: LatLngLike;

    /** If true, enable the "box zoom" interaction (see BoxZoomHandler) */
    boxZoom?: boolean;

    /** initial map center */
    center?: LngLatLike;

    clickTolerance?: number;

    fitBoundsOptions: { padding: number };

    /**
     * If `true`, Resource Timing API information will be collected for requests made by GeoJSON
     * and Vector Tile web workers (this information is normally inaccessible from the main
     * Javascript thread). Information will be returned in a `resourceTiming` property of
     * relevant `data` events.
     *
     * @default false
     */
    collectResourceTiming?: boolean;

    /**
     * If `true`, symbols from multiple sources can collide with each other during collision
     * detection. If `false`, collision detection is run separately for the symbols in each source.
     *
     * @default true
     */
    crossSourceCollisions?: boolean;

    /** ID of the container element */
    container: string | Element;

    /** String or strings to show in an AttributionControl.
     * Only applicable if options.attributionControl is `true`. */
    customAttribution?: string | string[];

    /** If true, enable the "drag to pan" interaction (see DragPanHandler). */
    dragPan?: boolean;

    /** If true, enable the "drag to rotate" interaction (see DragRotateHandler). */
    dragRotate?: boolean;

    /** If true, enable the "double click to zoom" interaction (see DoubleClickZoomHandler). */
    doubleClickZoom?: boolean;

    /** If true, the map will track and update the page URL according to map position */
    hash?: boolean;

    /**
     * Controls the duration of the fade-in/fade-out animation for label collisions, in milliseconds.
     * This setting affects all symbol layers. This setting does not affect the duration of runtime
     * styling transitions or raster tile cross-fading.
     *
     * @default 300
     */
    fadeDuration?: number;

    /** If true, map creation will fail if the implementation determines that the performance of the created WebGL context would be dramatically lower than expected. */
    failIfMajorPerformanceCaveat?: boolean;

    /** If false, no mouse, touch, or keyboard listeners are attached to the map, so it will not respond to input */
    interactive?: boolean;

    /** If true, enable keyboard shortcuts (see KeyboardHandler). */
    keyboard?: boolean;

    /**
     * If specified, defines a CSS font-family for locally overriding generation of glyphs in the
     * 'CJK Unified Ideographs' and 'Hangul Syllables' ranges. In these ranges, font settings from
     * the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
     * The purpose of this option is to avoid bandwidth-intensive glyph server requests.
     *
     * @default null
     */
    localIdeographFontFamily?: string;

    /**
     * A string representing the position of the Mapbox wordmark on the map.
     *
     * @default "bottom-left"
     */
    logoPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

    /** If set, the map is constrained to the given bounds. */
    maxBounds?: LngLatBoundsLike;

    /** Maximum zoom of the map */
    maxZoom?: number;

    /** Minimum zoom of the map */
    minZoom?: number;

    /** If true, The maps canvas can be exported to a PNG using map.getCanvas().toDataURL();. This is false by default as a performance optimization. */
    preserveDrawingBuffer?: boolean;

    /**
     * The initial pitch (tilt) of the map, measured in degrees away from the plane of the
     * screen (0-60).
     *
     * @default 0
     */
    pitch?: number;

    /**
     * If `false`, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled.
     *
     * @default true
     */
    pitchWithRotate?: boolean;

    /**
     * If `false`, the map won't attempt to re-request tiles once they expire per their HTTP
     * `cacheControl`/`expires` headers.
     *
     * @default true
     */
    refreshExpiredTiles?: boolean;

    /**
     * If `true`, multiple copies of the world will be rendered, when zoomed out.
     *
     * @default true
     */
    renderWorldCopies?: boolean;

    /** If true, enable the "scroll to zoom" interaction */
    scrollZoom?: boolean;

    /** stylesheet location */
    style?: mapboxgl.Style | string;

    /** If  true, the map will automatically resize when the browser window resizes */
    trackResize?: boolean;

    /**
     * A callback run before the Map makes a request for an external URL. The callback can be
     * used to modify the url, set headers, or set the credentials property for cross-origin requests.
     *
     * @default null
     */
    transformRequest?: TransformRequestFunction;

    /** If true, enable the "pinch to rotate and zoom" interaction (see TouchZoomRotateHandler). */
    touchZoomRotate?: boolean;

    /** Initial zoom level */
    zoom?: number;

    /**
     * The maximum number of tiles stored in the tile cache for a given source. If omitted, the
     * cache will be dynamically sized based on the current viewport.
     *
     * @default null
     */
    maxTileCacheSize?: number;
  }
}
