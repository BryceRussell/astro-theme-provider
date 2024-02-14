import { dirname, basename, extname, resolve, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import { existsSync } from 'node:fs';
import { AstroError } from 'astro/errors';

// https://github.com/withastro/astro/blob/main/packages/astro/src/assets/consts.ts#L17
const IMAGE_FORMATS = [
	'jpeg',
	'jpg',
	'png',
	'tiff',
	'webp',
	'gif',
	'svg',
	'avif',
]

const CSS_FORMATS = [
	'css',
	'scss',
	'sass',
	'styl',
	'less',
]

const DATA_FORMATS = [
	'json',
	'yaml',
]

const API_FORMATS = [
	'ts',
	'js',
]

export const GLOB_ASTRO = `**.astro`
export const GLOB_API = `**.{${API_FORMATS.join(',')}}`
export const GLOB_CSS = `**.{${CSS_FORMATS.join(',')}}`
export const GLOB_DATA = `**.{${DATA_FORMATS.join(',')}}`
export const GLOB_IMAGES = `**.{${IMAGE_FORMATS.join(',')}}`

export function isImageFile(path: string): boolean {
	return IMAGE_FORMATS.includes(extname(path).slice(1).toLowerCase());
}

export function isCSSFile(path: string): boolean {
	return CSS_FORMATS.includes(extname(path).slice(1).toLowerCase());
}

export function isAPIFile(path: string): boolean {
	return API_FORMATS.includes(extname(path).slice(1).toLowerCase());
}

export function isAstroFile(path: string): boolean {
	return extname(path) === '.astro';
}

export function camelCase(str: string) {
  return str.replace(/(-|<|>|:|"|\/|\\|\||\?|\*)./g, x=>x[1]!.toUpperCase())
}

export function globToModule(
  glob: string | string[],
  path: string,
  cwd: string
) {
  const files = fg.sync(
    [
      glob,
      "!**/node_modules"
    ].flat(), 
    { cwd: resolve(cwd, path), absolute: true }
  )

  const obj: Record<string, string> = {}

  for (const file of files.reverse()) {
    const name = basename(file).slice(0, -extname(file).length)
    obj[name] = file
  }

  return files.every(file => isCSSFile(file))
    ? files
    : obj
}



// Files/Directories/Paths/URLs

// Check if string is an absolute filepath
// Ignores `file://` url paths on purpose
export function isAbsoluteFile(path: string) {
  return isAbsolute(path) && !!extname(path) && existsSync(path)
}


export function validateFile(path?: string, options?: { base?: string }) {
  const { base = "./" } = options || {}

  if (!path || typeof path !== "string") {
    throw new AstroError(`File is undefined`, path)
  }

  // Check if path is a file
  if (!extname(path)) {
    throw new AstroError(`Path is not a file`, path)
  }

  // Check if path is a file URL
  if (path.startsWith('file:/')) {
    path = fileURLToPath(path)
  }

  // Check if path is relative
  if (!isAbsolute(path)) {
    path = resolve(base, path)
  }

  // Check if path exists
  if (!existsSync(path)) {
    throw new AstroError(`Directory does not exist`, path)
  }

  return path
}

export function validateDirectory(path?: string, options?: { base?: string, resolveFile?: boolean }) {
  const { base = "./", resolveFile = true } = options || {}

  if (!path || typeof path !== "string") {
    throw new AstroError(`Path is undefined`, path)
  }

  // Check if path is a file URL
  if (resolveFile && path.startsWith('file:/')) {
    path = dirname(fileURLToPath(path))
  }

  // Check if path is relative
  if (!isAbsolute(path)) {
    path = resolve(base, path)
  }

  // Check if path is a file
  if (resolveFile && extname(path)) {
    path = dirname(path)
  }
  
  // Check if path exists
  if (!existsSync(path)) {
    throw new AstroError(`Directory does not exist`, path)
  }

  return path
}



// Utilities for compiling .d.ts

export function wrapWithBrackets(lines: NestedStringArray, prefix: string = "") {
  return [
    `${prefix}{`,
      lines,
    `}`
  ]
}

// Removes extra whitespace from start of lines, keep nested whitespace
export function normalizeLines(lines: string[]) {
  let extraWhitespace = 0;
  for (let line of lines) {
    if (line.trim()) {
      const whitespace = line.length - line.trimStart().length
      if (!whitespace && whitespace >= extraWhitespace) continue
      extraWhitespace = whitespace
    }
  }
  return lines.map(line => line.trim() && line.slice(extraWhitespace))
}

export class LineBuffer {
  lines: string[] = []
  depth: number

  constructor(type?: string | NestedStringArray, depth: number = 0) {
    if (type) this.add(type, depth)
    this.depth = depth
  }

  add(type: string | NestedStringArray, depth: number = this.depth) {
    if (Array.isArray(type)) {
      depth++
      for (const t of type) {
        this.add(t, depth)
      }
    }
    
    if (typeof type === 'string') {
      if (type.trim()) {
        const lines = type.split('\n')
        if (lines.length > 1) {
          this.add(normalizeLines(lines), depth)
          return
        }
        this.lines.push('\t'.repeat(Math.max(0, depth)) + type)
      }
    }
  }
}