const CACHE_LIMIT = 5000;
const STEP_CACHE = new Map();
const ATTRIBUTE_CACHE = new Map();

function cacheSet(cache, key, value) {
  if (cache.size > CACHE_LIMIT)
    cache.clear();
  cache.set(key, value);
  return value;
}

export function parsePortalStep(raw) {
  raw = String(raw);
  const cached = STEP_CACHE.get(raw);
  if (cached)
    return cached;

  const portalEnd = raw.search(/[._]|$/);
  const portal = raw.slice(0, portalEnd);
  const params = [];
  const values = [];
  const underscores = [];
  const dots = [];

  for (let i = portalEnd; i < raw.length;) {
    const separator = raw[i++];
    const nextSeparator = raw.slice(i).search(/[._]|$/);
    const end = i + nextSeparator;
    const value = raw.slice(i, end);
    const param = Object.freeze({ separator, value });
    params.push(param);
    values.push(value);
    (separator === "_" ? underscores : dots).push(value);
    i = end;
  }

  return cacheSet(STEP_CACHE, raw, Object.freeze({
    raw,
    portal,
    params: Object.freeze(params),
    values: Object.freeze(values),
    underscores: Object.freeze(underscores),
    dots: Object.freeze(dots),
  }));
}

export function parseAttributeName(name) {
  name = String(name);
  const cached = ATTRIBUTE_CACHE.get(name);
  if (cached)
    return cached;

  const rawSteps = Object.freeze(name.split(":"));
  const steps = Object.freeze(rawSteps.map(parsePortalStep));
  return cacheSet(ATTRIBUTE_CACHE, name, Object.freeze({
    raw: name,
    rawSteps,
    steps,
    trigger: steps[0],
    reactions: Object.freeze(steps.slice(1)),
  }));
}

export function getPortalName(raw) {
  return parsePortalStep(raw).portal;
}

export function getTriggerName(attributeName) {
  return parseAttributeName(attributeName).trigger.portal;
}
