---
title: NDI Consumer
category: Consumers
---

## NDI Consumer

Starting with CasparCG 2.3 NDI is a native citizen.

_Note: you might have to install the [NDI tools](https://www.ndi.tv/tools/) for this to work?_

### Configuration file

```
<ndi>
  <name>[custom name]</name>
  <allow-fields>false [true|false]</allow-fields>
</ndi>
```

### AMCP

`add 1 ndi name xyz`

This NDI source xyz can be viewed from OBS / vMix /Tricaster in NDI sources list / network video list, with CCG PC Name and channel xyz.

## Before version 2.3:

CasparCG supported NDI only through the iVGA SDK before version 2.3

_Note 2: links provided in this section are likely dead links due to their age_

### How to use iVGA

- Install [NewTek Network Video Send.exe](http://new.tk/NetworkSendRedist).
- Configure the CasparCG Server to use a Newtek iVGA output.

```
<consumers>
  <newtek-ivga>
    <channel-layout>stereo [mono|stereo|dts|dolbye|dolbydigital|smpte|passthru]</channel-layout>
    <provide-sync>true [true|false]</provide-sync>
  </newtek-ivga>
</consumers>
```

### How to use NDI

- Install [NewTek Network Video Send.exe](http://new.tk/NetworkSendRedist).
- Install [NewTek NDI AirSend Updater.exe](http://pages.newtek.com/NDI-Upgrader-Download-Link.html).
  - You may need to fix the location of the dlls.

    Copy `C:\Program Files\NewTek\NewTek NDI AirSend Updater\Processing.AirSend.x64.dll` to `C:\Windows\System32\`

    Copy `C:\Program Files\NewTek\NewTek NDI AirSend Updater\Processing.AirSend.x86.dll` to `C:\Windows\SysWOW64\`

- Configure the CasparCG Server to use a Newtek iVGA output.

  _(Even though it says iVGA, it will actually be outputting NDI thanks to the updated AirSend DLLs)_.

```
<consumers>
  <newtek-ivga />
</consumers>
```

You can test using the _Studio Monitor_ program that comes with the [NDI SDK](https://www.newtek.com/ndi/sdk/).
