. ../options.sh

XCODE_WORKSPACE='ios-ci-test.xcworkspace'
XCODE_SCHEME='ios-ci-test'

xctool -reporter pretty \
  -destination 'platform=iOS Simulator,name=iPhone 6,OS=latest' \
  -sdk iphonesimulator \
  -workspace "$XCODE_WORKSPACE" -scheme "$XCODE_SCHEME" \
  -derivedDataPath "$BUILD_DIR" \
  clean build
#  PRODUCT_NAME=app\
#  clean build
#  DSTROOT=tmp \
#  OBJROOT=tmp \
#  SYMROOT=tmp \
#  CONFIGURATION_BUILD_DIR="tmp/build" \
#  build
# -reporter junit:$CIRCLE_TEST_REPORTS/xcode/results.xml -reporter plain:$CIRCLE_ARTIFACTS/xctool.log \
