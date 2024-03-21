# astro-theme-provider

## 0.2.0

### Minor Changes

- 9227ddf: Update author options

  - Added `srcDir` option
  - Updated `pages` to `pageDir`
  - Updated `public` to `publicDir`
  - `schema` is not required and is no longer limited to just objects

- 38e6289: Add support for `/public` folder
- 54bfa24: Add support for Astro Studio inside themes
- 9227ddf: Theme content is now servered from a `/src` folder for better package organization
- 1bdf366: Renamed author option `modules` to `imports`
- 1bdf366: Added support for `default` exports from theme imports
- e1ad713: Warn theme author about missing properties inside `package.json`:
  - Check for `astro-integration` keyword inside `keywords` array
  - Check for `description` property
  - Check for `homepage` property
  - Check for `repository` property
  - Check for `README.md` at root of theme package

### Patch Changes

- d6747f4: **Upgrade deps**:
  - `astro-integration-kit`: `0.5.0` - Themes should now be (_slightly_) faster, now only one Vite plugin is used to resolve imports instead of creating a new plugin for every import `my-theme/css`, `my-them/assets`, etc
  - `astro-pages`: `0.2.0` - Now supports Astro 3.0 or less, `astro-theme-provider` may be able to support older versions?
  - Upgrade dev dependencies `astro` and `@types/node`
- fc925c4: Update package README
