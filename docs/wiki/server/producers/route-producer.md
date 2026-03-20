---
title: Route Producer
category: Producers
---

Provides a way of routing frames from other producers from one channel or layer to a layer on another channel.

## Usage

### AMCP Command

There are two commands that can be used for routing layers and channels. The `ROUTE` command, and the normal `PLAY` / `LOAD` / `LOADBG` commands.

```
PLAY [destinationchannel:int]{-[destinationlayer:int]} [route://][sourcechannel:int]{-[sourcelayer:int]}
```

Where:

`destinationchannel-destinationlayer` is the destination channel and layer.

`sourcechannel-sourcelayer` is the source channel and layer to be routed through to the destination.

Note that the `route://` is optional (but preferred), and if omitted will route the source layer to the `<channel>-<layer>`.

```
PLAY [sourcechannel:int]{-[sourcelayer:int]} [route://[destinationchannel:int]
```

The command above can be used to route the "source channel" through to another channel-layer.

## Notes

The current implementation only supports routing between channels running the same framerate and sync.
