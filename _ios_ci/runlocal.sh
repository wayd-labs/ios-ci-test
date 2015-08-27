. $(dirname $0)/scripts/options.sh

echo $SCRIPTS
echo $TESTS
$SCRIPTS/xctool.sh
$SCRIPTS/uiautomation.sh $TESTS/tests.js ru_RU "iPhone 6 (8.4 Simulator)"
