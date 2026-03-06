---
title: Vision Mixer Settings
category: Server
sidebar_position: 4
---

It's important that you set up your vision mixer (also called video switcher or production switcher) to correctly apply the key signal that CasparCG Server outputs. Unfortunately, different manufacturers use different terminology for the DSK (down-stream keying.)

You generally want to use content with pre-multiplied against black (also know as linear or additive) alpha / key since content played by the [Flash Producer](Producers/Flash-Producer) is always pre-multiplied against black. You also want to avoid modifying the key signal in the vision mixer, so keep the settings for clip, gain, opacity/density to their defaults.

## Grass Valley Configuration

On Thomson Grass Valley vision mixers / switchers, the correct keying settings are as follows:

- Mode: Additive Key
- Size: Off
- Position: Off
- Gain: 100.0 %
- Clip: 50.0 %
- Opacity: 100.0 %

![](../Images/GrassValley_Mixer_01.jpg)

## Sony Configuration (newer)

On newer Sony vision mixers / switchers, the correct keying settings are as follows:

- Key Type: Linear
- Mode: Clean Mode
- Key Fill: Key Bus
- Clip: 0.00
- Gain: 0.00
- Density: 100.00

![](../Images/Sony_Mixer_01.jpg)

## Sony Configuration (older)

On older Sony vision mixers / switchers (DVS-7250,) the correct keying settings are as follows:

- Key Type: Clean
- Clip: 0.00
- Gain: 30.00
- Density: 100.00

![](../Images/Sony_Mixer_B_01.jpg)

## Blackmagic Design ATEM Configuration

![](../Images/BMD_ATEM.png)

- Connect both fill and key SDI outputs from your SDI card to the inputs on the Blackmagic Design ATEM production switcher.
- In the software control panel, open "Downstream Key 1" panel on the right.
- In the Fill Source and Key Source dropdowns, select the applicable inputs and check the "Pre Multiplied Key" checkbox. The ATEM should now be correctly configured for DSK 1.

## Vision Mixers supporting only straight alpha

In CasparCG 2.0.4 there is experimental support for outputting straight alpha instead of pre-multiplied against black alpha.

It is enabled in the configuration under the channel:

```
<channel>
  <straight-alpha-output>true</straight-alpha-output>
  <consumers>
  </consumers>
</channel>
```

Please see [`MIXER STRAIGHT_ALPHA_OUTPUT`](AMCP-Protocol#mixer-straight_alpha_output) command for information about how to change this setting in real-time, overriding the configuration.

Note that although straight alpha output is enabled, the material (videos, stills etc) played out by CasparCG still has to be pre-multiplied against black.
