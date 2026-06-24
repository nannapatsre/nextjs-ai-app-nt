'use client'

import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { 
  Field, 
  FieldError, 
  FieldGroup, 
  FieldLabel 
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Controller } from 'react-hook-form'
import { contactSchema, ContactFormValues } from '@/lib/validations/contact'

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || 'Something went wrong')
        }

        toast.success('ส่งข้อความสำเร็จแล้ว')
        setIsSuccess(true)
        form.reset()
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการส่งข้อมูล';
        toast.error(errorMessage);
      }
    })
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle className="w-12 h-12 text-green-500" />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">ส่งข้อความสำเร็จ!</h3>
          <p className="text-muted-foreground">
            เราได้รับข้อความของคุณแล้ว และจะติดต่อกลับให้เร็วที่สุด
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
          className="mt-4"
        >
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>ชื่อ</FieldLabel>
              <Input placeholder="กรอกชื่อของคุณ" {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="example@email.com" {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>ข้อความ</FieldLabel>
              <Textarea 
                rows={5} 
                placeholder="พิมพ์ข้อความที่ต้องการ..." 
                {...field} 
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isPending}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        ส่งข้อความ
      </Button>
    </form>
  )
}
