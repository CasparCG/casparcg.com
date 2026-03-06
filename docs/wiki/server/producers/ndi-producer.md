---
title: NDI Producer
category: Producers
---

The NDI Producer can play back an NDI stream that is exposed over the Network.

## Usage

### AMCP Command

`NDI LIST`

Lists all ndi sources available in the network with PC_name and Channel_name, that were created using OBS/VMix/CCG/newtek etc.

`PLAY 1-10 ndi://PC_Name/xyz`

To play ndi created from ‘PC_Name’ with channel ‘xyz’.

For PC_name or channels that contains spaces, place the source in quote-marks:

`PLAY 1-10 "ndi://PC Name/xy z"`
