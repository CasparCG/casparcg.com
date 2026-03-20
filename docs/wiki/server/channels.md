---
title: Channels
category: Server
sidebar_position: 6
---

A CasparCG Server's channels can be compared to as a pipeline that starts with one or several input modules (called [Producers](./producers/index.md)) and ends with an output (called [Consumers](./consumers/index.md))

## Layers

Each channel can contain up to 9,999 layers of content (with both fill and key/alpha) such as video, Flash templates, Audio, images and colors, rendered by one of the producers.

Layers can then be reorganized, restaked, animated and changed in realtime in CasparCG Server's Mixer module.

The bottom-most layer is layer 0 and layer 9999 is the top-most layer.

If you load content into a layer that already contains something, that content is replaced.

## Fill Channels

The Fill channels is another name for the color channels that make up the image that you actually see when playing a video or image. CasparCG Server outputs the standard three color channels Red, Green and Blue of content at 8 bits per channel.

## Key / Alpha Channel

CasparCG Server 2.0 assumes that all content has pre-multiplied alpha. Version 2.0.4 added support for straight alpha blending in the compositing stage.

CasparCG Server automatically generates a key signal on the the key output of your DeckLink or Bluefish card. If your video files have an embedded alpha channel, that will be used. Everything that cover the stage background in your Flash template graphics (even FLV video or PNG sequences) will become your key signal. When you play both video (one layer) and several Flash layers at once, CasparCG Server handles the compositing and outputs the combined fill and key signals separately.

Content played by the [Flash Producer](./producers/flash-producer.md) is always pre-multiplied against black (no matter what the Stage background color is set to.) When composited on top or between other content (either Flash content in FTs or pre-rendered videos played by the [FFmpeg Producer](./producers/ffmpeg-producer.md), Flash's Stage will become transparent and reveal underlying layers. The alpha channel in videos played by the FFmpeg Producer should be premultiplied so you can play content from any other producer on top and have everything correctly composited.

The alpha channel in videos played by the [FFmpeg Producer](./producers/ffmpeg-producer.md) should be premultiplied so you can play content from any other producer on top and have everything correctly composited.
