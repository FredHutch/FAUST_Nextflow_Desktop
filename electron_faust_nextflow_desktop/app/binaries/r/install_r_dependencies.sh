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
export R_HOME_DIR="$CURRENT_DIRECTORY/r-mac"
export R_HOME=$R_HOME_DIR
# ---
export R_LIBS_USER=$R_LIBS
export R_LIBS="/Users/lknecht/Repositories/FAUST_Nextflow_Desktop/electron_faust_nextflow_desktop/app/binaries/r/r-mac/library"

R_FILE_PATH="$R_HOME_DIR/R"
R_SCRIPT_FILE_PATH="$R_HOME_DIR/bin/RScript"
R_DEPENDENCIES_INSTALL_FILE_PATH="$CURRENT_DIRECTORY/install_r_dependencies.r"
R_DEPENDENCIES_INSTALL_OUTPUT_FILE_PATH="$R_DEPENDENCIES_INSTALL_FILE_PATH.Rout"

echo "========================================================================="
echo "Triggering bootstrapped dependency installation!"
echo "========================================================================="
echo "CURRENT_DIRECTORY: " $CURRENT_DIRECTORY
echo "R_HOME_DIR: " $R_HOME_DIR
echo "R_FILE_PATH: " $R_FILE_PATH
echo "R_SCRIPT_FILE_PATH: " $R_SCRIPT_FILE_PATH
echo "R_DEPENDENCIES_INSTALL_FILE_PATH: " $R_DEPENDENCIES_INSTALL_FILE_PATH
echo "R_DEPENDENCIES_INSTALL_OUTPUT_FILE_PATH: " $R_DEPENDENCIES_INSTALL_OUTPUT_FILE_PATH

# TODO: Figure out how to automatically cat out the output file
exec $R_FILE_PATH CMD BATCH --vanilla --verbose \
    $R_DEPENDENCIES_INSTALL_FILE_PATH \
    $R_DEPENDENCIES_INSTALL_OUTPUT_FILE_PATH

# exec $R_SCRIPT_FILE_PATH \
#     --vanilla \
#     --verbose \
#     $R_DEPENDENCIES_INSTALL_FILE_PATH
