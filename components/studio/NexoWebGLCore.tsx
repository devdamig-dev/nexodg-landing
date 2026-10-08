"use client"

import { useEffect, useRef, useState } from "react"
import type { MotionValue } from "framer-motion"

type NexoWebGLCoreProps = {
  progress: MotionValue<number>
  reducedMotion: boolean | null
}

const VERTEX_SHADER = `#version 300 es
layout(location = 0) in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2 uResolution;
uniform float uTime;
uniform float uProgress;
uniform vec2 uPointer;
uniform float uReduced;

#define MAX_STEPS 58
#define MAX_DIST 8.0
#define SURF_DIST 0.0018

const vec3 CYAN = vec3(0.0, 0.85098, 0.85098);
const vec3 WHITE = vec3(1.0);

mat2 rot(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float saturate(float value) {
  return clamp(value, 0.0, 1.0);
}

float hash21(vec2 point) {
  point = fract(point * vec2(123.34, 456.21));
  point += dot(point, point + 45.32);
  return fract(point.x * point.y);
}

float sdSphere(vec3 point, float radius) {
  return length(point) - radius;
}

float sdRoundBox(vec3 point, vec3 bounds, float radius) {
  vec3 q = abs(point) - bounds + radius;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - radius;
}

float sdTorus(vec3 point, vec2 radius) {
  vec2 q = vec2(length(point.xz) - radius.x, point.y);
  return length(q) - radius.y;
}

float smoothUnion(float a, float b, float amount) {
  float h = saturate(0.5 + 0.5 * (b - a) / amount);
  return mix(b, a, h) - amount * h * (1.0 - h);
}

float gyroid(vec3 point) {
  return dot(sin(point), cos(point.zxy));
}

float localProgress() {
  return saturate((uProgress - 0.318) / 0.67);
}

float sceneScale(float local) {
  float collapse = smoothstep(0.765, 0.91, local);
  return mix(1.0, 0.12, collapse);
}

vec3 orientPoint(vec3 point, float local) {
  float time = uTime * mix(1.0, 0.0, uReduced);
  float cameraSpin = -0.25 + local * 1.85;
  point.yz *= rot(0.48 + sin(local * 6.283) * 0.12 + uPointer.y * 0.12);
  point.xz *= rot(cameraSpin + time * 0.085 + uPointer.x * 0.16);
  point.xy *= rot(sin(local * 4.2) * 0.09);
  return point;
}

float mapScene(vec3 point) {
  float local = localProgress();
  float scale = sceneScale(local);
  vec3 p = orientPoint(point / scale, local);
  float time = uTime * mix(1.0, 0.0, uReduced);

  float pulse = 1.0 + 0.025 * sin(time * 2.2 + local * 14.0);
  vec3 systemPoint = p / pulse;
  float systemBox = sdRoundBox(systemPoint, vec3(0.58), 0.16) * pulse;
  float systemSphere = sdSphere(systemPoint, 0.76) * pulse;
  float system = mix(systemBox, systemSphere, 0.20 + 0.08 * sin(local * 10.0));

  vec3 designPoint = p;
  designPoint.xy *= rot(-0.12);
  float designShell = sdRoundBox(designPoint, vec3(0.82, 0.48, 0.22), 0.075);
  float designBands = abs(fract((designPoint.y + 1.35) * 3.8) - 0.5) - 0.17;
  float design = max(designShell, designBands * 0.24);

  vec3 techPointA = p;
  vec3 techPointB = p;
  techPointB.xy *= rot(1.5707963);
  float techRingA = sdTorus(techPointA, vec2(0.66, 0.105));
  float techRingB = sdTorus(techPointB, vec2(0.50, 0.075));
  float techSpine = sdRoundBox(p, vec3(0.25, 0.72, 0.25), 0.055);
  float technology = smoothUnion(smoothUnion(techRingA, techRingB, 0.11), techSpine, 0.13);

  vec3 aiPoint = p * 2.72 + vec3(time * 0.09, -time * 0.055, time * 0.07);
  float aiBoundary = sdSphere(p, 0.82);
  float aiField = abs(gyroid(aiPoint)) - 0.105;
  float intelligence = max(aiBoundary, aiField * 0.235);

  float shape = system;
  shape = mix(shape, design, smoothstep(0.20, 0.31, local));
  shape = mix(shape, technology, smoothstep(0.38, 0.52, local));
  shape = mix(shape, intelligence, smoothstep(0.56, 0.70, local));

  return shape * scale;
}

vec3 sceneNormal(vec3 point) {
  vec2 offset = vec2(0.0017, 0.0);
  return normalize(vec3(
    mapScene(point + offset.xyy) - mapScene(point - offset.xyy),
    mapScene(point + offset.yxy) - mapScene(point - offset.yxy),
    mapScene(point + offset.yyx) - mapScene(point - offset.yyx)
  ));
}

float rayMarch(vec3 origin, vec3 direction, out float glow) {
  float distanceTravelled = 0.0;
  glow = 0.0;

  for (int index = 0; index < MAX_STEPS; index++) {
    vec3 point = origin + direction * distanceTravelled;
    float sceneDistance = mapScene(point);
    float absoluteDistance = abs(sceneDistance);
    glow += 0.0105 / (0.035 + absoluteDistance * absoluteDistance * 28.0);

    if (absoluteDistance < SURF_DIST || distanceTravelled > MAX_DIST) {
      break;
    }

    distanceTravelled += max(absoluteDistance * 0.68, 0.009);
  }

  return distanceTravelled;
}

mat3 cameraBasis(vec3 origin, vec3 target) {
  vec3 forward = normalize(target - origin);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
  vec3 up = cross(forward, right);
  return mat3(right, up, forward);
}

float lineGrid(vec2 uv, float density) {
  vec2 coordinates = uv * density;
  vec2 derivative = fwidth(coordinates);
  vec2 grid = abs(fract(coordinates - 0.5) - 0.5) / max(derivative, vec2(0.0001));
  return 1.0 - min(min(grid.x, grid.y), 1.0);
}

void main() {
  vec2 fragment = gl_FragCoord.xy;
  vec2 uv = (fragment * 2.0 - uResolution.xy) / uResolution.y;
  float local = localProgress();
  float time = uTime * mix(1.0, 0.0, uReduced);

  vec2 pointer = uPointer * vec2(0.23, 0.14);
  float cameraArc = mix(-0.12, 0.18, local);
  vec3 origin = vec3(pointer.x, pointer.y, 3.55);
  origin.xz *= rot(cameraArc);
  vec3 target = vec3(pointer.x * 0.16, pointer.y * 0.12, 0.0);
  mat3 camera = cameraBasis(origin, target);
  vec3 direction = normalize(camera * vec3(uv, 1.78));

  float glow = 0.0;
  float distanceTravelled = rayMarch(origin, direction, glow);

  float vignette = 1.0 - smoothstep(0.28, 1.48, length(uv * vec2(0.82, 1.0)));
  float gridMix = smoothstep(0.16, 0.32, local) * (1.0 - smoothstep(0.54, 0.70, local));
  float grid = lineGrid(uv + vec2(time * 0.004, -time * 0.003), mix(4.5, 8.0, gridMix));

  vec3 color = vec3(0.0);
  color += CYAN * grid * (0.012 + 0.028 * gridMix) * vignette;

  vec2 starCell = floor((uv + vec2(time * 0.006, 0.0)) * 42.0);
  float star = step(0.985, hash21(starCell));
  color += mix(WHITE, CYAN, hash21(starCell + 7.3)) * star * 0.075 * vignette;

  if (distanceTravelled < MAX_DIST) {
    vec3 point = origin + direction * distanceTravelled;
    vec3 normal = sceneNormal(point);
    vec3 lightDirection = normalize(vec3(-0.45, 0.68, 0.9));
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float rim = pow(1.0 - max(dot(normal, -direction), 0.0), 2.25);
    float specular = pow(max(dot(reflect(-lightDirection, normal), -direction), 0.0), 22.0);

    float designWeight = smoothstep(0.18, 0.30, local) * (1.0 - smoothstep(0.39, 0.52, local));
    float technologyWeight = smoothstep(0.38, 0.51, local) * (1.0 - smoothstep(0.57, 0.70, local));
    float intelligenceWeight = smoothstep(0.57, 0.70, local);

    float orthogonalPattern = 1.0 - smoothstep(0.03, 0.075, min(
      abs(fract(point.x * 4.5) - 0.5),
      abs(fract(point.y * 4.5) - 0.5)
    ));
    float dataBand = 0.5 + 0.5 * sin((point.y + point.z * 0.35) * 18.0 - time * 2.6);
    float neuralPulse = 0.5 + 0.5 * sin(length(point) * 26.0 - time * 3.2 + local * 12.0);

    vec3 base = mix(CYAN, WHITE, 0.10 + designWeight * 0.34 + technologyWeight * 0.12);
    vec3 surface = base * (0.10 + diffuse * 0.58);
    surface += WHITE * specular * 0.42;
    surface += CYAN * rim * (0.9 + intelligenceWeight * 0.95);
    surface += WHITE * orthogonalPattern * designWeight * 0.22;
    surface += CYAN * dataBand * technologyWeight * 0.22;
    surface += CYAN * neuralPulse * intelligenceWeight * 0.20;
    color += surface;
  }

  float collapse = smoothstep(0.76, 0.92, local);
  float angle = atan(uv.y, uv.x);
  float radius = length(uv);
  float radialStreak = pow(max(0.0, sin(angle * 22.0 + time * 0.7)), 20.0);
  radialStreak *= (1.0 - smoothstep(0.16, 1.05, radius)) * smoothstep(0.02, 0.28, radius);

  color += CYAN * min(glow * 0.018, 0.48);
  color += CYAN * radialStreak * collapse * 0.28;
  color *= 0.78 + vignette * 0.38;

  float scan = exp(-abs(uv.y - mix(0.72, -0.68, local)) * 85.0);
  color += CYAN * scan * 0.10 * (1.0 - collapse * 0.7);

  color = pow(max(color, vec3(0.0)), vec3(0.88));
  outColor = vec4(color, 1.0);
}`

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("NEXODG WebGL shader error", gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  if (!vertexShader || !fragmentShader) return null

  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("NEXODG WebGL program error", gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }

  return program
}

