import type { WeatherState } from "@/lib/weatherCodes";

// Round to 3 decimal places so server-serialised strings and client JS numbers
// are identical, preventing React hydration mismatches on computed SVG coords.
const r = (n: number) => Math.round(n * 1000) / 1000;

export type IllustrationState = WeatherState | "idle" | "loading";

interface WeatherIllustrationProps {
  state: IllustrationState;
}

function SunIllustration() {
  return (
    <svg
      viewBox="0 0 220 220"
      className="absolute -right-6 -top-6 h-52 w-52 opacity-25"
      aria-hidden="true"
    >
      <circle cx="130" cy="90" r="55" fill="white" />
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = r(130 + 65 * Math.cos(rad));
        const y1 = r(90 + 65 * Math.sin(rad));
        const x2 = r(130 + 85 * Math.cos(rad));
        const y2 = r(90 + 85 * Math.sin(rad));
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="white"
            strokeWidth="7"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function PartlyCloudyIllustration() {
  return (
    <svg
      viewBox="0 0 220 180"
      className="absolute -right-4 -top-2 h-44 w-56 opacity-25"
      aria-hidden="true"
    >
      {/* Sun behind cloud */}
      <circle cx="130" cy="60" r="38" fill="white" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={r(130 + 45 * Math.cos(rad))}
            y1={r(60 + 45 * Math.sin(rad))}
            x2={r(130 + 58 * Math.cos(rad))}
            y2={r(60 + 58 * Math.sin(rad))}
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
      {/* Cloud */}
      <ellipse cx="90" cy="105" rx="55" ry="30" fill="white" />
      <circle cx="65" cy="98" r="24" fill="white" />
      <circle cx="105" cy="90" r="32" fill="white" />
      <circle cx="135" cy="100" r="20" fill="white" />
    </svg>
  );
}

function CloudyIllustration() {
  return (
    <svg
      viewBox="0 0 220 160"
      className="absolute -right-4 top-0 h-40 w-56 opacity-20"
      aria-hidden="true"
    >
      {/* Back cloud */}
      <ellipse cx="140" cy="70" rx="58" ry="30" fill="white" />
      <circle cx="115" cy="60" r="26" fill="white" />
      <circle cx="155" cy="52" r="34" fill="white" />
      <circle cx="185" cy="63" r="22" fill="white" />
      {/* Front cloud */}
      <ellipse cx="90" cy="110" rx="65" ry="32" fill="white" />
      <circle cx="58" cy="100" r="28" fill="white" />
      <circle cx="100" cy="90" r="36" fill="white" />
      <circle cx="140" cy="100" r="24" fill="white" />
    </svg>
  );
}

function FogIllustration() {
  return (
    <svg
      viewBox="0 0 220 160"
      className="absolute right-0 top-0 h-40 w-56 opacity-20"
      aria-hidden="true"
    >
      {[30, 60, 90, 110, 130].map((y, i) => (
        <rect
          key={y}
          x={i % 2 === 0 ? 20 : 40}
          y={y}
          width={i % 2 === 0 ? 160 : 140}
          height="12"
          rx="6"
          fill="white"
        />
      ))}
    </svg>
  );
}

function RainIllustration() {
  return (
    <svg
      viewBox="0 0 220 200"
      className="absolute -right-2 -top-2 h-48 w-56 opacity-25"
      aria-hidden="true"
    >
      {/* Cloud */}
      <ellipse cx="120" cy="65" rx="60" ry="28" fill="white" />
      <circle cx="90" cy="55" r="26" fill="white" />
      <circle cx="130" cy="45" r="34" fill="white" />
      <circle cx="165" cy="55" r="22" fill="white" />
      {/* Rain drops */}
      {[70, 90, 110, 130, 150, 80, 100, 120, 140].map((x, i) => {
        const baseY = 105 + (i % 3) * 18;
        return (
          <line
            key={i}
            x1={x}
            y1={baseY}
            x2={x - 8}
            y2={baseY + 20}
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
        );
      })}
    </svg>
  );
}

function SnowIllustration() {
  return (
    <svg
      viewBox="0 0 220 200"
      className="absolute -right-2 -top-2 h-48 w-56 opacity-25"
      aria-hidden="true"
    >
      {/* Cloud */}
      <ellipse cx="120" cy="65" rx="60" ry="28" fill="white" />
      <circle cx="90" cy="55" r="26" fill="white" />
      <circle cx="130" cy="45" r="34" fill="white" />
      <circle cx="165" cy="55" r="22" fill="white" />
      {/* Snowflakes */}
      {[75, 100, 125, 150, 88, 113, 138].map((x, i) => {
        const y = 110 + (i % 3) * 22;
        const r = 5;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="white" />
            <line x1={x - r - 3} y1={y} x2={x + r + 3} y2={y} stroke="white" strokeWidth="2" />
            <line x1={x} y1={y - r - 3} x2={x} y2={y + r + 3} stroke="white" strokeWidth="2" />
          </g>
        );
      })}
    </svg>
  );
}

function StormIllustration() {
  return (
    <svg
      viewBox="0 0 220 200"
      className="absolute -right-2 -top-2 h-48 w-56 opacity-25"
      aria-hidden="true"
    >
      {/* Dark cloud */}
      <ellipse cx="120" cy="65" rx="65" ry="30" fill="white" />
      <circle cx="85" cy="55" r="28" fill="white" />
      <circle cx="130" cy="44" r="36" fill="white" />
      <circle cx="168" cy="55" r="24" fill="white" />
      {/* Lightning bolt */}
      <polygon
        points="125,95 108,135 122,135 105,175 145,120 128,120 148,95"
        fill="white"
      />
    </svg>
  );
}

function IdleIllustration() {
  return (
    <svg
      viewBox="0 0 300 200"
      className="absolute right-0 top-0 h-full w-1/2 opacity-20"
      aria-hidden="true"
    >
      {/* Abstract horizon / location pin + stars */}
      <circle cx="200" cy="60" r="8" fill="white" />
      <circle cx="240" cy="40" r="5" fill="white" />
      <circle cx="175" cy="45" r="4" fill="white" />
      <circle cx="260" cy="70" r="6" fill="white" />
      <circle cx="220" cy="90" r="3" fill="white" />
      {/* Location pin */}
      <circle cx="150" cy="100" r="22" fill="white" />
      <circle cx="150" cy="100" r="10" fill="none" stroke="white" strokeWidth="3" opacity="0.4" />
      <polygon points="138,118 162,118 150,140" fill="white" />
      {/* Waves at bottom */}
      <path
        d="M0 160 Q40 145 80 160 Q120 175 160 160 Q200 145 240 160 Q280 175 300 160 L300 200 L0 200 Z"
        fill="white"
        opacity="0.5"
      />
      <path
        d="M0 175 Q40 162 80 175 Q120 188 160 175 Q200 162 240 175 Q280 188 300 175 L300 200 L0 200 Z"
        fill="white"
        opacity="0.3"
      />
    </svg>
  );
}

export function WeatherIllustration({ state }: WeatherIllustrationProps) {
  switch (state) {
    case "sunny":
      return <SunIllustration />;
    case "partly-cloudy":
      return <PartlyCloudyIllustration />;
    case "cloudy":
      return <CloudyIllustration />;
    case "fog":
      return <FogIllustration />;
    case "rain":
      return <RainIllustration />;
    case "snow":
      return <SnowIllustration />;
    case "storm":
      return <StormIllustration />;
    case "idle":
      return <IdleIllustration />;
    case "loading":
      return <CloudyIllustration />;
    default:
      return null;
  }
}

export const WEATHER_STATE_GRADIENT: Record<IllustrationState, string> = {
  sunny: "from-amber-400 via-orange-400 to-orange-500",
  "partly-cloudy": "from-sky-400 to-blue-500",
  cloudy: "from-slate-400 to-slate-500",
  fog: "from-gray-400 to-gray-500",
  rain: "from-blue-600 to-slate-700",
  snow: "from-sky-300 to-blue-400",
  storm: "from-purple-900 to-slate-900",
  idle: "from-purple-600 via-purple-500 to-indigo-600",
  loading: "from-slate-500 to-slate-600",
};
