#!/usr/bin/env bash

# Taken from here:
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/get-r-mac.sh
set -e

# THIS MUST BE USED TO INSTALL DEPENDENCIES!
# It bootstraps the installation so that the downloaded R package is the one
# who requests the downloads. In doing so it grabs the correct versions of the
# deployed library artifact!

# From: https://stackoverflow.com/questions/59895/how-to-get-the-source-directory-of-a-bash-script-from-within-the-script-itself
CURRENT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null 2>&1 && pwd)"
# MUST be `R_HOME_DIR` - this is how we hook into the R logic for path management

# TODO: Move these to environment variables
export R_HOME_DIR="$CURRENT_DIRECTORY/$R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH"
export R_HOME=$R_HOME_DIR

R_DEPENDENCIES_INSTALL_ABSOLUTE_FILE_PATH="$CURRENT_DIRECTORY/install_r_dependencies.r"
R_DEPENDENCIES_INSTALL_OUTPUT_ABSOLUTE_FILE_PATH="$R_DEPENDENCIES_INSTALL_ABSOLUTE_FILE_PATH.Rout"

R_EXECUTABLE_ABSOLUTE_FILE_PATH="$R_HOME_DIR/bin/R"
R_SCRIPT_EXECUTABLE_RELATIVE_FILE_PATH="$R_HOME_DIR/bin/Rscript"

echo "========================================================================="
echo "Triggering bootstrapped dependency installation!"
echo "========================================================================="
echo "CURRENT_DIRECTORY: " $CURRENT_DIRECTORY
echo "R_HOME_DIR: " $R_HOME_DIR
echo "R_HOME: " $R_HOME
echo "R_EXECUTABLE_ABSOLUTE_FILE_PATH: " $R_EXECUTABLE_ABSOLUTE_FILE_PATH
echo "R_SCRIPT_EXECUTABLE_RELATIVE_FILE_PATH: " $R_SCRIPT_EXECUTABLE_RELATIVE_FILE_PATH
echo "R_DEPENDENCIES_INSTALL_ABSOLUTE_FILE_PATH: " $R_DEPENDENCIES_INSTALL_ABSOLUTE_FILE_PATH
echo "R_DEPENDENCIES_INSTALL_OUTPUT_ABSOLUTE_FILE_PATH: " $R_DEPENDENCIES_INSTALL_OUTPUT_ABSOLUTE_FILE_PATH
echo "exec ${R_EXECUTABLE_ABSOLUTE_FILE_PATH} CMD BATCH --vanilla \
    --verbose \
    ${R_DEPENDENCIES_INSTALL_ABSOLUTE_FILE_PATH} \
    ${R_DEPENDENCIES_INSTALL_OUTPUT_ABSOLUTE_FILE_PATH}"

# TODO: Figure out how to automatically cat out the output file
exec $R_EXECUTABLE_ABSOLUTE_FILE_PATH CMD BATCH --vanilla \
    --verbose \
    $R_DEPENDENCIES_INSTALL_ABSOLUTE_FILE_PATH \
    $R_DEPENDENCIES_INSTALL_OUTPUT_ABSOLUTE_FILE_PATH
