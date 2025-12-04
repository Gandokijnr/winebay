<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <!-- Hero / Intro -->
      <section class="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center mb-10 sm:mb-12">
        <div class="space-y-3 sm:space-y-4">
          <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">About WineHub</p>
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
            Curating wines for modern, curious drinkers.
          </h1>
          <p class="text-sm sm:text-base text-[#4A4A54] max-w-xl">
            WineHub is a digital-first wine store built for people who love discovery. We bring together winemakers,
            regions and stories from around the world so you can build a cellar that feels personal, not generic.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3 sm:gap-4">
          <div class="col-span-2 row-span-2 rounded-3xl overflow-hidden bg-[#F3F0EB]">
            <img
              src="https://images.pexels.com/photos/2148406/pexels-photo-2148406.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Wine bottles on a shelf"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="rounded-3xl overflow-hidden bg-[#F3F0EB]">
            <img
              src="https://images.pexels.com/photos/2903164/pexels-photo-2903164.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Pouring a glass of white wine"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="rounded-3xl overflow-hidden bg-[#F3F0EB]">
            <img
              src="https://images.pexels.com/photos/1407851/pexels-photo-1407851.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Wine tasting table"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section class="grid gap-4 sm:gap-6 md:grid-cols-2 mb-10 sm:mb-12">
        <article class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5">
          <h2 class="text-sm sm:text-base font-semibold mb-2">Our mission</h2>
          <p class="text-sm text-[#4A4A54]">
            To make great wine less intimidating and more accessible. WineHub removes the guesswork with clear
            descriptions, honest recommendations and tools that help you shop the way sommeliers think &mdash; by
            region, style, mood and food pairing.
          </p>
        </article>
        <article class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5">
          <h2 class="text-sm sm:text-base font-semibold mb-2">Our vision</h2>
          <p class="text-sm text-[#4A4A54]">
            A world where anyone can build a cellar they are proud of, whether that is three bottles for the weekend or
            fifty for a celebration. We see WineHub as your long-term tasting companion &mdash; always learning your
            preferences and introducing you to new regions, grapes and producers.
          </p>
        </article>
      </section>

      <!-- Story / Timeline -->
      <section class="mb-10 sm:mb-12">
        <div class="mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h2 class="text-lg sm:text-xl font-semibold">Our story</h2>
            <p class="text-sm text-[#4A4A54] max-w-xl">
              WineHub started as a small tasting group frustrated by confusing labels and cluttered shelves. We decided
              to rebuild the wine shop from the ground up for the digital age.
            </p>
          </div>
        </div>

        <ol class="space-y-3 border-l border-dashed border-[#E4E4EC] pl-4 sm:pl-5">
          <li class="relative pl-3 sm:pl-4">
            <div class="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-[#6B1238]"></div>
            <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-0.5">2019 &mdash; Tasting table</p>
            <p class="text-sm font-semibold">From living room tastings to a shared spreadsheet</p>
            <p class="text-xs sm:text-sm text-[#4A4A54]">
              We began as a group of friends cataloguing every bottle we tried. Notes, pairings and ratings quickly
              turned into a structured database and the seed of WineHub.
            </p>
          </li>
          <li class="relative pl-3 sm:pl-4">
            <div class="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-[#D8B46A]"></div>
            <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-0.5">2021 &mdash; First orders</p>
            <p class="text-sm font-semibold">Launching our online cellar</p>
            <p class="text-xs sm:text-sm text-[#4A4A54]">
              We opened WineHub to early customers with a curated list of bottles we personally loved, focusing on clear
              tasting notes instead of jargon.
            </p>
          </li>
          <li class="relative pl-3 sm:pl-4">
            <div class="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-[#6B1238]"></div>
            <p class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA] mb-0.5">Today</p>
            <p class="text-sm font-semibold">A growing community of wine lovers</p>
            <p class="text-xs sm:text-sm text-[#4A4A54]">
              Today WineHub serves curious drinkers across multiple cities, with tailored recommendations, fast
              delivery, and an account space designed to grow with your tastes.
            </p>
          </li>
        </ol>
      </section>

      <!-- Store images / Atmosphere -->
      <section class="mb-10 sm:mb-12">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h2 class="text-lg sm:text-xl font-semibold">A peek inside WineHub</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div class="col-span-2 md:col-span-1 rounded-2xl overflow-hidden bg-[#F3F0EB]">
            <img
              src="https://images.pexels.com/photos/4664338/pexels-photo-4664338.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Shelves of wine in the store"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="rounded-2xl overflow-hidden bg-[#F3F0EB]">
            <img
              src="https://images.pexels.com/photos/890705/pexels-photo-890705.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Sommelier pouring wine at a tasting bar"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="rounded-2xl overflow-hidden bg-[#F3F0EB]">
            <img
              src="https://images.pexels.com/photos/2148408/pexels-photo-2148408.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Close-up of wine bottles and corks"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <!-- Contact information -->
      <section class="grid gap-4 sm:gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] mb-6 sm:mb-8">
        <article class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm">
          <h2 class="text-sm sm:text-base font-semibold">Contact us</h2>
          <p class="text-xs sm:text-sm text-[#4A4A54]">
            Questions about an order, a bottle, or pairing for an upcoming dinner? We are happy to help.
          </p>
          <dl class="space-y-2 text-xs sm:text-sm text-[#4A4A54]">
            <div>
              <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Email</dt>
              <dd class="font-medium">support@winehub.com</dd>
            </div>
            <div>
              <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Phone</dt>
              <dd class="font-medium">+234 800 000 0000</dd>
            </div>
          </dl>
        </article>

        <article class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 space-y-3 text-sm">
          <h2 class="text-sm sm:text-base font-semibold">Visit or deliver to</h2>
          <dl class="space-y-2 text-xs sm:text-sm text-[#4A4A54]">
            <div>
              <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Showroom</dt>
              <dd class="font-medium">
                12 Wine Street, Apartment 4B
                <br />
                Abuja, FCT, Nigeria 900108
              </dd>
            </div>
            <div>
              <dt class="text-[11px] uppercase tracking-[0.16em] text-[#A0A0AA]">Hours</dt>
              <dd class="font-medium">Mon &ndash; Sat, 10:00 &ndash; 19:00 (WAT)</dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  </div>
</template>
