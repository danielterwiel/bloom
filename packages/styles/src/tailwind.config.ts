import type { Config } from "tailwindcss";

/**
 * Shared Tailwind CSS v4 preset configuration.
 *
 * In Tailwind v4, most theming is done via CSS @theme blocks.
 * This preset provides any JavaScript-based configuration needs
 * and ensures consistent settings across the monorepo.
 */
export const preset: Partial<Config> = {
  content: [],
  theme: {
    extend: {},
  },
};

export default preset;
