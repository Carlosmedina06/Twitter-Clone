import { FaTwitter } from 'react-icons/fa'
import {
  HiHashtag,
  HiHome,
  HiBell,
  HiInbox,
  HiBookmark,
  HiClipboard,
  HiUser,
  HiDotsCircleHorizontal,
} from 'react-icons/hi'

import SidebarLink from '../SidebarLink/SidebarLink'
import SidebarAccount from '../SidebarAccount/SidebarAccount'

const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col  xl:items-star xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center xl:justify-start w-14 h-14 p-0 xl:ml-24  xl:h-auto xl:py-3 xl:px-4 hover:bg-[#d9d9d9] hover:bg-opacity-10 rounded-full">
        <FaTwitter className="text-3xl text-[#d9d9d9] cursor-pointer  transition duration-200 ease-out" />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24 ">
        <SidebarLink active Icon={HiHome} title="Home" />
        <SidebarLink Icon={HiHashtag} title="Explore" />
        <SidebarLink Icon={HiBell} title="Notifications" />
        <SidebarLink Icon={HiInbox} title="Messages" />
        <SidebarLink Icon={HiBookmark} title="Bookmarks" />
        <SidebarLink Icon={HiClipboard} title="Lists" />
        <SidebarLink Icon={HiUser} title="Profile" />
        <SidebarLink Icon={HiDotsCircleHorizontal} title="More" />
      </div>
      <button className="transition duration-200 ease-out items-start text-lg hidden xl:inline ml-24 mt-4 bg-blue-400 text-white font-bold rounded-full w-56 h-[52px] shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>

      <SidebarAccount />
    </div>
  )
}

export default Sidebar
