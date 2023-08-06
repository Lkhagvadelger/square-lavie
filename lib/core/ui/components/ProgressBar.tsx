export class ProgressBar {
  /** Show the progress bar and begin animating it. */
  start: () => void;

  /** End the progress bar animation. */
  finish: () => void;

  constructor(options?: Partial<any>) {
    const assign = (to: any, from: any): void => {
      Object.keys(from).forEach((key) => {
        to[key] = from[key];
      });
    };

    const config: any = {};

    if (options) {
      assign(config, options);
    }

    const webStyle = {
      className: "progress-bar",
      delay: 0,
      position: "fixed",
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
      border: "none",
      borderRadius: "2px",
      backgroundColor: "currentColor",
      zIndex: 10000,
      height: "2px",
      color: "#1A365D",
      opacity: 0,
      width: "0%",
    };

    const appStyle = {
      ...webStyle,
      height: "2px",
      top: undefined,
      bottom: "72px",
      color: "#F295A3",
    };

    const startedStyle = {
      opacity: 1,
      width: "99%",
      transition: "width 10s cubic-bezier(0.1, 0.05, 0, 1)",
    };

    const finishedStyle = {
      opacity: 0,
      width: "100%",
      transition: "width 0.1s ease-out, opacity 0.5s ease 0.2s",
    };

    const glowStyle = {
      opacity: 0.4,
      boxShadow: "3px 0 8px",
      height: "100%",
    };

    let timeout: ReturnType<typeof setTimeout> | null = null;
    let current!: HTMLElement;

    this.start = (...args: any[]) => {
      if (current && current.parentNode) {
        current.parentNode.removeChild(current);
      }
      current = document.body.appendChild(document.createElement("div"));
      current.className = config.className + " stopped";
      assign(current.style, args[0].includes("/app/") ? appStyle : webStyle);

      // const glow = current.appendChild(document.createElement("div"));
      // glow.className = "glow";
      // assign(glow.style, glowStyle);

      if (timeout != null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
        current.className = config.className + " started";
        assign(current.style, startedStyle);
      }, config.delay);

      // Force a reflow, just to be sure that the initial style takes effect.
      current.scrollTop = 0;
    };

    this.finish = () => {
      if (timeout != null) {
        clearTimeout(timeout);
        timeout = null;
      }
      if (current) {
        current.className = config.className + " finished";
        assign(current.style, finishedStyle);
      }
    };
  }
}
