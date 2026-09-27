# Penjelasan Kode — Website Developer Portofolio (Next.js + Tailwind CSS)

Dokumen ini menjelaskan setiap file dalam proyek dan apa fungsi tiap baris/blok sintaksnya.

---

## 1. `package.json`

Berisi identitas proyek, script, dan daftar library.

```json
"scripts": {
  "dev": "next dev",      // menjalankan server pengembangan (hot reload)
  "build": "next build",  // build ke versi produksi (optimasi)
  "start": "next start",  // menjalankan hasil build produksi
  "lint": "next lint"     // memeriksa kualitas kode
}
```

- `dependencies`: library yang dibutuhkan saat aplikasi berjalan (`next`, `react`, `react-dom`).
- `devDependencies`: library yang hanya dibutuhkan saat development/build (`tailwindcss`, `postcss`, `autoprefixer`, `typescript`, dan paket `@types/...` untuk TypeScript).

---

## 2. `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

- Komentar `/** @type ... */` adalah **JSDoc**: memberi tahu editor tipe data `nextConfig` agar auto-complete bekerja walau file ini JavaScript biasa.
- `reactStrictMode: true` mengaktifkan mode ketat React yang membantu menemukan bug lebih awal saat development.
- `module.exports` adalah cara Node.js mengekspor objek supaya bisa dibaca oleh Next.js.

---

## 3. `tailwind.config.js`

```js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { ... },
      fontFamily: { ... },
    },
  },
  plugins: [],
};
```

- `content`: daftar file yang akan **dipindai** Tailwind untuk mencari nama class (mis. `bg-panel-left`). Jika sebuah file tidak masuk daftar ini, class Tailwind di dalamnya tidak akan pernah dibuatkan CSS-nya (fitur "tree-shaking").
- `theme.extend`: menambah token desain baru **tanpa menghapus** token bawaan Tailwind.
  - `colors`: mendefinisikan warna kustom (`panel-left`, `panel-right`, `accent-mint`, `line-teal`) hasil sampling langsung dari gambar desain, supaya bisa dipakai sebagai class seperti `bg-panel-left` atau `text-accent-mint`.
  - `fontFamily.sans`: mengganti font default dengan `Poppins`.
- `plugins: []`: tempat menambah plugin Tailwind tambahan (tidak dipakai di sini).

---

## 4. `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

PostCSS adalah alat yang memproses CSS. Di sini dipasang dua plugin:
- `tailwindcss`: mengubah class Tailwind menjadi CSS asli.
- `autoprefixer`: menambahkan prefix vendor (`-webkit-`, `-moz-`, dst.) otomatis agar CSS kompatibel di berbagai browser.

---

## 5. `app/globals.css`

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:...");

@tailwind base;
@tailwind components;
@tailwind utilities;
```

- `@import url(...)`: mengambil font Poppins dari Google Fonts.
- Tiga baris `@tailwind`: ini adalah **direktif khusus Tailwind** (diproses oleh PostCSS), masing-masing menyuntikkan:
  - `base` → reset CSS dasar (normalize).
  - `components` → class-class komponen (jarang dipakai manual di sini).
  - `utilities` → seluruh utility class (`flex`, `p-4`, `bg-panel-left`, dst.) yang dipakai di `page.tsx`.

---

## 6. `app/layout.tsx` — Root Layout

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Developer Portofolio — Antares Raven Ardiansyah",
  description: "...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-panel-left">{children}</body>
    </html>
  );
}
```

- File ini wajib ada di **Next.js App Router** (folder `app/`). Semua halaman "dibungkus" oleh layout ini.
- `import "./globals.css"`: mengimpor CSS global sekali saja di titik teratas aplikasi.
- `export const metadata`: fitur Next.js untuk mengatur tag `<title>` dan `<meta description>` otomatis (baik untuk SEO), tanpa perlu menulis tag `<head>` manual.
- `RootLayout({ children })`: komponen React yang menerima `children` — yaitu isi halaman (`page.tsx`) — lalu merender kerangka HTML (`<html>`, `<body>`) di sekelilingnya.
- `className="bg-panel-left"`: memberi warna latar ungu ke seluruh `<body>` memakai warna kustom dari `tailwind.config.js`.

---

## 7. `app/page.tsx` — Halaman Utama

Ini file inti yang membangun tampilan sesuai desain. Dibedah per bagian:

### a. Data terpisah dari tampilan

```tsx
const profile = {
  name: "Antares Raven Ardiansyah",
  batch: "RKA 26",
  ...
};

const skills = ["Tailwind CSS", "HTML", "CSS", ...];
```

Data (nama, kampus, daftar skill) dipisah ke dalam variabel/objek di atas komponen. Tujuannya: jika kamu ingin mengganti isi portofolio, cukup ubah bagian ini — tidak perlu mengubah struktur JSX di bawahnya.

### b. Elemen pembungkus & dekorasi SVG

