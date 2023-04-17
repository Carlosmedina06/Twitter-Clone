import Image from 'next/image'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

function Trending({ result }) {
  return (
    <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="text-[#6e767d] text-xs font-medium">{result.heading}</p>
        <h6 className="font-bold max-w-[250px] text-sm">{result.description}</h6>
        <p className="text-[#6e767d] text-xs font-medium max-w-[250px]">
          Trending with{' '}
          {result.tags.map((tag, index) => (
            <span key={index} className="text-[#1d9bf0] font-normal hover:underline cursor-pointer">
              {tag}
            </span>
          ))}
        </p>
      </div>

      {result.img ? (
        <Image alt="result image" className="rounded-2xl" height={70} src={result.img} width={70} />
      ) : (
        <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out group">
          <HiOutlineDotsHorizontal className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      )}
    </div>
  )
}

export default Trending
