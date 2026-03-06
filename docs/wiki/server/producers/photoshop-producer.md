---
title: Photoshop Producer
category: Producers
---

Available in 2.1.0 beta and NRK builds

The PSD Producer is a producer that can read the Adobe Photoshop .psd file format.

This can be used to create templated graphics similar to the Flash Producer, but with a few big differences.

Differences compared to the Flash Producer:

- All compositing is done internally in CasparCG's own mixer via the [Scene Producer](./scene-producer.md).
- Easy to reference and embed other media
- Authoring is done straight in Photoshop.
- No programming required / possible.

## Usage

- All layers in the .psd document are preserved and treated separately by the CasparCG mixer.
- Layers that are hidden are ignored
- The opacity and position of a layer is preserved and animatable (via the video timeline feature in Adobe Photoshop)
- All blend modes, with the exception of 'dissolve', are supported and influences media playing on other video layers
- Strokes on shape layers are ignored
- Only solid color is supported as fill for shape layer
- Text layers
- Text layers are by default exposed as text fields.
- Properties of text layers that are preserved are:
- Rotation and non-uniform scaling
- Font, font size, font variation (bold, italic etc)
- Color
- Tracking
- Example of properties that are ignored:
- Shearing
- Faux bold, faux italic, superscript etc.
- Per character horizontal and vertical scaling
- Masks
- Bitmap masks are ignored
- Clipping masks are ignored
- Vector masks (and shape layers) that consists of a single ortogonal rectangle are treated as clip-rectangles.
- Vector masks (and shape layers) that consists of a single four cornered polygon can be treaded as corners in a perspective transformation (see "cornerpin" below).
- Vector masks (and shape layers) that contains smooth curves are ignored.
- Groups
- Groups a preserved and gets an extra responsibility in that it can be used to contain the effects of dynamic text-layers.
- All kinds of masks on groups are ignored
- 3D
- None of the 3D features are supported yet

### Dynamic Content

In order to control how layers behave in response to dynamic data, they can be tagged with special keywords. These tags have to be placed within square brackets in the beginning of the layer name. Multiple tags are separated by a comma and/or a whitespace. Ex. `[dynamic] f0` or `[producer, resizable] glow_loop loop`

#### Available Tags

##### dynamic

This tag indicates that the content of the layer is dynamic and can be changed runtime. The layer name (excluding the tags section) is treated as a variable name that can be assigned data in the save was as data is sent to a Flash Producer (i.e. with the AMCP CG command). This is the default for text layers, but can be explicitly specified to indicate which text layer in a group that should be the "master" layer that other layers adapt to. Only one master layer is allowed in each group / the root layer list. If theres is any ambiguity, the topmost layer is used.
Please see CG command.
(This only makes sense on text layers for now. Can't be combined with static, movable or resizable)

##### static

This is to indicate that a text layer should be treated as static content.
(only makes sense on text layers. Can't be combined with dynamic)

##### movable

Indicates that the layer should move in response to a dynamic layer growing or shrinking
(can't be combined with dynamic or resizable)

##### resizable

Indicates that the layer should grow or shrink in response to a dynamic layer growing or shrinking. If this tag is applied to a layer with a vector mask, it's the mask that's resized instead of the bitmap.
(can't be combined with dynamic or movable)

##### producer

With this tag the layer acts as a placeholder for a dynamically loaded caspar producer. The layer name (excluding the tags section) is treated as a parameter to the AMCP Load-command. It is recomended to use a shape layer or a vector mask to define the area in which the content is to be rendered. Without an explicit vector mask (or shape layer) the bounding box of the layer's bitmap-data is used to define the area.

##### cornerpin

This tag only makes sense with the producer tag and indicates that the corners of the layer mask should be treated as the corners of a perspective transformation in the Mixer.
Please see MIXER PERSPECTIVE command.
(can't be combined with resizable)

If you specify incompatible tags on a layer, the later one (the rightmost) gets precedence.
