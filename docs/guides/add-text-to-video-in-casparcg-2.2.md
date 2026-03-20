---
title: Add text to Video in CasparCG 2.2
---

To add text to video in CasparCG 2.2. 

You find CasparCG 2.2 prebuilt here, [Builds ](http://builds.casparcg.com/)(under server/master)

To try this sample, you first have to place the font you want to use, for this example i have placed the [Hack Font](https://sourcefoundry.org/hack/) in the CasparCG fontdirectory, after that, run this command with your file.

***
```
PLAY 1-10 yourfilehere vf "drawtext=fontfile=c\\\\:/caspar/_FONT/Hack-Regular.ttf: text='pts\\:%{pts \\: hms} frame\\:%{n} type\\:%{pict_type}': x=30: y=55: fontsize=60: fontcolor=white: shadowx=2: shadowy=2: alpha=0.7"
```

![Timecode example for CasparCG ffmpeg](http://soprani.net/githubassets/timecode.png)