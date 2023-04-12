const SidebarLink = ({ title, Icon, active }) => {
  return (
    <div
      className={`flex items-center justify-center xl:justify-start text-[#d9d9d9] text-xl space-x-3
      ${active && 'font-bold text-blue-400'}
      hover:bg-[#d9d9d9] hover:bg-opacity-10 rounded-full cursor-pointer w-[52px] h-[52px] xl:w-auto xl:h-auto xl:py-3 xl:px-4 transition duration-200 ease-out`}
    >
      <Icon className="text-2xl" />
      <p className="hidden xl:inline">{title}</p>
    </div>
  )
}

export default SidebarLink
