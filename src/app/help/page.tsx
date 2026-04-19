import Link from 'next/link'
import { MarketingInteriorLayout, marketingInteriorCard, marketingInteriorMutedPanel } from '@/components/shared/marketing-interior-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'
import { BookOpen, Image as ImageIcon, User } from 'lucide-react'

const topics = [
  {
    title: 'Gallery publishing',
    description: 'Prepare imagery, write concise captions, and control how posts appear in the public grid.',
    icon: ImageIcon,
  },
  {
    title: 'Profile setup',
    description: 'Headlines, credentials, links, and portrait crops that read well on every breakpoint.',
    icon: User,
  },
  {
    title: 'Account & visibility',
    description: 'Sign-in, local drafts, and how your public surfaces stay in sync.',
    icon: BookOpen,
  },
]

export default function HelpPage() {
  return (
    <MarketingInteriorLayout
      kicker="Resources"
      title="Help center"
      description="Practical guidance for publishing gallery posts, refining profiles, and keeping your public presence consistent."
      actions={
        <Button asChild className="bg-[#003366] text-white hover:bg-[#005DAA]">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className={`${marketingInteriorCard} transition-shadow hover:shadow-[0_28px_72px_rgba(15,15,25,0.06)]`}>
              <CardContent className="p-6">
                <topic.icon className="h-5 w-5 text-[#00A8C6]" />
                <h2 className="mt-4 text-lg font-semibold text-neutral-950">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className={marketingInteriorCard}>
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-neutral-950">Frequently asked</h3>
            <Accordion type="single" collapsible className="mt-4">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-neutral-200">
                  <AccordionTrigger className="text-left text-sm font-medium text-neutral-950 hover:text-[#003366]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-neutral-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className={`mt-6 rounded-[var(--radius)] p-4 ${marketingInteriorMutedPanel}`}>
              <p className="text-sm text-neutral-600">
                Need a walkthrough for your team?{' '}
                <Link href="/contact" className="font-medium text-[#005DAA] hover:text-[#003366]">
                  Book a live session.
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MarketingInteriorLayout>
  )
}
