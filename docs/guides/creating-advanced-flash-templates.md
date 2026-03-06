---
title: Creating Advanced Flash Templates
sidebar_label: Advanced Flash Templates
sidebar_position: 4
---

To create an advanced Flash template for CasparCG you will need the Flash Professional authoring environment (CS4 and above recommended) and the TemplateGenerator panel.

For more information on how Flash templates are hosted inside CasparCG Server, please see the TemplateHost section.

## The Document Class

The document class must extend the se.svt.caspar.template.CasparTemplate class (or another class that extends it). The CasparTemplate class contains methods and properties used by CasparCG and you can override some of the default implementation.

## Public Methods

### `CasparTemplate()=`

Creates a new CasparCG template.

### `Play():void`

This method will be called from the TemplateHost when a PLAY command is sent from CasparCG. By default it will try to play the main time line in the Flash file (if there is no stop() on the first frame). The template will not be visible until the Play command is sent from CasparCG. To override this method do the following:

```
 override public function Play():void
{
   //Your code here
}
```

### `Stop():void`

This method will be called from the TemplateHost when a Stop command is sent from CasparCG. By default it will look in the main time line if there is a label named "outro". If not it will call the removeTemplate method that marks the template for removal. If it finds an outro label it will goto and play that label and when the outro is ready the removeTemplate will be called. When you override this method it is very important that you either call super.Stop() or removeTemplate() when you are finished.

To override this method do the following:

example 1:

```
override public function Stop():void
{
   //Your code here
   //THEN
   super.Stop();
   //OR
   removeTemplate();
}
```

example 2:

```
override public function Stop():void
{
   myOutroFunction();
}

private function myOutroFunction():void
{
   try
   {
      //Do some codebased animation…
      myAnimationEngine.doMyOutroAnimation();
      myAnimationEngine.onComplete(myCompleteFunction);
   }
   catch(e:Error)
   {
      myCompleteFunction();
   }
}

private function myCompleteFunction():void
{
   super.Stop();
   //OR
   removeTemplate();
}
```

### `Next():void`

This method will be called from the TemplateHost when a Next command is sent from CasparCG. It is used to step forward in the template. By default this method will make the template continue from the current frame. The command will be ignored if the current frame label is "outro", then Stop() must be called. To override this method do the following:

```
override public function Next():void
{
  //Your code here
}
```

### `SetData(xmlData:XML):void`

This method will be called from the TemplateHost when a SetData command is sent from CasparCG. SetData is used to set data to the components or parameters that are exposed in the FT file. The data is buffered by the ComponentDataBuffer which makes it possible to set data to a component that is not yet instantiated. When the component later is instantiated it calls registerComponent (this is automatically done for all CasparCG components on the stage) which then checks if there are any buffered data for the component and it that case it sends the data to it.

The XML format that is sent from CasparCG looks like this:

```
 <templateData>
  <componentData id="instance1">
    <data id="text" value="Text displayed in a CasparTextField" />
  </componentData>
  <componentData id="instance2">
    <data id="imagePath" value="d:/caspar/_TEMPLATEMEDIA/myImage.png" />
    <data id="alpha" value="0.6" />
  </componentData>
  <componentData id="customParameter1">
    <data id="data" value="true" />
  </componentData>
</templateData>
```

"instance 1" is a regular CasparTextField and it takes one parameter called "text" and sets the value in the attribute "value" to the text parameter in the CasparTextField. "instance2" demonstrates a possible CasparCG component that takes an image path and and an alpha value. "customParameter1" is a custom parameter defined in the document class and it will receive the value "true".

Some of the reasons to override SetData:

You want to do stuff before data is set to the components
You want to know when a specific component is populated with data
You have code based custom parameters (read more about this in "Custom paramers")
Here are some examples of overriding SetData:

example 1

```
//This override checks if instance1 is getting data
public override function SetData(xmlData:XML):void
{
   //loop trough the xml
   for each (var element:XML in xmlData.children())
   {
      //check if the componentData atrribute "id" is "instance1"
      if (element.@id == "instance1")
      {
         //if found and not a empty string…
         if (element.data.@value != "")
         {
            //...call a function "setCurrentState" that accepts two parameters: the current state and the text received.
            setCurrentState("Text received", element.data.@value);
            break;
         }
      }
   }
   //pass on the xmlData to the default implementation which will send it to the ComponentDataBuffer.
   super.SetData(xmlData);
}
```

example 2

```
//This override check for data to the custom parameter "customParameter1"
public override function SetData(xmlData:XML):void
{
   //loop trough the xml
   for each (var element:XML in xmlData.children())
   {
      //check if the componentData atrribute "id" is "customParameter1"
      if (element.@id == "customParameter1")
      {
         //if found, check if true or false
         if (element.data.@value == "true")
            {
            //call a function "myFunction" and pass "true".
            myFunction(true);
         }
         else if(element.data.@value == "false")
         {
            //call a function "myFunction" and pass "false".
            myFunction(false);
         }
         break;
      }
   }
   //pass on the xmlData to the default implementation which will send it to the ComponentDataBuffer.
   super.SetData(xmlData);
}
```

### `GotoLabel(label:String):void`

[final] This method will be called from the TemplateHost when a Invoke command is sent from CasparCG. It will first try this method, if it generates an error the TemplateHost will try ExecuteMethod instead. GotoLabel takes one parameter, a label, and it will try to go to and play that label on the main timeline. If there is no label with that name it will throw an error.

### `ExecuteMethod(methodName:String):void`

