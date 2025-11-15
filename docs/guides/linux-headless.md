---
title: Headless Linux Server
sidebar_label: Headless Linux Server
sidebar_position: 1
---

:::note
This has been written and tested on Ubuntu 24.04, but should be translatable to other ubuntu/debian based distributions with little effort.  
It require CasparCG 2.5.0 or later, earlier versions do not support running without a x11 server.
:::

The aim of this, is to setup a server to run CasparCG on startup, without needing any manual intervention or login or user session.

:::info
This is quite barebones, and does not attempt to harden the setup in any way.  
Please contribute any tips or improvements you may have
:::

## Basic system setup

1) Install Ubuntu 24.04 on your machine. You can choose the minimal install, and perform disk and other setup as you wish.

2) Ensure the system is fully updated  
  `sudo apt update && sudo apt upgrade`

3) Install nvidia drivers  
  `apt install nvidia-driver-570-server`

4) Install some common tools  
  `apt install wget nano`

## Install Decklink drivers

1) Download these from the Blackmagic website. You may need to use the latest to ensure there aren't issues compiling against the kernel.  
  To do so directly onto the server, you can start the download locally to determine a valid url and then perform that on the server with:  
  `wget "some-url-here" -O Blackmagic_Desktop_Video_Linux.tar.gz`

2) Extract the drivers  
  `tar -xvzf Blackmagic_Desktop_Video_Linux.tar.gz`
  
3) Install the needed package  
  `sudo apt install -y Blackmagic_Desktop_Video_Linux/deb/x86_64/desktopvideo_*.deb`  
  Make sure to not install the gui portion, or it will pull in a lot more dependencies than are necessary

## Install the server

### Specific version

1) Download CasparCG onto your machine, and extract the zip if there is any

2) Install the scanner  
  `sudo apt install -y casparcg-scanner*.deb`

3) Install CEF
  `sudo apt install -y casparcg-cef*.deb`

4) Install CasparCG  
  `sudo apt install -y casparcg-server*.deb`

### Latest version

An Ubuntu PPA is also maintained, which contains the latest version of each minor release: https://launchpad.net/~casparcg/+archive/ubuntu/ppa

If you are less particular about the version, and are ok with it being updated with your system updates, you can install from there instead:

1) Setup the PPA  
    ```
    sudo add-apt-repository ppa:casparcg/ppa
    sudo apt update
    ```

2) Install the packages  
  `sudo apt install -y casparcg-server casparcg-scanner`  

:::tip
You can install a specific minor version instead of the latest with `sudo apt install -y casparcg-server-2.4`.  
Multiple of these can be installed at once, each provides a binary named the same as the package
:::

### Configure CasparCG

The exact path of the configuration is not too important, but you need to make sure that everywhere references the same. For simplicity, we shall do so under `/opt/casparcg`. You are free to put it elsewhere or split it up like is possible on windows.

1) Create a system user to run casparcg as  
  `sudo adduser casparcg --system --no-create-home`

2) Create configuration directory  
  `sudo mkdir /opt/casparcg && sudo chown casparcg /opt/casparcg`

3) Copy default configuration  
  `sudo cp /usr/share/casparcg-server-beta/casparcg.config /opt/casparcg/`  
  Note: the source path of this may be different, depending on what version you installed

4) Edit the config as required  
  `sudo nano /opt/casparcg/casparcg.config`

### Setup autostart

1) Create scanner config  
  `sudo nano nano etc/systemd/system/casparcg-scanner.service`  
  With the content:
    ```
    [Unit]
    Description=CasparCG Scanner

    [Service]
    Type=simple
    User=casparcg
    #Group=
    WorkingDirectory=/opt/casparcg
    ExecStart=/usr/bin/casparcg-scanner
    Restart=on-failure
    [Install]
    WantedBy=default.target
    ```

2) Create server config  
  `sudo nano nano etc/systemd/system/casparcg-server.service`  
  With the content:
    ```
    [Unit]
    Description=CasparCG Server
    After=network-online.target
    Wants=network-online.target

    [Service]
    Type=simple
    User=casparcg
    #Group=
    WorkingDirectory=/opt/casparcg         
    ExecStart=/usr/bin/casparcg-server-beta
    Restart=on-failure

    [Install]
    WantedBy=multi-user.target
    ```
    Note: the name of the executable here may need changing to match the version of casparcg you have installed

3) Start everything  
    ```
    sudo systemctl daemon-reload
    sudo systemctl enable --now casparcg-scanner
    sudo systemctl enable --now casparcg-server
    ```
    Note: you may need to reboot for it to start correctly.

## Recommended config changes

You should disable the builtin logging to disk, as journald will also be doing this for you.  
Update the `<log-path disable="true">log/</log-path>` line to set `disable` to `true`

If using CEF/HTML, you will likely want to enable gpu mode and setup a cache path
```
<html>
    <enable-gpu>true</enable-gpu>
</html>
```

## Debugging

If you want to more rapidly iterate on configuration, it can often be easier to disable the systemd launch, and start the server manually

```
cd /opt/casparcg
sudo systemctl stop casparcg-server

# edit the config
nano casparcg.config
casparcg-server-beta

# once done 
sudo systemctl start casparcg-server
```