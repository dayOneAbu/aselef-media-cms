'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

const timeline = [
  {
    name: 'Founded in 2000 G.C',
    description:
      '15+ Years of Expertise: Proven excellence in advertising, documentary and film production, advocacy campaigns, and media training across print, broadcast, and digital platforms..',
  },
  {
    name: 'Impact-Driven Approach',
    description:
      'From grassroots initiatives to national programs, we design communication strategies that resonate, educate, and mobilize.',
  },
  {
    name: 'Multidisciplinary Excellence',
    description:
      'Our seasoned team of journalists, creatives, and communication specialists delivers tailored solutions for NGOs, government agencies, and private sector partners.',
  },
  {
    name: 'Trusted and Beloved',
    description:
      'Certified by the Ethiopian Broadcasting Authority and Addis Ababa City Government Culture & Tourism Bureau, ensuring compliance and quality in every project.',
  },
]
const serviceData = [
  {
    title: 'Advertising Services',
    services: ['Radio', 'Television', 'Online'],
  },
  {
    title: 'Documentary & Feature Film Production',
    services: ['Production', 'Coordination'],
  },
  {
    title: 'Television & Radio Production',
    services: ['Editing', 'Preparation'],
  },
  {
    title: 'Digital Marketing Services',
    services: [],
  },
  {
    title: 'Digital Public Relations Services',
    services: [],
  },
  {
    title: 'Social Media Management Services',
    services: ['Planning', 'Research', 'Coordination'],
  },
]
export default function Example() {
  return (
    <div className="isolate mb-16 ">
      {/* Hero section */}
      <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-4">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg]  shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl lg:col-span-2 xl:col-auto">
              We’re a passionate group of people working .....
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8">
                To empower communities, businesses, and institutions through strategic communication
                that sparks change. We are committed to advancing social development, promoting
                health initiatives, and equipping professionals with the tools to thrive in an
                evolving media landscape.
              </p>
            </div>
            <Image
              alt=""
              src="/office-recording-2-women.webp"
              width={1280}
              height={1080}
              className="mt-10 aspect-square w-full max-w-lg rounded-2xl object-cover sm:mt-8 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t  from-[#80caff] to-[#4f46e5] opacity-25" />
      </div>

      {/* Category section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {timeline.map((item) => (
            <div key={item.name}>
              <p className="mt-6 text-lg font-semibold leading-8 tracking-tight ">{item.name}</p>
              <p className="mt-1 text-base leading-7 ">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logo cloud */}
      <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden text-white bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight  sm:text-4xl">
            Aselef Media & Communications (AMC) <br /> Empowering Voices, Shaping Futures
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text leading-8">
            At AMC, we believe that meaningful work transcends the ordinary. Every project we
            undertake, every story we tell, and every campaign we design is rooted in our commitment
            to creating a positive impact.
          </p>
          <div className="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5" />
          <div aria-hidden="true" className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl">
            <div
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
              className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            />
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mt-32 overflow-hidden sm:mt-40">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
                Empowering Voices, Shaping Futures
              </h2>
              <p className="mt-6 text-xl leading-8 ">
                Since 2008, Aselef Media & Communications (AMC) has been at the forefront of
                transforming narratives and driving social progress through innovative media and
                communication solutions.
              </p>
              <p className="mt-6 text-base leading-7 ">
                As a trusted private enterprise licensed by the Addis Ababa Trade & Industry
                Development Bureau and certified by the Ethiopian Broadcasting Authority, we bridge
                the gap between organizations and their audiences, amplifying messages that inspire
                action and foster development.
              </p>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="hidden md:flex w-full lg:w-auto lg:flex-none lg:self-end">
                <Image
                  alt=""
                  src="/voice recording.webp"
                  width={1152}
                  height={842}
                  className="aspect-[7/5] w-full max-w-none rounded-2xl object-cover"
                />
              </div>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div className="order-first flex w-full flex-none justify-end self-end sm:w-64 lg:w-auto">
                  <Image
                    alt=""
                    width={768}
                    height={604}
                    src="/two-men-working.webp"
                    className="aspect-[4/3] w-full sm:w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="flex w-full flex-auto justify-end sm:w-96 lg:w-auto lg:flex-none">
                  <Image
                    alt=""
                    width={1152}
                    height={842}
                    src="/office-2-equip.webp"
                    className="aspect-[7/5] w-full sm:w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <Image
                    alt=""
                    width={768}
                    height={604}
                    src="/audio-recorder.webp"
                    className="aspect-[4/3] w-full sm:w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div>
            <Image
              alt=""
              width={1104}
              height={80}
              src="/sound-effect.webp"
              className="mt-16 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
            />
          </div>
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
              We approach the workplace as something that adds to our lives and adds value to world.
            </h2>
            <p className="mt-6 text-xl leading-8 ">
              Our workplace is more than a space—it’s a platform for collaboration, creativity, and
              purpose, where every effort contributes to a better, more connected world. Through
              innovative media and communication strategies, we empower communities, drive social
              development, and inspire change.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 py-12 sm:py-16 lg:py-24">
        <h2 className="text-4xl font-semibold text-center mb-8">Services We Provide</h2>
        <div className="flex flex-col items-center space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0 lg:justify-between">
          {/* Image on the Left (50% width) */}
          <div className="flex justify-center lg:w-1/2">
            <Image
              src="/aselef-new-logo.png"
              alt="Aselef Media and Communication Logo"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Services Cards (50% width) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:w-1/2">
            {serviceData.map((service) => (
              <Card
                key={service.title}
                className="shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {service.services.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
          Ready to dive in?
          <br />
          Start your journey with us today.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <Link href={'/'}>
            <Button variant="default">Posts</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
