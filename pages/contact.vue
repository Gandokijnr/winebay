<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const topic = ref('')
const message = ref('')
const loading = ref(false)
const submitted = ref(false)
const error = ref('')

const handleSubmit = () => {
  if (!name.value || !email.value || !message.value) {
    error.value = 'Please fill in your name, email and message.'
    return
  }

  error.value = ''
  loading.value = true

  setTimeout(() => {
    loading.value = false
    submitted.value = true
    name.value = ''
    email.value = ''
    topic.value = ''
    message.value = ''
  }, 800)
}

const faqs = [
  {
    question: 'How long does delivery take?',
    answer:
      'Most orders within major cities are delivered within 1-3 working days. You will see a more precise estimate at checkout based on your address.'
  },
  {
    question: 'Can I change or cancel my order?',
    answer:
      'If your order has not yet been packed, our support team can usually help update the delivery address or cancel. Please contact us as soon as possible with your order ID.'
  },
  {
    question: 'What if a bottle arrives damaged?',
    answer:
      'We will always make it right. Take a quick photo of the damaged items and packaging and share it with our support team so we can arrange a replacement or refund.'
  },
  {
    question: 'Do you offer recommendations for food pairing?',
    answer:
      'Yes. Tell us what you are cooking, the number of guests and your budget, and we will suggest bottles that pair well with your menu.'
  }
]

const openIndex = ref<number | null>(0)

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <section class="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div class="space-y-2">
          <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Contact & support</p>
          <h1 class="text-2xl sm:text-3xl font-semibold">We are here to help with your WineHub orders.</h1>
          <p class="text-sm sm:text-base text-[#4A4A54] max-w-2xl">
            Whether you need help choosing a bottle, tracking an order or resolving an issue, our support team is happy
            to assist.
          </p>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] items-start mb-10 sm:mb-12">
        <div class="space-y-4">
          <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 text-sm">
            <h2 class="text-sm sm:text-base font-semibold mb-2">Send us a message</h2>
            <p class="text-xs sm:text-sm text-[#4A4A54] mb-3">
              Share a few details and we will reply by email as soon as possible.
            </p>

            <div v-if="submitted" class="mb-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-xs sm:text-sm text-emerald-800">
              Thank you for reaching out. A member of the WineHub team will get back to you shortly.
            </div>

            <form class="space-y-3" @submit.prevent="handleSubmit">
              <div class="grid sm:grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Name</label>
                  <input
                    v-model="name"
                    type="text"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
                <div class="space-y-1">
                  <label class="block text-[11px] font-medium text-[#4A4A54]">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Topic</label>
                <input
                  v-model="topic"
                  type="text"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0]"
                  placeholder="Order issue, recommendation, account, other..."
                />
              </div>

              <div class="space-y-1">
                <label class="block text-[11px] font-medium text-[#4A4A54]">Message</label>
                <textarea
                  v-model="message"
                  rows="4"
                  class="w-full rounded-xl border border-[#E4E4EC] bg-[#FAF7F3] px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#6B1238] focus:ring-2 focus:ring-[#F3DEC0] resize-none"
                />
              </div>

              <p v-if="error" class="text-[11px] sm:text-xs text-[#B42318]">
                {{ error }}
              </p>

              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-full bg-[#6B1238] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold hover:bg-[#8E1E3A] disabled:opacity-60 disabled:cursor-not-allowed"
                :disabled="loading"
              >
                <span v-if="!loading">Send message</span>
                <span v-else>Sending...</span>
              </button>
            </form>
          </div>
        </div>

        <aside class="space-y-4">
          <div class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 text-sm space-y-3">
            <h2 class="text-sm sm:text-base font-semibold">Contact channels</h2>
            <dl class="space-y-2 text-xs sm:text-sm text-[#4A4A54]">
              <div>
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Email</dt>
                <dd class="font-medium">support@winehub.com</dd>
              </div>
              <div>
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Phone</dt>
                <dd class="font-medium">+234 800 000 0000</dd>
              </div>
              <div>
                <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Support hours</dt>
                <dd class="font-medium">Mon &ndash; Sat, 09:00 &ndash; 19:00 (WAT)</dd>
              </div>
            </dl>

            <button
              type="button"
              class="w-full inline-flex items-center justify-center rounded-full border border-[#E4E4EC] bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#4A4A54] hover:border-[#6B1238] hover:text-[#6B1238]"
            >
              Live chat (coming soon)
            </button>
          </div>
        </aside>
      </section>

      <section class="mb-6 sm:mb-8">
        <div class="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2 class="text-lg sm:text-xl font-semibold">Frequently asked questions</h2>
            <p class="text-xs sm:text-sm text-[#4A4A54]">
              Quick answers to common questions about orders, delivery and recommendations.
            </p>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-[#E4E4EC] divide-y divide-[#F1F1F5]">
          <button
            v-for="(item, index) in faqs"
            :key="item.question"
            type="button"
            class="w-full text-left px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-[#111118] flex items-start justify-between gap-3"
            @click="toggleFaq(index)"
          >
            <div class="flex-1 min-w-0">
              <p class="font-semibold mb-1">
                {{ item.question }}
              </p>
              <p v-if="openIndex === index" class="text-[11px] sm:text-xs text-[#4A4A54]">
                {{ item.answer }}
              </p>
            </div>
            <span class="text-[13px] text-[#A0A0AA]">
              {{ openIndex === index ? '-' : '+' }}
            </span>
          </button>
        </div>
      </section>
    </main>
  </div>
</template>
