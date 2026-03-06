---
title: Decklink Producer
category: Producers
---

![](../../Images/DeckLink_Producer.jpg)

The Decklink producer allows video sources to be input from BlackMagic Design cards and used as CasparCG Server layers so that CasparCG Server's Mixer can then be used to manipulate the layer. Note that the DeckLink Producer is separate from the DeckLink Consumer which can be used to output from Caspar as HD/SD SDI or HDMI.

Please see the Table of supported video cards.

Please see the AMCP commands section for a complete reference of the AMCP commands used to control this module.

## Supported Devices

The current release of the CasparCG Server's DeckLink Consumer uses the [DeckLink SDK](https://www.blackmagicdesign.com/support/family/capture-and-playback) and should support all BlackMagic Design cards. Please note that the only certain cards support synced output of simultaneous fill and key to SDI. Please see the Table of supported video cards.

Multiple cards can be used inside a PC, the computer's specification will determine how many cards can be supported.
