# ------------------------------------------------------------------------------
# ENVIRONMENT
# ------------------------------------------------------------------------------
# Taken from here:
# https://stackoverflow.com/questions/59895/how-to-get-the-source-directory-of-a-bash-script-from-within-the-script-itself
DOWNLOAD_R_OSX_SCRIPT_NAME="download_r_osx.sh"
DOWNLOAD_R_WINDOWS_SCRIPT_NAME="download_r_windows.sh"

INSTALL_R_CRAN_DEPENDENCIES_SCRIPT_NAME="install_r_cran_dependencies.r"
INSTALL_R_BIOCMANANGER_DEPENDENCIES_SCRIPT_NAME="install_r_biocmanager_dependencies.r.r"

CURRENT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PARENT_DIRECTORY="$(dirname "$CURRENT_DIRECTORY")"

DOWNLOAD_R_OSX_SCRIPT_FILE_PATH="$PARENT_DIRECTORY/app/binaries/r/$DOWNLOAD_R_OSX_SCRIPT_NAME"
DOWNLOAD_R_WINDOWS_SCRIPT_FILE_PATH="$PARENT_DIRECTORY/app/binaries/r/$DOWNLOAD_R_WINDOWS_SCRIPT_NAME"
# --
INSTALL_R_CRAN_DEPENDENCIES_SCRIPT_FILE_PATH="$PARENT_DIRECTORY/app/binaries/r/$INSTALL_R_CRAN_DEPENDENCIES_SCRIPT_NAME"
INSTALL_R_BIOCMANAGER_DEPENDENCIES_SCRIPT_FILE_PATH="$PARENT_DIRECTORY/app/binaries/r/$INSTALL_R_BIOCMANANGER_DEPENDENCIES_SCRIPT_NAME"

# ------------------------------------------------------------------------------
# Debug
# ------------------------------------------------------------------------------
echo $DOWNLOAD_R_OSX_SCRIPT_NAME
echo $DOWNLOAD_R_WINDOWS_SCRIPT_NAME
echo $CURRENT_DIRECTORY
echo $PARENT_DIRECTORY
echo $DOWNLOAD_R_OSX_SCRIPT_FILE_PATH
echo $DOWNLOAD_R_WINDOWS_SCRIPT_FILE_PATH

# ------------------------------------------------------------------------------
# Script Exectuion
# ------------------------------------------------------------------------------
sh $DOWNLOAD_R_OSX_SCRIPT_FILE_PATH
# sh $DOWNLOAD_R_WINDOWS_SCRIPT_FILE_PATH
Rscript $INSTALL_R_CRAN_DEPENDENCIES_SCRIPT_FILE_PATH
Rscript $INSTALL_R_BIOCMANAGER_DEPENDENCIES_SCRIPT_FILE_PATH

