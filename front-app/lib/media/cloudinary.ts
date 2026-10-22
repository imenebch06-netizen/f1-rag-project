/**
 * Cloudinary delivery helper.
 *
 * Two modes, no code change needed to switch:
 * 1. CLOUDINARY SET — `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is defined:
 *    remote images are proxied through Cloudinary **fetch** delivery
 *    (`/image/fetch/`), which gives f_auto/q_auto + resizing on the fly.
 *    Requires "Unrestricted" image delivery or the source domain
 *    allow-listed under Settings → Security → Restricted media (fetch URLs).
 * 2. DIRECT — env var missing: the original remote URL is used as-is.
 */
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function cldUrl(remote: string, width = 1600): string {
  if (!CLOUD) return remote;
  return (
    `https://res.cloudinary.com/${CLOUD}/image/fetch/` +
    `w_${width},f_auto,q_auto/${encodeURIComponent(remote)}`
  );
}

/** Alias with a car-gallery-friendly name. */
export const carImageUrl = cldUrl;

export const isCloudinaryEnabled = Boolean(CLOUD);
