---
title: Audio
category: Media
---

## Sampling Rate

- CasparCG Server 2.0.3 and earlier works with 32-bit, 2-channel stereo sound.
- Embedded SDI audio via BlackMagic Design's cards is 32-bit, 2-channel stereo sound.
- Embedded SDI audio via Bluefish cards is 16-bit, 2-channel stereo sound.
- System audio (via the computer's sound card) is 16-bit, 2-channel stereo sound.
  The preferred sampling rate of audio is 48 kHz which conforms with broadcast standards, however other sampling rates, such as 44.1 kHz (CD Audio) also work.

**Audio inputs that are not 48 kHz, 32-bit stereo are automatically transcoded in real-time.**

## Audio Producers

The FFmpeg producer and the DeckLink producer can both handle audio.

The FFmpeg producer tries to determine the channel layout of the source file, but sometimes cannot do so correctly. Therefore the possibility to specify the channel layout of a file exists. It can be done like this:

```
PLAY 1-0 surround_file CHANNEL_LAYOUT SMPTE
```

...or by using a custom on-the-fly generated channel layout:

```
PLAY 1-0 surround_file CHANNEL_LAYOUT "5.1:Ls Rs L R C LFE"
```

The DeckLink producer by default assumes "stereo" as the channel layout, but can be told to use another layout:

```
PLAY 1-0 DECKLINK DEVICE 2 FORMAT 720p5000 CHANNEL_LAYOUT SMPTE
```

...or a custom layout with the same syntax as expected by the FFmpeg producer:

```
PLAY 1-0 DECKLINK DEVICE 2 FORMAT 720p5000 CHANNEL_LAYOUT "5.1:Ls Rs L R C LFE"
```

## Audio Consumers

All consumers receive audio data in the channel layout used by the audio mixer, but can convert it to another layout. Here is how the relevant (those consuming audio in any way) consumers handles incoming audio:

- `system-audio` Always converts to stereo
- `decklink` Defaults to stereo but can be told to use another via the `<channel-layout>` element in `casparcg.config` or the `CHANNEL_LAYOUT` parameter. Note that the actual output on the SDI cable will always be 2 channels, 8 channels or 16 channels. So for example a 5.1 channel layout will cause 8 channels to be sent but with the two last channels silent. In the case of mono, channel 1 will be duplicated to channel 2.
- `bluefish` Defaults to stereo but can be told to use another via the `<channel-layout>` element in `casparcg.config` or the `CHANNEL_LAYOUT` parameter.
- `ffmpeg` Always uses the same audio layout as the audio mixer. Note that the default audio codec for a given container type might not support the encoding of more than 2 channels, in which case the FFmpeg consumer will fail to initialize. A custom `-acodec` must be given in those cases which supports the number of channels used by the video channel.

## Audio Channels

2-channel stereo is supported in CasparCG Server 2.0.3 and earlier.

Mono and up to 16 channel audio input and output is supported from CasparCG Server version 2.0.4.

### Audio Channel Layouts

The audio pipeline works with a concept called channel layouts. It is a mapping between a numbered audio channel and the corresponding speaker it is supposed to be directed to. The following are the predefined layouts in CasparCG Server 2.0.4 and later:

```
============================================================
Name         Type          Layout
------------ ------------- ---------------------------------
mono         1.0           C
stereo       2.0           L R
dts          5.1           C L R Ls Rs LFE
dolbye       5.1+stereomix L R C LFE Ls Rs Lmix Rmix
dolbydigital 5.1           L C R Ls Rs LFE
smpte        5.1           L R C LFE Ls Rs
passthru     16ch          (will just pass everything as is)
============================================================
```

The channel layout type like for example "5.1" is a string selected by convention to describe what set of channels to expect in the layout. This means that for example dts and smpte are directly translatable, just by rearranging the order of the channels.

The channel layout concept is used in the following areas:

The frames produced by a producer has a channel layout.
The audio mixer mixes in a specific channel layout. The mixer automatically converts incoming audio to the correct channel layout if necessary before mixing.
A consumer might convert the frames delivered from the audio mixer to any other channel layout before outputting the audio.
A channel layout can be redefined or added by adding an element in casparcg.config in the configuration/audio/channel-layouts element. The element name is used as the layout name:

```xml
 <channel-layouts>
   <quad>
     <type>4.0</type>
     <num-channels>4</num-channels>
     <channels>L R Ls Rs</channels>
   </quad>
 </channel-layouts>
```

Rearranging and up/down mixing
If a file played by the FFmpeg producer has the channel layout "dolbydigital" and the audio_mixer channel layout is "smpte", the audio mixer will recognise that no upmixing or downmixing is required to adapt the incoming data on the FFmpeg layer (both "dolbydigital" and "smpte" share the same layout type "5.1"), so it just rearranges the channel order:

```
 0 => 0 (L)
 1 => 2 (C)
 2 => 1 (R)
 3 => 4 (Ls)
 4 => 5 (Rs)
 5 => 3 (LFE)
```

If on the other hand the layouts are of different types, a so called mix config will be used in order to determine how to convert the audio channels.

### Audio Mix Configs

A mix config specifies how to convert audio of a channel layout type (for example "5.1") to another layout type (for example "2.0"). The default mix config for "5.1 => 2.0" looks like this (configurable in casparcg.config):

```xml
 <mix-configs>
   <mix-config>
     <from>5.1</from>
     <to>2.0</to>
     <mix>average</mix>
     <mappings>
       <mapping>L  L 1.0</mapping>
       <mapping>R  R 1.0</mapping>
       <mapping>C  L 0.707</mapping>
       <mapping>C  R 0.707</mapping>
       <mapping>Ls L 0.707</mapping>
       <mapping>Rs R 0.707</mapping>
     </mappings>
   </mix-config>
 </mix-configs>
```

The mix-element determines what strategy should be used when multiple source channels are mixed into a single destination channel. Two strategies are available:

- add -- Adds the samples together (can cause clipping).
- average -- Uses the average of all source samples (can cause too low volume).
  Each mapping defines the source channel and the destination channel as well as the "influence" the source channel should have on the destination channel. Lowering the "influence" can be useful to help avoiding clipping when the "add" strategy is used.

## Audio Output

With the [DeckLink Consumer](../server/consumers/decklink-consumer.md) you can decide if you want audio output via HDMI, SDI or the audio jacks of the card(s).

With the [Screen Consumer](../server/consumers/screen-consumer.md), audio is played via the regular audio output of the machine.

With the [Bluefish Consumer](../server/consumers/bluefish-consumer.md), audio is either played via the regular audio output of the machine, or embedded in the SDI stream.

## Audio Limitations

Audio embedded in an FLV can currently only be encoded with 44.1 kHz sampling rate, meaning that it will not match the standard broadcast sampling rate of 48 kHz. For short sound effects, this shouldn't cause any real problems, but beware when using longer FLV videos with sound. An alternative solution would be the import the 48 kHz audio file into Flash as a separate audio file, and sync it to the silent video on the same timeline.

The biggest drawback of using audio inside a Flash template is that it can only be played through the system audio output, which means it will not be embedded in SDI/HDMI output, and it will not be in perfect sync. If you need a Flash template to play audio and/or video, we recommend you use the CasparCG AS3 Server Connection library (available from the Download page) to have the Flash template send the appropriate AMCP commands to load and play audio (and/or video) through the FFmpeg producer.
