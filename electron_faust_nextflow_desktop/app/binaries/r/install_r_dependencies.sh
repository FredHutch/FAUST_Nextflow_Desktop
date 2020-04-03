#!/usr/bin/env bash

# Taken from here:
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/get-r-mac.sh
set -e

# THIS MUST BE USED TO INSTALL DEPENDENCIES!
# It bootstraps the installation so that the downloaded R package is the one
# who requests the downloads. In doing so it grabs the correct versions of the
# deployed library artifact!

# From: https://stackoverflow.com/questions/59895/how-to-get-the-source-directory-of-a-bash-script-from-within-the-script-itself
CURRENT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
# MUST be `R_HOME_DIR` - this is how we hook into the R logic for path management
export R_HOME_DIR="$CURRENT_DIRECTORY/r-mac"

R_FILE_PATH="$R_HOME_DIR/R"
R_DEPENDENCIES_INSTALL_FILE_PATH="$CURRENT_DIRECTORY/install_r_dependencies.r"

echo "========================================================================="
echo "Triggering bootstrapped dependency installation!"
echo "========================================================================="
echo "CURRENT_DIRECTORY: " + $CURRENT_DIRECTORY
echo "R_HOME_DIR: " + $R_HOME_DIR
echo "R_FILE_PATH: " + $R_FILE_PATH
echo "R_DEPENDENCIES_INSTALL_FILE_PATH: " + $R_DEPENDENCIES_INSTALL_FILE_PATH
# exec "$R_FILE_PATH CMD BATCH $R_DEPENDENCIES_INSTALL_FILE_PATH"
exec $R_FILE_PATH CMD BATCH --verbose $R_DEPENDENCIES_INSTALL_FILE_PATH