export default function NexoWebGLCore({ progress, reducedMotion }: NexoWebGLCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(progress.get())
  const pointerTargetRef = useRef({ x: 0, y: 0 })
  const pointerCurrentRef = useRef({ x: 0, y: 0 })
  const [webglAvailable, setWebglAvailable] = useState(true)

  useEffect(() => progress.on("change", (value) => {
    progressRef.current = value
  }), [progress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    })

    if (!gl) {
      setWebglAvailable(false)
      return
    }

    const program = createProgram(gl)
    if (!program) {
      setWebglAvailable(false)
      return
    }

    const buffer = gl.createBuffer()
    if (!buffer) {
      setWebglAvailable(false)
      return
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.useProgram(program)

    const resolutionLocation = gl.getUniformLocation(program, "uResolution")
    const timeLocation = gl.getUniformLocation(program, "uTime")
    const progressLocation = gl.getUniformLocation(program, "uProgress")
    const pointerLocation = gl.getUniformLocation(program, "uPointer")
    const reducedLocation = gl.getUniformLocation(program, "uReduced")

    let renderScale = 1
    let animationFrame = 0
    let disposed = false
    let lastTimestamp = performance.now()
    let frameAccumulator = 0
    let frameSamples = 0

    const resize = () => {
      const width = Math.max(1, canvas.clientWidth)
      const height = Math.max(1, canvas.clientHeight)
      const deviceScale = Math.min(window.devicePixelRatio || 1, 1.25)
      const pixelBudgetScale = Math.sqrt(1_350_000 / Math.max(1, width * height))
      const scale = Math.max(0.62, Math.min(deviceScale, pixelBudgetScale)) * renderScale
      const targetWidth = Math.max(1, Math.floor(width * scale))
      const targetHeight = Math.max(1, Math.floor(height * scale))

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth
        canvas.height = targetHeight
        gl.viewport(0, 0, targetWidth, targetHeight)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerTargetRef.current.x = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1
      pointerTargetRef.current.y = -((event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1)
    }

    const handleVisibility = () => {
      lastTimestamp = performance.now()
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    document.addEventListener("visibilitychange", handleVisibility)
    resize()

    const startedAt = performance.now()

    const render = (timestamp: number) => {
      if (disposed) return
      animationFrame = requestAnimationFrame(render)
      if (document.visibilityState !== "visible") return

      const delta = Math.min(60, timestamp - lastTimestamp)
      lastTimestamp = timestamp
      frameAccumulator += delta
      frameSamples += 1

      if (frameSamples >= 90) {
        const average = frameAccumulator / frameSamples
        if (average > 24 && renderScale > 0.72) {
          renderScale = Math.max(0.72, renderScale - 0.12)
          resize()
        } else if (average < 15.5 && renderScale < 1) {
          renderScale = Math.min(1, renderScale + 0.06)
          resize()
        }
        frameAccumulator = 0
        frameSamples = 0
      }

      const pointerTarget = pointerTargetRef.current
      const pointerCurrent = pointerCurrentRef.current
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.055
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.055

      gl.useProgram(program)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, (timestamp - startedAt) / 1000)
      gl.uniform1f(progressLocation, progressRef.current)
      gl.uniform2f(pointerLocation, pointerCurrent.x, pointerCurrent.y)
      gl.uniform1f(reducedLocation, reducedMotion ? 1 : 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    animationFrame = requestAnimationFrame(render)

    return () => {
      disposed = true
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      window.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("visibilitychange", handleVisibility)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [reducedMotion])

  if (!webglAvailable) {
    return (
      <div className="absolute left-1/2 top-1/2 h-[54vmin] w-[54vmin] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full border border-[#00D9D9]/45 shadow-[0_0_120px_rgba(0,217,217,.18)]" />
        <div className="absolute inset-[18%] rotate-45 rounded-full border border-white/18" />
        <div className="absolute inset-[34%] rounded-full border border-[#00D9D9]/55 bg-black" />
      </div>
    )
  }

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
