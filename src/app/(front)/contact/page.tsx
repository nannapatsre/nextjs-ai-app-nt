import { Mail, Phone, Clock } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import ContactForm from './contact-form'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">ติดต่อเรา</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          หากคุณมีคำถาม ข้อเสนอแนะ หรือต้องการความช่วยเหลือ ทีมงานของเราพร้อมดูแลคุณ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">support@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium">โทรศัพท์</p>
                <p className="text-sm text-muted-foreground">02-XXX-XXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium">เวลาทำการ</p>
                <p className="text-sm text-muted-foreground">จันทร์ - ศุกร์: 09:00 - 18:00</p>
              </div>
            </div>
          </div>
          <Separator />
          <p className="text-sm text-muted-foreground">
            เราจะพยายามตอบกลับทุกข้อความให้เร็วที่สุดภายใน 24 ชั่วโมง
          </p>
        </div>

        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
