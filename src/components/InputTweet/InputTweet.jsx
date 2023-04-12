import { useRef, useState } from 'react'
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineEmojiHappy,
  HiOutlinePhotograph,
  HiOutlineXCircle,
} from 'react-icons/hi'
import Picker from '@emoji-mart/react'

/* eslint-disable @next/next/no-img-element */
const InputTweet = () => {
  const [tweet, setTweet] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const filePickerRef = useRef(null)

  const handleChange = ({ target: { value } }) => {
    setTweet(value)
  }

  const handleEmoji = () => {
    setShowEmojis(!showEmojis)
  }

  const remove = () => {
    setSelectedFile(null)
  }

  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []

    sym.forEach((el) => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)

    setTweet(tweet + emoji)
  }

  const addImageToPost = (e) => { }

  return (
    <div className={`border-b border-grey-700 p-3 flex space-x-3 `}>
      <img
        alt="User avatar"
        className="h-11 w-11 rounded-full cursor-pointer"
        src="https://yt3.ggpht.com/yti/AHyvSCA2fez4tq27XJm-NPbYpuzeAOnQvvzAtDPNMXheEw=s88-c-k-c0x00ffffff-no-rj-mo"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedFile} "pb-7" ${tweet && 'space-x-2.5'}}`}>
          <textarea
            className="bg-transparent outline-none text-[#d9d9d9] text-lg resize-none placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            placeholder="What is happening?"
            rows={2}
            value={tweet}
            onChange={handleChange}
          />

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer "
                onClick={remove}
              >
                <HiOutlineXCircle className="text-white h-5" />
              </div>
              <img
                alt="Selected file"
                className="rounded-2xl max-h-80 object-contain"
                src={selectedFile}
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center ">
            <div
              className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out"
              onClick={() => filePickerRef.current.click()}
            >
              <HiOutlinePhotograph className="h-[22px] text-[#1d9bf0]  cursor-pointer" />
              <input ref={filePickerRef} hidden type="file" onChange={addImageToPost} />
            </div>
            <div className="rotate-90 cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out">
              <HiOutlineChartBar className="h-[22px] text-[#1d9bf0] cursor-pointer" />
            </div>
            <div
              className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out"
              onClick={handleEmoji}
            >
              <HiOutlineEmojiHappy className="h-[22px] text-[#1d9bf0] cursor-pointer" />
            </div>
            <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out">
              <HiOutlineCalendar className="h-[22px] text-[#1d9bf0] cursor-pointer" />
            </div>
            {showEmojis && (
              <div className=" absolute mt-[465px] ml-[-40px]">
                <Picker theme="dark" onEmojiSelect={addEmoji} />
              </div>
            )}
          </div>
          <button
            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!tweet.trim() && !selectedFile}
          >
            tweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputTweet
