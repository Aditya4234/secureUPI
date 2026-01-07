"use client";

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary:
      "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300",
    secondary:
      "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50",
    danger: "bg-red-600 text-white shadow-sm hover:bg-red-700 disabled:bg-red-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

