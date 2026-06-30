<script lang="ts">
  import type { WaylinePointItem } from "$lib/types";

  const { points }: { points: WaylinePointItem[] } = $props();
  // $inspect(points);
  let mapEl = $state<HTMLDivElement>();
  let map: any;
  let frameId = 0;
  let counter = 0;
  let arc: [number, number][] = [];

  $effect(() => {
    if (!mapEl || !window.maplibregl || !(window as any).turf) return;

    const coords = points.map(
      (p) => [p.longitude, p.latitude] as [number, number],
    );

    // subdivide route into many small steps using Turf
    if (coords.length > 1) {
      const line = (window as any).turf.lineString(coords);
      const dist = (window as any).turf.length(line, { units: "kilometers" });
      const steps = 2500;
      arc = [];
      for (let i = 0; i < dist; i += dist / steps) {
        const pt = (window as any).turf.along(line, i, { units: "kilometers" });
        arc.push(pt.geometry.coordinates as [number, number]);
      }
    } else {
      arc = [coords[0]];
    }
    counter = 0;

    map = new window.maplibregl.Map({
      container: mapEl,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: arc[0] ?? [107.5, 27.7],
      zoom: 13,
      attributionControl: false,
    });

    map.on("load", () => {
      // route line (semi-transparent backdrop)
      map.addSource("route", {
        type: "geojson",
        data: { type: "LineString", coordinates: arc },
      });
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: { "line-color": "#ccc", "line-width": 1.5 },
      });

      // animated point
      map.addSource("drone", {
        type: "geojson",
        data: { type: "Point", coordinates: arc[0] },
      });
      map.addLayer({
        id: "drone-marker",
        type: "circle",
        source: "drone",
        paint: {
          "circle-radius": 5,
          "circle-color": "#c62828",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
      });

      // waypoint dots (colored by height)
      map.addSource("waypoints", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: coords.map((c, i) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: c },
            properties: {
              index: i + 1,
              height: points[i]?.height ?? 0,
              speed: points[i]?.speed ?? 0,
            },
          })),
        },
      });
      map.addLayer({
        id: "waypoint-dots",
        type: "circle",
        source: "waypoints",
        paint: {
          "circle-radius": 3,
          "circle-opacity": 0.6,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "height"],
            0,
            "#4fc3f7", // blue — ground
            50,
            "#81c784", // green — low altitude
            120,
            "#ffb74d", // orange — mid
            220,
            "#e57373", // red — high
          ],
        },
      });

      // tooltip on waypoint hover
      const popup = new window.maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "waypoint-popup",
      });

      map.on("mouseenter", "waypoint-dots", (e: any) => {
        map.getCanvas().style.cursor = "pointer";
        const { index, height, speed } = e.features[0].properties;
        const [lng, lat] = e.features[0].geometry.coordinates;
        popup
          .setLngLat([lng, lat])
          .setHTML(`<strong>#${index}</strong><br>${height}m · ${speed}m/s`)
          .addTo(map);
      });

      map.on("mouseleave", "waypoint-dots", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });

      // fit bounds
      if (arc.length > 1) {
        const bounds = new window.maplibregl.LngLatBounds(arc[0], arc[0]);
        arc.forEach((c) => bounds.extend(c));
        map.fitBounds(bounds, { padding: 30 });
      }

      // start animation
      function animate() {
        if (counter < arc.length) {
          map.getSource("drone").setData({
            type: "Point",
            coordinates: arc[counter],
          });
          counter++;
          frameId = requestAnimationFrame(animate);
        }
      }
      animate();
    });

    return () => {
      cancelAnimationFrame(frameId);
      map?.remove();
    };
  });
</script>

<div bind:this={mapEl} class="map-container"></div>

<style>
  .map-container {
    width: 100%;
    height: 100%;
    min-height: 180px;
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  :global(.waypoint-popup .maplibregl-popup-content) {
    font-size: 0.75rem;
    padding: 0.3rem 0.5rem;
    border-radius: var(--radius-sm);
    background: var(--bg-card);
    color: var(--text-heading);
    border: 1px solid var(--border-card);
    box-shadow: var(--elevation-2);
  }
</style>
