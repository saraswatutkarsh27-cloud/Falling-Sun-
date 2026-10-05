import React from 'react';

const experiences = [
  {
    id: '01',
    title: '3D PRINTERS',
    description:
      'Print mounts, brackets, and enclosures for your robot, then test the physical part in the same build window. [CONFIRM: STL queue and print request flow].',
    pill: 'PRINT YOUR PARTS',
    image: '/3d.webp',
  },
  {
    id: '02',
    title: 'FPV DRONES',
    description:
      'Fly in a supervised zone, tune sensor and flight logic, and turn robotics ideas into a live demo. [CONFIRM: safety rules].',
    pill: 'FLY YOUR IDEA',
    image: '/fpvdrone.png',
  },
  {
    id: '03',
    title: 'PS5 ZONE',
    description:
      'Reset, recharge, and play a bit before the next build push. It sparks Game Dev ideas and keeps the team sharp. [CONFIRM: timed slots].',
    pill: 'RESET AND PLAY',
    image: '/ps5.webp',
  },
];

export const ExperienceSection: React.FC = () => (
  <section id="experience" className="relative py-28 px-6 md:px-12 bg-bg overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="mb-6">
        <span className="inline-flex items-center border-2 border-ink bg-yellow px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-ink -rotate-1">
          BRINGING TO THE HACKATHON
        </span>
      </div>

      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-cream tracking-tight leading-none -rotate-1 inline-block">
        TECH YOU NEED TO EXPERIENCE
      </h2>

      <p className="mt-6 max-w-3xl text-cream text-lg md:text-xl font-medium leading-relaxed">
        Hackathons should not live on laptops alone. We are bringing hardware you can touch, fly, and play with.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {experiences.map((item, index) => (
          <article
            key={item.id}
            className={`group relative card overflow-hidden border-2 border-ink bg-cream text-ink ${
              index % 2 === 0 ? '-rotate-1' : 'rotate-1'
            }`}
          >
            <div className="overflow-hidden border-b-[3px] border-ink">
              <img
                src={item.image}
                alt={item.title}
                className="block w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5 md:p-6">
              <span className="font-hand text-xl text-brown">NO. {item.id}</span>

              <h3 className="mt-2 font-display text-3xl leading-none text-bg uppercase">
                {item.title}
              </h3>

              <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-muted font-medium">
                {item.description}
              </p>

              <div className="mt-5">
                <span className="inline-flex items-center border-2 border-ink bg-ink px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cream -rotate-1">
                  {item.pill}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
