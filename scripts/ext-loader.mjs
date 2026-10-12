export async function resolve(specifier, context, nextResolve) {
  if (
    (specifier.startsWith('./') || specifier.startsWith('../')) &&
    !/\.[a-z]+$/i.test(specifier)
  ) {
    return nextResolve(`${specifier}.js`, context);
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.includes('/src/theme/') && url.endsWith('.js')) {
    const loaded = await nextLoad(url, { ...context, format: 'module' });
    return { ...loaded, format: 'module' };
  }
  return nextLoad(url, context);
}
