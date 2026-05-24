import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp" | "call";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
}

const variants = {
  primary: "bg-[var(--brand)] text-white hover:bg-[#173d39] shadow-[0_16px_42px_rgba(33,77,72,0.22)]",
  secondary: "bg-[var(--accent)] text-white hover:bg-[#724230] shadow-[0_16px_42px_rgba(138,79,57,0.2)]",
  outline: "border border-[rgba(30,36,34,0.16)] text-[var(--foreground)] hover:bg-white",
  ghost: "text-[var(--foreground)] hover:bg-white/70",
  whatsapp: "bg-green-500 text-white hover:bg-green-600 shadow-sm",
  call: "border border-[rgba(30,36,34,0.16)] text-[var(--foreground)] hover:bg-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  target,
  rel,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-semibold rounded-full whitespace-nowrap transition-all ${variants[variant]} ${sizes[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  } ${className}`;

  if (href) {
    if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={classes} target={target} rel={rel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
