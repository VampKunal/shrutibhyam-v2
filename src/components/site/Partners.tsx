export function Partners() {
  const partners = [
    {
      title: "Capgemini",
      image: "/logos/CAPEGEMINI.webp",
      alt: "Capgemini",
      className: "h-10 w-auto md:h-16 lg:h-10 object-contain",
    },
    {
      title: "DLF",
      image: "/logos/DLF.webp",
      alt: "DLF",
      className: "h-12 w-auto md:h-16 lg:h-10 object-contain",
    },
    {
      title: "Ministry of MSME",
      image: "/logos/MSME_logo_transparent_HD.webp",
      alt: "Ministry of MSME",
      className: "h-14 w-auto md:h-20 lg:h-16 object-contain",
    },
    {
      title: "Ministry of Ayush",
      image: "/logos/MOA.webp",
      alt: "Ministry of Ayush",
      className: "h-30 w-auto md:h-24 lg:h-28 object-contain px-0",
    },
    {
      title: "Delhi Public School",
      image: "/logos/dps.webp",
      alt: "Delhi Public School",
      className: "h-30 w-auto md:h-24 lg:h-28 object-contain px-0",
    },
    {
      title: "Godrej",
      image: "/logos/godrej.webp",
      alt: "Godrej",
      className: "h-30 w-auto md:h-24 lg:h-28 object-contain px-0",
    }
  ];

  return (
    <section className="bg-white py-20 "
      style={{
        backgroundImage: "url('/backdrop5.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center 50%",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12 space-y-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] block">
            Trusted By
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-primary">
            Sessions Conducted At & Certifications
          </h2>
          <div className="w-16 h-px mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 py-6 place-items-center">
          {partners.map(({ title, image, alt, className }) => (
            <div
              key={title}
              title={title}
              className="transition-all duration-500 hover:scale-[1.03] cursor-pointer flex items-center justify-center w-full"
            >
              <img
                src={image}
                alt={alt}
                className={className}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
