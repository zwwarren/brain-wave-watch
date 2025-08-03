import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				medical: {
					bg: 'hsl(var(--medical-bg))',
					surface: 'hsl(var(--medical-surface))',
					border: 'hsl(var(--medical-border))'
				},
				status: {
					healthy: 'hsl(var(--status-healthy))',
					warning: 'hsl(var(--status-warning))',
					critical: 'hsl(var(--status-critical))',
					offline: 'hsl(var(--status-offline))'
				},
				chart: {
					primary: 'hsl(var(--chart-primary))',
					secondary: 'hsl(var(--chart-secondary))',
					grid: 'hsl(var(--chart-grid))'
				}
			},
			backgroundImage: {
				'gradient-medical': 'var(--gradient-medical)',
				'gradient-pulse': 'var(--gradient-pulse)',
				'gradient-alert': 'var(--gradient-alert)'
			},
			boxShadow: {
				'medical': 'var(--shadow-medical)',
				'glow': 'var(--shadow-glow)'
			},
			transitionDuration: {
				'smooth': 'var(--transition-smooth)'
			},
			fontFamily: {
				'mono': ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--chart-primary) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(var(--chart-primary) / 0.6), 0 0 60px hsl(var(--chart-primary) / 0.3)'
					}
				},
				'brain-wave': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'data-stream': {
					'0%': { opacity: '0.3' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0.3' }
				},
				'alert-flash': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.3' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'brain-wave': 'brain-wave 3s ease-in-out infinite',
				'data-stream': 'data-stream 1.5s ease-in-out infinite',
				'alert-flash': 'alert-flash 1s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
