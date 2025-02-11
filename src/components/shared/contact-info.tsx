import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mailbox,
} from 'lucide-react'

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    href: '#',
    color: 'hover:text-blue-600',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: '#',
    color: 'hover:text-blue-400',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: '#',
    color: 'hover:text-pink-600',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: '#',
    color: 'hover:text-blue-700',
  },
]
// +251 911 159 315, +251 911 135 234 (Address: Arada Sub City, Wereda 1, House No: 1239A, P.O.Box 26344, Addis Ababa, Ethiopia)
const contactInfo = [
  {
    icon: Building2,
    label: 'Company Name',
    value: 'Aselef Media & Communications (AMC)',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Arada Sub City, Wereda 1, House No: 1239A',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+251 911 15 93 15',
  },
  {
    icon: Phone,
    label: 'Phone 2',
    value: '+251 911 13 52 34',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'amceth@gmail.com',
  },
  {
    icon: Mailbox,
    label: 'P.O.Box',
    value: '26344, Addis Ababa, Ethiopia',
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-8 grid  md:grid-cols-7  max-w-7xl mx-auto my-8 px-6 lg:px-8">
      <div className="items-start flex flex-col justify-center col-span-3">
        <div className="space-y-6  py-4">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{item.label}</h3>
                <p className="text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full bg-secondary transition-colors ${social.color}`}
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="my-6 col-span-4">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.158782206669!2d38.76213471133179!3d8.957512790065215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b838eb08fb8fb%3A0xa18a95b96d41fa49!2sSaris%20Adey%20Abeba!5e0!3m2!1sen!2set!4v1735910869809!5m2!1sen!2set"
          width="600"
          height="450"
          className="w-full min-h-[60vh] h-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
