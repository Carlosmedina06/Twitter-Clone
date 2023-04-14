/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react'
import { HiDotsHorizontal } from 'react-icons/hi'

const SidebarAccount = () => {
  const { data: session } = useSession()

  return (
    <div
      className="flex items-center justify-center text-[#d9d9d9] xl:-mr-5 xl:ml-auto mt-auto hover:bg-[#d9d9d9] hover:bg-opacity-10 rounded-full cursor-pointer w-[52px] h-[52px] xl:w-auto xl:h-auto xl:py-3 xl:px-4 transition duration-200 ease-out;"
      onClick={signOut}
    >
      <img
        alt="User avatar"
        className="h-10 w-10 rounded-full xl:mr-2.5"
        src={session?.user?.image}
      />
      <div className="hidden xl:inline leading-5">
        <h4 className="font-bold text-sm">{session?.user?.name}</h4>
        <p className="text-[#6e767d]">@{session?.user?.tag}</p>
      </div>
      <HiDotsHorizontal className="h-5 hidden xl:inline ml-10" />
    </div>
  )
}

export default SidebarAccount
