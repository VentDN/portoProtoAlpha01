import Image from "next/image";

// Data profil dipisah sebagai objek supaya mudah diganti tanpa menyentuh markup
const profile = {
  name: "Antares Raven Ardiansyah",
  batch: "RKA 26",
  campus: "Institut Teknologi Sepuluh Nopember",
  phone: "+62 859-4714-6953",
  email: "antravenardiansyah@gmail.com",
};

const skills = [
  "Tailwind CSS",
  "HTML",
  "CSS",
  "Javascript",
  "React JS",
  "PHP",
  "Laravel",
];

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-panel-left text-white">
      {/* Garis lengkung dekoratif teal, hanya elemen visual (aria-hidden) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <path
          d="M -100 720 C 400 900, 700 600, 1000 750 S 1600 1000, 2000 700"
          fill="none"
          stroke="#4FA6A0"
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          d="M 900 -50 C 1300 150, 1500 350, 1450 650 S 1700 1050, 2100 950"
          fill="none"
          stroke="#4FA6A0"
          strokeWidth="2"
          opacity="0.5"
        />
      </svg>

      <div className="relative mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 md:grid-cols-2">
        {/* ===== KOLOM KIRI ===== */}
        <section className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
          <div>
            {/* Judul besar + ikon bintang aksen */}
            <div className="relative inline-block">
              <h1 className="text-5xl font-extrabold hover:text-slate-200 leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                DEVELOPER
                <br />
                PORTOFOLIO.
              </h1>
              <span
                aria-hidden="true"
                className="absolute -right-8 -top-4 text-4xl text-[#3cd17c] hover:font-bold sm:-right-10 sm:text-5xl"
              >
                ✳
              </span>
            </div>

            {/* Kartu profil putih */}
            <div className="group">
            <div className="mt-1 flex max-w-xl flex-col gap-6 rounded-3xl bg-white group-hover:bg-[#3cd17c] p-6 text-neutral-800 sm:flex-row sm:items-start">
              <div className="mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-2xl sm:mx-0 sm:h-44 sm:w-44">
                <Image
                  src="/portrait.jpeg"
                  alt={`Foto ${profile.name}`}
                  width={350}
                  height={405}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col gap-1 pt-1">
                <h2 className="text-2xl font-semibold text-[#3cd17c] group-hover:text-white sm:text-3xl">
                  {profile.name}
                </h2>
                <p className="text-sm font-medium text-[#3cd17c] group-hover:text-white">
                  {profile.batch}
                </p>

                <p className="mt-8 text-lg font-medium leading-snug text-[#3cd17c] group-hover:text-white">
                  {profile.campus}
                </p>
              </div>
            </div>
            </div>
          </div>

          {/* Kontak di bagian bawah kolom kiri */}
          <div className="mt-12">
            <p className="text-base">{profile.phone}</p>
            <p className="text-base">{profile.email}</p>
            <div className="mt-4 h-px w-24 bg-line-teal" />
          </div>
        </section>

        {/* ===== KOLOM KANAN ===== */}
        <section className="relative bg-panel-right p-8 sm:p-12 lg:p-16">
          <div className="relative">
            <h3 className="text-2xl font-semibold sm:text-3xl">Skills</h3>
            <ul className="mt-4 space-y-3 text-lg">
              {skills.map((skill) => (
                <li key={skill} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                  {skill}
                </li>
              ))}
            </ul>

            <h3 className="mt-16 text-2xl font-semibold sm:text-3xl">
              Pengalaman Menggunakan Git
            </h3>
            <ul className="mt-4 space-y-2 text-lg">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                Amateur
              </li>
            </ul>
            <p className="mt-2 max-w-md leading-relaxed text-white/90">
              Mampu memanfaatkan basic use git seperti git clone, git commit,
              git pull, dan git push
            </p>
          </div>

          {/* Tanda garis kecil pojok kanan bawah */}
          <div className="absolute bottom-10 right-10 h-px w-16 bg-white/70" />
        </section>
      </div>
    </main>
  );
}
