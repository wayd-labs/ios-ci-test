. ../options.sh
  bundle_dir="$1"
  automation_script="$2"
  language="$3"
  simulator="$4"

  trace_results_dir="$CIRCLE_ARTIFACTS"

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


