"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  animate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

/** Three envelopes, spread around the box at different sizes. */
const ENVELOPES = [
  { x: 12, y: 44, s: 1, r: -14, d: 0 },
  { x: 484, y: 58, s: 0.6, r: 13, d: 0.9 },
  { x: 466, y: 292, s: 0.78, r: -9, d: 1.7 },
];

// flag pivot, in viewBox coordinates
const PIVOT_X = 328;
const PIVOT_Y = 150;
const DOWN_ANGLE = 0;
const UP_ANGLE = -90;
/** How far you scroll to take the flag from flat to fully raised. */
const SCROLL_DISTANCE = 420;
/** How far the whole mailbox rises across that same scroll range, in pixels. */
const LIFT_DISTANCE = -24;

const INK = "#171717";

/**
 * Front-on mailbox drawn to match the reference icon: arched box, door panel on
 * the left with a mail slot, and a pivoting signal flag on the right.
 *
 * The flag is scroll driven: it rises from 0 to 90 degrees as the mailbox
 * travels up the viewport, tracking the scroll position both ways and clamping
 * at each end. Once a message is sent it locks in the raised position.
 *
 * It rotates via the SVG transform attribute rather than a CSS transform,
 * because Framer Motion forces transform-box: fill-box on SVG elements, which
 * would pivot the flag around its own bounding box and detach it from the bolt.
 */
export default function MailboxIllustration({ flagUp = false }: { flagUp?: boolean }) {
  const flagRef = useRef<SVGGElement>(null);

  // The flag tracks the page scroll: down raises it, up lowers it again, and it
  // clamps at each end. Tied to page scroll rather than the element's own
  // position so the rotation and the lift below share one source of truth.
  const { scrollY } = useScroll();
  const scrollAngle = useTransform(scrollY, [0, SCROLL_DISTANCE], [DOWN_ANGLE, UP_ANGLE]);

  // The whole mailbox rises over the exact same scroll range, so the box settles
  // at the same moment the flag reaches 90 degrees.
  const lift = useTransform(scrollY, [0, SCROLL_DISTANCE], [0, LIFT_DISTANCE]);

  const applyAngle = useCallback((v: number) => {
    flagRef.current?.setAttribute("transform", `rotate(${v} ${PIVOT_X} ${PIVOT_Y})`);
  }, []);

  // scroll drives the flag until a message is sent
  useMotionValueEvent(scrollAngle, "change", (v) => {
    if (!flagUp) applyAngle(v);
  });

  // on send, spring it the rest of the way up and hold it there
  useEffect(() => {
    if (!flagUp) {
      applyAngle(scrollAngle.get());
      return;
    }
    const controls = animate(scrollAngle.get(), UP_ANGLE, {
      type: "spring",
      stiffness: 95,
      damping: 13,
      onUpdate: applyAngle,
    });
    return () => controls.stop();
  }, [flagUp, scrollAngle, applyAngle]);

  return (
    <motion.div style={{ y: lift }} className="w-full max-w-[340px]">
    <svg
      viewBox="0 0 560 420"
      className="w-full h-auto"
      role="img"
      aria-label="A mailbox with envelopes floating around it and a flag that raises when a message is sent"
    >
      {/* floating envelopes */}
      {ENVELOPES.map((e, i) => (
        <g key={i} transform={`translate(${e.x} ${e.y}) scale(${e.s}) rotate(${e.r})`}>
          <motion.g
            animate={{ y: [0, -12, 0], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3.6 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: e.d }}
          >
            <rect x="0" y="0" width="66" height="46" rx="6" fill="#FEF2E0" stroke={INK} strokeWidth="9" />
            <path d="M5 8 L33 29 L61 8" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </g>
      ))}

      {/* ground shadow */}
      <ellipse cx="300" cy="374" rx="92" ry="10" fill={INK} opacity="0.12" />

      {/* post */}
      <rect x="276" y="252" width="48" height="106" fill="#904B86" stroke={INK} strokeWidth="13" strokeLinejoin="round" />

      {/* body: arched top, flat bottom */}
      <path
        d="M130 260 L130 140 A 60 60 0 0 1 190 80 L410 80 A 60 60 0 0 1 470 140 L470 260 Z"
        fill="#4B9055"
        stroke={INK}
        strokeWidth="13"
        strokeLinejoin="round"
      />

      {/* door panel on the left */}
      <path
        d="M130 260 L130 140 A 60 60 0 0 1 190 80 L226 80 A 42 38 0 0 1 268 118 L268 260 Z"
        fill="#C5E9D0"
        stroke={INK}
        strokeWidth="13"
        strokeLinejoin="round"
      />

      {/* mail slot on the door */}
      <rect x="165" y="150" width="64" height="14" rx="7" fill={INK} />

      {/* flag arm, pivoting on the bolt */}
      <g ref={flagRef} transform={`rotate(${flagUp ? UP_ANGLE : DOWN_ANGLE} ${PIVOT_X} ${PIVOT_Y})`}>
        <path
          d="M328 139 L434 139 L434 198 L392 198 L392 161 L328 161 Z"
          fill="#AE62A4"
          stroke={INK}
          strokeWidth="13"
          strokeLinejoin="round"
        />
      </g>

      {/* bolt, drawn last so the hinge always reads as attached */}
      <circle cx={PIVOT_X} cy={PIVOT_Y} r="17" fill={INK} />

      {/* sparkles once the flag is up */}
      <motion.g animate={{ opacity: flagUp ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
        <path d="M120 30 l6 14 14 6 -14 6 -6 14 -6 -14 -14 -6 14 -6 z" fill="#62AE6C" />
        <path d="M492 210 l5 11 11 5 -11 5 -5 11 -5 -11 -11 -5 11 -5 z" fill="#904B86" />
      </motion.g>
    </svg>
    </motion.div>
  );
}
