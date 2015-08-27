#options for local test run

SCRIPTS=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
TESTS=$SCRIPTS/../tests
TMPDIR=$SCRIPTS/../tmp
CIRCLE_ARTIFACTS=$TMPDIR/artifacts
BUILD_DIR=$TMPDIR/build

APPNAME='ios-ci-test'

XCODE_WORKSPACE='ios-ci-test.xcworkspace'
XCODE_SCHEME=ios-ci-test
