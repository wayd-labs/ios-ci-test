// This is an example configuration file to be used with ui-screen-shooter
// It is designed to work with the Hello World International application
// Please copy to config-automation.js and edit for your needs
// See also http://cocoamanifest.net/features/#ui_automation for automation help


// Pull in the special function, captureLocalizedScreenshot(), that names files
// according to device, language, and orientation
#import "capture.js"
//#import "../Pods/tuneup_js/tuneup.js"
#import "../../ios/Pods/tuneup_js/tuneup.js"

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

test("Login screen", function(target, app) {
    captureLocalizedScreenshot("login");
    w.buttons()["Войти с паролем"].tap();

    UIATarget.localTarget().pushTimeout(DT);
    w.textFields()[0].typeString("Tony")
    UIATarget.localTarget().popTimeout();
    w.textFields()[1].typeString(male_email)
    w.secureTextFields()[0].typeString(male_pass)
    captureLocalizedScreenshot("login-email");
    w.buttons()["Войти"].tap();

    retry(function() {
        assertNotNull(w.buttons()["Хорошо"])
    });
});

test("geo", function(target, app) {
    UIATarget.onAlert = function onAlert(alert) {
        var title = alert.name();
        UIALogger.logWarning("Alert with title '" + title + "' encountered.");
        alert.buttons()["Allow"].tap();
        // return false to use the default handler
        return true;
    }

    captureLocalizedScreenshot("main-screen-geo");
    UIATarget.localTarget().pushTimeout(DT);
    w.buttons()["Хорошо"].tap();
    UIATarget.localTarget().popTimeout();

    retry(function() {
        assertNotNull(w.buttons()["Создать"])
    });
//    UIATarget.onAlert = null;
});

captureLocalizedScreenshot("main-screen-man");

t.delay(10);