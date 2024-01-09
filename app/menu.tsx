import Image from 'next/image'
import Link from 'next/link'

export default function Menu() {
    return (
  
      <div className="flex min-w-[200px]  w-1/5 flex-col items-center pt-10 m-4 space-y-10 border-8 rounded-md border-amber-200 lg:px-12 px-8">
        <div className='space-y-4 flex flex-col items-center w-full'>
        <Image className='border-4 border-zinc-400 rounded-full' width={100} height={100} src={"/AlimjanProfile.jpg"} alt='profile' ></Image>
        <p className='text-2xl font-bold text-center'>Alimjan Ablimit</p>
        <div className='flex  justify-between w-full'> 
            <div className=' bg-slate-400 w-6 h-6'>1</div>
            <div className=' bg-slate-400 w-6 h-6'>1</div>
            <div className=' bg-slate-400 w-6 h-6'>1</div>
            <div className=' bg-slate-400 w-6 h-6'>1</div>
        </div>
        </div>
     
       
        <div className='space-y-4 flex flex-col items-start w-full font-medium text-2xl '>
            <Link className='font-bold' href={"#"}> Home</Link>
            <Link href={"#"}> CV</Link>
            <Link href={"#"}> Project</Link>
            <Link className='flex' target="_blank"  href={"https://alimjan.notion.site/Is-Ali-7b3453d3c328479da2a2a838c2deaefe"}> Blog <svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" ><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></Link>
        </div>
  
      </div>
    )
  }
  