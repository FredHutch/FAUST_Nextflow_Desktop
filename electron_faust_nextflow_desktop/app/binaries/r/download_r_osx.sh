# #!/usr/bin/env bash

# WARNING: This MUST be run from the directory it lives in

# Taken from here:
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/get-r-mac.sh
set -e

# From: https://stackoverflow.com/questions/59895/how-to-get-the-source-directory-of-a-bash-script-from-within-the-script-itself
CURRENT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null 2>&1 && pwd)"

# INSTALLATION_DIRECTORY_ABSOLUTE_PATH=$CURRENT_DIRECTORY/$R_VERSION_INSTALL_DIRECTORY_RELATIVE_PATH
INSTALLATION_DIRECTORY_ABSOLUTE_PATH=$CURRENT_DIRECTORY/$R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH

# ------------------------------------------------------------------------------
# Clean up pre-existing builds
rm -fr $R_MAC_DIRECTORY_NAME

# ------------------------------------------------------------------------------
# Download and extract the source code for R
mkdir -p $R_MAC_DIRECTORY_NAME
cd $R_MAC_DIRECTORY_NAME

curl --remote-name https://cran.rstudio.com/src/base/R-4/$R_VERSION_COMPRESSED_FILE_NAME \
    --output $R_VERSION_COMPRESSED_FILE_NAME

tar -xzvf $R_VERSION_COMPRESSED_FILE_NAME

# Reset workspace state
mv "$R_VERSION_NAME" "$R_VERSION_BUILD_DIRECTORY_NAME"
rm $R_VERSION_COMPRESSED_FILE_NAME

# Return to root directory
cd ../

# ------------------------------------------------------------------------------
# Perform build
cd $R_VERSION_BUILD_DIRECTORY_RELATIVE_PATH

echo "-------------------------------------------------------------------------"
echo "Installing R $R_VERSION into $INSTALLATION_DIRECTORY_ABSOLUTE_PATH"
echo "-------------------------------------------------------------------------"

# WARNING: `configure` creates output in the directory it is invoked from
# This MUST be invoked in the directory where the build files will be placed
./configure \
    --prefix=$INSTALLATION_DIRECTORY_ABSOLUTE_PATH \
    --enable-R-shlib \
    --enable-R-static-lib \
    --enable-BLAS-shlib

# # DO NOT USE THIS IT IS BAD
# # SEE: https://cran.r-project.org/doc/manuals/r-devel/R-admin.html#LAPACK
# # --with-lapack
# # --disable-rpath \
# # --with-blas
# USED FROM PUBLIC DOWNLOAD
# ./configure \
#     --prefix=$INSTALLATION_DIRECTORY_ABSOLUTE_PATH \
#     'CC=clang -mmacosx-version-min=10.13' \
#     'CXX=clang++ -mmacosx-version-min=10.13' \
#     'OBJC=clang -mmacosx-version-min=10.13' \
#     'FC=gfortran -mmacosx-version-min=10.13' \
#     'F77=gfortran -mmacosx-version-min=10.13' \
#     'CFLAGS=-Wall -g -O2' \
#     'CXXFLAGS=-Wall -g -O2' \
#     'OBJCFLAGS=-Wall -g -O2' \
#     'FCFLAGS=-Wall -g -O2' \
#     'F77FLAGS=-Wall -g -O2' \
#     '--enable-memory-profiling' \
#     '--x-libraries=/opt/X11/lib' \
#     '--x-includes=/opt/X11/include' \
#     '--build=x86_64-apple-darwin17.0' \
#     'build_alias=x86_64-apple-darwin17.0' \
#     'PKG_CONFIG_PATH=/usr/lib/pkgconfig:/usr/local/lib/pkgconfig:/opt/X11/lib/pkgconfig'
# # '--enable-R-framework' \

# Actual build entry point
make
make install

# Return to root directory
cd ../../

# # ------------------------------------------------------------------------------
# # For some reason the `$R_VERSION_INSTALL_DIRECTORY_RELATIVE_PATH` has a `lib`
# # directory that actually contains the ACTUAL R Files
# # So you need to move the files of that directory to the correct directory in
# # order to avoid errors like `ldpaths not found`
# mkdir -p $R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH
# # cp -r ${R_VERSION_INSTALL_DIRECTORY_RELATIVE_PATH}/lib/R/* $R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH
# cp -r ${R_VERSION_INSTALL_DIRECTORY_RELATIVE_PATH}/* $R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH

# ------------------------------------------------------------------------------
# Inject logic to override the initial configuration and point to the correct
# shiny executable

# Patch the main R script
sed -i.bak '/^R_HOME_DIR=/d' $R_VERSION_BINARY_R_FILE_RELATIVE_PATH
sed -i.bak 's;/Library/Frameworks/R.framework/Resources;${R_HOME};g' $R_VERSION_BINARY_R_FILE_RELATIVE_PATH
chmod +x $R_VERSION_BINARY_R_FILE_RELATIVE_PATH
rm -f $R_VERSION_BINARY_R_FILE_RELATIVE_PATH.bak

# Patch the nested R script
sed -i.bak '/^R_HOME_DIR=/d' "${R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH}/lib/R/bin/R"
sed -i.bak 's;/Library/Frameworks/R.framework/Resources;${R_HOME};g' "${R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH}/lib/R/bin/R"
chmod +x "${R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH}/lib/R/bin/R"
rm -f "${R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH}/lib/R/bin/R".bak
# # ------------------------------------------------------------------------------
# # Perform Clean up - only the final artifact should remain
# rm -fr $R_VERSION_BUILD_DIRECTORY_RELATIVE_PATH
# rm -fr $R_VERSION_INSTALL_DIRECTORY_RELATIVE_PATH
