#import "../capture.js"
#import "../tuneup_js/tuneup.js"
#import "../common.js"

mytest("Login screen", function(target, app) {
    captureLocalizedScreenshot("login");
    w.buttons()["Войти с паролем"].tap();

    _(function() {w.textFields()[0].typeString("Tony")});

    w.textFields()[1].typeString(male_email);
    w.secureTextFields()[0].typeString(male_pass);
    captureLocalizedScreenshot("login-email");
    w.buttons()["Войти"].tap();

    waitVisible(function() {return w.buttons()["Хорошо"]});
});

mytest("geo", function(target, app) {
    var alertShowed = false;
    UIATarget.onAlert = function onAlert(alert) {
        var title = alert.name();
        UIALogger.logWarning("Alert with title '" + title + "' encountered.");
        alert.buttons()["Allow"].tap();
        // return false to use the default handler
        alertShowed = true;
        return true;
    };

    captureLocalizedScreenshot("main-screen-geo");
    _(function(){w.buttons()["Хорошо"].tap();});


    retry(function(){
        if (!alertShowed) {
            throw Exception()
        }
    });
    //waitInvisible(function() {return t.frontMostApp().alert()});
    //waitVisible(function() {return w.staticTexts()["Ты посмотрел все желания. Зайди попозже."]});
    waitVisible(function() {return w.buttons()["Позже"]});
});

mytest("main", function(target, app) {
    captureLocalizedScreenshot("main-screen-post-wish");
    _(function(){ w.buttons()["Позже"].tap(); }, DT*2);
    waitInvisible(function() {return w.buttons()["Позже"]});
    captureLocalizedScreenshot("main-screen");
});

mytest("sidebar", function(target, app) {
    _(function() {w.toolbars()[0].buttons()["open-sidebar"].tap()});
    waitVisible(function(){return w.images()["sidebar-logo-icon.png"]});
    captureLocalizedScreenshot("sidebar");
    w.toolbars()[0].buttons()["open-sidebar"].tap();
    w.images()["sidebar-logo-icon.png"].waitUntilInvisible(DT);
});
