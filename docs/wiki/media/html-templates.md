---
title: HTML Templates
category: Media
---

Since CasparCG Server 2.0 there is an [HTML Producer](../server/producers/html-producer.md). The HTML producer is a modern alternative to flash templates and it allows CasparCG to display any html page.

## How it works

The HTML producer can either load html pages from a url but it can also treat HTML files just like it treats Flash templates. Because there is no template generator for HTML files you will have to program any interaction between CasparCG Server and your template via JavaScript.

## Working with JavaScript

CasparCG server will communicate with your template via the following javascript functions.

### `play()`

This function will be called by CasparCG to instruct the template to start playing.

### `stop()`

This function will be called by CasparCG to instruct the template it should stop playing. In the flash producer the template will be removed after this is called but in the html producer there is no such feature.

### `update(templatedata)`

This function will be called by CasparCG to send any templatedata as a string to the template. The templatedata is formatted the same way as in flash.

### `next()`

This function can be used by CasparCG to control animations that have multiple discreet steps.

## The advantages

Some advantages are:

1. The big community of web developers make it easy to receive help and find information
2. HTML templates can depend on many open source libraries such as those found on npm
3. HTML is very future proof and will be supported for a long time to come
4. If you come from a web development background you will be up and running with CasparCG in no time!

## The caveats

1. The current HTML implementation in CasparCG 2.0.7 is quite old and misses support for CSS 3d transformations
2. No support for font sharpening, although SVG fonts can be a solution.
3. If you use dependencies, templates will span multiple files. This can be bothersome when developing for commercial parties.
4. MP3 and MP4 formates are not supported.

## An example workflow using Adobe Edge

The following guide was provided by forum user Dimitry Ishenko: Following is a basic sequence of steps to get going:

1. Download and install Edge Animate.
2. Open it and Create New project.
3. Resize the Stage to match your screen resolution (eg, 1920x1080), set Autoplay to on and change Composition Class name to "edge". Optionally, make Stage background transparent.
4. Save the project.
5. Using your text editor of choice, create new file called "control.js" inside the project folder and put the following contents into it:

```
var saved;
function update(data) { saved = data; }

function play() { }
function stop() {
var stage = AdobeEdge.getComposition("edge").getStage();
if(stage.isPlaying()) stage.play("stop");
}
function next() { }
```

6. Using your text editor of choice, open the project .html file and find this line:

Add the following line right after it:

```html
<script type="text/javascript" charset="utf-8" src="control.js"></script>
```

7. Create your animation in Adobe Edge Animate. 8. If you want the animation to stop at some point on the timeline and wait for you to issue the stop command (press F1 in CCG Client), position the marker on that point and press Ctrl + T to create a trigger. In the trigger window type in:

```
sym.stop();
```

This will cause the animation to stop playing once it reaches that point.

Next press Ctrl + L to create a label and call it "stop". This will be the starting point for the stop command (ie, the animation will start playing from this point once you press F1 in CCG Client).

9. Of course, the coolest thing about templates is that you can pass data to them from CasparCG. Let's say you have 2 text boxes in the template called "first" and "last" and you want to be able to set their text from CCG. To do that, right click on the Stage and select "Open Actions for Stage" from the menu; then select "compositionReady" action and type in the following:

```js
var json = {};
saved = saved.replace(
  /^(<templateData>|<componentData>|<data>)|(<\/templateData>|<\/componentData>|<\/data>)$/gi,
);
try {
  json = JSON.parse(decodeURI(saved));
} catch (e) {}
for (var key in json) {
  sym.$(key).html(json[key]);
}
```

Save your composition. Go to CCG Client, set "Send as JSON" to ON and 2 key/value pairs, e.g. "first"/"John" and "last"/"Doe".

If your text boxes in the template have different names, adjust your template keys accordingly.

## Notes:

1. CasparCG Server 2.0.7 does not support sending JSON data. Custom Clients can still send data by embedding the json string in `<data>` tags. CasparCG Server 2.1.0b1+ and CasparCG Client 2.0.8+ support sending template data as JSON.
2. This version of the workflow has been slightly modified in step 9. Hard coded versions of the text box names were removed and support for JSON in `<data>` tags was added.
