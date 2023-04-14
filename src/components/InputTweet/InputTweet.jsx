import { useRef, useState } from 'react'
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineEmojiHappy,
  HiOutlinePhotograph,
  HiOutlineXCircle,
} from 'react-icons/hi'
import Picker from '@emoji-mart/react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useSession } from 'next-auth/react'

import { db, storage } from '../../utils/firebase/firebase'

/* eslint-disable @next/next/no-img-element */
const InputTweet = () => {
  const [tweet, setTweet] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const { data: session } = useSession()

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

  const sendTweet = async () => {
    if (loading) return
    setLoading(true)

    const docRef = await addDoc(collection(db, 'tweets'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: tweet,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `tweets/${docRef.id}/image`)

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef)

        await updateDoc(doc(db, 'tweets', docRef.id), {
          image: downloadURL,
        })
      })
    }

    setLoading(false)
    setTweet('')
    setSelectedFile(null)
    setShowEmojis(false)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  return (
    <div
      className={`border-b border-grey-700 p-3 flex space-x-3 overflow-y-scroll
       ${loading && 'opacity-60'} `}
    >
      <img
        alt="User avatar"
        className="h-11 w-11 rounded-full cursor-pointer"
        src={session?.user?.image}
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
        {!loading && (
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
              onClick={sendTweet}
            >
              tweet
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default InputTweet
