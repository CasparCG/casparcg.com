---
title: Flash Templates
category: Media
---

Dynamic media is played by the CasparCG Server’s [Flash Producer](../server/producers/flash-producer.md), so everything that the [Adobe FlashPlayer](http://adobe.com/products/flashplayer/) can handle can be played. This includes Flash animations SWF and Flash video FLV as well as audio, all via the FT file (which is just a SWF that has gone through TemplateGenerator.)

Since you have full control over everything in Flash, you can dynamically change texts and control individual animations, and all ActionScript execution works (unlike when you import SWFs into other tools such as [Adobe After Effects](http://adobe.com/products/aftereffects/)).

Many existing SWFs are built on the assumption that they will be stored on a web server and embedded in a web page. If the SWF requires any sort of interaction such as mouse clicks, it won’t be very suited for CasparCG playback. However, all features of the Flash Player (such as ActionScripted downloading of RSS feeds, for example) is fully functional when played by CasparCG.

An FT file is just a Flash SWF file that has gone through automated checks and been renamed.

To prepare a Flash SWF file for playback by the CasparCG Server, it normally goes through an automated process in the TemplateGenerator extension inside Adobe's Flash Professional authoring application.

## Typical Workflow

- Create your design in Adobe Photoshop, Adobe After Effects or some similar software.
- Import the .psd into Flash
- Select the text fields you wish to expose to CasparCG and give them instance names (make sure not to begin with the letter "x" since this will make CasparCG ignore this particular instance.)
- Create your animations
- Press the generate button in the TemplateGenerator panel (make sure that you have entered your name in the panel.)
- If everything is correct, the .ft file will bee generated and you are ready to test it in CasparCG Server.

## Special Properties of Flash Templates

You can create labels in your main time line that can be accessed from CasparCG with the `INVOKE` command. If you create a label named "outro", CasparCG will automatically go to and play this label when a `STOP` command is received. This is used to create outro animations. The Template Generator will look for any `stop()` command placed after the outro label. If found, the generator will inject a `removeTemplate()` call on the same keyframe which will remove the template from the Template Host. If there is no `stop()` command after the outro label, the `removeTemplate()` call will be injected in the last frame of the layer that contains the outro label. This is important to know, so that you make sure that this layer has its last keyframe on the frame you want the template to be removed.

## Interlacing via the Flash Producer

By changing the frame rate in the Flash Document Properties inside Adobe's Flash Professional to twice the normal rate, the [Flash Producer](../server/producers/flash-producer.md) and a consumer will output interlaced dynamic output.

Please see the tables in the Frame Rates section for examples and guidelines.

## Best Practices for Flash Templates

Try to avoid several instances with the same instance name since it can be hard to keep track of the project. If you create a timeline animation for a text field, convert the instance to a movie clip before you create the keyframes.

If you need to use ActionScript in your template (other then basic `stop()` commands and alike), you should follow the guide lines in [Guide: Creating Advanced Flash Templates](../../guides/creating-advanced-flash-templates.md).

## Improving Performance of Flash Templates

Flash Player may be a CPU bottleneck when playing high resolution channels. You might notice a major drop in performance between 720p5000 and 1080i5000 channels. One common solution is to let Flash Player run at a lower resolution and then upscale the final render from Flash in Caspar GPU Mixer. To do this, just override the TemplateHost section of your config file. Here you can specify what TemplateHost to load for each resolution. Below is an example of forcing 720p5000 Flash content to be rendered at any 1080i5000 channel. The GPU upscaling is automatically maintained.

```xml
<template-hosts>
   <template-host>
       <video-mode>1080i5000</video-mode>
       <filename>cg20.fth.720p5000</filename>
       <width>1280</width>
       <height>720</720>
   </template-host>
</template-hosts>
```

You can actually override several template hosts this way within the same config. Below is a complete section for overriding every 1080-format to corresponding 720-TemplateHost.

```xml
<template-hosts>
  <template-host>
      <video-mode>1080i5000</video-mode>
      <filename>cg20.fth.720p5000</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
  <template-host>
      <video-mode>1080i5994</video-mode>
      <filename>cg20.fth.720p5994</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
  <template-host>
      <video-mode>1080i6000</video-mode>
      <filename>cg20.fth.720p6000</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
  <template-host>
      <video-mode>1080p2398</video-mode>
      <filename>cg20.fth.720p2398</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
  <template-host>
      <video-mode>1080p2400</video-mode>
      <filename>cg20.fth.720p2400</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
  <template-host>
      <video-mode>1080p2500</video-mode>
      <filename>cg20.fth.720p2500</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
  <template-host>
      <video-mode>1080p2997</video-mode>
      <filename>cg20.fth.720p2997</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
  <template-host>
      <video-mode>1080p3000</video-mode>
      <filename>cg20.fth.720p3000</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
  <template-host>
      <video-mode>1080p5000</video-mode>
      <filename>cg20.fth.720p5000</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
  <template-host>
      <video-mode>1080p6000</video-mode>
      <filename>cg20.fth.720p6000</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
  <template-host>
      <video-mode>1080i6000</video-mode>
      <filename>cg20.fth.720p6000</filename>
      <width>1280</width>
      <height>720</720>
  </template-host>
</template-hosts>
```

## 3D in Flash

Using Adobe Flash Player 10 and later, you can use Flash's built-in cameras and 2.5D abilities in your Flash templates.

There are also 3rd party Flash 3D engines such as Papervision3D that can be used.

## FLV

You can use FLV videos in Flash Templates and by using the alpha channel in the FLV you can have transparent pre-rendered video controlled by Flash.

### FLV Pixel Aspect Ratio

Flash content played by [Flash Producer](../server/producers/flash-producer.md) is scaled on-the-fly at render time (matched to the consumer when the Flash Producer is instanced,) so an FT Flash template can have either a square pixel aspect ratio or a non-square pixel aspect ratio used in common broadcast resolutions for SD output.

If you are outputting to SDI via the Bluefish Consumer, you can choose to set up your FT's #Flash Document Properties to match:

- either the final output resolution (for SD normally a non-square pixel aspect ratio)
- or the square pixel aspect ratio equivalent and have the Flash Producer scale it.

This choice of Flash's Flash Document Properties resolution should be made before choosing how to render the FLV video clips that will be played in the FT. We recommend working with a square pixel aspect ratio size and (if necessary) have that be squished to SD broadcast resolution on playback to SDI.

If you experience performance issues with Flash content, note that the on-the-fly scaling comes at a performance penalty. To avoid scaling at render time you can resize the Flash content (by scaling the document resolution and then scaling and re-saving all imported bitmaps, FLVs, vector graphics and such in a program outside Flash, and reimporting it.

While it is convenient to work with square pixel aspect ratio content, there is currently a special case caused by a bug in Flash Player. It has a rounding calculation error that causes on-the-fly scaled output that is animated horizontally to "jump" at certain intervals, making movements such as ticker texts to appear less smooth.

Recommendation for PAR: Video non-square Flash square (with exception)

### Recommended FLV Render Settings

To increase the performance you should use lower compression in the FLV since decompression is harder than reading a larger file from disk.

### FLV Limitations

Audio embedded in an FLV can currently only be encoded with 44.1 kHz sampling rate, meaning that it will not match the standard broadcast sampling rate of 48 kHz. For short sound effects, this shouldn't cause any real problems, but beware when using longer FLV videos with sound. An alternative solution would be the import the 48 kHz audio file into Flash, and sync it to the silent FLV video on the timeline.
