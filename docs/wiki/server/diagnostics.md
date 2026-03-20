---
title: Diagnostics
category: Server
sidebar_position: 2
---

See [Server > Configuration > diagnostics](../server/configuration.md#diagnostics) for configuration information.

Note: The middle dashed line indicates "real-time", thus no "time" graphs should exceed that line.

## video_channel

### mix-time

Time spent mixing the video streams, this include GPU image rendering and CPU audio mixing.

If this graph exceeds the "real-time" graph then the GPU is most likely a bottleneck.

### output-time

Time spent sending the frame to the consumers, this time includes both consumer frame processing time and synchronization.

### produce-time

Time spent rendering the video-streams, note that asynchronous producers (such as the flash-producers) are not included here.

### tick-time

Time spent on one frame. This shows the total time spent on a frame, including processing and synchronization.

This graph should be on the "real-time" line, with minor spikes which are hidden through buffering.

## ffmpeg

### buffer-count

Number of packets in the file read buffer.

### buffer-size

Total size of packets in the file read buffer.

### frame-time

Time spent rendering frames.

### seek

Displayed when the producer seeks. Usually while looping.

### underflow

Displayed when producer does not receive enough data from the file, usually due to disc performance bottlenecks.
