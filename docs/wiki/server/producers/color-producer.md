---
title: Color Producer
category: Producers
---

![](../../Images/Color_Producer.jpg)

The Color Producer generates a solid RGB color as fill and a grayscale value as key. The purpose of the producer is mainly to be used as an output test.

Please see the AMCP commands section for a complete reference of the AMCP commands used to control this module.

## Usage

### AMCP Command

To trigger the color output, send a hash tag ## followed by the hexadecimal value of each of the fill channels in the order blue, green and red followed by the value of the key (optional). There are many online colour pickers available to help you select a colour, ColorPicker.com is one of these, Adobe Photoshop and GIMP can also display hexadecimal values. It should be noted that all of these sites allow you to choose RGB hex values but not the key or alpha as they're largely designed for website development.

To get a full field white background on channel 1:

```
PLAY 1 #FFFFFF
```

To get a solid blue with a fully white key:

```
PLAY 1 #FF0000FF
```

As with other producers, you can produce a color on a specific layer by appending the layer number to the channel, the below command put full field white on layer 2 of channel 1

```
PLAY 1-2 #FFFFFF
```
