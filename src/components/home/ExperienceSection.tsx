import React from 'react';

const experiences = [
  {
    id: '01',
    title: 'XR + MOTION LAB',
    description:
      'Prototype immersive interfaces, motion-driven interactions, and tactile play systems with real hardware on-site.',
    tags: ['VR/AR', 'Sensors', 'Spatial UX'],
    image: '/ps5.webp',
  },
  {
    id: '02',
    title: 'FAB + ROBOTICS',
    description:
      'From laser-cut enclosures to autonomous bots, build the actual machine behind the idea and see it move.',
    tags: ['3D Print', 'Robotics', 'Electronics'],
    image: '/3d.webp',
  },
  {
    id: '03',
    title: 'FLIGHT + PLAY TEST',
    description:
      'Go beyond static prototypes with drones, controllers, and prototype systems made for real world interaction.',
    tags: ['Drone Ops', 'Game Feel', 'Testing'],
    image: '/drone.webp',
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
        Hackathons shouldn&apos;t only be about laptops. We&apos;re bringing hardware you can touch, fly and play, for builders of every track.
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

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center border-2 border-ink bg-ink px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cream -rotate-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
