import { create } from 'zustand'

const useTweetIdState = create((set) => ({
  tweetId: null,
  setTweetId: (tweetId) => set({ tweetId }),
}))

export default useTweetIdState
