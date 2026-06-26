// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface Window {
    UnicornStudio?: {
      init: () => void;
      addScene: (opts: {
        elementId: string;
        projectId: string;
        scale?: number;
        dpi?: number;
        fps?: number;
        lazyLoad?: boolean;
        production?: boolean;
        initialVariables?: Record<string, unknown>;
      }) => Promise<{
        destroy: () => void;
        getVariableManifest: () => unknown;
        setVariable: (k: string, v: unknown) => void;
        setVariables: (v: Record<string, unknown>) => void;
      }>;
    };

    maplibregl: {
      Map: new (opts: {
        container: HTMLElement | string;
        style?: string;
        center?: [number, number];
        zoom?: number;
        attributionControl?: boolean;
      }) => {
        on: (event: string, cb: () => void) => void;
        remove: () => void;
        setCenter: (center: [number, number]) => void;
        setZoom: (zoom: number) => void;
        flyTo: (opts: { center?: [number, number]; zoom?: number; duration?: number }) => void;
        addSource: (id: string, source: object) => void;
        addLayer: (layer: object) => void;
        fitBounds: (bounds: [[number, number], [number, number]], opts?: { padding?: number }) => void;
      };
      LngLatBounds: new (sw: [number, number], ne: [number, number]) => object;
      Popup: new (opts?: {
        closeButton?: boolean;
        closeOnClick?: boolean;
        className?: string;
      }) => {
        setLngLat: (coords: [number, number]) => { setHTML: (html: string) => { addTo: (map: object) => void } };
        remove: () => void;
      };
    };
  }
}

export {};
