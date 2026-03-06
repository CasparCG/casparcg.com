---
title: List of clients for controlling CasparCG
category: Related Projects
---

In order to use CasparCG Server, you will need a client to control it.

CasparCG Server can be controlled by the ACMP protocol, which is a simple text-based TCP protocol.
See the [AMCP protocol](../protocols/amcp-protocol.md) for further description.

So the simplest client software for CasparCG Server is a TCP connection with telnet or putty or any other TCP console software.

But using a command based client is complicated and not user friendly, so there a some good client programs out there.

_This Wiki page was converted from the CasparCG Forum. Mention of these projects here does **not** mean that these are endorsed or recommended by the CasparCG Project or SVT_

## CasparCG Client

The official CasparCG Client is made by SVT and can be found on the offical download site: http://www.casparcg.com/download

In general, it is developed close to the server and is capable as a good general propose client.
If you are new to CasparCG, use this client to get an idea of the program.

## Simple Video Playout by vimlesh1975

This Client by vimlesh1975 is a community made client and free to use. This is also known as casparmediaplayback CMP. It can be found on forum here.
[Download Location](https://casparcgforum.org/t/simple-video-playout/61)
![](https://casparcgforum.org/uploads/default/original/1X/8830106dccb35a5eb057cfb4313f343adfa77e5b.png)
This client has a broad band of use cases and is shipped with some templates too.
A good start for people with no budget and no development possibilities.

## React Casparc Client by vimlesh1975

Fabricjs canvas based designer and player.

https://casparcgforum.org/t/react-caspar-client/4375
Online Client
https://vimlesh1975.github.io/ReactCasparClient/
![](https://casparcgforum.org/uploads/default/original/2X/b/b0ecf95606dca2ebe401b95f4d802bcc0c58f24d.png)

## Web Animator by vimlesh1975

Fabricjs canvas based designer abd Theatrejs based Animator and player.

Online Client
https://vimlesh1975.github.io/ReactCasparClient/WebAnimator
![WebAnimator](https://github.com/CasparCG/help/assets/4338487/df4fb118-a5d9-4352-b972-3174a8f767fc)

## WebTeleprompter

Teleprompter software made in nextjs, with shuttlepro v2 support.
https://casparcgforum.org/t/webteleprompter/7277

Online Client
https://web-tele-prompter.vercel.app/
![](https://casparcgforum.org/uploads/default/original/2X/d/dd54a515f183fe5b3e2716c343e5f5bf5c09ffdf.jpeg)

## StudioLive by cambell

StudioLive is a web-based client for studios by cambell.
You can find it on github https://github.com/saygoweb/studiolive

## Scoreboard-client for Fistball / Faustball

CG Client Faustball is a client designed to support scoreboards and lower thirds for a sport called "Fistball / Faustball" (similar to "Volleyball"). It is written in Visual Studio Express 2012.

Project Files: https://www.dropbox.com/sh/2ycfcowibcq3qt6/K3fmiLgunh

## RedCast

There is another playout client, called RedCast: http://cast.red/

## TVPlay

TVPlay aka Open Playout Automation is television MCR (master control room) play-out. It is in development in Polish national television broadcaster - TVP (Telewizja Polska) for its regional channels and now works in 13 branches. It contains simple asset manager with file and linear ingest and shallow archive. Redundancy, rundown containers, nested rundowns, secondary events, some plugins (NDI preview, branding, router control...) - it's all included. And can be operated from several places at once (i.e. for control the playout, ingest clips, preparing rundowns) with built-in access control.

https://github.com/jaskie/PlayoutAutomation

## CasparCGAddIn - Excel plugin for CasparCG

Use Microsoft Excel as your CasparCG client.
![CasparCGAddIn for Excel](https://user-images.githubusercontent.com/6048776/77230146-7923ad80-6b92-11ea-95d5-9e09828a8961.png)

This Add-In is made for Microsoft Excel for Windows only.
You can download the setup program from [here][1] and the documentation from [here][2]. The source-code is [here][3]

Open source, licensed under the Apache License.

## FolderPlayout

[Folderplayout](https://github.com/baltedewit/folderplayout) is a a 24/7 playout client based on hierarchical schedule. You can combine groups, folders, clips and live inputs and use dates, weeks, days and hours to schedule these. When nothing from the schedule is playing, an external input is played. For example an info channel.

Folderplayout can be ran on solely CasparCG using Decklink inputs or using CasparCG for playout and Blackmagic Atem's for switching inputs.

[1]: https://www.dropbox.com/s/j1mie3c4vrre58d/CasparCGAddIn_Setup.exe?dl=0 "Installer for MS Excel"
[2]: https://www.dropbox.com/s/zm2xc2ulyfrysf8/CasparCG_AddIn.pdf?dl=0 "Documentation"
[3]: https://github.com/didikunz/CasparCGAddIn "GitHub page"
