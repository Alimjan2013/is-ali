import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-center p-4 space-y-10">
      <Image className='border-2 border-zinc-400 rounded-full' width={150} height={150} src={"/AlimjanProfile.jpg"} alt='profile' ></Image>
      <div className='space-y-2'>
      <p className='text-center'>Welcome to the personal website of <span className=' text-black font-semibold'>Alimjan Ablimit</span>  (also known as Alimujiang Abudumiti).</p>

      <p className='text-center'>My site is currently under construction, but in the meantime, you&apos;re warmly invited to learn more about me through my project blog.</p>

      <p className='text-center'>For insights into my work and interests, please <Link className='text-sky-500 underline underline-offset-1' href={"https://alimjan.notion.site/Is-Ali-7b3453d3c328479da2a2a838c2deaefe"}>click here to explore my blog</Link>.</p>
     
      </div>

    </main>
  )
}
