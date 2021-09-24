export const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 400,
        duration: 0.4,
      },
    },
  },
  retina_detect: true,
}
