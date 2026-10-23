import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  speed: number;
}

export const FluidHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useAppStore();
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize streamline particles
    const particleCount = prefersReducedMotion ? 40 : 180;
    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 1.5 + Math.random() * 2.0,
        vy: (Math.random() - 0.5) * 0.4,
        age: 0,
        maxAge: 120 + Math.random() * 180,
        speed: 1.5 + Math.random() * 1.5,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    // Cylinder obstacle in the flow field center
    const obstacleX = width * 0.65;
    const obstacleY = height * 0.45;
    const obstacleRadius = 55;

    let time = 0;

    const render = () => {
      time += 0.02;

      // Subtle fade trail
      ctx.fillStyle = theme === 'dark' ? 'rgba(7, 9, 14, 0.22)' : 'rgba(248, 250, 252, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Render subtle obstacle wireframe in hero
      ctx.beginPath();
      ctx.arc(obstacleX, obstacleY, obstacleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = theme === 'dark' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(2, 132, 199, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw obstacle center crosshair
      ctx.beginPath();
      ctx.moveTo(obstacleX - 6, obstacleY);
      ctx.lineTo(obstacleX + 6, obstacleY);
      ctx.moveTo(obstacleX, obstacleY - 6);
      ctx.lineTo(obstacleX, obstacleY + 6);
      ctx.strokeStyle = theme === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(2, 132, 199, 0.3)';
      ctx.stroke();

      // Update and draw fluid particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Potential flow past cylinder field:
        // u = U_inf * (1 - R^2 / r^2 * cos(2θ))
        // v = - U_inf * (R^2 / r^2 * sin(2θ))
        const dx = p.x - obstacleX;
        const dy = p.y - obstacleY;
        const r2 = dx * dx + dy * dy;
        const r = Math.sqrt(r2);

        let u = p.speed;
        let v = 0;

        if (r > obstacleRadius && r < 400) {
          const theta = Math.atan2(dy, dx);
          const factor = (obstacleRadius * obstacleRadius) / r2;
          u = p.speed * (1 - factor * Math.cos(2 * theta));
          v = -p.speed * factor * Math.sin(2 * theta);

          // Add Karman wake shedding oscillation downstream
          if (dx > obstacleRadius) {
            const wakeDist = (dx - obstacleRadius) / 60;
            const vortexFreq = 1.8;
            v += Math.sin(wakeDist * vortexFreq - time * 3) * Math.exp(-wakeDist * 0.15) * 1.8;
          }
        } else if (r <= obstacleRadius) {
          // Deflect around obstacle
          const normalX = dx / (r || 1);
          const normalY = dy / (r || 1);
          p.x = obstacleX + normalX * (obstacleRadius + 3);
          p.y = obstacleY + normalY * (obstacleRadius + 3);
        }

        // Mouse vortex interaction
        if (mouseRef.current.active) {
          const mdx = p.x - mouseRef.current.x;
          const mdy = p.y - mouseRef.current.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 160 && mDist > 5) {
            // Induced swirl
            const swirl = (1 - mDist / 160) * 3.5;
            u += -mdy * (swirl / mDist);
            v += mdx * (swirl / mDist);
          }
        }

        p.vx = u;
        p.vy = v;
        const oldX = p.x;
        const oldY = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.age++;

        // Draw streamline streak
        const lifeRatio = 1 - Math.abs(p.age / p.maxAge - 0.5) * 2;
        const velocityMag = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(p.x, p.y);

        // Color based on velocity (scientific cyan-to-amber ramp)
        if (velocityMag > p.speed * 1.3) {
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(245, 158, 11, ${lifeRatio * 0.7})` 
            : `rgba(217, 119, 6, ${lifeRatio * 0.8})`; // High velocity amber
        } else {
          ctx.strokeStyle = theme === 'dark'
            ? `rgba(6, 182, 212, ${lifeRatio * 0.55})`
            : `rgba(2, 132, 199, ${lifeRatio * 0.65})`; // Nominal cyan/cobalt
        }

        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Respawn if offscreen or expired
        if (p.x > width + 20 || p.y < -20 || p.y > height + 20 || p.age >= p.maxAge) {
          particles[i] = {
            ...createParticle(),
            x: -10,
            y: Math.random() * height,
          };
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75"
      aria-hidden="true"
    />
  );
};
