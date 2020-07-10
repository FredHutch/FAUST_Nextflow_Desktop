# #!/usr/bin/env bash

# Taken from here:
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/get-r-mac.sh
set -e

# R_VERSION=3.5.1
# R_VERSION=3.6.3
export R_VERSION=4.0.2
export R_VERSION_COMPRESSED_FILE_NAME="R-${R_VERSION}.tar.gz"
# IMPORTANT: THIS IS THE ROOT DIRECTORY
export R_MAC_DIRECTORY_NAME="r-mac"
# ---
export R_VERSION_DIRECTORY_NAME="R-${R_VERSION}"
export R_VERSION_DIRECTORY_PATH="${R_MAC_DIRECTORY_NAME}/${R_VERSION_DIRECTORY_NAME}"
# ---
export R_VERSION_BUILD_DIRECTORY_NAME="build_directory"
export R_VERSION_BUILD_DIRECTORY_PATH="${R_VERSION_DIRECTORY_PATH}/${R_VERSION_BUILD_DIRECTORY_NAME}"

# ------------------------------------------------------------------------------
# Clean up
rm -fr ${R_MAC_DIRECTORY_NAME}

# ------------------------------------------------------------------------------
# Download and extract the source code for R
mkdir -p ${R_MAC_DIRECTORY_NAME}
cd ${R_MAC_DIRECTORY_NAME}

curl --remote-name https://cran.rstudio.com/src/base/R-4/${R_VERSION_COMPRESSED_FILE_NAME} \
    --output ${R_VERSION_COMPRESSED_FILE_NAME}

tar -xzvf ${R_VERSION_COMPRESSED_FILE_NAME}

# Reset workspace state
rm ${R_VERSION_COMPRESSED_FILE_NAME}
cd ../

# ------------------------------------------------------------------------------
# Perform build
mkdir -p "${R_VERSION_BUILD_DIRECTORY_PATH}"
cd "${R_VERSION_BUILD_DIRECTORY_PATH}"

# WARNING: `configure` creates output in the directory it is invoked from
# This MUST be invoked in the directory where the build files will be placed
../configure \
    --prefix=${R_INSTALL_DIRECTORY} \
    --with-blas \
    --with-lapack

# Actual build entry point
make

# Move to the root directory
cd ../../../
# Move the build directory to the root directory and follow it
mv ${R_VERSION_BUILD_DIRECTORY_PATH} ./

# Remove all the unneeded files from the installation
rm -fr ${R_VERSION_DIRECTORY_PATH}/*

# Move the contends of the build directory (aka the build artifact) to the
# version directory directory
mv ${R_VERSION_BUILD_DIRECTORY_NAME}/* ${R_VERSION_BUILD_DIRECTORY_PATH}
# Remove the now empty directory
rm -fr ${R_VERSION_BUILD_DIRECTORY_NAME}
# Move into the newly built R version directory
cd ${R_VERSION_DIRECTORY_PATH}

# ------------------------------------------------------------------------------
# Inject logic to override the initial configuration and point to the correct
# shiny executable

# cd R-${R_VERSION}

# # Patch the main R script
sed -i.bak '/^R_HOME_DIR=/d' bin/R
sed -i.bak 's;/Library/Frameworks/R.framework/Resources;${R_HOME};g' bin/R
chmod +x bin/R
rm -f bin/R.bak

# Also TODO: Not sure if this really helps us besides reducing footprint
# Remove unneccessary files
# TODO: What else
# rm -r doc tests
# rm -r lib/*.dSYM

# ------------------------------------------------------------------------------
# # !/usr/bin/env bash
# # Taken from here:
# # https://github.com/dirkschumacher/r-shiny-electron/blob/master/get-r-mac.sh
# set -e

# R_VERSION=3.5.1
# # R_VERSION=3.6.3
# # R_VERSION=4.0.0

# # Download and extract the main Mac Resources directory
# # Requires xar and cpio, both installed in the Dockerfile
# rm -fr r-mac
# mkdir -p r-mac
# curl --output r-mac/latest_r.pkg \
#      https://cloud.r-project.org/bin/macosx/R-${R_VERSION}.pkg
#      # https://cloud.r-project.org/bin/macosx/R-3.5.1.pkg # Old Version

# cd r-mac
# xar -xf latest_r.pkg
# rm -r r-1.pkg Resources tcltk8.pkg texinfo5.pkg Distribution latest_r.pkg
# cat r.pkg/Payload | gunzip -dc | cpio -i
# mv R.framework/Versions/Current/Resources/* .
# rm -r r.pkg R.framework

# # Patch the main R script
# sed -i.bak '/^R_HOME_DIR=/d' bin/R
# sed -i.bak 's;/Library/Frameworks/R.framework/Resources;${R_HOME};g' bin/R
# chmod +x bin/R
# rm -f bin/R.bak

# # Remove unneccessary files TODO: What else
# rm -r doc tests
# rm -r lib/*.dSYM
