import { useEffect, useState } from 'react'
import Head from 'next/head'
import { collection, doc, onSnapshot, orderBy, query } from '@firebase/firestore'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { HiArrowLeft } from 'react-icons/hi'

import Tweet from '@/components/Tweet/Tweet'
import Comment from '@/components/Comment/Comment'
import Sidebar from '@/components/Sidebar/Sidebar'
import Modal from '@/components/Modal/Modal'
import Login from '@/components/Login/Login'
import useModalState from '@/store/modalState'
import { db } from '@/utils/firebase/firebase'
import Widgets from '@/components/Widgets/Widgets'

function TweetPage({ trendingResults, followResults, providers }) {
  const { data: session } = useSession()
  const { isOpen } = useModalState()
  const [tweet, setTweet] = useState()
  const [comments, setComments] = useState([])
  const router = useRouter()
  const { id } = router.query

  useEffect(
    () =>
      onSnapshot(doc(db, 'tweets', id), (snapshot) => {
        setTweet(snapshot.data())
      }),
    [id],
  )

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'tweets', id, 'comments'), orderBy('timestamp', 'desc')),
        (snapshot) => setComments(snapshot.docs),
      ),
    [id],
  )

  if (!session) return <Login providers={providers} />

  return (
    <div>
      <Head>
        <title>
          {tweet?.username} on Twitter: {tweet?.text}
        </title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push('/')}
            >
              <HiArrowLeft className="h-5 text-white cursor-pointer" />
            </div>
            Tweet
          </div>
          <Tweet tweetPage id={id} tweet={tweet} />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment.data()} id={comment.id} />
              ))}
            </div>
          )}
        </div>
        <Widgets followResults={followResults} trendingResults={trendingResults} />
        {isOpen && <Modal />}
      </main>
    </div>
  )
}

export default TweetPage

export async function getServerSideProps(context) {
  const trendingResults = await fetch('https://www.jsonkeeper.com/b/D3PH').then((res) => res.json())
  const followResults = await fetch('https://www.jsonkeeper.com/b/8EGN').then((res) => res.json())
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}
