# Fractal Explorer

Interactive **Mandelbrot & Julia set** explorer — pan, zoom, and switch between fractals rendered directly on Canvas.

## Features

- Mandelbrot set and Julia set renderers
- Click-to-zoom with smooth pan
- Adjustable iteration depth for detail control
- Color palette selector
- Julia set parameter tuning in real time

## How it works

Each pixel maps to a complex number `c`. The renderer iterates `z = z² + c` up to N times and colors the pixel based on how quickly the sequence escapes to infinity. Pixels that never escape are part of the set (colored black).

## Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61dafb?style=flat&logo=react&logoColor=black)
![Canvas API](https://img.shields.io/badge/Canvas_API-orange?style=flat)
![Vite](https://img.shields.io/badge/Vite-646cff?style=flat&logo=vite&logoColor=white)

## Run locally

```bash
npm install
npm run dev
```

---

Made by [9bzero](https://github.com/9bzero)