[final] This method will be called from the TemplateHost when a Invoke command is sent from CasparCG and the GotoLabel command generated an error. It will try to execute a method on the template with the name specified in "methodName". If there is no method with that name it will throw an error. To expose a method that can be executed via Invoke/ExecuteMethod you simply create a public function in the document class. The method does not take any parameters. If you need to receive specific parameters you should use "Custom Parameters" that is described further down.

### `GetDescription():String`

[final] This method can be called by CasparCG and returns an XML description of the template. The description is automatically generated by the TemplateGenerator.

### `initialize(context:ITemplateContext):void`

[final] This method is called when a template is instantiated and provides the template with an instance of the CommunicationManager and what layer the template is loaded on to.

### `postInitialize():void`

This method is called by initialize right after initialization is complete. Override this method to be able to access the CommunicationManager and/or the layer.

example 1

```
override public function postInitialize():void {
{
   communicationManager.sharedData.addSubscriber(this, "testData"));
}
```

### `registerComponent(instance:ICasparComponent):void`

[final] This method is called by a component when initialized. It will tell the ComponentDataBuffer that the instance is ready to receive data.

### `dispose():void`

[final] This method is called by the TemplateHost before the template is removed. It will dispose all the loaded components.

### `preDispose():void`

This method is called by dispose just before the components are disposed. Override this method to be able to clean up everything you need before the template is removed.

example 1

```
override public function preDispose():void
{
   removeAllMyListeners();
   stopAllTimers();
   disposeAllMyObjects();
   makeFinalNotifications();
}
```

## public properties

### `movieClip:MovieClip`

[final][read-only] A reference to the template as a MovieClip. Used by the TemplateHost.

### `originalWidth:Number`

[final] The original width of the template. This is set by TemplateGenerator and should normally not be set manually. This property is used by the TemplateHost.

### `originalHeight:Number`

[final] The original height of the template. This is set by TemplateGenerator and should normally not be set manually. This property is used by the TemplateHost.

### `originalFrameRate:Number`

[final] The original frame rate of the template. This is set by TemplateGenerator and should normally not be set manually. This property is used by the TemplateHost.

### `stopOnFirstFrame:Boolean`

[final] A property that is true if there is a stop() on the first frame on the main timeline. This is set by TemplateGenerator and should normally not be set manually. This property is used by the TemplateHost.

### `communicationManager:ICommunicationManager`

[final][read-only] This is a reference to the communication manager and it is accessible in the postInitialize method.

### `description:XML`

[final] This is a reference to the description XML that describes the template. This is set by TemplateGenerator and should normally not be set manually. This property is used by the TemplateHost.

### `version:String`

[final][read-only] The version of the template. This is set by TemplateGenerator and should normally not be set manually. This property is used by the TemplateHost.

### `layer:int`

[final][read-only] The layer that the template is playing on. This is set by the TemplateHost and it is accessible in the postInitialize method.

## Custom Parameters

If you need to use custom parameters you can expose them by adding the following constant in your document class:

```
private const customParameterDescription:XML =
<parameters>
   <parameter id="customParameter1" type="boolean" info="Description of the first parameter" />
   <parameter id="customParameter2" type="number" info="Description of the second parameter" />
</parameters>;
```

You will have to use the exact syntax described above for the TemplateGenerator to recognize it. The parameters will be included in the template description and can then be externally accessed. The parameter types should be set to either boolean, number, string or xml.

example 1

```
private const customParameterDescription:XML =
<parameters>
   <parameter id="resultData" type="xml" info="The data that is used to fill the result table" />
</parameters>;
.
.
.
override public function SetData(xmlData:XML):void
{
   for each (var element:XML in xmlData.children())
   {
      if (element.@id == "resultData")
      {
         populateResultTable(element.data);
      }
   }
   super.SetData(xmlData);
}
```

## Creating A Custom Caspar Component

You can pass custom XML to your template. But it's suggested sticking to the form of componentData and then putting your custom xml inside the `<componentData>` tags because then in the flash template you can still use the default setData implementation and still have the option to make custom caspar component's, which would then receive your custom xml. Instead of putting everything on the stage put it in a movieclip instead which would then implement ICasparComponent (or you could do everything from actionscript).

Here is the interface you need to implement: [ICasparComponent](https://github.com/CasparCG/templatehost/blob/master/src/src/se/svt/caspar/template/components/ICasparComponent.as)

Simply put the content inside a class which extends Sprite or MovieClip and implements ICasparComponent. Then it needs to implement a SetData function which will receive the custom xml inside the componentData tag which has an id matching the component id, a destroy function which cancels any timers etc so that everything can be garbage collected, and a "get name()" function which should return the string which should be the id that you use to send data to it in the `<componentData id=?>` tag.

Then in the document class you just need to do something like:

```
var component:ICasparComponent = new ComponentClassName();
addChild(component);
registerComponent(component);
```

The registerComponent function is part of the CasparTemplate class and is what enables the relevant template data to be sent to the relevant caspar component.

The advantages of doing it this way are that the ComponentDataBuffer will still be used, and that it is easier to add more components to the same template later on if you wanted, or transfer components between different projects.

The component data buffer holds back any xml that it has received with an id that hasn't been registered with registerComponent() and then sends it after registerComponent() has been called. So it means if a component isn't loaded until after a few frames and data has already been sent to it, its SetData function will receive it immediately after registerComponent() has been called and it won't get lost.

## Communication Manager

More information soon...

## Best Practices

Before you deliver a .ft file you should omit all you traces.
If you have custom parameters you should define them as described above.
Remove any instances that are not used.

## Generate FT File

To create the .ft file you use the TemplateGenerator.
