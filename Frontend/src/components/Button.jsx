const Button = ({ children, onClick, variant = 'primary', disabled, className = '' }) => {
  const base = 'font-mono text-sm uppercase tracking-widest px-6 py-3 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-white text-black hover:bg-transparent hover:text-white border border-white',
    ghost: 'bg-transparent text-white border border-white/20 hover:border-white',
    danger: 'bg-transparent text-white border border-white/20 hover:border-red-500 hover:text-red-500'
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
export default Button