```tsx
<main className="relative min-h-screen w-full overflow-hidden bg-panel-left text-white">
  <svg aria-hidden="true" className="pointer-events-none absolute inset-0 ..." ...>
    <path d="M -100 720 C 400 900, ..." stroke="#4FA6A0" ... />
  </svg>
```

- `relative` + `absolute` (pasangan Tailwind): `<main>` diberi `relative` supaya elemen anak yang `absolute` (SVG garis lengkung) diposisikan relatif terhadapnya, bukan terhadap seluruh halaman.
- `overflow-hidden`: memotong bagian SVG/elemen yang melebihi batas layar.
- `<svg>` berisi elemen `<path>` dengan atribut `d` (path data) memakai perintah kurva Bézier (`C`) untuk meniru garis lengkung tipis warna teal pada desain asli.
- `aria-hidden="true"` dan `pointer-events-none`: menandai elemen ini murni dekoratif, tidak terbaca oleh pembaca layar (aksesibilitas) dan tidak bisa diklik.

### c. Grid dua kolom

```tsx
<div className="relative mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 md:grid-cols-2">
```

- `grid grid-cols-1 md:grid-cols-2`: memakai CSS Grid. Secara default (mobile) hanya **1 kolom** (kolom kiri dan kanan ditumpuk vertikal). Pada layar `md` (≥768px) ke atas, berubah jadi **2 kolom** sejajar — inilah yang membuat desain responsif otomatis tanpa media query manual.
- `max-w-[1600px]`: contoh **arbitrary value** Tailwind (kurung siku `[...]`) untuk nilai custom yang tidak tersedia sebagai utility bawaan.

### d. Kolom kiri — judul & kartu profil

```tsx
<h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
  DEVELOPER<br />PORTOFOLIO.
</h1>
```

- `text-5xl sm:text-6xl lg:text-7xl`: ukuran font membesar bertahap sesuai lebar layar (mobile → tablet → desktop), disebut **responsive utility**.
- `leading-[0.95]`: jarak antar baris dipersempit secara custom agar teks besar terlihat padat seperti desain asli.

```tsx
<Image
  src="/foto-profil.png"
  alt={`Foto ${profile.name}`}
  width={350}
  height={405}
  className="h-full w-full object-cover"
  priority
/>
```

- Komponen `<Image>` dari `next/image` menggantikan tag `<img>` biasa. Next.js otomatis mengoptimasi ukuran file, format, dan lazy-loading.
- `alt={...}`: teks alternatif wajib untuk aksesibilitas dan SEO, di sini digenerate otomatis dari nama profil.
- `object-cover`: gambar mengisi penuh kotak pembungkus tanpa gepeng, memotong bagian yang berlebih (sama seperti `background-size: cover`).
- `priority`: memberi tahu Next.js untuk memuat gambar ini lebih dulu karena tampil di atas layar (hero image).

```tsx
{skills.map((skill) => (
  <li key={skill} className="flex items-center gap-3">
    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
    {skill}
  </li>
))}
```

- `.map()`: fungsi JavaScript array untuk **melahirkan elemen `<li>` secara dinamis** dari array `skills`, jadi kita tidak menulis 8 baris `<li>` manual.
- `key={skill}`: React mewajibkan setiap elemen hasil `.map()` punya `key` unik, agar React efisien saat memperbarui tampilan.
- `<span className="h-1.5 w-1.5 rounded-full bg-white" />`: bulatan kecil putih yang berfungsi sebagai bullet point kustom (menggantikan bullet HTML bawaan `<ul>` yang tampilannya kurang bisa dikontrol).

### e. Kolom kanan — Skills & pengalaman Git

Strukturnya sama seperti kolom kiri: heading (`<h3>`), daftar (`<ul><li>`), dan teks deskripsi biasa memakai `<p>` dengan class `leading-relaxed` (jarak antar baris lebih lega supaya paragraf mudah dibaca).

---

## 8. Ringkasan konsep Tailwind yang dipakai

| Konsep | Contoh di kode | Fungsi |
|---|---|---|
| Utility-first | `p-8`, `mt-10`, `rounded-3xl` | Styling langsung lewat class, tanpa nulis CSS terpisah |
| Responsive prefix | `sm:`, `md:`, `lg:` | Mengubah style pada breakpoint layar tertentu |
| Arbitrary value | `max-w-[1600px]`, `leading-[0.95]` | Nilai custom di luar skala bawaan Tailwind |
| Custom theme token | `bg-panel-left`, `text-accent-mint` | Warna kustom didefinisikan di `tailwind.config.js` |
| State/opacity modifier | `text-white/90` | `/90` = opacity 90% dari warna putih |

---

## 9. Cara menjalankan proyek

```bash
npm install   # pasang semua dependency
npm run dev   # buka http://localhost:3000 untuk development
npm run build # build versi produksi
npm run start # jalankan hasil build produksi
```

Untuk mengganti foto, ganti file `public/foto-profil.png` dengan foto kamu sendiri (nama file harus sama, atau ubah juga `src` di `app/page.tsx`).
