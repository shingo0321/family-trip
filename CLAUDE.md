# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, frontend-only website (no build step, no dependencies) that displays a family trip's itinerary/timetable, a map of visited places, and a packing checklist. Open `index.html` directly in a browser to preview.

## Architecture

- `data.js` — all content (title, itinerary, packing list). This is the **only file meant to be edited** when updating trip details; look for `TODO:` markers.
- `app.js` — pure rendering: reads `TRIP_DATA` from `data.js` and renders three tab panels (itinerary, map, packing list) into the DOM on load. Also handles tab switching and touch-swipe between tabs.
  - The map tab has no real map — it auto-derives a unique list of `place` values from the itinerary and links each to a Google Maps search URL.
  - Packing list checkbox state is persisted per-browser in `localStorage` (keyed by `packing:<category>:<item>`), not shared between users.
- `index.html` / `style.css` — structure and styling; not expected to need changes for routine content updates.

## Notes

- No test suite, linter, or build/package manifest — this is intentionally dependency-free static HTML/CSS/JS.
