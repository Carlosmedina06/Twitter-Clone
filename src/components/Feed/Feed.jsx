import { HiSparkles } from 'react-icons/hi'

import InputTweet from '../InputTweet/InputTweet'

const Feed = () => {
  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center justify-between py-2 px-3 sticky top-0 z-50 border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="w-9 h-9 flex items-center justify-center hover:bg-[#d9d9d9] hover:bg-opacity-10 rounded-full cursor-pointer xl:w-auto xl:h-auto xl:py-3 xl:px-4 transition duration-200 ease-out ">
          <HiSparkles className="h-5 text-white" />
        </div>
      </div>

      <InputTweet />
    </div>
  )
}

export default Feed
