const Avatar = ({ username = '', size = 'md', isOnline = false }) => {
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base' }
  return (
    <div className="relative inline-flex shrink-0">
      <div className={`${sizes[size]} rounded-sm bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-white uppercase`}>
        {username.charAt(0)}
      </div>
      {isOnline && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border-2 border-black" />
      )}
    </div>
  )
}
export default Avatar