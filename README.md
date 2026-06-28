# fractal-explorer

Pan and zoom through the Mandelbrot and Julia sets. Rendered pixel-by-pixel on a Canvas element.

## What is a fractal?

For the Mandelbrot set, each pixel represents a complex number `c`. We repeatedly apply `z = z² + c` starting from `z = 0`. If the value stays bounded, the point is *in* the set (black). If it escapes to infinity, the pixel is colored based on how many iterations it took — which gives the characteristic gradient edge.

The Julia set is the same idea but with a fixed `c` and varying starting `z`. Tweaking `c` in real time produces wildly different shapes.

## Features

- Mandelbrot and Julia set renderers
- Click to zoom in, right-click to zoom out
- Pan by dragging
- Iteration depth slider (more iterations = more edge detail, slower render)
- Live Julia set parameter control — drag the parameter point on the Mandelbrot view
- Color palette options

## Run

```bash
npm install
npm run dev
```

## Notes

Pure JavaScript/Canvas — no WebGL. Rendering slows down significantly at deep zoom levels (this is a CPU-bound problem). A WebWorker or WebGL implementation would be the right fix; adding that eventually.