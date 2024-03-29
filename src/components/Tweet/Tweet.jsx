/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import {
  HiDotsHorizontal,
  HiOutlineSwitchHorizontal,
  HiOutlineTrash,
  HiHeart,
  HiOutlineHeart,
  HiOutlineChartBar,
  HiOutlineChat,
  HiOutlineShare,
} from 'react-icons/hi'
import Moment from 'react-moment'
import { useRouter } from 'next/router'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'

import useTweetIdState from '@/store/tweetIdState'
import useModalState from '@/store/modalState'
import { db } from '@/utils/firebase/firebase'

const Tweet = ({ id, tweet, tweetPage }) => {
  const [comments, setComments] = useState([])
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState([])
  const { setTweetId } = useTweetIdState()
  const { setIsOpen } = useModalState()
  const { data: session } = useSession()
  const router = useRouter()

  const removeTweet = (e) => {
    e.stopPropagation()
    deleteDoc(doc(db, 'tweets', id))
    router.push('/')
  }

  const responseTweet = (e) => {
    e.stopPropagation()
    setTweetId(id)
    setIsOpen(true)
  }

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'tweets', id, 'comments'), orderBy('timestamp', 'desc')),
        (snapshot) => setComments(snapshot.docs),
      ),
    [id],
  )

  useEffect(
    () => onSnapshot(collection(db, 'tweets', id, 'likes'), (snapshot) => setLikes(snapshot.docs)),
    [id],
  )
  useEffect(
    () => setLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1),
    [likes, session],
  )

  const likeTweet = async (e) => {
    e.stopPropagation()
    if (liked) {
      return await deleteDoc(doc(db, 'tweets', id, 'likes', session.user.uid))
    }

    return await setDoc(doc(db, 'tweets', id, 'likes', session.user.uid), {
      username: session.user.name,
    })
  }

  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/${id}`)}
    >
      {!tweetPage && (
        <img alt="user image" className="w-11 h-11 rounded-full mr-4" src={tweet?.userImg} />
      )}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!tweetPage && 'justify-between'}`}>
          {tweetPage && (
            <img alt="user image" className="w-11 h-11 rounded-full mr-4" src={tweet?.userImg} />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className={`font-bold tex-[15px] sm:text-base text-[#d9d9d9] group-hover:underline 
                ${!tweetPage && 'inline-block'}`}
              >
                {tweet?.username}
              </h4>
              <span className={`text-sm sm:text-[15px] ${!tweetPage && 'ml-1.5'}`}>
                @{tweet?.tag}
              </span>
            </div>
            {''} • {''}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{tweet?.timestamp?.toDate()}</Moment>
            </span>
            {!tweetPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">{tweet?.text}</p>
            )}
          </div>
          <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out group flex-shrink-0 ml-auto">
            <HiDotsHorizontal className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {tweetPage && (
          <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">{tweet?.text}</p>
        )}
        {tweet?.image && (
          <img
            alt="tweet image"
            className="rounded-2xl max-h-[700px] object-cover mr-2"
            src={tweet?.image}
          />
        )}
        <div className={`text-[@6e767d] flex justify-between w-10/12 ${tweetPage && 'mx-auto'}`}>
          <div className="flex items-center space-x-1 group" onClick={responseTweet}>
            <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <HiOutlineChat className="h-5 text-[#6e767d]  group-hover:text-[#1d9bf0]" />
            </div>
            {comments?.length > 0 && (
              <span className=" text-[#6e767d] group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>

          {session.user.uid === tweet?.id ? (
            <div className="flex items-center space-x-1 group" onClick={removeTweet}>
              <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out group-hover:bg-red-600/10">
                <HiOutlineTrash className="h-5 text-[#6e767d]  group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out group-hover:bg-green-500/10">
                <HiOutlineSwitchHorizontal className="h-5 text-[#6e767d]  group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-1 group" onClick={likeTweet}>
            <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out group-hover:bg-pink-600/10">
              {liked ? (
                <HiHeart className="h-5   text-pink-600" />
              ) : (
                <HiOutlineHeart className="h-5 text-[#6e767d] group-hover:text-pink-600" />
              )}
            </div>
            {likes?.length > 0 && (
              <span
                className={` text-[#6e767d] group-hover:text-pink-600 text-sm 
                ${liked && 'text-pink-600'}`}
              >
                {likes?.length}
              </span>
            )}
          </div>

          <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out group">
            <HiOutlineShare className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
          <div className="cursor-pointer w-9 h-9  hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out group">
            <HiOutlineChartBar className="h-5 text-[#6e767d]  group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
