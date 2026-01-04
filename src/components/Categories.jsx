import Link from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "French Curls",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPxBZA5ovXY2C01gFTSTm2c8nNVH1GqHGfmLOHegP9yobuCbYS-IC7QEbb7mNHlSq3wDRCKtnqOL5tNtU-_YzGQ-_0p4LXVJv16b2bgHrpffJmBWYp_ApqiwFeqmBDGGx-_EBG49vsCBjMfBZ3a02awunPxjtDQzVD8r4AuEQTlZzpEkO-l-qnZ20GTsDfWHd55FJuQm7NetmF3PwzvJCnM9ffNMY9bdBZSJB-qsY-i2nsFGh9dGqjEQzQcfJZ3eZdAaHNots17dw",
      alt: "Close up of neat cornrow braids texture"
    },
    {
      id: 2,
      name: "Deep Twists",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDE5XJwFspEd40ViNYqsXeoU60Snwkbhbxpb8o20xxg44ot0qNWOxCAP5oy8JzbHY6UYr54uvpdlonTT2aVguDmXsNPozDCEFaDQLqeNya4geHgunWVAC5WLGoWNkit09iS8E_ip-7P84IKW_NyvqnYoWy58Xsz6wZPmE8IflUI_U2lB_eS_CtG3p9AUpNauVfoLa2rTGv_PMhopE2yn2jxYF64nLAEE69W4nmu3i4RCBEz_G_MzMh9G93mzL3rDcHstj4LOUUdRJk",
      alt: "Woman with long passion twists hair style"
    },
    {
      id: 3,
      name: "Italian Curls",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEYinIw4TiI9Y23fs2-bPPl8hcpofc4zAV8sMu0qdF0q7N52A3C0obzD3Im0MPJsg-I4q10aUxOyVQceB2kYc1xyNYIQRyULLIfuHdoKFtqEkq9mwGi1eAr92rtVo9bRdmoAZUA0g_tcwhuP4y7cqWcb5WRpB4CvJ__GGYEXrVBc3Uj-P7y1bc3U8kLHSN7NWTMbjww_wUQFblmXXc3PDZptNUeWa47ygL5B0_yRYPva_MFubGU2jSUpKk0RQAuslAB77xsRbkWDA",
      alt: "Woman wearing faux locs looking to the side"
    },
    {
      id: 4,
      name: "Bone Straight",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCpWoyeAa1TFxXqeU2HK9EtAqGQ7uZZsGkAZGmRKTN1JdVwHH9_abdBWL39dcDiv0wwDp5fZPssWNsyCgd1wmmrfL_sGxecihj52Hbm6jUKpK1bC2CyNUZV6akQPOpaJqal57n9HJm7PqSQMEoJIt0OhZYYjFc35-EFvh_FTSlWwkf4QKpQIf0FjsW4K0oEVDfViHuYfF64P1kRKCSJ9RzXXqPjFouwCXaYXBkbTrbkmpMBX0qVGrcdUwrUo_j2tifF_8Ei8u4wqs",
      alt: "Golden hair jewelry and accessories on dark surface"
    }
  ];

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[#181113] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
          Shop by Texture
        </h2>
        <Link 
          to="/products" 
          className="text-primary text-sm font-bold flex items-center hover:gap-2 transition-all group"
        >
          View All 
          <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {categories.map((category) => (
          <a 
            key={category.id}
            href="#" 
            className="group flex flex-col gap-4 text-center items-center"
          >
            {/* Image Circle */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary/20 transition-all duration-300 p-1">
                <div 
                  className="w-full h-full rounded-full bg-center bg-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${category.image})` }}
                  alt={category.alt}
                />
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </div>

            {/* Category Name */}
            <p className="text-[#181113] dark:text-white text-base font-bold group-hover:text-primary transition-colors">
              {category.name}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Categories;