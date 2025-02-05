import Link from 'next/link'
import { headers } from 'next/headers'
import { Metadata } from 'next';
import  Header  from '../components/Header';
import  Footer  from '../components/Footer';

export const metadata: Metadata = {
  title: "Terafarm | Not Found",
  description: "This is Not Found Page"
};

export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get('host')
//   const data = await getSiteData(domain)
  return (
    <>
      <Header />
      <div className="flex items-center justify-center grow w-full text-black dark:text-white">
      <div>
        <h1 className='text-[30px] opacity-70 text-white'>Coming soon!</h1>
      </div>
      </div>
      
      <Footer />
      </>
  )
}