import { r as reactExports, R as React } from "./react.mjs";
import { u as useLeafletContext, c as createPathComponent, a as updateCircle, b as createElementObject, e as extendContext, d as createLeafletContext, L as LeafletContext, f as createTileLayerComponent, g as updateGridLayer, w as withPane, h as createOverlayComponent } from "./react-leaflet__core.mjs";
import { l as leafletSrcExports } from "./leaflet.mjs";
import "./react-dom.mjs";
function useMap() {
  return useLeafletContext().map;
}
function useMapEvents(handlers) {
  const map = useMap();
  reactExports.useEffect(function addMapEventHandlers() {
    map.on(handlers);
    return function removeMapEventHandlers() {
      map.off(handlers);
    };
  }, [
    map,
    handlers
  ]);
  return map;
}
const CircleMarker = createPathComponent(function createCircleMarker({ center, children: _c, ...options }, ctx) {
  const marker = new leafletSrcExports.CircleMarker(center, options);
  return createElementObject(marker, extendContext(ctx, {
    overlayContainer: marker
  }));
}, updateCircle);
const GeoJSON = createPathComponent(function createGeoJSON({ data, ...options }, ctx) {
  const geoJSON = new leafletSrcExports.GeoJSON(data, options);
  return createElementObject(geoJSON, extendContext(ctx, {
    overlayContainer: geoJSON
  }));
}, function updateGeoJSON(layer, props, prevProps) {
  if (props.style !== prevProps.style) {
    if (props.style == null) {
      layer.resetStyle();
    } else {
      layer.setStyle(props.style);
    }
  }
});
function MapContainerComponent({ bounds, boundsOptions, center, children, className, id, placeholder, style, whenReady, zoom, ...options }, forwardedRef) {
  const [props] = reactExports.useState({
    className,
    id,
    style
  });
  const [context, setContext] = reactExports.useState(null);
  const mapInstanceRef = reactExports.useRef(void 0);
  reactExports.useImperativeHandle(forwardedRef, () => context?.map ?? null, [
    context
  ]);
  const mapRef = reactExports.useCallback((node) => {
    if (node !== null && !mapInstanceRef.current) {
      const map = new leafletSrcExports.Map(node, options);
      mapInstanceRef.current = map;
      if (center != null && zoom != null) {
        map.setView(center, zoom);
      } else if (bounds != null) {
        map.fitBounds(bounds, boundsOptions);
      }
      if (whenReady != null) {
        map.whenReady(whenReady);
      }
      setContext(createLeafletContext(map));
    }
  }, []);
  reactExports.useEffect(() => {
    return () => {
      context?.map.remove();
    };
  }, [
    context
  ]);
  const contents = context ? /* @__PURE__ */ React.createElement(LeafletContext, {
    value: context
  }, children) : placeholder ?? null;
  return /* @__PURE__ */ React.createElement("div", {
    ...props,
    ref: mapRef
  }, contents);
}
const MapContainer = /* @__PURE__ */ reactExports.forwardRef(MapContainerComponent);
const Polygon = createPathComponent(function createPolygon({ positions, ...options }, ctx) {
  const polygon = new leafletSrcExports.Polygon(positions, options);
  return createElementObject(polygon, extendContext(ctx, {
    overlayContainer: polygon
  }));
}, function updatePolygon(layer, props, prevProps) {
  if (props.positions !== prevProps.positions) {
    layer.setLatLngs(props.positions);
  }
});
const TileLayer = createTileLayerComponent(function createTileLayer({ url, ...options }, context) {
  const layer = new leafletSrcExports.TileLayer(url, withPane(options, context));
  return createElementObject(layer, context);
}, function updateTileLayer(layer, props, prevProps) {
  updateGridLayer(layer, props, prevProps);
  const { url } = props;
  if (url != null && url !== prevProps.url) {
    layer.setUrl(url);
  }
});
const Tooltip = createOverlayComponent(function createTooltip(props, context) {
  const tooltip = new leafletSrcExports.Tooltip(props, context.overlayContainer);
  return createElementObject(tooltip, context);
}, function useTooltipLifecycle(element, context, { position }, setOpen) {
  reactExports.useEffect(function addTooltip() {
    const container = context.overlayContainer;
    if (container == null) {
      return;
    }
    const { instance } = element;
    const onTooltipOpen = (event) => {
      if (event.tooltip === instance) {
        if (position != null) {
          instance.setLatLng(position);
        }
        instance.update();
        setOpen(true);
      }
    };
    const onTooltipClose = (event) => {
      if (event.tooltip === instance) {
        setOpen(false);
      }
    };
    container.on({
      tooltipopen: onTooltipOpen,
      tooltipclose: onTooltipClose
    });
    container.bindTooltip(instance);
    return function removeTooltip() {
      container.off({
        tooltipopen: onTooltipOpen,
        tooltipclose: onTooltipClose
      });
      if (container._map != null) {
        container.unbindTooltip();
      }
    };
  }, [
    element,
    context,
    setOpen,
    position
  ]);
});
export {
  CircleMarker as C,
  GeoJSON as G,
  MapContainer as M,
  Polygon as P,
  TileLayer as T,
  Tooltip as a,
  useMapEvents as b,
  useMap as u
};
