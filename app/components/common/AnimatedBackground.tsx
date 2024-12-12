import { useCallback, useEffect, useState } from 'react';
import { Particles } from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import type { Container, Engine, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

export default function AnimatedBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log('Particles container loaded', container);
  }, []);

  const particlesOptions: ISourceOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
        },
      },
      color: {
        value: ['#0369a1', '#ffffff', '#ff7d37', '#1f2937'],
      },
      shape: {
        type: ['line', 'circle'],
      },
      opacity: {
        value: 0.4,
      },
      size: {
        value: { min: 1, max: 4 },
      },
      links: {
        enable: true,
        distance: 150,
        color: '#808080',
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 5,
        direction: 'none',
        random: false,
        straight: false,
        outModes: 'out',
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab',
        },
        onClick: {
          enable: true,
          mode: 'push',
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };

  return init ? (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={particlesOptions}
      className="w-full h-[100dvh] absolute top-0 left-0 -z-[900]"
    />
  ) : (
    <></>
  );
}
