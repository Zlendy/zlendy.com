---
title: 'PSA: Beware of the "tuned" package in your Proxmox VE homelab'
createdAt: '2025-08-16 16:48 UTC'
updatedAt: null
description: This is a short post to warn others about a recent headache I had in my Proxmox VE homelab.
fediverse: abi28q9y6sue001j
---

This is a short post to warn others about a recent headache I had in my Proxmox VE homelab.

# Introduction

Shortly after I put the server together, I installed the `tuned` package (a popular tool to optimize the system for different workloads) and set the active profile to `powersave` in an attempt to lower my overall energy usage. This was done so early on that I had since forgotten about it.

It worked for a few months, until I suddenly started experiencing random disconnects from my NIC and general system instability (random reboots and errors in `journalctl`).

It was extremely hard to debug this issue, because it didn't follow a clear pattern. I had no way to trigger it at any time.

# Fixing the issue

There were two different errors that stemmed from the same source:

This is the first one:

```
r8169 0000:07:00.0 eno1: rtl_rxtx_empty_cond == 0 (loop: 42, delay: 100).
```

![r8169 0000:07:00.0 eno1: rtl_rxtx_empty_cond == 0 (loop: 42, delay: 100).](./rtl_rxtx_empty_cond.avif)

And this is the second one:

```
vmbr0: port 1(eno1) entered forwarding state
vmbr0: port 1(eno1) entered blocking state
vmbr0: port 1(eno1) entered disabled state
```

![vmbr0: port 1(eno1) entered forwarding blocking disabled state](./vmbr0_entered_forwarding_blocking_disabled_state.avif)

## First attempt

I thought it was a driver/hardware issue with my Realtek NIC. And it made sense, many users on the internet reported having similar issues with Realtek NICs using the default driver (r8169) and fixed them by either:

1. Installing an out-of-tree driver such as r8168.
2. Using a NIC with a different chip.

I refused to install out-of-tree drivers into my Proxmox host, fearing that the solution will end up being more troublesome down the road than the original problem. So I paid 25 bucks for a 2.5Gbit PCIe 3.1 x1 NIC with an Intel I226-V chip and slotted it into the motherboard.

It didn't work, the exact same errors were still showing up in `journalctl`.
Although it is _technically_ possible that my new device was buggy and it _coincidentally_ was the same error I had with the other NIC, it was too much of a coincidence and I ruled out the possibility that this was a hardware problem.

## Second attempt

Maybe my UEFI/BIOS was the culprit, my [ASUS Prime B650M-A II CSM](https://www.asus.com/us/motherboards-components/motherboards/csm/prime-b650m-a-ii-csm/) was a new device after all. Surely an update will fix it right?
After resetting the BIOS to its default settings and upgrading from v3067 to v3278...

It wasn't fixed. But hey, at least it's up to date now!

## Third attempt

In my first attempt, I refused to install an out-of-tree driver. So maybe, if I just upgraded the kernel from `6.8.12` (`proxmox-kernel-6.8.12-13-pve-signed`) to 6.14.8 (`proxmox-kernel-6.14.8-2-bpo12-pve-signed`), a newer (and hopefully better) driver had been merged since and would have better compatibility with my new hardware and this issue would go away.

Still no. And for better or worse, I have a newer kernel now.

## Fourth attempt

I read on the Proxmox forum that deactivating hardware offloading would increase the load on the CPU but had a chance of fixing this.
At this point, I was just throwing shit at the wall to see if it sticks.

Of course, it didn't. _(And my wall is stained, ew!)_

## Final attempt

Again, I read on the [Proxmox forum](https://forum.proxmox.com/threads/all-nic-interfaces-continuously-up-down-or-at-100mbs-at-wits-end-here.167017/#post-775898) another user had the same problem as me and fixed it by just uninstalling `tuned`.

And this time, it actually worked!

# Conclusion

After the issue had been found, I tried to reinstall `tuned` and change the active profile from `powersave` to `server-powersave` which also didn't cause any issues. This is because the former profile cuts power more aggressively than the latter so I stuck with that.

This would all have been avoided if I had closely monitored the logs shortly after I installed `tuned`, but I didn't. And was therefore forced to, little by little, guess what the actual problem was and how to fix it.

Keep in mind that this is just my experience, maybe `powersave` is perfectly stable in your system and `server-powersave` is not.

If you found this post because you too are debugging some obscure error, I'd suggest scavenging forums such as Proxmox's or Reddit. If even then you're unable to find any solution, then ask others for advice on those same forums.
