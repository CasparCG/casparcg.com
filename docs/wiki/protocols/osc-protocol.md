---
title: OSC Protocol
category: Protocols
---

## Introduction

From v2.0.4 onwards, CasparCG Server adds support for the Open Sound Control (OSC) protocol which sends real-time data and events from CasparCG Server over UDP to a client.

In CasparCG Server, the OSC implementation provides one way support only, CasparCG Server provides a client interface, sending status information to an OSC server but does not listen for OSC datagrams from remote clients.

## Connection

When a client establishes a connection to the AMCP port configured for the server, an OSC client is started by CasparCG Server against the AMCP client's IP, using a default UDP port configurable in casparcg.config (see below), this OSC client will expire when the AMCP connection that initiated it ends. Persistent OSC clients can be set-up by adding them to the list of persistent clients in CasparCG config (as below).

Clients receive events by connecting to the OSC client interface provided by CasparCG Server, and then issuing a RegisterMethod command to subscribe to different properties and actions made available by the CasparCG Server. Looking at the source code for the Caspar Monitor example client, in particular Form1.cs would be a good place to start in understanding CasparCG Server and OSC.

## Configuration

The following is an example of the configuration entries which relate to the OSC implementation, as described above, persistent OSC clients can be added to the list of predefined clients by adding a `<predefined-client>` element, in the example below, an OSC client is defined for an OSC server on localhost port 5253.
OSC clients must defined by ip address not hostname.

```xml
<osc>
 <default-port>6250</default-port>
 <predefined-clients>
   <predefined-client>
     <address>127.0.0.1</address>
     <port>5253</port>
   </predefined-client>
 </predefined-clients>
</osc>
```

## OSC Messages

The OSC protocol uses a fairly simple message structure containing an address pattern and various arguments corresponding to each pattern, the protocol also includes other detail as described on the Wikipedia entry. The below is a list of address patterns and details of what response subscribing to this will trigger, this list is currently a work in progress and does not represent all of the addresses available, the example client by Andy Mace at the bottom of this page will show you what your CasparCG Server is doing live. It is important to note that OSC sends messages for things that are active only, if CasparCG Server is not doing anything you will only see a small number of lines.

Number ranges such as [0-9] should be substituted for the appropriate channel, layer or output port you are trying to monitor. More than one digit is acceptable in all of these cases but not specified for brevity.

### Output and Channel setting Messages

Output messages contain information about CasparCG Server Consumers, this largely contains information about which Consumers are active, alongside this are other messages such has format and profiler messages which contain more information about what the channel is doing.

<table>
<tbody>
<tr><th>Address</th><th></th><th>Example Arguments</th><th>Description</th></tr>
<tr><td rowspan="4">/channel/[0-9]/</td><td>format</td><td>PAL</td><td>The video format of the channel</td></tr>
<tr><td>profiler/time</td><td>0.041 | 0.04</td><td>The amount of time that CasparCG Server is spending rendering the frame, two arguments are sent in this message, what it is and what it should be as shown in the example.</td></tr>
<tr><td>output/port/<i>[0-9]</i>/type</td><td>screen</td><td>A message like this will exists for each of the outputs in use, with the default CasparCG config file in use this will result in two rows; one of type screen, and one of type system-audio. Current types are [Screen Consumer](../server/consumers/screen-consumer.md), system-audio, [Decklink Consumer](../server/consumers/decklink-consumer.md), [Bluefish Consumer](../server/consumers/bluefish-consumer.md) and [FFMpeg Consumer](../server/consumers/ffmpeg-consumer.md)</td></tr>
<tr><td>output/port/[0-9]/frame</td><td>200 | 922222222888836854</td><td>The number of frames that have been created by the consumer on this port, the example indicates that 200 frames have been written to disk and that a maximum of 922222222888836854 can be written.</td></tr>
</tbody>
</table>

### Stage Messages

Stage messages contain properties related to CasparCG Server layers and the producers that are contained within them.

#### General Stage messages

The following messages do not directly relate to a producer.

<table><tbody>
<tr><th>Address</th><th></th><th>Example Arguments</th><th>Description</th></tr>
<tr><td rowspan="6">/channel/[0-9]/stage/layer/[0-9]/</td><td>time</td><td>101.24</td><td>Seconds the layer has been active</td></tr>
<tr><td>frame</td><td>2531</td><td>Time in frames that the layer has been active</td></tr>
<tr><td>type</td><td>transition</td><td></td></tr><tr><td>background/type</td><td>empty</td><td></td></tr>
<tr><td>profiler/time</td><td>0.39 | 0.4</td><td>Actual | Expected time on frame</td></tr>
<tr><td>paused</td><td>True/False</td><td>Whether the layer is paused or not</td></tr>
</tbody></table>

#### FFMPEG Producer

The messages produced by the FFmpeg Producer are documented on [its page](../server/producers/ffmpeg-producer.md#osc-data).

#### Flash Producer

The messages below may be produced when an object utilising the [Flash Producer](../server/producers/flash-producer.md) is in use on the stage.

<table>
<tbody>
<tr><th>Address</th><th></th><th>Example Arguments</th><th>Description</th></tr>
<tr><td rowspan="4">/channel/[0-9]/stage/layer/[0-9]/host/</td><td>path</td><td>template_file.ft</td><td></td></tr>
<tr><td>width</td><td>1920</td><td></td></tr>
<tr><td>height</td><td>1080</td><td></td></tr>
<tr><td>fps</td><td>50</td><td></td></tr>
<tr><td>/channel/[0-9]/stage/layer/[0-9]/</td><td>buffer</td><td></td><td></td></tr>
</tbody></table>

### Mixer Messages

The majority of information from CasparCG's compositing module is not yet made available via OSC (an issue is open for this), the only information available currently is audio related as listed below.

<table>
<tbody>
<tr><th>Address</th><th></th><th>Example Arguments</th><th>Description</th></tr>
<tr><td rowspan="2">/channel/[0-9]/mixer/audio/</td><td>nb_channels</td><td>2</td><td>Number of audio channels in use on this CasparCG channel</td></tr>
<tr><td>[0-9]/dBFS</td><td>-20</td><td>Audio level in dBFS</td></tr>
</tbody></table>

## Example Clients

A couple of members of the CasparCG community have constructed simple OSC example clients to demonstrate its use, these are available from the links below. Pleaes note that in both cases these are basic examples of how to use the OSC protocol and intended to help understand how it works.

| Name                  | Description                                                                                                                                                                                                                                                                                            | Link                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Caspar CG OSC Monitor | Same name, different author to the below one, this application shows an implementation of the OSC Server in C## allowing UDP messages generated from Caspar CG Server to be shown, a few filter options are provided to limit which messages are shown. This is tested against Caspar CG Server v2.0.7 | [Link](https://github.com/duncanbarnes/Caspar-CG-OSC-Monitor)           |
| CasparCG OSC Monitor  | Andy Mace's OSC Monitor shows all OSC messages provided by CasparCG Server 2.1. Please note that this client was built when Caspar used TCP communication for OSC, as Caspar now uses UDP communication, this client currently does not work.                                                          | [Link](https://github.com/CasparCG/Tools/tree/master/csharp/OSCMonitor) |
