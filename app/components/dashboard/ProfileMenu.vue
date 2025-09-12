<script lang="ts" setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { LogOut, User } from 'lucide-vue-next';
</script>

<template>
  <DropdownMenu>

    <DropdownMenuTrigger as-child class="cursor-pointer">
      <NuxtImg src="/img/avatar.png" alt="" class="rounded-lg size-9" />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="translate-y-1.5 border shadow-lg shadow-slate-600/10 rounded-lg">
      <DropdownMenuLabel asChild class="w-64 p-3">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="inline-block">
              <NuxtImg src="/img/avatar.png" alt="" class="rounded-lg size-9" />
            </div>

            <div class="flex flex-col">
              <span class="text-sm">Анна Смирнова</span>
              <span class="text-xs text-muted-foreground">anna.smirnova@example.ru</span>
            </div>
          </div>

          <div>
            <Button class="w-full" size="sm" asChild>
              <NuxtLink to="/dashboard/profile">Оформление подписки</NuxtLink>
            </Button>
          </div>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuRadioGroup class="p-1">
        <DropdownMenuItem class="py-2 px-3">
          <NuxtLink to="#" class="flex items-center gap-2">
            <User class="size-4" />
            <span>Мой профиль</span>
          </NuxtLink>
        </DropdownMenuItem>
      </DropdownMenuRadioGroup>

      <DropdownMenuSeparator />

      <DropdownMenuRadioGroup class="p-1">
        <DropdownMenuItem class="py-2 px-3">
          <LogOut class="size-4" />
          <span>Выход</span>
        </DropdownMenuItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
    
  </DropdownMenu>
</template>