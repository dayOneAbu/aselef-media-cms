'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ContactInfo } from '@/components/shared/contact-info'

const schema = z.object({
  name: z.string().nonempty('First name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().max(500, 'Message cannot exceed 500 characters'),
})

export default function Contact() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log('Form data:', data)
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="w-full">
        <div className="relative isolate overflow-hidden py-32 sm:py-40 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight  sm:text-6xl">Contact Us</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
              commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="relative min-h-[70vh]  border-red-500 border-4 container mx-auto">
        <div className="relative z-30 pt-28 lg:w-2/3">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Lorem, ipsum dolor sit amet consectetur
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
            commodo.
          </p>
          <div className="mt-8 flex space-x-4">
            <Link href={'/'}>
              <Button asChild variant="link">
                Start reading
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 w-1/2">
          <Image
            width={718}
            height={1230}
            src="/aselefHeaderLogo.webp"
            alt="aselef media office setup"
            className="object-cover h-full w-full"
            priority
          />
        </div>
      </div> */}
      <div className="relative container">
        <div className="relative lg:absolute lg:inset-0 lg:left-1/2 ">
          <Image
            alt="aselef media office setup"
            width={718}
            height={1230}
            src="/photo-1559136555-9303baea8ebd-ezgif.webp"
            className="h-auto w-full object-cover sm:h-80 lg:h-full"
            priority
          />
        </div>
        {/* Contact Form */}
        <div className="pb-24 pt-16 sm:pb-32 text-foreground bg-[#0f172a] sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
          <div className="px-6 lg:px-8">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-3xl text-white font-bold tracking-tight">
                Let&apos;s work together
              </h2>
              <p className="mt-2 text-lg leading-8 text-muted-foreground">
                Proin volutpat consequat porttitor cras nullam gravida at orci molestie a eu arcu
                sed ut tincidunt magna.
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-16">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <FormField
                      name="name"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="email"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone" type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="message"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>How can we help you? (Max 500 characters)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your message" rows={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end border-t pt-8">
                    <Button type="submit">Send message</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ContactInfo />
    </div>
  )
}
