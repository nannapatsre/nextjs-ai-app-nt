import { Mail, Phone, Clock } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import ContactForm from './contact-form'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">ติดต่อเรา</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            หากคุณมีข้อสงสัยหรือต้องการสอบถามข้อมูลเพิ่มเติม 
            สามารถส่งข้อความหาเราได้ผ่านแบบฟอร์มด้านล่างนี้
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Email</span>
                  <span className="text-sm text-muted-foreground">contact@example.com</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">เบอร์โทรศัพท์</span>
                  <span className="text-sm text-muted-foreground">02-xxx-xxxx</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">เวลาทำการ</span>
                  <span className="text-sm text-muted-foreground">จันทร์ - ศุกร์: 09:00 - 18:00</span>
                </div>
              </div>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">
              เราจะพยายามตอบกลับข้อความของคุณให้เร็วที่สุด 
              โดยปกติจะใช้เวลาภายใน 24-48 ชั่วโมง ในวันทำการ
            </p>
          </div>

          <div className="bg-card p-6 md:p-8 rounded-xl border shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
