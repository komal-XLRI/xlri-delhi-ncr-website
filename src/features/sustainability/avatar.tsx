import Image from 'next/image';

/** "Dr. Sakshi Singhal" → "SS", "Fr. J. Dayal, SJ" → "JD", "Sr. Asha Paul" → "AP": title and suffix dropped. */
export const initials = (name: string) => {
  const parts = name
    .replace(/,.*$/, '')
    .split(/\s+/)
    .filter((part) => !/^(Dr|Fr|Sr|Mr|Ms|Mrs|Prof)\.$/.test(part));
  return `${parts[0]?.[0] ?? ''}${parts.length > 1 ? (parts.at(-1)?.[0] ?? '') : ''}`;
};

const BOX = {
  sm: 'size-14 text-lg ring-2',
  md: 'size-20 text-2xl ring-4',
  lg: 'size-28 text-3xl ring-4',
} as const;
const SIZES = { sm: '56px', md: '80px', lg: '112px' } as const;

/**
 * A round portrait, or a brand-blue monogram when there is no photograph — a
 * silhouette would read as a missing image. The ring turns lime when the
 * enclosing `group` is hovered. Shared by the Sustainability pages.
 */
export function Avatar({
  name,
  photo,
  size,
}: {
  name: string;
  photo?: string | undefined;
  size: keyof typeof BOX;
}) {
  const box = BOX[size];
  if (photo) {
    return (
      <span
        className={`relative block shrink-0 overflow-hidden rounded-full ring-accent-100 transition-shadow duration-500 group-hover:ring-accent-surface ${box}`}
      >
        <Image
          src={photo}
          alt=""
          fill
          sizes={SIZES[size]}
          className="object-cover object-[center_20%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.06]"
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand font-serif text-white ring-accent-100 transition-shadow duration-500 group-hover:ring-accent-surface ${box}`}
    >
      {initials(name)}
    </span>
  );
}
