. ../options.sh
  bundle_dir=$BUILD_DIR/Build/Products/Debug-iphonesimulator/$APPNAME.app
  automation_script="$1"
  language="$2"
  simulator="$3"

  trace_results_dir="$CIRCLE_ARTIFACTS/uiautomation"

  echo "Running automation script \"$automation_script\"
          for \"$simulator\"
          in language \"${language}\"..."

  dev_tools_dir=`xcode-select -print-path`

  rm -rf "$trace_results_dir"
  mkdir -p "$trace_results_dir"

  # Check out the `unix_instruments.sh` script to see why we need this wrapper.
  DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
  #until
  "$DIR"/unix_instruments.sh \
    -w "$simulator" \
    -D "$trace_results_dir/trace" \
    -t "Automation" \
    "$bundle_dir" \
    -e UIARESULTSPATH "$trace_results_dir" \
    -e UIASCRIPT "$automation_script" \
    -AppleLanguages "($language)" \
    -AppleLocale "$language"


