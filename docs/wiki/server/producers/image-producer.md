---
title: Image Producer
category: Producers
---

![](../../Images/Image_Producer.jpg)

The Image Producer displays bitmap images with and without alpha channel.

Please see the AMCP commands section for a complete reference of the AMCP commands used to control this module.

## Image Files

- All files played by this producer must be placed in the media sub folder, by default C:\CasparCG\media
- CasparCG uses the FreeImage Library to handle image files so in theory will handle all file formats listed on the FreeImage feature page.

Images are not scaled, so must be created in the same resolution as the current consumer, for example 720x576 for PAL SD, 1280x720 or 1920x1080 for HD if they are intended to fill the screen. If the resolution of the image specified is larger than the current consumer the image will be shrunk to fit.

## Usage

### Directly outputting an image

The below command will play the image test_image on channel 1, layer 2

```
PLAY 1-2 test_image
```

### Preloading an image

As with video files, an image can be loaded in advance using the LOADBG command, the below command will load the image test_image on channel 1, layer 2

```
LOADBG 1-2 test_image
```

The image can then be output by sending the command

```
PLAY 1-2
```

### Image Scroll

Can be used with the `LOADBG`, `LOAD` and `PLAY` commands.

```
<COMMAND> MY_FILE SPEED [speed:int] BLUR [blur:int] PREMULTIPLY PROGRESSIVE
```

The Image Scroll displays bitmap images with and without alpha channel in the same manner as the Image Producer but also scrolls the image if it is larger than the consumer resolution. This feature was released in CasparCG Server 2.0.3.

### AMCP Parameters

#### SPEED

```
SPEED [speed:int]
```

Specifies the speed in pixels per frame/field, negative numbering will reverse the scroll direction.

Example: If the Caspar consumer, is set to an output format of 1920 x 1080 and we have an image with a resolution of 1920 x 4000 in our media folder called test_scroll, the image can be made to scroll vertically from bottom to top on channel 1 layer 2 at 5 pixels per frame speed by entering:

```
PLAY 1-2 test_scroll SPEED 5
```

If we wish to scroll the image from top to bottom, we can do this by putting a negative speed entry in, the command below does exactly the same as the one above but will scroll the image down the screen instead of up at 5 pixels per frame speed.

```
PLAY 1-2 test_scroll SPEED -5
```

#### BLUR

```
BLUR [blur:int]
```

Specifies how much motion blur should be applied to the image. Make sure that you give CasparCG Server enough time to process the image; we recommend you use this with `LOADBG`.

Example:

```
PLAY 1-2 test_scroll SPEED 5 BLUR 50
```

#### PREMULTIPLY

```
PREMULTIPLY
```

Premultiplies images with straight alpha channel against black. Example:

```
PLAY 1-2 test_scroll PREMULTIPLY
```

#### PROGRESSIVE

```
PROGRESSIVE
```

When using an interlaced video format, Caspar will use field rate motion based on the speed value, if progressive frame based motion is desirable then Caspar's default behaviour can be adjusted by adding this argument onto the command.

Example:

```
PLAY 1-2 test_scroll SPEED 5 PROGRESSIVE
```

#### Recommendations for smooth scrolling

- For interlaced video formats always use an even speed value (2, 4, 8, 10 etc). The reason for this is that otherwise the image will loose half of its vertical resolution while scrolling. This is only important when scrolling vertically though (credit rolls for example.)
- For interlaced video scrolling vertically, avoid thin horizontal and sharp details, because it will flicker during scrolling.
- Apply a slight motion blur in the direction where the image is supposed to be scrolled, this will reduce the flickering effect but loose some detail. This can be done by CasparCG Server on loading the image via the BLUR parameter but it will add to the load time (filtering speed is related to the number of pixels to blur.) Another way of doing it is to apply a directional blur into the image itself, for example the "Motion Blur" filter in Photoshop.
- Images are sometimes stored with straight alpha by image editors. If so the PREMULTIPLY parameter must be given in order for CasparCG Server to perform as expected when rendering.
- For progressive video formats the speed value can have uneven values or even values without a problem with vertical resolution.
- Don't use decimal speed values unless 1 pixel per frame/field is too fast, because the brightness of details in the image might appear to change when the image is placed with subpixel accuracy between two pixels.

#### Examples of scrolling commands

If you are using the video format 1080i5000 and have created a bitmap image with the exact width of 1920 pixels (and a height more than 1080 pixels) called cred_1080.tga you can write:

```
PLAY 1 cred_1080 SPEED 6
```

...or if the TGA image is not stored with premultiplied alpha:

```
PLAY 1 cred_1080 SPEED 6 PREMULTIPLY
```

If you get too much interline jitter during scrolling of sharp details you can add a BLUR value of, for example, 4 pixels:

```
PLAY 1 cred_1080 SPEED 6 PREMULTIPLY BLUR 4
```

If you want a film-like, choppy motion, but keep the same total scrolling duration (since the movement now occurs only 25 times per second instead of 50 times per second) the speed is doubled to appear to scroll in the same speed:

```
PLAY 1 cred_1080 SPEED 12 PREMULTIPLY BLUR 4 PROGRESSIVE
```

If the performance overhead of the motion blur is to high to be able to start the credits on time, consider doing a `LOADBG` in good time before and then just `PLAY` when the time comes:

```
LOADBG 1 cred_1080 SPEED 12 PREMULTIPLY BLUR 4 PROGRESSIVE
PLAY 1
```

For horizontal crawler/ticker, the same techniques applies, but the image file needs to be exactly 1080 pixels high instead of 1920 pixels wide.
