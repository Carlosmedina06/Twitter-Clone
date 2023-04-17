import { getProviders, getSession, useSession } from 'next-auth/react'
import Head from 'next/head'

import Feed from '@/components/Feed/Feed'
import Sidebar from '@/components/Sidebar/Sidebar'
import Login from '@/components/Login/Login'
import Modal from '@/components/Modal/Modal'
import Widgets from '@/components/Widgets/Widgets'

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession()

  if (!session) return <Login providers={providers} />

  return (
    <>
      <Head>
        <title>Home | Twitter</title>
      </Head>

      <main className="flex min-h-screen max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Widgets followResults={followResults} trendingResults={trendingResults} />
        {<Modal />}
      </main>
    </>
  )
}

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
