// Copyright (c) 2012 Jonathan Penn (http://cocoamanifest.net/)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var kPortraitString = "portrait"
var kLandscapeString = "landscape"

var kMaxDimension4inch = 568;
var kMaxDimension4point7inch = 667;
var kMaxDimension5point5inch = 736;

// rectMaxSizeMatchesPhoneWithMaxDimensionForOrientation(rect, maxDimension, orientation)
//
// Returns whether the given rect matches a given max dimension in a particular orientation.
//
// `rect` is the rectangle representing the image size you want to check
// `maxDimension` is the size of the longest side of the screen on a given device
// `orientation` is...well...duh!
//
function rectMaxSizeMatchesPhoneWithMaxDimensionForOrientation(rect, maxDimension, orientation) {
  return (orientation == kPortraitString && rect.size.height == maxDimension) || (orientation == kLandscapeString && rect.size.width == maxDimension)
}

// captureLocalizedScreenshot(name)
//
// Tells the local target to take a screen shot and names the file after the
// state of the simulator like so:
//
//   [model]___[orientation]___[name].png
//
// `model` is the model of the device (iphone, iphone5, ipad)
// `orientation` is...well...duh!
// `name` is what you passed in to the function
//
// Screenshots are saved along with the trace results in UI Automation. See
// `run_screenshooter.sh` for examples on how to pull those images out and put
// them wherever you want.
//
var num = 0

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function captureLocalizedScreenshot(name) {
  var target = UIATarget.localTarget();
  var model = target.model();
  var rect = target.rect();

  var orientation = kPortraitString;
  if (rect.size.height < rect.size.width) {
    orientation = kLandscapeString;
  }

  if (model.match(/iPhone/)) {
    if (rectMaxSizeMatchesPhoneWithMaxDimensionForOrientation(rect, kMaxDimension4inch, orientation)) {
      model = "4";
    }
    else if (rectMaxSizeMatchesPhoneWithMaxDimensionForOrientation(rect, kMaxDimension4point7inch, orientation)) {
      model = "4.7";
    }
    else if (rectMaxSizeMatchesPhoneWithMaxDimensionForOrientation(rect, kMaxDimension5point5inch, orientation)) {
      model = "5.5";
    }
    else {
      model = "3.5";
    }
  } else {
    model = "iPad";
  }
    num++;
  //var parts = [model, orientation, name];
    var parts = [pad(num,2), model, name]
  target.captureScreenWithName(parts.join("___"));
}
