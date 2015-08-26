var female_email="me+female@alarin.ru"
var female_pass="12345678"

var male_email="me+male@alarin.ru"
var male_pass="12345678"


function randstr(len) {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, len);
}

var DT = 5;
var t = UIATarget.localTarget();
target = UIATarget.localTarget();
var w = t.frontMostApp().mainWindow();
var k = t.frontMostApp().keyboard();

//var _ = UIATarget.localTarget().pushTimeout;
//var __ = UIATarget.localTarget().popTimeout;


function waitVisible(lazyelement) {
    try {
        retry(function () {
            assertNotNull(lazyelement());
        });
        lazyelement().waitUntilVisible(DT);
        t.delay(0.3);
    } catch(e) {
        UIALogger.logError('while waiting for visible ' + lazyelement);
        throw(e);
    }}

function waitInvisible(lazyelement) {
    try {
        retry(function () {
            assertNotNull(lazyelement());
        });
        lazyelement().waitUntilInvisible(DT);
        t.delay(0.3);
    } catch(e) {
        UIALogger.logError('while waiting for invisible ' + lazyelement);
        throw(e);
    }
}

function _(what, timeout) {
    if (timeout == null) {
        timeout = DT;
    }
    UIATarget.localTarget().pushTimeout(timeout);
    what();
    UIATarget.localTarget().popTimeout();
}

function mytest(title, f, options) {
    //like tuneup test, but don't continue after fail
  if (typeof TUNEUP_ONLY_RUN !== 'undefined') {
    for (var i = 0; i < TUNEUP_ONLY_RUN.length; i++) {
        if (new RegExp("^" + TUNEUP_ONLY_RUN[i] + "$").test(title)) {
          break;
        }
        if (i == TUNEUP_ONLY_RUN.length -1) {
          return;
        }
    }
  }

  if (!options) {
    options = testCreateDefaultOptions();
  }
  target = UIATarget.localTarget();
  application = target.frontMostApp();
  UIALogger.logStart(title);
  try {
    f(target, application);
    UIALogger.logPass(title);
  }
  catch (e) {
    UIALogger.logError(e.toString());
    if (options.logStackTrace) UIALogger.logError(e.stack);
    if (options.logTree) target.logElementTree();
    if (options.logTreeJSON) application.mainWindow().logElementTreeJSON();
    if (options.screenCapture) target.captureScreenWithName(title + '-fail');
    UIALogger.logFail(title);
      throw(e);
  }
}

function swipe(element, direction) {
    //not working
    //https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=ui%20automation%20swipe
    element.dragInsideWithOptions({startOffset:{x:0.75, y:0.1}, endOffset:{x:0.25, y:0.1}, duration:0.1});
}