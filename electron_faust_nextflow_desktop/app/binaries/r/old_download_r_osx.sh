# #!/usr/bin/env bash

# WARNING: This MUST be run from the directory it lives in

# Taken from here:
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/get-r-mac.sh
set -e

# From: https://stackoverflow.com/questions/59895/how-to-get-the-source-directory-of-a-bash-script-from-within-the-script-itself
CURRENT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null 2>&1 && pwd)"

INSTALLATION_DIRECTORY_ABSOLUTE_PATH=$CURRENT_DIRECTORY/$R_VERSION_INSTALL_DIRECTORY_RELATIVE_PATH

R_PACKAGE_NAME="${R_VERSION}_r.pkg"

# ------------------------------------------------------------------------------
# Clean up pre-existing builds
rm -fr $R_MAC_DIRECTORY_NAME

# ------------------------------------------------------------------------------
# Download and extract the source code for R
mkdir -p $R_MAC_DIRECTORY_NAME
curl -o $R_MAC_DIRECTORY_NAME/$R_PACKAGE_NAME \
    https://cloud.r-project.org/bin/macosx/R-4.0.2.pkg

cd $R_MAC_DIRECTORY_NAME
xar -xf $R_PACKAGE_NAME

cat R-fw.pkg/Payload | gunzip -dc | cpio -i
mv R.framework/Versions/Current/Resources/* .
rm -fr r.pkg R.framework R-fw.pkg R-app.pkg $R_PACKAGE_NAME

# Do not keep
# rm -r r-1.pkg Resources tcltk8.pkg texinfo5.pkg Distribution latest_r.pkg

# TODO
# cat r.pkg/Payload | gunzip -dc | cpio -i
# mv R.framework/Versions/Current/Resources/* .
# rm -r r.pkg R.framework

# # ------------------------------------------------------------------------------
# # Inject logic to override the initial configuration and point to the correct
# # shiny executable

# # Patch the main R script
# sed -i.bak '/^R_HOME_DIR=/d' $R_VERSION_BINARY_R_FILE_RELATIVE_PATH
# sed -i.bak 's;/Library/Frameworks/R.framework/Resources;${R_HOME};g' $R_VERSION_BINARY_R_FILE_RELATIVE_PATH
# chmod +x $R_VERSION_BINARY_R_FILE_RELATIVE_PATH
# rm -f $R_VERSION_BINARY_R_FILE_RELATIVE_PATH.bak

# # Patch the nested R script
# sed -i.bak '/^R_HOME_DIR=/d' "${R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH}/lib/R/bin/R"
# sed -i.bak 's;/Library/Frameworks/R.framework/Resources;${R_HOME};g' "${R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH}/lib/R/bin/R"
# chmod +x "${R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH}/lib/R/bin/R"
# rm -f "${R_VERSION_FINAL_ARTIFACT_DIRECTORY_RELATIVE_PATH}/lib/R/bin/R".bak
# # # ------------------------------------------------------------------------------
# # # Perform Clean up - only the final artifact should remain
# # rm -fr $R_VERSION_BUILD_DIRECTORY_RELATIVE_PATH
# # rm -fr $R_VERSION_INSTALL_DIRECTORY_RELATIVE_PATH
