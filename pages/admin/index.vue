<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-[#FAF7F3] text-[#111118]">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <header class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div class="space-y-1">
          <p class="text-xs font-semibold tracking-[0.16em] uppercase text-[#A0A0AA]">Admin</p>
          <h1 class="text-2xl sm:text-3xl font-semibold">WineHub dashboard</h1>
          <p class="text-sm sm:text-base text-[#4A4A54] max-w-2xl">
            Internal view of your catalog, orders and customers. This demo dashboard uses mock data only.
          </p>
        </div>
      </header>

      <section class="grid gap-4 sm:gap-5 md:grid-cols-3 mb-8 sm:mb-10">
        <NuxtLink
          to="/admin/products"
          class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 hover:border-[#6B1238] transition-colors flex flex-col justify-between"
        >
          <div>
            <h2 class="text-sm sm:text-base font-semibold mb-1">Products</h2>
            <p class="text-xs sm:text-sm text-[#4A4A54]">
              Manage wines in your catalog: add new bottles, adjust pricing or hide items.
            </p>
          </div>
          <p class="mt-3 text-[11px] sm:text-xs text-[#6B1238] font-medium">Go to product management →</p>
        </NuxtLink>

        <NuxtLink
          to="/admin/orders"
          class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 hover:border-[#6B1238] transition-colors flex flex-col justify-between"
        >
          <div>
            <h2 class="text-sm sm:text-base font-semibold mb-1">Orders</h2>
            <p class="text-xs sm:text-sm text-[#4A4A54]">
              Review recent orders, update statuses and keep customers informed.
            </p>
          </div>
          <p class="mt-3 text-[11px] sm:text-xs text-[#6B1238] font-medium">Go to order management →</p>
        </NuxtLink>

        <NuxtLink
          to="/admin/customers"
          class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 hover:border-[#6B1238] transition-colors flex flex-col justify-between"
        >
          <div>
            <h2 class="text-sm sm:text-base font-semibold mb-1">Customers</h2>
            <p class="text-xs sm:text-sm text-[#4A4A54]">
              See who is shopping with WineHub and keep basic contact details in one place.
            </p>
          </div>
          <p class="mt-3 text-[11px] sm:text-xs text-[#6B1238] font-medium">View customer list →</p>
        </NuxtLink>
      </section>

      <section class="grid gap-4 sm:gap-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)] items-start">
        <NuxtLink
          to="/admin/inventory"
          class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 hover:border-[#6B1238] transition-colors flex flex-col justify-between min-h-[9rem]"
        >
          <div>
            <h2 class="text-sm sm:text-base font-semibold mb-1">Inventory overview</h2>
            <p class="text-xs sm:text-sm text-[#4A4A54]">
              Keep an eye on stock levels so you never run out of your most-loved bottles.
            </p>
          </div>
          <p class="mt-3 text-[11px] sm:text-xs text-[#6B1238] font-medium">Open inventory overview →</p>
        </NuxtLink>

        <NuxtLink
          to="/admin/analytics"
          class="bg-white rounded-2xl border border-[#E4E4EC] p-4 sm:p-5 hover:border-[#6B1238] transition-colors flex flex-col justify-between min-h-[9rem]"
        >
          <div>
            <h2 class="text-sm sm:text-base font-semibold mb-1">Sales analytics</h2>
            <p class="text-xs sm:text-sm text-[#4A4A54]">
              High-level view of revenue, orders and average basket size over time.
            </p>
          </div>
          <p class="mt-3 text-[11px] sm:text-xs text-[#6B1238] font-medium">View analytics →</p>
        </NuxtLink>
      </section>
    </main>
  </div>
</template>
