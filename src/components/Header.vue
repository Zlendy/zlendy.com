<script setup lang="ts">
import { Menu, Search, } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
</script>

<template>
    <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav
            class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <a href="#" class="text-foreground transition-colors hover:text-foreground">
                Home
            </a>
            <a href="#" class="text-muted-foreground transition-colors hover:text-foreground">
                Blog
            </a>
            <a href="#" class="text-muted-foreground transition-colors hover:text-foreground">
                About
            </a>
        </nav>
        <Sheet>
            <SheetTrigger as-child>
                <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                    <Menu class="h-5 w-5" />
                    <span class="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav class="grid gap-6 text-lg font-medium">
                    <a href="#" class="hover:text-foreground">
                        Home
                    </a>
                    <a href="#" class="text-muted-foreground hover:text-foreground">
                        Blog
                    </a>
                    <a href="#" class="text-muted-foreground hover:text-foreground">
                        About
                    </a>
                </nav>
            </SheetContent>
        </Sheet>
        <!-- <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form class="ml-auto flex-1 sm:flex-initial">
                <div class="relative">
                    <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
                </div>
            </form>
        </div> -->
    </header>
</template>