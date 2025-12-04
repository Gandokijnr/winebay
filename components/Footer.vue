<template>
  <footer class="bg-[#111118] text-white pt-10 pb-6 mt-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="h-8 w-8 rounded-full bg-gradient-to-br from-[#6B1238] to-[#D8B46A] flex items-center justify-center text-xs font-semibold">
              WH
            </div>
            <span class="text-lg font-semibold tracking-tight">WineBay</span>
          </div>
          <p class="text-sm text-[#A0A0AA]">Your trusted marketplace for premium wines, delivered with care.</p>
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Shop</h3>
          <ul class="space-y-2 text-sm text-[#A0A0AA]">
            <li><a href="#" class="hover:text-white transition-colors">Red wines</a></li>
            <li><a href="#" class="hover:text-white transition-colors">White wines</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Sparkling</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Gifts &amp; sets</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Support</h3>
          <ul class="space-y-2 text-sm text-[#A0A0AA]">
            <li><a href="#" class="hover:text-white transition-colors">Help center</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Shipping &amp; returns</a></li>
            <li><NuxtLink to="/contact" class="hover:text-white transition-colors">Contact us</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Company</h3>
          <ul class="space-y-2 text-sm text-[#A0A0AA]">
            <li><NuxtLink to="/about" class="hover:text-white transition-colors">About WineBay</NuxtLink></li>
            <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Responsible drinking</a></li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 text-xs text-[#A0A0AA]">
        <p> 2025 WineBay. All rights reserved.</p>
        <div class="flex items-center gap-3">
          <span>Privacy</span>
          <span class="w-px h-3 bg-white/20"></span>
          <span>Terms</span>
        </div>
      </div>
    </div>
  </footer>
</template>
