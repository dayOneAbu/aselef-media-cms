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
            <h2 className="text-4xl font-bold tracking-tight  sm:text-6xl">
              Let’s Amplify Your Message Together
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              At Aselef Media & Communications (AMC), collaboration is the cornerstone of progress.
              Whether you’re an NGO aiming to scale your advocacy, or a business ready to elevate
              your brand, we’re here to craft communication strategies that deliver results.
            </p>
          </div>
        </div>
      </div>
      <div className="relative container">
        <div className="relative lg:absolute lg:inset-0 lg:left-1/2 ">
          <Image
            alt="aselef media office setup"
            width={718}
            height={1230}
            src="/office-picture-aselef-media-resize.webp"
            className="h-auto w-full object-cover sm:h-80 lg:h-full"
            priority
          />
        </div>
        {/* Contact Form */}
        <div className="pb-24 pt-16 sm:pb-32 text-foreground bg-[#0f172a] sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
          <div className="px-6 lg:px-8">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-3xl text-white font-bold tracking-tight">
                Ready to Make an Impact?
              </h2>
              <p className="mt-2 text-lg leading-8 text-muted-foreground">
                Fill out the form below, and our team will connect with you to discuss how AMC can
                help you achieve your goals. Let’s create stories that matter, campaigns that
                inspire, and training that empowers. <br />
                <span className="mt-4 text-white">Your Vision. Our Expertise. Shared Success.</span>
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
