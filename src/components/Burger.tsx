import React from 'react'

interface Props {
  handleToggle: () => void
}

const Burger = ({ handleToggle }: Props) => {
  return (
    <div
				className='fixed top-6 right-6 w-12 h-10 px-2 flex flex-col justify-evenly bg-slate-900 rounded-md cursor-pointer z-30 xl:hidden'
				onClick={handleToggle}
			>
        <span className='shrink-0 h-1 rounded-full bg-white w-full'></span>
        <span className='shrink-0 h-1 rounded-full bg-white w-full'></span>
        <span className='shrink-0 h-1 rounded-full bg-white w-full'></span>
      </div>
  )
}

export default Burger
