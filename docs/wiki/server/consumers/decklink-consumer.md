---
title: Decklink Consumer
category: Consumers
---

![](../../Images/DeckLink_Consumer.jpg)

Outputs the playing media on to DeckLink video cards with full SDI and/or HDMI support for SD and HD resolutions, frame rates, pixel aspect ratios, including support (depending on the card's capabilities) for separate fill and key output and embedded or separate audio.

## How to Use

To get video in and key output, open casparcg.config in a text editor and use the following node for consumers:

```
<consumers>
    <decklink/>
</consumers>
```

## Multiple Cards

Support for multiple DeckLink cards were introduced in CasparCG Server 2.0.

## Automatic Conversion of Output Levels

To comply with broadcast standards such as CCIR 601 and Rec. 709 the 0-255 RGB levels rendered by the producers is automatically converted to the correct broadcast format (for example a range of 16-235) by the DeckLink Consumer, based on the card settings.

## Genlock

Genlock is supported with this consumer.

## Notes

The DeckLink Consumer was added in CasparCG Server version 1.8.
